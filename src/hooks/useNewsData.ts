import { useState, useEffect } from "react";
import type { PostItem } from "@/types/post";
import newsService from "@/services/newsService";
import { mockNewsService } from "@/services/mockNewsService";

// Check if we should use mock data (when API key is not set)
const USE_MOCK_DATA = !import.meta.env.VITE_NEWS_API_KEY;

interface UseNewsDataResult {
  news: PostItem[];
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch news data by category
 * Automatically switches between real API and mock data based on API key availability
 */
export function useNewsData(category: string): UseNewsDataResult {
  const [news, setNews] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;

        if (USE_MOCK_DATA) {
          // Use mock data when API key is not available
          if (category === "All") {
            response = await mockNewsService.getLatestNews();
          } else {
            response = await mockNewsService.getNewsByCategory(category);
          }
        } else {
          // Use real API when key is available
          if (category === "All") {
            response = await newsService.getLatestNews({ size: 10 });
          } else {
            response = await newsService.getNewsByCategory(
              category.toLowerCase(),
              { size: 10 }
            );
          }
        }

        setNews(response.results);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  return { news, loading, error };
}
