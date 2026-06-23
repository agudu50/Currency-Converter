import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Clock, TrendingUp, Globe, Calendar, ExternalLink,
  Bell, AlertTriangle, Newspaper, Zap, Activity, BookOpen,
} from "lucide-react";

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NEWS_ARTICLES = [
  {
    id: 1,
    title: "Federal Reserve Signals Potential Interest Rate Changes",
    summary: "The Federal Reserve hints at monetary policy adjustments that could significantly impact USD strength across global markets.",
    category: "central-banks",
    impact: "high",
    time: "2 hours ago",
    source: "Financial Times",
    currencies: ["USD", "EUR", "GBP"],
    emoji: "📈",
  },
  {
    id: 2,
    title: "European Central Bank Maintains Steady Policy Stance",
    summary: "ECB keeps interest rates unchanged amid inflation concerns, EUR shows mixed reactions in early trading.",
    category: "central-banks",
    impact: "medium",
    time: "4 hours ago",
    source: "Reuters",
    currencies: ["EUR", "USD"],
    emoji: "🏦",
  },
  {
    id: 3,
    title: "Brexit Negotiations Update Affects GBP Volatility",
    summary: "Latest developments in UK-EU trade discussions cause significant movements in British Pound against major currencies.",
    category: "politics",
    impact: "high",
    time: "6 hours ago",
    source: "Bloomberg",
    currencies: ["GBP", "EUR", "USD"],
    emoji: "🇬🇧",
  },
  {
    id: 4,
    title: "Asian Markets Show Strong Recovery",
    summary: "Japanese Yen and Chinese Yuan gain ground as Asian economies demonstrate resilience in current market conditions.",
    category: "markets",
    impact: "medium",
    time: "8 hours ago",
    source: "Wall Street Journal",
    currencies: ["JPY", "CNY", "KRW"],
    emoji: "🌏",
  },
  {
    id: 5,
    title: "Oil Prices Surge Impacts Commodity Currencies",
    summary: "Rising crude oil prices boost Canadian Dollar and Norwegian Krone against major trading partners.",
    category: "commodities",
    impact: "medium",
    time: "12 hours ago",
    source: "MarketWatch",
    currencies: ["CAD", "NOK", "USD"],
    emoji: "🛢️",
  },
  {
    id: 6,
    title: "Cryptocurrency Regulations Affect Digital Asset Trading",
    summary: "New regulatory frameworks in major economies create ripple effects across traditional and digital currency markets.",
    category: "crypto",
    impact: "high",
    time: "1 day ago",
    source: "CoinDesk",
    currencies: ["BTC", "ETH", "USD"],
    emoji: "₿",
  },
  {
    id: 7,
    title: "Emerging Markets Currency Outlook Improves",
    summary: "Positive economic indicators from Brazil, India, and South Africa strengthen their respective currencies.",
    category: "emerging",
    impact: "medium",
    time: "1 day ago",
    source: "Financial Express",
    currencies: ["BRL", "INR", "ZAR"],
    emoji: "📊",
  },
  {
    id: 8,
    title: "Swiss National Bank Intervention Rumors",
    summary: "Market speculation about potential SNB intervention sends Swiss Franc on a volatile trading session.",
    category: "central-banks",
    impact: "medium",
    time: "2 days ago",
    source: "Swiss Info",
    currencies: ["CHF", "EUR", "USD"],
    emoji: "🇨🇭",
  },
];

const MARKET_ALERTS = [
  { type: "breaking", title: "USD/EUR breaks key resistance level at 0.9250",  time: "15 min ago",  impact: "high"   },
  { type: "warning",  title: "High volatility expected in GBP pairs today",     time: "1 hour ago",  impact: "medium" },
  { type: "info",     title: "Asian session opens with mixed sentiment",         time: "3 hours ago", impact: "low"    },
];

const CATEGORIES = [
  { key: "all",          label: "All News" },
  { key: "central-banks",label: "Central Banks" },
  { key: "politics",     label: "Politics" },
  { key: "markets",      label: "Markets" },
  { key: "commodities",  label: "Commodities" },
  { key: "crypto",       label: "Crypto" },
  { key: "emerging",     label: "Emerging" },
];

