import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/useAuthStore";
import { UserIcon } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CommentInputProps {
  onSubmit: (comment: string) => Promise<void>;
}

export default function CommentInput({ onSubmit }: CommentInputProps) {
  const user = useAuthStore((s) => s.user);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please sign in to comment", {
        action: {
          label: "Sign In",
          onClick: () => navigate("/signin"),
        },
      });
      return;
    }

    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(comment);
      setComment("");
      toast.success("Comment posted");
    } catch (error) {
      toast.error("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-start gap-4">
      <div
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 flex items-center justify-center bg-muted overflow-hidden shrink-0"
        style={{
          backgroundImage: user?.photoURL ? `url('${user.photoURL}')` : "none",
        }}
      >
        {!user?.photoURL && (
          <UserIcon className="h-5 w-5 text-muted-foreground" />
        )}
      </div>
      <div className="flex-1">
        <Textarea
          placeholder={user ? "Add a comment..." : "Sign in to comment..."}
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isSubmitting}
        />
        <div className="mt-2 flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!comment.trim() || isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </div>
    </div>
  );
}
