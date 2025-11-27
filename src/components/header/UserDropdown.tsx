import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface UserDropdownProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionLink?: string;
  align?: "start" | "center" | "end";
}

export function UserDropdown({
  trigger,
  title,
  description,
  actionLabel = "Sign In",
  actionLink = "/signin",
  align = "end",
}: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align={align} forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{title}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {description}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={actionLink}>{actionLabel}</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
