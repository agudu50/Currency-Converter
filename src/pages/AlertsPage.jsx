import { useState, useEffect, useRef } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Bell, TrendingUp, TrendingDown, AlertTriangle,
  Plus, Trash2, Edit3, Check, X, Zap, Activity,
  Target, BarChart3, Clock, CheckCircle2,
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

// ─── Progress bar component ───────────────────────────────────────────────────
function ProgressBar({ current, target, condition }) {
  const isAbove = condition === "above";
  // For "above": fill = current / target  (fills left → right towards goal)
  // For "below": fill = target / current  (fills towards the zone)
  const raw = isAbove ? current / target : target / current;
  const pct = Math.min(Math.max(raw * 100, 4), 100).toFixed(1);
  const reached = isAbove ? current >= target : current <= target;

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between text-[10px] font-semibold text-muted-foreground">
        <span>Current: <span className="text-foreground">{current}</span></span>
        <span>Target: <span className="text-foreground">{target}</span></span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            reached
              ? "bg-emerald-500"
              : isAbove ? "bg-indigo-500" : "bg-rose-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-[10px] text-muted-foreground text-right">
        {pct}% of target
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const INITIAL_ALERTS = [
  {
    id: 1,
    type: "price",
    currency: "EUR/USD",
    condition: "above",
    value: 1.10,
    current: 1.0932,
    active: true,
    icon: TrendingUp,
    accentColor: "text-indigo-600 dark:text-indigo-400",
    accentBg: "bg-indigo-500/10 dark:bg-indigo-500/15",
    triggered: false,
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    type: "price",
    currency: "GBP/USD",
    condition: "below",
    value: 1.25,
    current: 1.2654,
    active: true,
    icon: TrendingDown,
    accentColor: "text-rose-600 dark:text-rose-400",
    accentBg: "bg-rose-500/10",
    triggered: false,
    createdAt: "5 hours ago",
  },
  {
    id: 3,
    type: "volatility",
    currency: "USD/JPY",
    condition: "high volatility",
    value: 5,
    current: 3.2,
    active: true,
    icon: AlertTriangle,
    accentColor: "text-amber-600 dark:text-amber-400",
    accentBg: "bg-amber-500/10 dark:bg-amber-500/15",
    triggered: false,
    createdAt: "1 day ago",
  },
];

const ALERT_TYPES = [
  {
    icon: Target,
    title: "Price Alerts",
    desc: "Notify when a pair crosses your exact target price.",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500/10 dark:bg-indigo-500/15",
    tag: "Most Popular",
  },
  {
    icon: TrendingUp,
    title: "Trend Alerts",
    desc: "Track significant momentum shifts and trend reversals.",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-500/10 dark:bg-violet-500/15",
    tag: null,
  },
  {
    icon: AlertTriangle,
    title: "Volatility Alerts",
    desc: "Monitor unusual spikes and rapid price swings.",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10 dark:bg-amber-500/15",
    tag: null,
  },
  {
    icon: BarChart3,
    title: "Volume Alerts",
    desc: "React to abnormal trading volume in any pair.",
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-500/10 dark:bg-sky-500/15",
    tag: null,
  },
];

const STATS = [
  { label: "Active Alerts",    value: "3",     icon: Bell,        color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-500/10 dark:bg-indigo-500/15" },
  { label: "Triggered Today",  value: "1",     icon: CheckCircle2,color: "text-emerald-600 dark:text-emerald-400",bg: "bg-emerald-500/10 dark:bg-emerald-500/15" },
  { label: "Pairs Watched",    value: "3",     icon: Activity,    color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-500/10 dark:bg-violet-500/15"  },
  { label: "Avg Response",     value: "<1 min",icon: Clock,       color: "text-amber-600 dark:text-amber-400",   bg: "bg-amber-500/10 dark:bg-amber-500/15"    },
];

// ─── Alert card ───────────────────────────────────────────────────────────────
function AlertCard({ alert, index, onDelete, onToggle, visible }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => onDelete(alert.id), 350);
  };

  const isVolatility = alert.type === "volatility";

  return (
    <div
      className={`reveal card-glow border border-border bg-card rounded-2xl overflow-hidden transition-all duration-300 ${visible ? "visible" : ""} ${deleting ? "opacity-0 scale-95" : ""}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">

        {/* Icon */}
        <div className={`h-12 w-12 shrink-0 rounded-2xl ${alert.accentBg} ${alert.accentColor} flex items-center justify-center`}>
          <alert.icon className="h-5 w-5" />
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Title row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-lg font-extrabold text-foreground">{alert.currency}</span>
            <div className="flex items-center gap-2 flex-wrap">
              {alert.active ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="badge-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                  Paused
                </span>
              )}
              <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                <Clock className="h-3 w-3" /> {alert.createdAt}
              </span>
            </div>
          </div>

          {/* Condition description */}
          <p className="text-sm text-muted-foreground">
            Alert when price is{" "}
            <span className={`font-bold ${alert.accentColor}`}>{alert.condition}</span>{" "}
            <span className="font-bold text-foreground">{alert.value}</span>
          </p>

          {/* Progress bar (price alerts only) */}
          {!isVolatility && (
            <ProgressBar
              current={alert.current}
              target={alert.value}
              condition={alert.condition}
            />
          )}

          {/* Volatility meter */}
          {isVolatility && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-semibold text-muted-foreground">
                <span>Current volatility: <span className="text-foreground">{alert.current}%</span></span>
                <span>Threshold: <span className="text-foreground">{alert.value}%</span></span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all duration-700"
                  style={{ width: `${Math.min((alert.current / alert.value) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 shrink-0 self-start">
          <button
            onClick={() => onToggle(alert.id)}
            className={`h-8 w-8 rounded-xl border transition-all hover:scale-110 flex items-center justify-center ${
              alert.active
                ? "bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20"
                : "bg-muted border-border text-muted-foreground hover:bg-muted/80"
            }`}
            title={alert.active ? "Pause alert" : "Activate alert"}
          >
            {alert.active ? <Check className="h-3.5 w-3.5" /> : <Bell className="h-3.5 w-3.5" />}
          </button>
          <button
            className="h-8 w-8 rounded-xl border border-border bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all hover:scale-110 flex items-center justify-center"
            title="Edit alert"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleDelete}
            className="h-8 w-8 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-all hover:scale-110 flex items-center justify-center"
            title="Delete alert"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Create Alert Modal ───────────────────────────────────────────────────────
function CreateAlertModal({ onClose, onAdd }) {
  const [pair, setPair]     = useState("EUR/USD");
  const [cond, setCond]     = useState("above");
  const [value, setValue]   = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    onAdd({
      id: Date.now(),
      type: "price",
      currency: pair,
      condition: cond,
      value: parseFloat(value),
      current: parseFloat(value) * (cond === "above" ? 0.98 : 1.02),
      active: true,
      icon: cond === "above" ? TrendingUp : TrendingDown,
      accentColor: cond === "above" ? "text-indigo-600 dark:text-indigo-400" : "text-rose-600 dark:text-rose-400",
      accentBg: cond === "above" ? "bg-indigo-500/10 dark:bg-indigo-500/15" : "bg-rose-500/10",
      triggered: false,
      createdAt: "Just now",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ animation: "revealScale 0.25s ease both" }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Plus className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-foreground">New Alert</span>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground flex items-center justify-center transition-all hover:scale-110"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Pair */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Currency Pair</label>
            <select
              value={pair}
              onChange={e => setPair(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-border bg-[var(--input-background)] text-foreground text-sm font-semibold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-shadow"
            >
              {["EUR/USD","GBP/USD","USD/JPY","USD/CHF","AUD/USD","USD/CAD","NZD/USD"].map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Condition tabs */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Condition</label>
            <div className="flex gap-2 bg-muted p-0.5 rounded-xl">
              {[
                { key: "above", label: "↑ Above", color: "text-indigo-600" },
                { key: "below", label: "↓ Below", color: "text-rose-600"   },
              ].map(opt => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setCond(opt.key)}
                  className={`flex-1 text-sm py-2 rounded-lg font-bold transition-all duration-200 ${
                    cond === opt.key
                      ? `bg-card ${opt.color} shadow-sm`
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Target value */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Target Rate</label>
            <input
              type="number"
              step="0.0001"
              placeholder="e.g. 1.1000"
              value={value}
              onChange={e => setValue(e.target.value)}
              required
              className="w-full h-11 px-3 rounded-xl border border-border bg-[var(--input-background)] text-foreground text-sm font-mono focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-shadow"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
          >
            <Zap className="h-4 w-4" /> Create Alert
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function AlertsPage() {
  const [alerts, setAlerts]   = useState(INITIAL_ALERTS);
  const [showModal, setShowModal] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const { ref: statsRef,  visible: statsVisible  } = useReveal(0.1);
  const { ref: activeRef, visible: activeVisible  } = useReveal(0.05);
  const { ref: typesRef,  visible: typesVisible   } = useReveal(0.1);
  const { ref: bannerRef, visible: bannerVisible  } = useReveal(0.1);

  const deleteAlert = (id) => setAlerts(prev => prev.filter(a => a.id !== id));
  const toggleAlert = (id) => setAlerts(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  const addAlert    = (a)  => setAlerts(prev => [a, ...prev]);

  const activeCount  = alerts.filter(a => a.active).length;
  const pausedCount  = alerts.filter(a => !a.active).length;

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute rounded-full float-anim-slow"
          style={{ width: 440, height: 440, background: "#4f46e5", top: "-80px", right: "-70px", filter: "blur(80px)", opacity: 0.055 }} />
        <div className="absolute rounded-full float-anim-delay"
          style={{ width: 280, height: 280, background: "#f59e0b", bottom: "10%", left: "-40px", filter: "blur(70px)", opacity: 0.045 }} />
      </div>

      <div className="relative z-10 space-y-8 pb-16">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className={`reveal flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 border-b border-border ${heroVisible ? "visible" : ""}`}>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 dark:bg-indigo-500/15 px-3 py-1 rounded-full border border-indigo-500/20 mb-2">
              <Bell className="h-3.5 w-3.5" /> Alerts
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Price Alerts
            </h1>
            <p className="text-muted-foreground">
              Set custom alerts to stay informed about important currency movements.
            </p>
          </div>

          {/* Create alert CTA */}
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2.5 h-11 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-sm transition-all hover:scale-105 active:scale-95 self-start md:self-end"
          >
            <Plus className="h-4 w-4" />
            New Alert
          </button>
        </div>

        {/* ── Stats row ────────────────────────────────────────────────── */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`reveal-scale card-glow border border-border bg-card rounded-2xl p-4 flex items-center gap-4 ${statsVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className={`h-10 w-10 shrink-0 rounded-xl ${s.bg} ${s.color} flex items-center justify-center`}>
                <s.icon className="h-4.5 w-4.5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{s.label}</div>
                <div className="text-xl font-extrabold text-foreground tabular-nums">{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Active Alerts ─────────────────────────────────────────────── */}
        <div ref={activeRef} className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-extrabold text-foreground">Active Alerts</h2>
              <div className="flex gap-2">
                {activeCount > 0 && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {activeCount} active
                  </span>
                )}
                {pausedCount > 0 && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                    {pausedCount} paused
                  </span>
                )}
              </div>
            </div>
          </div>

          {alerts.length === 0 ? (
            <div className={`reveal text-center py-16 border border-dashed border-border rounded-3xl bg-muted/30 space-y-4 ${activeVisible ? "visible" : ""}`}>
              <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-400 flex items-center justify-center mx-auto">
                <Bell className="h-7 w-7" />
              </div>
              <div>
                <p className="font-bold text-foreground">No alerts yet</p>
                <p className="text-sm text-muted-foreground mt-1">Create your first alert to start tracking currency movements.</p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-sm transition-all hover:scale-105"
              >
                <Plus className="h-3.5 w-3.5" /> Create Alert
              </button>
            </div>
          ) : (
            <div className="grid gap-3">
              {alerts.map((alert, i) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  index={i}
                  onDelete={deleteAlert}
                  onToggle={toggleAlert}
                  visible={activeVisible}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Alert Types ───────────────────────────────────────────────── */}
        <div ref={typesRef} className="space-y-4">
          <h2 className="text-xl font-extrabold text-foreground">Alert Types</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ALERT_TYPES.map((item, i) => (
              <div
                key={i}
                className={`reveal-scale card-glow border border-border bg-card rounded-2xl p-5 space-y-4 cursor-pointer ${typesVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className={`h-12 w-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{item.title}</span>
                    {item.tag && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
                <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 hover:gap-3 transition-all">
                  Set up <Zap className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA Banner ───────────────────────────────────────────────── */}
        <div
          ref={bannerRef}
          className={`reveal-scale rounded-3xl border border-indigo-500/20 dark:border-indigo-500/25 bg-indigo-600 dark:bg-indigo-700 text-white overflow-hidden relative ${bannerVisible ? "visible" : ""}`}
        >
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }} />
          <div className="relative z-10 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-200 uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full border border-white/20 mb-1">
                <Zap className="h-3.5 w-3.5" /> Pro Tip
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Never Miss a Rate Again
              </h2>
              <p className="text-indigo-100 max-w-lg text-sm sm:text-base leading-relaxed">
                Stack multiple alerts per pair, set trailing thresholds, and get notified via push, email, or SMS the instant your target is hit.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => setShowModal(true)}
                className="h-11 px-6 text-sm font-bold bg-white text-indigo-700 hover:bg-indigo-50 shadow-md rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                Create First Alert
              </button>
              <button className="h-11 px-6 text-sm font-bold text-white border border-white/30 hover:bg-white/10 rounded-xl transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ── Modal ─────────────────────────────────────────────────────── */}
      {showModal && (
        <CreateAlertModal onClose={() => setShowModal(false)} onAdd={addAlert} />
      )}
    </div>
  );
}
