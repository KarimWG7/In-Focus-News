import { Button } from "@/components/ui/button";

interface SearchSortProps {
  sortBy: "relevance" | "newest" | "oldest";
  onSortChange: (sort: "relevance" | "newest" | "oldest") => void;
  resultsCount: number;
  searchQuery: string;
}

export default function SearchSort({
  sortBy,
  onSortChange,
  resultsCount,
  searchQuery,
}: SearchSortProps) {
  return (
    <div className="flex flex-col gap-4 justify-between sm:flex-row sm:items-center">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">{resultsCount}</span>{" "}
        results
        {searchQuery && (
          <>
            {" "}
            for{" "}
            <span className="font-medium text-foreground">"{searchQuery}"</span>
          </>
        )}
      </p>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Sort by:
        </span>
        <div className="flex items-center rounded-md border bg-card p-1 text-sm">
          <Button
            variant={sortBy === "relevance" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onSortChange("relevance")}
            className="rounded-sm"
          >
            Relevance
          </Button>
          <Button
            variant={sortBy === "newest" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onSortChange("newest")}
            className="rounded-sm"
          >
            Newest
          </Button>
          <Button
            variant={sortBy === "oldest" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onSortChange("oldest")}
            className="rounded-sm"
          >
            Oldest
          </Button>
        </div>
      </div>
    </div>
  );
}
