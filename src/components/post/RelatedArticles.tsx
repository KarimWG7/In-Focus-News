import { Link } from "react-router-dom";

export interface RelatedArticle {
  id?: string;
  image: string;
  category: string;
  title: string;
  href?: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <aside className="sticky top-16 h-fit w-80 flex-col space-y-6 border-l border-border p-6 hidden xl:flex shrink-0">
      <h3 className="text-lg font-semibold tracking-tight">Related Articles</h3>
      <div className="space-y-5">
        {articles.map((a, idx) => (
          <div className="group" key={idx}>
            <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-md mb-2 overflow-hidden">
              <div
                className="w-full h-full bg-center bg-no-repeat aspect-video bg-cover group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url('${a.image}')` }}
                data-alt={a.title}
              />
            </div>
            <p className="text-xs text-muted-foreground">{a.category}</p>
            <Link
              className="font-semibold text-sm leading-snug hover:text-primary mt-1 block"
              to={a.id ? `/post/${a.id}` : a.href || "#"}
            >
              {a.title}
            </Link>
          </div>
        ))}
      </div>
    </aside>
  );
}
