import { useState, useEffect } from "react";
import { ThumbsUp, MessageCircle, Bookmark, Share2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import {
  saveBookmark,
  removeBookmark,
  isBookmarked,
} from "@/services/bookmarkService";
import {
  toggleLike,
  type PostInteraction,
} from "@/services/interactionService";
import type { PostItem } from "@/types/post";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface PostActionsProps {
  post: PostItem;
  interactions: PostInteraction | null;
  onInteractionUpdate: () => void;
}

export default function PostActions({
  post,
  interactions,
  onInteractionUpdate,
}: PostActionsProps) {
  const user = useAuthStore((s) => s.user);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      if (user && post.id) {
        const saved = await isBookmarked(user.uid, post.id);
        setIsSaved(saved);
      }
    };
    checkStatus();
  }, [user, post.id]);

  useEffect(() => {
    if (interactions) {
      setLikeCount(interactions.likes.length);
      if (user) {
        setIsLiked(interactions.likes.some((l) => l.userId === user.uid));
      }
    } else {
      // Fallback to post data if no interactions loaded yet
      setLikeCount(post.likes || 0);
    }
  }, [interactions, user, post.likes]);

  const handleLike = async () => {
    if (!user) {
      toast.error("Please sign in to like articles", {
        action: {
          label: "Sign In",
          onClick: () => navigate("/signin"),
        },
      });
      return;
    }

    if (!post.id) return;

    // Optimistic update
    const prevIsLiked = isLiked;
    const prevCount = likeCount;

    setIsLiked(!prevIsLiked);
    setLikeCount(prevIsLiked ? prevCount - 1 : prevCount + 1);
    setIsLiking(true);

    try {
      await toggleLike(post.id, user.uid);
      onInteractionUpdate(); // Refresh data to ensure sync
    } catch (error) {
      // Revert on error
      setIsLiked(prevIsLiked);
      setLikeCount(prevCount);
      toast.error("Failed to update like");
    } finally {
      setIsLiking(false);
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      toast.error("Please sign in to bookmark articles", {
        action: {
          label: "Sign In",
          onClick: () => navigate("/signin"),
        },
      });
      return;
    }

    setIsLoading(true);
    try {
      if (isSaved) {
        await removeBookmark(user.uid, post.id);
        setIsSaved(false);
        toast.success("Article removed from bookmarks");
      } else {
        await saveBookmark(user.uid, post);
        setIsSaved(true);
        toast.success("Article saved to bookmarks");
      }
    } catch (error) {
      toast.error("Failed to update bookmark");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: post.lead,
        url: window.location.href,
      });
    } catch (err) {
      // Fallback or ignore if cancelled
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const commentCount = interactions
    ? interactions.comments?.length
    : post.comments || 0;

  return (
    <div className="border-y border-border my-8 py-4 flex items-center justify-between text-muted-foreground">
      <div className="flex items-center gap-6">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center gap-2 hover:text-primary transition-colors group ${
            isLiked ? "text-primary" : ""
          }`}
        >
          <ThumbsUp
            className={`size-5 group-hover:scale-110 transition-transform ${
              isLiked ? "fill-current" : ""
            }`}
          />
          <span className="text-sm font-medium">
            {likeCount.toLocaleString()} Likes
          </span>
        </button>
        <button className="flex items-center gap-2 hover:text-primary transition-colors group">
          <MessageCircle className="size-5 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">{commentCount} Comments</span>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleBookmark}
          disabled={isLoading}
          className={`flex items-center justify-center size-9 rounded-full hover:bg-accent transition-colors ${
            isSaved ? "text-primary bg-accent" : ""
          }`}
          title={isSaved ? "Remove bookmark" : "Bookmark article"}
        >
          <Bookmark className={`size-5 ${isSaved ? "fill-current" : ""}`} />
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center size-9 rounded-full hover:bg-accent transition-colors"
          title="Share article"
        >
          <Share2 className="size-5" />
        </button>
      </div>
    </div>
  );
}
