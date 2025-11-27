import { Link } from "react-router-dom";
import {
  Menu,
  Home,
  Search,
  Bookmark,
  LogIn,
  LogOut,
  UserIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import type { AppUser } from "@/types";
import GuestBadge from "./GuestBadge";
import { BookmarksDropdown } from "./BookmarksDropdown";

interface MobileMenuProps {
  user: AppUser | null;
  loading: boolean;
  onSignOut: () => Promise<void>;
}

export function MobileMenu({ user, loading, onSignOut }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 mt-6">
          {/* User Info Section */}
          {user && (
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 flex items-center justify-center overflow-hidden bg-muted"
                style={{
                  backgroundImage: user.photoURL
                    ? `url('${user.photoURL}')`
                    : "none",
                }}
              >
                {!user.photoURL && (
                  <UserIcon className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {user.name || "Guest User"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user.email || "Temporary session"}
                </p>
              </div>
              {user.isAnonymous && <GuestBadge />}
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            <Link to="/home">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Home className="h-5 w-5" />
                Home
              </Button>
            </Link>

            <Link to="/search">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Search className="h-5 w-5" />
                Search
              </Button>
            </Link>

            {/* Bookmarks Logic */}
            {!user ? (
              <Link to="/signin">
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <Bookmark className="h-5 w-5" />
                  Bookmarks
                </Button>
              </Link>
            ) : user.isAnonymous ? (
              // For mobile, we can link to profile for better UX, or use the dropdown.
              // Given the specific request for dropdown, let's try to use it or a collapsible.
              // However, for simplicity and best mobile UX, linking to profile is often better than a nested dropdown in a drawer.
              // But to strictly follow "instead of pointing to the profile page", I will use the dropdown.
              <div className="w-full flex justify-start">
                <BookmarksDropdown />
              </div>
            ) : (
              <Link to="/profile?tab=saved">
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <Bookmark className="h-5 w-5" />
                  Bookmarks
                </Button>
              </Link>
            )}
          </nav>

          {/* Auth Actions */}
          <div className="mt-auto pt-4 border-t border-border">
            {user ? (
              <Button
                variant="outline"
                className="w-full justify-start gap-3"
                onClick={onSignOut}
                disabled={loading}
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </Button>
            ) : (
              <Link to="/signin">
                <Button
                  variant="default"
                  className="w-full justify-start gap-3"
                >
                  <LogIn className="h-5 w-5" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
