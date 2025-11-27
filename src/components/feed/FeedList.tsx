import ArticleCard from "./ArticleCard";

export interface FeedItem {
  id?: string;
  source: string;
  time: string;
  headline: string;
  summary: string;
  image: string;
  category?: string[];
}

interface FeedListProps {
  items: FeedItem[];
}

export default function FeedList({ items }: FeedListProps) {
  return (
    <section className="divide-y divide-border">
      {items.map((item, idx) => (
        <ArticleCard key={idx} {...item} />
      ))}
    </section>
  );
}
