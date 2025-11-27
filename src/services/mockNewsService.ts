import type { PostItem } from "@/types/post";
import type { NewsApiResponse } from "@/types/news";

// Mock news data for different categories
const mockNewsData: Record<string, PostItem[]> = {
  all: [
    {
      id: "mock-1",
      source: "Reuters",
      time: "2h ago",
      title: "Global Markets Rally on Positive Economic Data",
      lead: "Investors respond positively to new reports showing stronger-than-expected growth in key sectors, signaling a potential economic recovery.",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
      body: [],
      likes: 0,
      comments: 0,
      category: ["business", "world"],
    },
    {
      id: "mock-2",
      source: "Associated Press",
      time: "4h ago",
      title: "New Breakthrough in AI Could Revolutionize Medical Diagnostics",
      lead: "Researchers have developed an AI model that can detect diseases with unprecedented accuracy, promising to speed up patient diagnosis and treatment.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      body: [],
      likes: 0,
      comments: 0,
      category: ["technology"],
    },
    {
      id: "mock-3",
      source: "The Guardian",
      time: "5h ago",
      title: "International Summit Addresses Climate Change Goals",
      lead: "Leaders from around the globe convene to discuss new strategies and commitments for combating climate change, with a focus on renewable energy.",
      image:
        "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&q=80",
      body: [],
      likes: 0,
      comments: 0,
      category: ["world", "environment"],
    },
  ],
  technology: [
    {
      id: "mock-tech-1",
      source: "TechCrunch",
      time: "1h ago",
      title:
        "Major Tech Company Announces Revolutionary Quantum Computing Chip",
      lead: "The new chip promises to solve complex problems exponentially faster than traditional computers, marking a significant milestone in quantum computing.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      body: [],
      likes: 0,
      comments: 0,
      category: ["technology"],
    },
    {
      id: "mock-tech-2",
      source: "Wired",
      time: "3h ago",
      title: "5G Networks Expand to Rural Areas, Bridging Digital Divide",
      lead: "Telecommunications companies roll out 5G infrastructure to underserved communities, promising faster internet access and new economic opportunities.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      body: [],
      likes: 0,
      comments: 0,
      category: ["technology"],
    },
    {
      id: "mock-tech-3",
      source: "The Verge",
      time: "6h ago",
      title: "Cybersecurity Experts Warn of New Ransomware Threat",
      lead: "Security researchers identify sophisticated malware targeting critical infrastructure, urging organizations to update their defense systems immediately.",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      body: [],
      likes: 0,
      comments: 0,
      category: ["technology"],
    },
  ],
  politics: [
    {
      id: "mock-pol-1",
      source: "Politico",
      time: "2h ago",
      title: "Senate Passes Landmark Infrastructure Bill",
      lead: "After months of negotiations, lawmakers approve comprehensive infrastructure package aimed at modernizing transportation and broadband networks.",
      image:
        "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
      body: [],
      likes: 0,
      comments: 0,
      category: ["politics"],
    },
    {
      id: "mock-pol-2",
      source: "The Hill",
      time: "4h ago",
      title: "New Poll Shows Shifting Public Opinion on Key Policy Issues",
      lead: "Recent survey reveals changing attitudes among voters on healthcare, education, and economic policies ahead of upcoming elections.",
      image:
        "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80",
      body: [],
      likes: 0,
      comments: 0,
      category: ["politics"],
    },
    {
      id: "mock-pol-3",
      source: "BBC News",
      time: "7h ago",
      title: "International Trade Agreement Reaches Final Stage",
      lead: "Negotiators from multiple countries finalize terms of historic trade deal expected to boost economic cooperation and reduce tariffs.",
      image:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
      body: [],
      likes: 0,
      comments: 0,
      category: ["politics", "world"],
    },
  ],
  world: [
    {
      id: "mock-world-1",
      source: "Al Jazeera",
      time: "1h ago",
      title: "Humanitarian Crisis Deepens in Conflict-Affected Region",
      lead: "International aid organizations call for urgent assistance as millions face food insecurity and displacement due to ongoing violence.",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      body: [],
      likes: 0,
      comments: 0,
      category: ["world"],
    },
    {
      id: "mock-world-2",
      source: "France 24",
      time: "5h ago",
      title: "European Union Announces New Environmental Regulations",
      lead: "EU member states agree on stricter emissions standards and renewable energy targets to combat climate change and reduce carbon footprint.",
      image:
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80",
      body: [],
      likes: 0,
      comments: 0,
      category: ["world", "environment"],
    },
    {
      id: "mock-world-3",
      source: "Reuters",
      time: "8h ago",
      title: "Historic Peace Agreement Signed Between Neighboring Nations",
      lead: "After decades of tension, two countries formalize diplomatic relations and commit to cooperation on security and economic development.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      body: [],
      likes: 0,
      comments: 0,
      category: ["world", "politics"],
    },
  ],
  business: [
    {
      id: "mock-biz-1",
      source: "Bloomberg",
      time: "2h ago",
      title: "Stock Market Hits Record High Amid Strong Corporate Earnings",
      lead: "Major indices surge as companies report better-than-expected quarterly results, boosting investor confidence in economic recovery.",
      image:
        "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
      body: [],
      likes: 0,
      comments: 0,
      category: ["business"],
    },
    {
      id: "mock-biz-2",
      source: "Financial Times",
      time: "4h ago",
      title: "Central Bank Announces Interest Rate Decision",
      lead: "Monetary policy committee maintains current rates while signaling potential adjustments based on inflation trends and employment data.",
      image:
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
      body: [],
      likes: 0,
      comments: 0,
      category: ["business"],
    },
    {
      id: "mock-biz-3",
      source: "CNBC",
      time: "6h ago",
      title: "Major Merger Announced in Tech Industry",
      lead: "Two leading technology companies agree to combine operations in deal valued at billions, creating industry giant with expanded market reach.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      body: [],
      likes: 0,
      comments: 0,
      category: ["business", "technology"],
    },
  ],
};

/**
 * Mock implementation of news service for development/testing
 * Returns mock data instead of making real API calls
 */
export const mockNewsService = {
  async getLatestNews(): Promise<NewsApiResponse<PostItem>> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      status: "success",
      totalResults: mockNewsData.all.length,
      results: mockNewsData.all,
    };
  },

  async getNewsByCategory(
    category: string
  ): Promise<NewsApiResponse<PostItem>> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const categoryKey = category.toLowerCase();
    const results = mockNewsData[categoryKey] || mockNewsData.all;

    return {
      status: "success",
      totalResults: results.length,
      results,
    };
  },

  async searchNews(query: string): Promise<NewsApiResponse<PostItem>> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simple search across all mock data
    const allNews = Object.values(mockNewsData).flat();
    const results = allNews.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.lead.toLowerCase().includes(query.toLowerCase())
    );

    return {
      status: "success",
      totalResults: results.length,
      results,
    };
  },

  async getNewsById(articleId: string): Promise<PostItem | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const allNews = Object.values(mockNewsData).flat();
    const article = allNews.find((item) => item.id === articleId);

    return article || null;
  },
};
