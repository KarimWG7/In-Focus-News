import axios from "axios";
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import type { NewsApiResponse, NewsApiError } from "@/types/news";

// Create dedicated Axios instance for NewsData.io API
const newsApi: AxiosInstance = axios.create({
  baseURL: "https://newsdata.io",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - inject API key
newsApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;

    if (!apiKey) {
      console.warn("NewsData.io API key not found in environment variables");
    }

    // Add API key to query parameters
    if (!config.params) {
      config.params = {};
    }
    config.params.apikey = apiKey;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - transform data and handle errors
newsApi.interceptors.response.use(
  (response: AxiosResponse<NewsApiResponse<any>>) => {
    // Return the full response for access to pagination metadata
    return response;
  },
  (error) => {
    // Handle NewsData.io specific errors
    if (error.response) {
      const apiError = error.response.data as NewsApiError;

      // Log specific error messages
      if (apiError?.results?.message) {
        console.error("NewsData.io API Error:", apiError.results.message);
      }

      // Handle rate limiting
      if (error.response.status === 429) {
        console.error("Rate limit exceeded. Please try again later.");
      }

      // Handle authentication errors
      if (error.response.status === 401 || error.response.status === 403) {
        console.error("Invalid API key. Please check your VITE_NEWS_API_KEY.");
      }
    } else if (error.request) {
      console.error("No response received from NewsData.io API");
    } else {
      console.error("Error setting up request:", error.message);
    }

    return Promise.reject(error);
  }
);

export default newsApi;
