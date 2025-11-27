import { Link } from "react-router-dom";
import type { SavedArticle } from "@/services/bookmarkService";

interface SavedArticleCardProps {
  article: SavedArticle;
}

export default function SavedArticleCard({ article }: SavedArticleCardProps) {
  return (
    <Link
      to={`/post/${article.id}`}
      state={{ post: article }}
      className="flex flex-col gap-3 group cursor-pointer"
    >
      <div
        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ backgroundImage: `url('${article.image}')` }}
        data-alt={article.imageAlt}
      />
      <div>
        <p className="text-foreground text-base font-medium leading-normal line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </p>
        <p className="text-muted-foreground text-sm font-normal leading-normal mt-1">
          {article.source} · {article.time}
        </p>
      </div>
    </Link>
  );
}
