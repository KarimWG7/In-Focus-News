import { Reply } from "lucide-react";

interface CommentItemProps {
  avatar: string;
  name: string;
  time: string;
  content: string;
}

export default function CommentItem({
  avatar,
  name,
  time,
  content,
}: CommentItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
        style={{
          backgroundImage: `url('${avatar}')`,
          backgroundPosition: "top",
        }}
        data-alt={`Avatar of ${name}`}
      />
      <div>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
        <p className="text-sm mt-1">{content}</p>
        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
          <button className="font-medium hover:text-primary transition-colors flex items-center gap-1">
            <Reply className="size-3" />
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}
