import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { signInWithGoogle } from "@/lib/firebase";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

export default function SignUp() {
  const navigate = useNavigate();
  const signup = useAuthStore((s) => s.signup);
  const loading = useAuthStore((s) => s.loading);
  const storeError = useAuthStore((s) => s.error);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      await signup({ name, email, password });
      navigate("/home");
    } catch (err: any) {
      setError(err?.message || "Sign up failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-display relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-10 left-10"
        onClick={() => navigate(-1)}
        title="Go back to previous page"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <div className="w-full max-w-md lg:max-w-4xl px-4">
        <div className="flex flex-col items-center space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create Your Account
          </h1>
          <p className="text-base text-muted-foreground">
            Access personalized news stories.
          </p>
        </div>

        <Card className="p-6">
          <div className="flex flex-col lg:flex-row lg:gap-8">
            <div className="flex-1">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none"
                    htmlFor="full-name"
                  >
                    Full Name
                  </label>
                  <Input
                    id="full-name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none"
                    htmlFor="confirm-password"
                  >
                    Confirm Password
                  </label>
                  <Input
                    id="confirm-password"
                    placeholder="Confirm your password"
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </div>

                {error ? (
                  <p className="text-sm text-destructive">{error}</p>
                ) : null}
                {storeError ? (
                  <p className="text-sm text-destructive">{storeError}</p>
                ) : null}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing up..." : "Sign Up"}
                </Button>
              </form>
            </div>

            <div className="relative py-4 lg:hidden">
              <Separator className="text-muted-foreground" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-muted-foreground text-sm">
                OR
              </span>
            </div>

            <div className="hidden lg:flex relative items-center justify-center px-2">
              <Separator
                orientation="vertical"
                className="h-full min-h-[300px]"
              />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card py-2 text-muted-foreground text-sm">
                OR
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={async () => {
                  try {
                    await signInWithGoogle();
                    navigate("/home");
                  } catch (err) {
                    console.error(err);
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
                Sign up with Google
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={async () => {
                  try {
                    await useAuthStore.getState().guestSignin();
                    navigate("/home");
                  } catch (err: any) {
                    console.error(err);
                  }
                }}
              >
                Read Anonymously
              </Button>

              <p className="text-center text-xs text-muted-foreground pt-4 border-t border-border lg:border-t-0">
                By signing up, you agree to our{" "}
                <a className="underline hover:text-primary" href="#">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a className="underline hover:text-primary" href="#">
                  Privacy Policy
                </a>
                .
              </p>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="font-medium text-primary hover:underline underline-offset-4"
                  >
                    Sign in
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
            </div>
          </div>
        </Card>
        <ThemeSwitcher className="absolute bottom-10 left-10" />
      </div>
    </div>
  );
}
