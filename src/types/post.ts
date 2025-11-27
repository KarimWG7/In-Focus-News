export interface PostBodyBlock {
  type: "paragraph" | "blockquote";
  content: string;
}

export interface PostItem {
  id: string;
  source: string;
  time: string;
  title: string;
  lead: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  body: PostBodyBlock[];
  likes: number;
  comments: number;
  // Additional fields for API compatibility
  link?: string;
  category?: string[];
  sentiment?: string | null;
  sourceUrl?: string;
}
