import { useSearchParams } from "react-router-dom";
import SearchFilters from "../components/search/SearchFilters";
import SearchSort from "../components/search/SearchSort";
import SearchResults, {
  type SearchResult,
} from "../components/search/SearchResults";
import { useSearchData } from "@/hooks/useSearchData";
import type { PostItem } from "@/types/post";
import type { DateRange } from "react-day-picker";

/**
 * Parse date string to timestamp for sorting
 */
function parseDate(dateStr: string): number {
  // Try to parse various date formats
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? 0 : date.getTime();
}

/**
 * Transform PostItem to SearchResult for display
 */
function transformToSearchResult(post: PostItem): SearchResult {
  return {
    id: post.id,
    image: post.image || "",
    imageAlt: post.title,
    title: post.title,
    description: post.lead,
    source: post.source,
    date: post.time,
    category: post.category,
  };
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get state from URL params
  const searchQuery = searchParams.get("q") || "";
  const category = searchParams.get("category") || "All Categories";
  const fromDate = searchParams.get("from");
  const toDate = searchParams.get("to");
  const sortBy =
    (searchParams.get("sort") as "relevance" | "newest" | "oldest") ||
    "relevance";

  // Construct dateRange object from params
  const dateRange: DateRange | undefined = fromDate
    ? {
        from: new Date(fromDate),
        to: toDate ? new Date(toDate) : undefined,
      }
    : undefined;

  // Update URL params helpers
  const updateParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    setSearchParams(newParams, { replace: true });
  };

  const handleSearchChange = (query: string) => {
    updateParams({ q: query });
  };

  const handleCategoryChange = (cat: string) => {
    updateParams({ category: cat === "All Categories" ? null : cat });
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from) {
      updateParams({
        from: range.from.toISOString(),
        to: range.to?.toISOString() || null,
      });
    } else {
      updateParams({ from: null, to: null });
    }
  };

  const handleSortChange = (sort: "relevance" | "newest" | "oldest") => {
    updateParams({ sort });
  };

  // Fetch search results
  const { results, loading, error } = useSearchData({
    query: searchQuery,
    category,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
  });

  // Transform PostItem[] to SearchResult[]
  const searchResults: SearchResult[] = results.map(transformToSearchResult);

  // Sort results based on sortBy
  const sortedResults = [...searchResults].sort((a, b) => {
    if (sortBy === "newest") {
      return parseDate(b.date) - parseDate(a.date);
    } else if (sortBy === "oldest") {
      return parseDate(a.date) - parseDate(b.date);
    }
    return 0; // relevance (default order from API)
  });

  // Actual count of displayed results
  const displayedCount = sortedResults.length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="w-full mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 max-w-7xl">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
              Search News
            </h1>
            <p className="text-muted-foreground">
              Find articles by keywords, category, and date range
            </p>
          </div>

          {/* Search Filters - Sticky */}
          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            category={category}
            onCategoryChange={handleCategoryChange}
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />

          {/* Results Count and Sort */}
          {searchQuery && !loading && displayedCount > 0 && (
            <SearchSort
              sortBy={sortBy}
              onSortChange={handleSortChange}
              resultsCount={displayedCount}
              searchQuery={searchQuery}
            />
          )}

          {/* Error State */}
          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 p-4">
              <p className="text-sm text-red-900">{error}</p>
            </div>
          )}

          {/* Empty State - No Query */}
          {!searchQuery && !loading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">
                Enter a search query to find news articles
              </p>
            </div>
          )}

          {/* Empty State - No Results */}
          {searchQuery && !loading && !error && displayedCount === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">
                No results found for "{searchQuery}"
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Try different keywords or adjust your filters
              </p>
            </div>
          )}

          {/* Search Results */}
          <SearchResults results={sortedResults} isLoading={loading} />
        </div>
      </main>
    </div>
  );
}
