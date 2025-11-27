import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";
import { cn } from "@/lib/utils";
import Card from "./ui/card";

const ThemeSwitcher = ({ className }: { className?: string }) => {
  const { isDarkMode, toggleMode } = useThemeStore((s) => s);

  return (
    <Card className={cn(["flex items-center gap-3 px-3 py-2", className])}>
      <Sun className="size-4 text-muted-foreground" />
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleMode}
        className="data-[state=checked]:bg-primary"
      />
      <Moon className="size-4 text-muted-foreground" />
    </Card>
  );
};

export default ThemeSwitcher;
