import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import SavedArticleCard from "./SavedArticleCard";
import { useAuthStore } from "@/store/useAuthStore";
import { getBookmarks, type SavedArticle } from "@/services/bookmarkService";

// We don't need props anymore as we fetch internally
export default function SavedArticles() {
  const user = useAuthStore((s) => s.user);
  const [articles, setArticles] = useState<SavedArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user) return;
      try {
        const data = await getBookmarks(user.uid);
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch bookmarks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user]);

  if (loading) {
    return (
      <Card className="p-6">
        <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-5">
          My Saved Articles
        </h2>
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-5">
        My Saved Articles
      </h2>
      {articles.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>You haven't saved any articles yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
          {articles.map((article) => (
            <SavedArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </Card>
  );
}
