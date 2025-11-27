import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/useAuthStore";
import { getBookmarks, type SavedArticle } from "@/services/bookmarkService";

export function BookmarksDropdown() {
  const user = useAuthStore((s) => s.user);
  const [bookmarks, setBookmarks] = useState<SavedArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (user && isOpen) {
        setLoading(true);
        try {
          const data = await getBookmarks(user.uid);
          setBookmarks(data);
        } catch (error) {
          console.error("Failed to fetch bookmarks", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookmarks();
  }, [user, isOpen]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Bookmark className="h-5 w-5" />
          <span className="ml-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Bookmarks
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel>My Bookmarks (Guest)</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Loading...
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No bookmarks yet.
            </div>
          ) : (
            bookmarks.map((article) => (
              <DropdownMenuItem key={article.id} asChild>
                <Link
                  to={`/post/${article.id}`}
                  state={{ post: article }}
                  className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                >
                  <span className="font-medium line-clamp-1">
                    {article.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {article.source}
                  </span>
                </Link>
              </DropdownMenuItem>
            ))
          )}
        </div>
        {bookmarks.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile?tab=saved" className="w-full text-center">
                View All
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
