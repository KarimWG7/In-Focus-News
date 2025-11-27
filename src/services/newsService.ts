import newsApi from "@/lib/newsApi";
import type {
  NewsArticle,
  NewsApiResponse,
  LatestNewsParams,
  SearchNewsParams,
  CategoryNewsParams,
  ArchiveNewsParams,
} from "@/types/news";
import type { PostItem } from "@/types/post";

/**
 * Transform NewsArticle from API to PostItem for app usage
 */
function transformToPostItem(article: NewsArticle): PostItem {
  return {
    id: article.article_id,
    source: article.source_name,
    time: article.pubDate,
    title: article.title,
    lead:
      (article.description && !article.description.includes("ONLY AVAILABLE")
        ? article.description
        : null) ||
      (article.ai_summary && !article.ai_summary.includes("ONLY AVAILABLE")
        ? article.ai_summary
        : "") ||
      "",
    image: article.image_url || undefined,
    imageAlt: article.title,
    imageCaption: article.source_name,
    body: (
      (article.content && !article.content.includes("ONLY AVAILABLE")
        ? article.content
        : null) ||
      (article.description && !article.description.includes("ONLY AVAILABLE")
        ? article.description
        : null) ||
      (article.ai_summary && !article.ai_summary.includes("ONLY AVAILABLE")
        ? article.ai_summary
        : null) ||
      ""
    )
      .split(/\n+/)
      .map((text) => ({
        type: "paragraph" as const,
        content: text.trim(),
      }))
      .filter((block) => block.content.length > 0),
    likes: 0,
    comments: 0,
    link: article.link,
    category: article.category || undefined,
    sentiment: article.sentiment,
    sourceUrl: article.source_url,
  };
}

/**
 * Get latest news from the past 48 hours
 * @param params - Optional parameters for filtering news
 * @returns Promise with news articles and pagination data
 */
export async function getLatestNews(
  params?: LatestNewsParams
): Promise<NewsApiResponse<PostItem>> {
  try {
    const response = await newsApi.get<NewsApiResponse<NewsArticle>>(
      "/api/1/latest",
      { params: { ...params, language: "en" } }
    );

    return {
      status: response.data.status,
      totalResults: response.data.totalResults,
      results: response.data.results.map(transformToPostItem),
      nextPage: response.data.nextPage,
    };
  } catch (error) {
    console.error("Error fetching latest news:", error);
    throw error;
  }
}

/**
 * Get related articles based on article category
 * @param category - The category of the current article
 * @param currentArticleId - ID of the current article to exclude
 * @returns Promise with related news articles
 */
export async function getRelatedArticles(
  category: string | string[] | undefined,
  currentArticleId?: string
): Promise<PostItem[]> {
  try {
    // If no category, return empty array
    if (!category) return [];

    // Get the first category if it's an array
    const categoryStr = Array.isArray(category) ? category[0] : category;

    if (!categoryStr) return [];

    const response = await getLatestNews({
      category: categoryStr.toLowerCase(),
      size: 10,
      language: "en",
    });

    // Filter out current article and return top 5
    return response.results
      .filter((item) => item.id !== currentArticleId)
      .slice(0, 5);
  } catch (error) {
    console.error("Error fetching related articles:", error);
    return [];
  }
}

/**
 * Search for news articles based on query and filters
 * @param params - Search parameters including query, filters, etc.
 * @returns Promise with matching news articles
 */
export async function searchNews(
  params: SearchNewsParams
): Promise<NewsApiResponse<PostItem>> {
  try {
    // Use /api/1/latest for search as well to avoid 422 on /api/1/news (which might be archive)
    const response = await newsApi.get<NewsApiResponse<NewsArticle>>(
      "/api/1/latest",
      { params: { ...params, language: "en" } }
    );

    return {
      status: response.data.status,
      totalResults: response.data.totalResults,
      results: response.data.results.map(transformToPostItem),
      nextPage: response.data.nextPage,
    };
  } catch (error) {
    console.error("Error searching news:", error);
    throw error;
  }
}

/**
 * Get a single news article by its ID
 * @param articleId - The unique article_id from NewsData.io
 * @returns Promise with the article or null if not found
 */
export async function getNewsById(articleId: string): Promise<PostItem | null> {
  try {
    const response = await newsApi.get<NewsApiResponse<NewsArticle>>(
      "/api/1/news",
      {
        params: { id: articleId },
      }
    );

    if (response.data.results && response.data.results.length > 0) {
      return transformToPostItem(response.data.results[0]);
    }

    return null;
  } catch (error) {
    console.error(`Error fetching news by ID ${articleId}:`, error);
    throw error;
  }
}

/**
 * Get news articles by category
 * @param category - Category to filter by (e.g., 'business', 'technology', 'sports')
 * @param params - Additional optional parameters
 * @returns Promise with news articles in the specified category
 * @deprecated Use getLatestNews({ category }) instead
 */
export async function getNewsByCategory(
  category: string,
  params?: CategoryNewsParams
): Promise<NewsApiResponse<PostItem>> {
  try {
    const response = await newsApi.get<NewsApiResponse<NewsArticle>>(
      "/api/1/latest",
      {
        params: {
          ...params,
          category,
          language: "en",
        },
      }
    );

    return {
      status: response.data.status,
      totalResults: response.data.totalResults,
      results: response.data.results.map(transformToPostItem),
      nextPage: response.data.nextPage,
    };
  } catch (error) {
    console.error(`Error fetching news for category ${category}:`, error);
    throw error;
  }
}

/**
 * Get historical news articles from archive
 * @param params - Archive parameters including date range
 * @returns Promise with historical news articles
 */
export async function getArchiveNews(
  params: ArchiveNewsParams
): Promise<NewsApiResponse<PostItem>> {
  try {
    const response = await newsApi.get<NewsApiResponse<NewsArticle>>(
      "/api/1/archive",
      { params }
    );

    return {
      status: response.data.status,
      totalResults: response.data.totalResults,
      results: response.data.results.map(transformToPostItem),
      nextPage: response.data.nextPage,
    };
  } catch (error) {
    console.error("Error fetching archive news:", error);
    throw error;
  }
}

/**
 * Get news with pagination support
 * @param endpoint - The API endpoint to use
 * @param params - Parameters including the nextPage token
 * @returns Promise with paginated news articles
 */
export async function getNewsByPage(
  endpoint: "/api/1/latest" | "/api/1/news" | "/api/1/archive",
  params: any
): Promise<NewsApiResponse<PostItem>> {
  try {
    const response = await newsApi.get<NewsApiResponse<NewsArticle>>(endpoint, {
      params,
    });

    return {
      status: response.data.status,
      totalResults: response.data.totalResults,
      results: response.data.results.map(transformToPostItem),
      nextPage: response.data.nextPage,
    };
  } catch (error) {
    console.error("Error fetching paginated news:", error);
    throw error;
  }
}

// Export all functions as a service object
const newsService = {
  getLatestNews,
  searchNews,
  getNewsById,
  getNewsByCategory,
  getArchiveNews,
  getNewsByPage,
  getRelatedArticles,
};

export default newsService;
