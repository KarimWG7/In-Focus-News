import { Link } from "react-router-dom";
import { LogOut, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import { UserDropdown } from "./UserDropdown";
import GuestBadge from "./GuestBadge";
import type { AppUser } from "@/types";

interface UserActionsProps {
  user: AppUser | null;
  loading: boolean;
  onSignOut: () => Promise<void>;
}

export function UserActions({ user, loading, onSignOut }: UserActionsProps) {
  if (!user) {
    return (
      <Link
        to="/signin"
        className="text-sm text-primary hover:underline transition-all"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {user.isAnonymous && <GuestBadge />}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={onSignOut}
          disabled={loading}
          className="text-sm"
        >
          <LogOut />
          Sign Out
        </Button>

        {user.isAnonymous ? (
          <UserDropdown
            trigger={
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <span className="sr-only">Open user menu</span>
                <UserIcon className="h-6 w-6 text-muted-foreground" />
              </Button>
            }
            title="Guest User"
            description="Sign in for full access"
          />
        ) : (
          <Link to="/profile">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all"
              style={{
                backgroundImage: user.photoURL
                  ? `url('${user.photoURL}')`
                  : "none",
              }}
              data-alt="User avatar"
            >
              {!user.photoURL && (
                <UserIcon className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