const ALERT_TYPES = [
  { icon: Bell,          title: "Price Alerts",      desc: "Get notified when a currency reaches your target price.",        color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-500/10 dark:bg-indigo-500/15" },
  { icon: TrendingUp,    title: "Trend Alerts",      desc: "Track significant price movements and trend changes in real time.", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-500/10 dark:bg-violet-500/15" },
  { icon: AlertTriangle, title: "Volatility Alerts", desc: "Monitor unusual market volatility and rapid price shifts.",       color: "text-amber-600 dark:text-amber-400",   bg: "bg-amber-500/10 dark:bg-amber-500/15"   },
];

const CALENDAR_EVENTS = [
  { time: "09:30 GMT",           event: "US CPI Data Release",        currency: "USD", impact: "high",   forecast: "3.2%",  previous: "3.1%"  },
  { time: "14:00 GMT",           event: "ECB Interest Rate Decision",  currency: "EUR", impact: "high",   forecast: "4.25%", previous: "4.25%" },
  { time: "Tomorrow 12:30 GMT",  event: "UK Employment Data",          currency: "GBP", impact: "medium", forecast: "4.0%",  previous: "3.9%"  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function impactChip(impact) {
  if (impact === "high")   return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20";
  if (impact === "medium") return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
  return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
}

function alertChip(type) {
  if (type === "breaking") return { cls: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",   dot: "bg-rose-500"   };
  if (type === "warning")  return { cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20", dot: "bg-amber-500" };
  return                          { cls: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",         dot: "bg-sky-500"   };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArticleCard({ article, index }) {
  const { ref, visible } = useReveal(0.05);
  return (
    <div
      ref={ref}
      className={`reveal card-glow border border-border bg-card rounded-2xl overflow-hidden ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5">

        {/* Emoji icon */}
        <div className="shrink-0 self-start">
          <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/15 flex items-center justify-center text-2xl">
            {article.emoji}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3 min-w-0">
          {/* Title row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <h2 className="text-base sm:text-lg font-bold leading-snug text-foreground">
              {article.title}
            </h2>
            <span className={`shrink-0 self-start text-xs font-bold px-2.5 py-1 rounded-lg capitalize ${impactChip(article.impact)}`}>
              {article.impact} impact
            </span>
          </div>

          {/* Summary */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {article.summary}
          </p>

          {/* Footer row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1 border-t border-border">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" /> {article.source}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {article.time}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 flex-wrap">
                {article.currencies.map(c => (
                  <span key={c} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    {c}
                  </span>
                ))}
              </div>
              <button className="h-7 w-7 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 flex items-center justify-center transition-all hover:scale-110">
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const { ref: alertTypeRef, visible: alertTypeVisible } = useReveal(0.1);
  const { ref: liveAlertRef, visible: liveAlertVisible } = useReveal(0.1);
  const { ref: calendarRef,  visible: calendarVisible  } = useReveal(0.1);
  const { ref: bannerRef,    visible: bannerVisible    } = useReveal(0.1);

  const filtered = selectedCategory === "all"
    ? NEWS_ARTICLES
    : NEWS_ARTICLES.filter(a => a.category === selectedCategory);

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute rounded-full float-anim-slow"
          style={{ width: 400, height: 400, background: "#4f46e5", top: "-60px", right: "-60px", filter: "blur(80px)", opacity: 0.05 }} />
        <div className="absolute rounded-full float-anim-delay"
          style={{ width: 280, height: 280, background: "#0ea5e9", bottom: "8%",  left: "-50px",  filter: "blur(70px)", opacity: 0.05 }} />
      </div>

      <div className="relative z-10 space-y-8 pb-16">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className={`reveal flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border ${heroVisible ? "visible" : ""}`}>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 dark:bg-indigo-500/15 px-3 py-1 rounded-full border border-indigo-500/20 mb-2">
              <Newspaper className="h-3.5 w-3.5" /> News & Analysis
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Currency News
            </h1>
            <p className="text-muted-foreground">
              Stay updated with the latest market-moving news and expert analysis
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-end">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-semibold text-foreground shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="badge-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live Updates
            </div>
          </div>
        </div>

        {/* ── Alert Type Cards ─────────────────────────────────────────── */}
        <div ref={alertTypeRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ALERT_TYPES.map((item, i) => (
            <div
              key={i}
              className={`reveal-scale card-glow border border-border bg-card rounded-2xl p-6 space-y-4 cursor-pointer ${alertTypeVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`h-12 w-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground mb-1">{item.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
              <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 hover:gap-2.5 transition-all">
                Configure <Zap className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>

        {/* ── Live Market Alerts ───────────────────────────────────────── */}
        <div ref={liveAlertRef}>
          <Card className={`card-glow reveal-scale overflow-hidden border border-border bg-card shadow-sm ${liveAlertVisible ? "visible" : ""}`}>
            <CardHeader className="flex flex-row items-center gap-3 bg-card border-b border-border p-6 pb-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <Activity className="h-4 w-4" />
              </span>
              <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
                Live Market Alerts
              </CardTitle>
              <span className="ml-auto flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <span className="badge-pulse-dot h-1.5 w-1.5 rounded-full bg-rose-500" />
                Real-time
              </span>
            </CardHeader>

            <CardContent className="p-5 bg-card space-y-3">
              {MARKET_ALERTS.map((alert, i) => {
                const chip = alertChip(alert.type);
                return (
                  <div
                    key={i}
                    className={`card-glow reveal flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-2xl border border-border bg-card ${liveAlertVisible ? "visible" : ""}`}
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg border ${chip.cls} uppercase`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${chip.dot}`} />
                        {alert.type}
                      </span>
                      <span className="font-semibold text-sm text-foreground">{alert.title}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                      <Clock className="h-3.5 w-3.5" /> {alert.time}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* ── News Feed ────────────────────────────────────────────────── */}
        <div className="space-y-5">
          {/* Category filter tabs */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <BookOpen className="h-3.5 w-3.5" /> Filter:
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`text-xs px-3.5 py-1.5 rounded-xl font-bold border transition-all duration-200 ${
                    selectedCategory === cat.key
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-indigo-500/40"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <span className="ml-auto text-xs text-muted-foreground font-medium">
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Articles */}
          <div className="grid gap-4">
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                <Newspaper className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No articles in this category.</p>
              </div>
            ) : (
              filtered.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))
            )}
          </div>
        </div>

        {/* ── Economic Calendar ────────────────────────────────────────── */}
        <div ref={calendarRef}>
          <Card className={`card-glow reveal-scale overflow-hidden border border-border bg-card shadow-sm ${calendarVisible ? "visible" : ""}`}>
            <CardHeader className="flex flex-row items-center gap-3 bg-card border-b border-border p-6 pb-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400">
                <Calendar className="h-4 w-4" />
              </span>
              <div>
                <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
                  Upcoming Economic Events
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Key calendar events that may move currency markets
                </p>
              </div>
            </CardHeader>

            <CardContent className="p-5 bg-card space-y-3">
              {CALENDAR_EVENTS.map((event, i) => (
                <div
                  key={i}
                  className={`card-glow reveal flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-2xl border border-border bg-card ${calendarVisible ? "visible" : ""}`}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                    {/* Time chip */}
                    <div className="shrink-0 text-xs font-bold text-muted-foreground bg-muted px-3 py-1.5 rounded-lg min-w-max">
                      {event.time}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground">{event.event}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Forecast: <span className="font-semibold text-foreground">{event.forecast}</span>
                        {" "}&nbsp;·&nbsp;{" "}
                        Previous: <span className="font-semibold text-foreground">{event.previous}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      {event.currency}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg capitalize ${impactChip(event.impact)}`}>
                      {event.impact}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ── Newsletter CTA ───────────────────────────────────────────── */}
        <div
          ref={bannerRef}
          className={`reveal-scale rounded-3xl border border-indigo-500/20 dark:border-indigo-500/25 bg-indigo-600 dark:bg-indigo-700 text-white overflow-hidden relative ${bannerVisible ? "visible" : ""}`}
        >
          {/* Dot-grid overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }} />
          <div className="relative z-10 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-200 uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full border border-white/20 mb-1">
                <Bell className="h-3.5 w-3.5" /> Stay Informed
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Never Miss a Market Move
              </h2>
              <p className="text-indigo-100 max-w-lg text-sm sm:text-base leading-relaxed">
                Get breaking currency news, rate alerts, and economic calendar events delivered straight to your dashboard.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button className="h-11 px-6 text-sm font-bold bg-white text-indigo-700 hover:bg-indigo-50 shadow-md rounded-xl transition-all hover:scale-105 active:scale-95">
                Enable Alerts
              </button>
              <button className="h-11 px-6 text-sm font-bold text-white border border-white/30 hover:bg-white/10 rounded-xl transition-all">
                View Calendar
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
