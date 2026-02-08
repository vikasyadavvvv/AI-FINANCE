import {
  BadgeCheck,
  CalendarCheck,
  LineChart,
  Sparkles,
  UploadCloud,
} from "lucide-react";

const StatCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof LineChart;
  title: string;
  description: string;
}) => (
  <div className="rounded-xl border bg-background/70 p-4 shadow-sm backdrop-blur">
    <div className="flex items-center gap-3">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  </div>
);

const AuthSidePanel = () => {
  return (
    <div className="relative hidden overflow-hidden bg-muted lg:block -mt-3">
      <div className="absolute inset-0">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_top,_rgba(39,62,149,0.35),_transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle_at_bottom_left,_rgba(78,161,63,0.28),_transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(39,62,149,0.08),rgba(78,161,63,0.08))]" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between p-10">
        <div className="rounded-2xl border bg-background/75 p-6 shadow-lg backdrop-blur">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            AI Finance OS
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            Meet FinyliticsX, your AI finance co-pilot
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Smart insights, automated categorization, and clean monthly reports
            in a single workspace built for clarity.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "CSV import",
              "Recurring tracking",
              "AI insights",
              "Secure vault",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border bg-background/80 px-3 py-1 text-xs font-medium text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={Sparkles}
            title="Personalized insights"
            description="Daily signals tailored to your spending."
          />
          <StatCard
            icon={LineChart}
            title="Trend analytics"
            description="Clear charts that reveal momentum."
          />
          <StatCard
            icon={UploadCloud}
            title="Fast onboarding"
            description="Import data in seconds."
          />
          <StatCard
            icon={CalendarCheck}
            title="Monthly reports"
            description="Auto summaries delivered on time."
          />
        </div>

        <div className="rounded-2xl border bg-background/70 p-5 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
              <BadgeCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Bank-grade security
              </p>
              <p className="text-xs text-muted-foreground">
                Your data stays encrypted and private.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSidePanel;
