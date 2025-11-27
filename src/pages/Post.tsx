import { useEffect, useState, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PostArticle from "../components/post/PostArticle";
import PostActions from "../components/post/PostActions";
import CommentInput from "../components/post/CommentInput";
import CommentList from "../components/post/CommentList";
import RelatedArticles from "../components/post/RelatedArticles";
import type { PostItem } from "../types/post";
import newsService, { getRelatedArticles } from "@/services/newsService";
import { mockNewsService } from "@/services/mockNewsService";
import {
  getPostInteractions,
  addComment,
  type PostInteraction,
} from "@/services/interactionService";
import { useAuthStore } from "@/store/useAuthStore";

// Check if we should use mock data
const USE_MOCK_DATA = !import.meta.env.VITE_NEWS_API_KEY;

export default function Post() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  // Get initial post from location state if available
  const initialPost = location.state?.post as PostItem | undefined;

  const [post, setPost] = useState<PostItem | null>(initialPost || null);
  const [loading, setLoading] = useState(!initialPost);
  const [error, setError] = useState<string | null>(null);

  // Related articles state
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);

  // Interaction state
  const [interactions, setInteractions] = useState<PostInteraction | null>(
    null
  );

  const fetchInteractions = useCallback(async () => {
    if (!id) return;
    try {
      const data = await getPostInteractions(id);
      setInteractions(data);
    } catch (err) {
      console.error("Failed to fetch interactions", err);
    }
  }, [id]);

  // Fetch related articles
  const fetchRelated = useCallback(async (currentPost: PostItem) => {
    if (USE_MOCK_DATA) {
      // Keep using mock related articles for mock mode
      setRelatedArticles([
        {
          id: "mock-biz-1",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBpIuMWnPb3J__MmjRBP0qMIgD2ODcxMf6M2hkTJ3EIqmlzpJw7ujRuligC2Nz2ZFOOrH0yEohPK45kav3NXDf5ExOWX5m7AJ5oAqnFHQQul08EUeSnvzOFcNnJDXO6m0ZeIOEo_jFtP2KOf6vTf8Woi-IgJrWw_MPD636Bo3dnSVTwwiOch3q87mutzET3JsUcnMWBGusF4kVanZpcNVGYggk3v438IAdkc_Xy0E66z56RPvfc15tKUkcHkVjZaqL52_GFBJ6I_wYc",
          category: "Business",
          title: "Global markets react to new international trade agreement",
          href: "#",
        },
        {
          id: "mock-tech-2",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDojCPmeLWi402nlWmUxkvW7oxBj4q229k2DDVcLgytCPJrUaCDa9TaEMCQR7YOjvrPIbqzO8CksNtwqXZK-hMQQZpKi-2Zx4JwtgQML523lrEyu_AAT8Ef4-oyekIovilV5BYRtbl8kKBrn5Ooz-jvpUSJ2FF8bZing76CCyJUAf6VU7isAmrzZw5v7H469uS9U3Vk10qOOscCOCyX4APwCKos-QTy3I2bkDP6tNPH73nLPhUufnIIpYERyFKyuMAF9ddFBi-ythNl",
          category: "Tech",
          title: "The Quiet Revolution in Quantum Computing",
          href: "#",
        },
        {
          id: "mock-world-3",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDOdiQEq6Qr6tFxfh2CTLKfqKSlKsgLIwSz6-XzDgIljGAiyXNhUQCcU61Q5q-axz5hbiuPVYZbkS0px3Cizbm35jPbfn9j4YX3qysyR_Hc1XoCZcwBMazLKNyQTgiPy8fhjMOLrzTzSTn7AQr3hdafe-DvvHhIw4QSl-fWd0JU3uVqdWmaRzYrMGKu6DQz8Mn7x4-nyORgTGreNZOly_p_5VRkRiJ6HsLO-oYVXKRKefwtEpX6vLhRnoL4xuM-moTU6kJeaH2Y6KT2",
          category: "Culture",
          title: "How Urban Farming is Changing Our Food",
          href: "#",
        },
      ]);
      return;
    }
    if (currentPost.category) {
      try {
        const related = await getRelatedArticles(
          currentPost.category,
          currentPost.id
        );
        setRelatedArticles(
          related.map((item) => ({
            id: item.id,
            image: item.image || "",
            category: item.category?.[0] || "News",
            title: item.title,
            href: `/post/${item.id}`,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch related articles", err);
      }
    }
  }, []);

  useEffect(() => {
    // If we already have the post from state and it matches the ID, don't fetch
    if (post && post.id === id) {
      fetchInteractions();
      fetchRelated(post);
      return;
    }

    const fetchPost = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        let fetchedPost: PostItem | null;

        if (USE_MOCK_DATA) {
          fetchedPost = await mockNewsService.getNewsById(id);
        } else {
          fetchedPost = await newsService.getNewsById(id);
        }

        if (fetchedPost) {
          setPost(fetchedPost);
          // Fetch interactions and related after post is found
          await fetchInteractions();
          await fetchRelated(fetchedPost);
        } else {
          setError("Article not found");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, post, fetchInteractions, fetchRelated]);

  const handleCommentSubmit = async (commentText: string) => {
    if (!id || !user) return;

    await addComment(id, commentText, {
      uid: user.uid,
      name: user.name || "Anonymous",
      photoURL: user.photoURL ?? "",
    });

    // Refresh interactions to show new comment
    await fetchInteractions();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Article not found</h2>
          <p className="text-muted-foreground">
            {error || "The article you are looking for does not exist."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex w-full">
        {/* Main content */}
        <div className="flex-1 p-6 md:p-10 max-w-4xl mx-auto">
          <PostArticle post={post} />
          <PostActions
            post={post}
            interactions={interactions}
            onInteractionUpdate={fetchInteractions}
          />
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-2xl font-bold tracking-tight">
              Comments ({interactions?.comments?.length || 0})
            </h2>
            <CommentInput onSubmit={handleCommentSubmit} />
            <CommentList comments={interactions?.comments || []} />
          </div>
        </div>
        {/* Related articles sidebar */}
        <RelatedArticles articles={relatedArticles} />
      </div>
    </div>
  );
}
