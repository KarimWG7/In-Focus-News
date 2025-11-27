import { Link } from "react-router-dom";
import { Home, Search, Bookmark } from "lucide-react";
import { Button } from "../ui/button";
import { BookmarksDropdown } from "./BookmarksDropdown";
import { useAuthStore } from "@/store/useAuthStore";

export function NavLinks() {
  const user = useAuthStore((s) => s.user);
  const isGuest = user?.isAnonymous;

  return (
    <nav className="hidden sm:flex items-center gap-6">
      <Link
        to="/home"
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <Button variant="ghost">
          <Home />
          Home
        </Button>
      </Link>
      <Link
        to="/search"
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <Button variant="ghost">
          <Search />
          Search
        </Button>
      </Link>

      {!user ? (
        <Link
          to="/signin"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <Button variant="ghost">
            <Bookmark />
            Bookmarks
          </Button>
        </Link>
      ) : isGuest ? (
        <BookmarksDropdown />
      ) : (
        <Link
          to="/profile?tab=saved"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <Button variant="ghost">
            <Bookmark />
            Bookmarks
          </Button>
        </Link>
      )}
    </nav>
  );
}
