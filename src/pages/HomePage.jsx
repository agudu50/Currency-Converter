import { useEffect, useState } from "react";
import CurrencyConverter from "../components/CurrencyConverter";
import ExchangeRateTable from "../components/ExchangeRateTable";
import CurrencyChart from "../components/CurrencyChart";
import FavoritesPairs from "../components/FavoritesPairs";
import { Activity, Zap, BarChart3, Globe, Star } from "lucide-react";
import { useRouter } from "../components/Router";

const QUICK_LINKS = [
  { label: "Market Charts", page: "market", icon: BarChart3, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-500/10 dark:bg-violet-500/15" },
  { label: "News Feed",     page: "news",   icon: Globe,     color: "text-sky-600 dark:text-sky-400",    bg: "bg-sky-500/10 dark:bg-sky-500/15"    },
  { label: "Rate Alerts",  page: "alerts", icon: Zap,       color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10 dark:bg-amber-500/15" },
  { label: "Settings",     page: "settings",icon: Star,     color: "text-indigo-600 dark:text-indigo-400",bg: "bg-indigo-500/10 dark:bg-indigo-500/15"},
];

export function HomePage({ favorites, onFavoriteAdd, onRemoveFavorite }) {
  const { navigateTo } = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Decorative background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute rounded-full float-anim-slow"
          style={{ width: 420, height: 420, background: "#4f46e5", top: "-80px", right: "-60px", filter: "blur(80px)", opacity: 0.055 }} />
        <div className="absolute rounded-full float-anim-delay"
          style={{ width: 300, height: 300, background: "#7c3aed", bottom: "10%", left: "-40px", filter: "blur(70px)", opacity: 0.05 }} />
      </div>

      <div className="relative z-10 space-y-8 pb-16">

        {/* ── Dashboard Header ─────────────────────────────────────────── */}
        <div
          className={`reveal ${visible ? "visible" : ""} flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border`}
        >
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 dark:bg-indigo-500/15 px-3 py-1 rounded-full border border-indigo-500/20 mb-2">
              <Activity className="h-3.5 w-3.5" /> Workspace
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Currency Dashboard
            </h1>
            <p className="text-muted-foreground text-sm">
              Analyze trends, track favorites, and convert global currencies in real time.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            {/* Live status badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-semibold text-foreground shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="badge-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live Connection Active
            </div>
          </div>
        </div>

        {/* ── Quick Links Row ───────────────────────────────────────────── */}
        <div
          className={`reveal grid grid-cols-2 sm:grid-cols-4 gap-3 ${visible ? "visible" : ""}`}
          style={{ transitionDelay: "80ms" }}
        >
          {QUICK_LINKS.map((link, i) => (
            <button
              key={link.page}
              onClick={() => navigateTo(link.page)}
              className={`card-glow flex items-center gap-3 p-3.5 rounded-2xl border border-border bg-card shadow-sm hover:bg-muted/40 transition-all`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className={`h-9 w-9 shrink-0 rounded-xl ${link.bg} ${link.color} flex items-center justify-center`}>
                <link.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold text-foreground">{link.label}</span>
            </button>
          ))}
        </div>

        {/* ── Main Grid ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Converter + Favorites */}
          <div
            className={`lg:col-span-5 space-y-8 reveal-left ${visible ? "visible" : ""}`}
            style={{ transitionDelay: "120ms" }}
          >
            <CurrencyConverter onFavoriteAdd={onFavoriteAdd} />
            <FavoritesPairs favorites={favorites} onRemoveFavorite={onRemoveFavorite} />
          </div>

          {/* Right: Chart + Rates Table */}
          <div
            className={`lg:col-span-7 space-y-8 reveal-right ${visible ? "visible" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            <CurrencyChart />
            <ExchangeRateTable />
          </div>

        </div>
      </div>
    </div>
  );
}
