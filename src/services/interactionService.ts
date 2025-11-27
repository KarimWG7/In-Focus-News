import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";

export interface Comment {
  id: string;
  comment: string;
  userId: string;
  userName: string;
  userAvatar: string;
  date: string; // ISO string
}

export interface Like {
  id: string; // usually same as userId for uniqueness check, or a unique ID
  userId: string;
}

export interface PostInteraction {
  id: string; // post id
  comments: Comment[];
  likes: Like[];
}

/**
 * Get interactions for a specific post.
 * If the document doesn't exist, returns a default empty structure.
 */
export async function getPostInteractions(
  postId: string
): Promise<PostInteraction> {
  try {
    const docRef = doc(db, "post_interactions", postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as PostInteraction;
    } else {
      return {
        id: postId,
        comments: [],
        likes: [],
      };
    }
  } catch (error) {
    console.error("Error fetching post interactions:", error);
    throw error;
  }
}

/**
 * Add a comment to a post.
 * Creates the document if it doesn't exist.
 */
export async function addComment(
  postId: string,
  commentText: string,
  user: { uid: string; name: string; photoURL: string | null }
): Promise<Comment> {
  try {
    const docRef = doc(db, "post_interactions", postId);

    const newComment: Comment = {
      id: uuidv4(),
      comment: commentText,
      userId: user.uid,
      userName: user.name || "Anonymous",
      userAvatar: user.photoURL || "",
      date: new Date().toISOString(),
    };

    // Check if doc exists first to create it if needed, or use setDoc with merge
    // Using setDoc with merge is safer for initialization
    await setDoc(
      docRef,
      {
        id: postId,
        comments: arrayUnion(newComment),
      },
      { merge: true }
    );

    return newComment;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}

/**
 * Toggle like for a post.
 * Returns true if liked, false if unliked.
 */
export async function toggleLike(
  postId: string,
  userId: string
): Promise<boolean> {
  try {
    const docRef = doc(db, "post_interactions", postId);
    const docSnap = await getDoc(docRef);

    let currentLikes: Like[] = [];
    if (docSnap.exists()) {
      const data = docSnap.data() as PostInteraction;
      currentLikes = data.likes || [];
    }

    const existingLikeIndex = currentLikes.findIndex(
      (l) => l.userId === userId
    );
    const isLiked = existingLikeIndex !== -1;

    if (isLiked) {
      // Remove like
      const likeToRemove = currentLikes[existingLikeIndex];
      await updateDoc(docRef, {
        likes: arrayRemove(likeToRemove),
      });
      return false;
    } else {
      // Add like
      const newLike: Like = {
        id: uuidv4(),
        userId: userId,
      };

      // Use setDoc with merge to ensure doc exists
      await setDoc(
        docRef,
        {
          id: postId,
          likes: arrayUnion(newLike),
        },
        { merge: true }
      );
      return true;
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
}
