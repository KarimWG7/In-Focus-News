import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { signInWithGoogle } from "@/lib/firebase";
import { Separator } from "@/components/ui/separator";
import type { FirebaseError } from "firebase/app";
import { toast } from "sonner";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ArrowLeft } from "lucide-react";

export default function SignIn() {
  const navigate = useNavigate();
  const signin = useAuthStore((s) => s.signin);
  const loading = useAuthStore((s) => s.loading);
  const storeError = useAuthStore((s) => s.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await signin({ email, password });
      navigate("/home");
    } catch (err: any) {
      setError(err?.message || "Sign in failed");
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background font-display ">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-10 left-10"
        onClick={() => navigate(-1)}
        title="Go back to previous page"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <div className="w-full max-w-md space-y-8 px-4">
        <Card className="p-6">
          <div className="flex flex-col space-y-1.5 text-center mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="email"
              >
                Email or Username
              </label>
              <Input
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <label
                  className="text-sm font-medium leading-none"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  className="text-sm text-primary underline-offset-4 hover:underline"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            {storeError ? (
              <p className="text-sm text-destructive">{storeError}</p>
            ) : null}

            <div className="space-y-2 pt-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>
          <div className="relative py-4">
            <Separator className="text-muted-foreground">
              <span className="absolute bottom-1/2 right-1/2 translate-1/2 block bg-card px-4">
                OR
              </span>
            </Separator>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={async () => {
              try {
                await signInWithGoogle();
                navigate("/home");
              } catch (err) {
                const error = err as FirebaseError;
                toast.error(error.name, {
                  description: error.message,
                });
                console.log(error.name, error.message);
              }
            }}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full mt-2"
            onClick={async () => {
              try {
                await useAuthStore.getState().guestSignin();
                navigate("/home");
              } catch (err: any) {
                toast.error(err?.message || "Unable to start as guest");
              }
            }}
          >
            Read Anonymously
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary hover:underline underline-offset-4"
              >
                Sign up
              </Link>
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              <Link
                to="/welcome"
                className="text-primary hover:underline underline-offset-4"
              >
                Back to Welcome
              </Link>
            </p>
          </div>
        </Card>
        <ThemeSwitcher className="absolute bottom-10 left-10" />
      </div>
    </div>
  );
}
