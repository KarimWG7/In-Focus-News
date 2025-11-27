import SearchResultCard from "./SearchResultCard";

export interface SearchResult {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  source: string;
  date: string;
  category?: string[];
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading?: boolean;
}

export default function SearchResults({
  results,
  isLoading,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex animate-pulse flex-col overflow-hidden rounded-lg border bg-card"
          >
            <div className="aspect-video bg-muted"></div>
            <div className="space-y-3 p-4">
              <div className="h-5 w-3/4 rounded bg-muted"></div>
              <div className="space-y-2">
                <div className="h-3 rounded bg-muted"></div>
                <div className="h-3 rounded bg-muted"></div>
                <div className="h-3 w-5/6 rounded bg-muted"></div>
              </div>
              <div className="mt-4 h-3 w-1/3 rounded bg-muted"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return null; // Empty state is handled in Search.tsx
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {results.map((result) => (
        <SearchResultCard key={result.id} {...result} />
      ))}
    </div>
  );
}
