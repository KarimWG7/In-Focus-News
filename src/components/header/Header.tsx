import { memo, useCallback } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import ThemeSwitcher from "../ThemeSwitcher";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { UserActions } from "./UserActions";
import { MobileMenu } from "./MobileMenu";

export const Header = memo(function Header() {
  const user = useAuthStore((s) => s.user);
  const signout = useAuthStore((s) => s.signout);
  const loading = useAuthStore((s) => s.loading);

  const handleSignOut = useCallback(async () => {
    try {
      await signout();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  }, [signout]);

  return (
    <header className="flex items-center justify-between py-3 px-4 sticky z-50 top-0 border border-border bg-background/70 backdrop-blur-3xl">
      <Logo />

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <div className="separator w-px h-6 bg-border mx-2 hidden sm:block" />

        <NavLinks />

        <div className="separator w-px h-6 bg-border mx-2 hidden sm:block" />

        <div className="hidden sm:flex">
          <UserActions
            user={user}
            loading={loading}
            onSignOut={handleSignOut}
          />
        </div>

        {/* Mobile Menu */}
        <MobileMenu user={user} loading={loading} onSignOut={handleSignOut} />
      </div>
    </header>
  );
});

export default Header;
