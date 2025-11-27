export interface AppUser {
  uid: string;
  name?: string | null;
  email?: string | null;
  photoURL?: string | null;
  isAnonymous?: boolean;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  name?: string;
  email: string;
  password: string;
}

export interface PostItem {
  id: string;
  title: string;
  summary?: string;
  content?: string;
  image?: string;
  source?: string;
  publishedAt?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  membershipTier: MembershipTier;
  createdAt: string;
  updatedAt: string;
}

export type MembershipTier = "Free" | "Premium" | "Pro";
