import { create } from "zustand";
import { auth, signInAnonymouslyUser } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import type { AppUser, SignInPayload, SignUpPayload } from "@/types";

type AuthState = {
  user: AppUser | null;
  loading: boolean;
  error: string | null;
  signin: (payload: SignInPayload) => Promise<void>;
  signup: (payload: SignUpPayload) => Promise<void>;
  guestSignin: () => Promise<void>;
  signout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => {
  // subscribe to firebase auth state
  onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
    if (fbUser) {
      const user: AppUser = {
        uid: fbUser.uid,
        name: fbUser.displayName,
        email: fbUser.email,
        photoURL: fbUser.photoURL,
        isAnonymous: (fbUser as any).isAnonymous || false,
      };
      set({ user, loading: false, error: null });
    } else {
      set({ user: null, loading: false });
    }
  });

  return {
    user: null,
    loading: true,
    error: null,
    signin: async (payload: SignInPayload) => {
      set({ loading: true, error: null });
      try {
        const cred = await signInWithEmailAndPassword(
          auth,
          payload.email,
          payload.password
        );
        const fbUser = cred.user;
        set({
          user: {
            uid: fbUser.uid,
            name: fbUser.displayName,
            email: fbUser.email,
            photoURL: fbUser.photoURL,
          },
          loading: false,
          error: null,
        });
      } catch (err: any) {
        set({ error: err?.message || "Sign in failed", loading: false });
        throw err;
      }
    },
    signup: async (payload: SignUpPayload) => {
      set({ loading: true, error: null });
      try {
        const cred = await createUserWithEmailAndPassword(
          auth,
          payload.email,
          payload.password
        );
        const fbUser = cred.user;
        // NOTE: displayName update could be added via updateProfile
        set({
          user: {
            uid: fbUser.uid,
            name: payload.name || fbUser.displayName,
            email: fbUser.email,
            photoURL: fbUser.photoURL,
          },
          loading: false,
          error: null,
        });
      } catch (err: any) {
        set({ error: err?.message || "Sign up failed", loading: false });
        throw err;
      }
    },
    guestSignin: async () => {
      set({ loading: true, error: null });
      try {
        const fbUser = await signInAnonymouslyUser();
        set({
          user: {
            uid: fbUser.uid,
            name: fbUser.displayName || "Guest",
            email: fbUser.email || null,
            photoURL: fbUser.photoURL || null,
            isAnonymous: true,
          },
          loading: false,
          error: null,
        });
      } catch (err: any) {
        set({ error: err?.message || "Guest sign-in failed", loading: false });
        throw err;
      }
    },
    signout: async () => {
      set({ loading: true, error: null });
      try {
        await firebaseSignOut(auth);
        set({ user: null, loading: false });
      } catch (err: any) {
        set({ error: err?.message || "Sign out failed", loading: false });
        throw err;
      }
    },
  };
});
