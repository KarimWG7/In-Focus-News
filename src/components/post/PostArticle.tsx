import type { PostItem } from "../../types/post";

interface PostArticleProps {
  post: PostItem;
}

export default function PostArticle({ post }: PostArticleProps) {
  return (
    <article className="prose prose-lg max-w-none">
      <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
        <span>{post.source}</span>
        <span className="mx-1.5">·</span>
        <span>Published {post.time}</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
        {post.title}
      </h1>
      <p className="lead text-xl text-muted-foreground">{post.lead}</p>
      {post.image && (
        <figure>
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg my-8"
            style={{ backgroundImage: `url('${post.image}')` }}
            data-alt={post.imageAlt}
          />
          {post.imageCaption && (
            <figcaption className="text-center text-sm text-muted-foreground">
              {post.imageCaption}
            </figcaption>
          )}
        </figure>
      )}
      {post.body.map((p, idx) =>
        p.type === "blockquote" ? (
          <blockquote key={idx}>
            <p>{p.content}</p>
          </blockquote>
        ) : (
          <p key={idx}>{p.content}</p>
        )
      )}
    </article>
  );
}
