import { Link } from "react-router-dom";

export default function GuestBadge({ className }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full bg-yellow-50 border border-yellow-200 px-2 py-0.5 text-yellow-800 text-xs ${
        className || ""
      }`}
      title="You are signed in as a guest"
    >
      <span className="font-medium">Guest</span>
      <Link
        to="/signup"
        className="underline text-[11px] underline-offset-2 hover:text-yellow-900"
      >
        Create account
      </Link>
    </div>
  );
}
