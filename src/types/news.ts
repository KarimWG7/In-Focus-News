// NewsData.io API Response Types
export interface SentimentStats {
  negative: number;
  neutral: number;
  positive: number;
}

export interface NewsArticle {
  article_id: string;
  link: string;
  title: string;
  description: string | null;
  content: string | null;
  keywords: string[] | null;
  creator: string[] | null;
  language: string;
  country: string[] | null;
  category: string[] | null;
  pubDate: string;
  pubDateTZ: string;
  image_url: string | null;
  video_url: string | null;
  source_id: string;
  source_name: string;
  source_priority: number;
  source_url: string;
  source_icon: string | null;
  sentiment: string | null;
  sentiment_stats: SentimentStats | string | null;
  ai_tag: string[] | string | null;
  ai_region: string[] | string | null;
  ai_org: string[] | string | null;
  ai_summary: string | null;
  duplicate: boolean;
}

export interface NewsApiResponse<T> {
  status: string;
  totalResults: number;
  results: T[];
  nextPage?: string;
}

export interface NewsApiError {
  status: string;
  results: {
    message: string;
    code: string;
  };
}

// Service Parameter Types
export interface LatestNewsParams {
  country?: string;
  category?: string;
  language?: string;
  q?: string;
  qInTitle?: string;
  domain?: string;
  size?: number;
  page?: string;
}

export interface SearchNewsParams {
  q?: string;
  qInTitle?: string;
  qInMeta?: string;
  country?: string;
  category?: string;
  language?: string;
  domain?: string;
  size?: number;
  page?: string;
  sentiment?: "positive" | "negative" | "neutral";
  tag?: string;
}

export interface CategoryNewsParams {
  country?: string;
  language?: string;
  size?: number;
  page?: string;
}

export interface ArchiveNewsParams {
  from_date: string; // YYYY-MM-DD
  to_date: string; // YYYY-MM-DD
  q?: string;
  country?: string;
  category?: string;
  language?: string;
  size?: number;
  page?: string;
}
