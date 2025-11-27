import CommentItem from "./CommentItem";
import type { Comment } from "@/services/interactionService";
import { formatDistanceToNow } from "date-fns";

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No comments yet. Be the first to share your thoughts!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((c) => (
        <CommentItem
          key={c.id}
          avatar={c.userAvatar}
          name={c.userName}
          time={formatDistanceToNow(new Date(c.date), { addSuffix: true })}
          content={c.comment}
        />
      ))}
    </div>
  );
}
