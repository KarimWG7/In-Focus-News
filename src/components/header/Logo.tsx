import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/home" className="flex items-center gap-4 text-foreground">
      <div className="size-6 text-primary">
        <img src="/logo.svg" alt="In-Focus Logo" className="w-full h-full" />
      </div>
      <h2 className="text-xl font-bold tracking-tight">In-Focus</h2>
    </Link>
  );
}
