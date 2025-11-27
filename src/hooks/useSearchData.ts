import { useState, useEffect } from "react";
import type { PostItem } from "@/types/post";
import type { SearchNewsParams } from "@/types/news";
import newsService from "@/services/newsService";
import { mockNewsService } from "@/services/mockNewsService";

// Check if we should use mock data
const USE_MOCK_DATA = !import.meta.env.VITE_NEWS_API_KEY;

interface UseSearchDataParams {
  query: string;
  category?: string;
  fromDate?: string;
  toDate?: string;
}

interface UseSearchDataResult {
  results: PostItem[];
  loading: boolean;
  error: string | null;
  totalResults: number;
}

/**
 * Custom hook to search news with filters
 * Automatically switches between real API and mock data
 */
export function useSearchData(
  params: UseSearchDataParams
): UseSearchDataResult {
  const [results, setResults] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    // Don't search if query is empty
    if (!params.query.trim()) {
      setResults([]);
      setTotalResults(0);
      return;
    }

    const searchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;

        if (USE_MOCK_DATA) {
          // Use mock data
          response = await mockNewsService.searchNews(params.query);

          // Filter by category if specified
          if (params.category && params.category !== "All Categories") {
            response.results = response.results.filter((item) =>
              item.category?.some(
                (cat) => cat.toLowerCase() === params.category?.toLowerCase()
              )
            );
          }
        } else {
          // Use real API
          const searchParams: SearchNewsParams = {
            q: params.query,
            size: 10,
          };

          if (params.category && params.category !== "All Categories") {
            searchParams.category = params.category.toLowerCase();
          }

          response = await newsService.searchNews(searchParams);
        }

        setResults(response.results);
        setTotalResults(response.totalResults);
      } catch (err) {
        console.error("Error searching news:", err);
        setError("Failed to search news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(searchNews, 500);
    return () => clearTimeout(timeoutId);
  }, [params.query, params.category, params.fromDate, params.toDate]);

  return { results, loading, error, totalResults };
}
