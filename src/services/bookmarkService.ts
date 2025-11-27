import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { PostItem } from "@/types/post";

export interface SavedArticle extends PostItem {
  savedAt: string;
}

/**
 * Save an article to the user's bookmarks
 */
export async function saveBookmark(
  userId: string,
  post: PostItem
): Promise<void> {
  try {
    const bookmarkRef = doc(db, "users", userId, "bookmarks", post.id);
    const savedArticle = {
      ...post,
      savedAt: new Date().toISOString(),
      savedTimestamp: Timestamp.now(), // For sorting
    };
    await setDoc(bookmarkRef, savedArticle);
  } catch (error) {
    console.error("Error saving bookmark:", error);
    throw error;
  }
}

/**
 * Remove an article from the user's bookmarks
 */
export async function removeBookmark(
  userId: string,
  postId: string
): Promise<void> {
  try {
    const bookmarkRef = doc(db, "users", userId, "bookmarks", postId);
    await deleteDoc(bookmarkRef);
  } catch (error) {
    console.error("Error removing bookmark:", error);
    throw error;
  }
}

/**
 * Check if an article is bookmarked by the user
 */
export async function isBookmarked(
  userId: string,
  postId: string
): Promise<boolean> {
  try {
    const bookmarkRef = doc(db, "users", userId, "bookmarks", postId);
    const docSnap = await getDoc(bookmarkRef);
    return docSnap.exists();
  } catch (error) {
    console.error("Error checking bookmark status:", error);
    return false;
  }
}

/**
 * Get all bookmarked articles for a user
 */
export async function getBookmarks(userId: string): Promise<SavedArticle[]> {
  try {
    const bookmarksRef = collection(db, "users", userId, "bookmarks");
    const q = query(bookmarksRef, orderBy("savedTimestamp", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      // Remove the internal timestamp before returning
      const { savedTimestamp: _savedTimestamp, ...article } = data;
      return article as SavedArticle;
    });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    throw error;
  }
}
