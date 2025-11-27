import { Link } from "react-router-dom";

interface ArticleCardProps {
  id?: string;
  source: string;
  time: string;
  headline: string;
  summary: string;
  image: string;
  category?: string[];
  href?: string;
}

export default function ArticleCard({
  id,
  source,
  time,
  headline,
  summary,
  image,
  category,
  href = "#",
}: ArticleCardProps) {
  // Construct the post object to pass as state
  const postState = {
    id,
    source,
    time,
    title: headline,
    lead: summary,
    image,
    category,
    body: [], // Body will be empty initially or fetched if needed
    likes: 0,
    comments: 0,
  };

  return (
    <Link
      to={id ? `/post/${id}` : href}
      state={{ post: postState }}
      className="block p-4 @container group border-b border-border transition-colors hover:bg-accent"
    >
      <div className="flex flex-col-reverse items-start gap-4 @md:flex-row">
        <div className="flex w-full flex-col gap-1.5">
          <p className="text-sm text-muted-foreground">
            {source} · {time}
          </p>
          <p className="text-lg font-semibold leading-tight group-hover:underline">
            {headline}
          </p>
          <p className="text-muted-foreground text-sm font-normal leading-normal line-clamp-2">
            {summary}
          </p>
        </div>
        <div
          className="w-full @md:w-48 bg-center bg-no-repeat aspect-video bg-cover rounded-md shrink-0"
          style={{ backgroundImage: `url('${image}')` }}
          data-alt={headline}
        />
      </div>
    </Link>
  );
}
