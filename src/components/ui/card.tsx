import * as React from "react";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-card shadow-sm p-6 ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export default Card;
