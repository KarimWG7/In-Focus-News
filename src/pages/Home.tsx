import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import FeedList from "../components/feed/FeedList";
import type { FeedItem } from "../components/feed/FeedList";
import CategoryFilter, {
  type CategoryOption,
} from "../components/feed/CategoryFilter";
import { useNewsData } from "@/hooks/useNewsData";
import type { PostItem } from "@/types/post";

const categories: CategoryOption[] = [
  { id: "All", label: "All" },
  { id: "technology", label: "Tech" },
  { id: "politics", label: "Politics" },
  { id: "world", label: "World" },
  { id: "business", label: "Business" },
];

/**
 * Transform PostItem to FeedItem for display
 */
function transformToFeedItem(post: PostItem): FeedItem {
  return {
    id: post.id,
    source: post.source,
    time: post.time,
    headline: post.title,
    summary: post.lead,
    image: post.image || "",
    category: post.category,
  };
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const user = useAuthStore((s) => s.user);

  // Fetch news data based on selected category
  const { news, loading, error } = useNewsData(selectedCategory);

  // Transform PostItem[] to FeedItem[]
  const feedItems: FeedItem[] = news.map(transformToFeedItem);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="flex h-full grow flex-col">
          <div className="px-4 md:px-6 lg:px-8 flex flex-1 justify-center py-5">
            <div className="flex flex-col w-full max-w-4xl flex-1 gap-6">
              {/* Guest User Banner */}
              {user?.isAnonymous && (
                <div className="rounded-md bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-900 flex items-center justify-between">
                  <div>
                    You are browsing as a <strong>guest</strong>. Your session
                    is temporary —{" "}
                    <a className="underline text-yellow-800" href="/signup">
                      create an account
                    </a>{" "}
                    to save preferences.
                  </div>
                </div>
              )}

              <main className="flex flex-col gap-8">
                {/* Header Section */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
                    Latest Headlines
                  </h1>
                  <p className="text-muted-foreground">
                    Your daily digest of what's happening in the world.
                  </p>
                </div>

                {/* Category Filter */}
                <CategoryFilter
                  categories={categories}
                  onCategoryChange={setSelectedCategory}
                  defaultSelected="All"
                />

                {/* News Feed */}
                <div className="flex flex-col border-t border-border">
                  {loading && (
                    <div className="flex items-center justify-center py-12">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                        <p className="text-sm text-muted-foreground">
                          Loading news...
                        </p>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="rounded-md bg-red-50 border border-red-200 p-4 my-4">
                      <p className="text-sm text-red-900">{error}</p>
                    </div>
                  )}

                  {!loading && !error && feedItems.length === 0 && (
                    <div className="flex items-center justify-center py-12">
                      <p className="text-muted-foreground">
                        No news articles found for this category.
                      </p>
                    </div>
                  )}

                  {!loading && !error && feedItems.length > 0 && (
                    <FeedList items={feedItems} />
                  )}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
