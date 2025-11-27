import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface SearchResultCardProps {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  source: string;
  date: string;
  category?: string[];
}

export default function SearchResultCard({
  id,
  image,
  imageAlt,
  title,
  description,
  source,
  date,
  category,
}: SearchResultCardProps) {
  // Construct the post object to pass as state
  const postState = {
    id,
    source,
    time: date,
    title,
    lead: description,
    image,
    imageAlt,
    category,
    body: [],
    likes: 0,
    comments: 0,
  };

  return (
    <Link to={`/post/${id}`} state={{ post: postState }} className="block">
      <Card className="group flex flex-col overflow-hidden rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-200 p-0 cursor-pointer">
        <div
          className="aspect-video bg-cover bg-center"
          data-alt={imageAlt}
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div className="flex flex-1 flex-col p-4">
          <h3 className="mb-2 text-lg font-semibold leading-tight tracking-tight transition-colors group-hover:text-primary line-clamp-2">
            {title}
          </h3>
          <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
          <div className="mt-auto flex items-center pt-2 text-xs text-muted-foreground">
            <span>{source}</span>
            <span className="mx-2">•</span>
            <span>{date}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
