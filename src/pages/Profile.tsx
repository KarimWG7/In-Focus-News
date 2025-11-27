import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileInfo from "@/components/profile/ProfileInfo";
import SavedArticles from "@/components/profile/SavedArticles";
import { useAuthStore } from "@/store/useAuthStore";
import { UserIcon } from "lucide-react";

export default function Profile() {
  const [searchParams] = useSearchParams();
  const user = useAuthStore((s) => s.user);
  const [activeTab, setActiveTab] = useState<"profile" | "settings" | "saved">(
    "profile"
  );

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "saved" || tab === "settings" || tab === "profile") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  if (!user) return null;

  // Fallback avatar if user doesn't have one
  const avatarUrl = user.photoURL || "https://via.placeholder.com/150";

  return (
    <div className="max-w-7xl mx-auto bg-background font-display text-foreground flex flex-1 justify-center py-4 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        <ProfileSidebar
          name={user.name || "User"}
          email={user.email || "No email provided"}
          avatarUrl={avatarUrl}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <main className="lg:col-span-9 flex flex-col gap-8">
          {activeTab === "profile" && (
            <ProfileInfo
              fullName={user.name || "User"}
              email={user.email || "No email provided"}
              onEditClick={() => console.log("Edit profile")}
            />
          )}
          {activeTab === "saved" && <SavedArticles />}
          {activeTab === "settings" && (
            <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
              <h2 className="text-foreground text-2xl font-bold mb-4">
                Account Settings
              </h2>
              <p className="text-muted-foreground">
                Settings page coming soon...
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
