import { Card } from "@/components/ui/card";

const FEATURES = [
  {
    title: "Personalized Feeds",
    desc: "News tailored to your unique interests and reading habits.",
    svgPath:
      "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  },
  {
    title: "Breaking News Alerts",
    desc: "Stay updated with real-time notifications on major events.",
    svgPath:
      "M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-0.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-0.9-2-2-2z",
  },
  {
    title: "In-Depth Analysis",
    desc: "Go beyond headlines with expert insights and comprehensive reports.",
    svgPath:
      "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2V17zm4 0h-2V7h2V17zm4 0h-2v-4h2V17z",
  },
];

export default function FeaturesGrid() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((f, i) => (
        <Card
          key={i}
          className="flex flex-col items-center gap-3 rounded-lg border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md animate-fade-in-up"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
            <svg
              className="h-6 w-6 text-secondary-foreground"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d={f.svgPath} />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-card-foreground">
            {f.title}
          </h3>
          <p className="text-sm text-muted-foreground">{f.desc}</p>
        </Card>
      ))}
    </div>
  );
}
