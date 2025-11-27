import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  type User,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Read configuration from Vite env. Set these in .env (Vite) e.g. VITE_FIREBASE_API_KEY
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// Auth and Firestore exports
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

// Helper functions
export async function signUpWithEmail(
  name: string | undefined,
  email: string,
  password: string
) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (name) {
    try {
      await updateProfile(cred.user, { displayName: name });
    } catch (e) {
      // non-fatal: profile update failed
      console.warn("updateProfile failed", e);
    }
  }
  return cred.user;
}

export async function signInWithEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signInWithGoogle() {
  const cred = await signInWithPopup(auth, googleProvider);
  return cred.user;
}

export async function signInAnonymouslyUser() {
  const cred = await signInAnonymously(auth);
  return cred.user;
}

export async function signOutUser() {
  await firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

export async function updateUserProfile(profile: {
  displayName?: string;
  photoURL?: string;
}) {
  if (!auth.currentUser) throw new Error("No user is signed in");
  return updateProfile(auth.currentUser, profile);
}

export default app;
