import { User, Settings, Bookmark } from "lucide-react";

interface ProfileSidebarProps {
  name: string;
  email: string;
  avatarUrl: string;
  activeTab?: "profile" | "settings" | "saved";
  onTabChange?: (tab: "profile" | "settings" | "saved") => void;
}

export default function ProfileSidebar({
  name,
  email,
  avatarUrl,
  activeTab = "profile",
  onTabChange,
}: ProfileSidebarProps) {
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Account Settings", icon: Settings },
    { id: "saved", label: "Saved Articles", icon: Bookmark },
  ] as const;

  return (
    <aside className="lg:col-span-3">
      <div className="sticky z-1 top-20 flex h-fit flex-col justify-between rounded-xl bg-card p-4 shadow-sm border border-border gap-3">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
              style={{ backgroundImage: `url('${avatarUrl}')` }}
              data-alt="User avatar"
            />
            <div className="flex flex-col">
              <h1 className="text-foreground text-base font-bold leading-normal">
                {name}
              </h1>
              <p className="text-muted-foreground text-sm font-normal leading-normal">
                {email}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange?.(tab.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  <IconComponent className="size-5" />
                  <p className="text-sm font-medium leading-normal">
                    {tab.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
