import { Suspense, lazy, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { CircleUserRound, LogIn } from "lucide-react";

const FeaturesGrid = lazy(() => import("@/components/welcome/FeaturesGrid"));

export default function Welcome() {
  const navigate = useNavigate();
  const guestSignin = useAuthStore((s) => s.guestSignin);
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="absolute inset-0 -z-1000 h-full w-full bg-background bg-[linear-gradient(to_left,#f0f0f0_1px,transparent_1px),linear-gradient(to_top,#f0f0f0_1px,transparent_1px)] bg-size-[6rem_4rem]"></div>
      <div className="flex h-full w-full max-w-4xl grow flex-col items-center justify-center">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div
            className="flex flex-col items-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
              A Clearer View of Your World
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
              In-Focus News delivers the stories that matter, without the noise.
              Personalized for you, always up-to-date.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="mt-12 w-full flex justify-center">
                <div className="h-40 w-full max-w-3xl animate-pulse rounded-lg bg-muted" />
              </div>
            }
          >
            <FeaturesGrid />
          </Suspense>

          <div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Button
              onClick={async () => {
                setError(null);
                try {
                  await guestSignin();
                  navigate("/home");
                } catch (e: any) {
                  setError(e?.message || "Unable to start as guest");
                }
              }}
              size="lg"
              className="w-full sm:w-auto"
              disabled={loading}
            >
              <CircleUserRound />
              {loading ? "Starting as guest..." : "Start as Guest"}
            </Button>
            <Button
              onClick={() => navigate("/signin")}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <LogIn />
              Log In / Sign Up
            </Button>
          </div>
          {error ? (
            <p className="mt-4 text-sm text-destructive">{error}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
