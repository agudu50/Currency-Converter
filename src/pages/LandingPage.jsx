import React, { useEffect, useState, useRef, useCallback } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useRouter } from "../components/Router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  currencies,
  fetchExchangeRates,
  convertCurrencyAsync,
  formatCurrency
} from "../utils/currencyData";
import {
  ArrowRight,
  Zap,
  BarChart3,
  Globe,
  Shield,
  Star,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  RefreshCw,
  ChevronDown,
  ArrowLeftRight,
  Sparkles,
  Activity,
  Lock,
  Layers,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const MOCK_CHARTS = {
  "USD/EUR": {
    pair: "USD/EUR", rate: "0.9184", change: "+1.25%", trend: "up",
    points: [
      { day: "Mon", val: 0.9080 }, { day: "Tue", val: 0.9110 },
      { day: "Wed", val: 0.9095 }, { day: "Thu", val: 0.9130 },
      { day: "Fri", val: 0.9120 }, { day: "Sat", val: 0.9150 },
      { day: "Sun", val: 0.9145 }, { day: "Today", val: 0.9184 }
    ]
  },
  "USD/GBP": {
    pair: "USD/GBP", rate: "0.7842", change: "+0.85%", trend: "up",
    points: [
      { day: "Mon", val: 0.7760 }, { day: "Tue", val: 0.7790 },
      { day: "Wed", val: 0.7780 }, { day: "Thu", val: 0.7810 },
      { day: "Fri", val: 0.7800 }, { day: "Sat", val: 0.7825 },
      { day: "Sun", val: 0.7820 }, { day: "Today", val: 0.7842 }
    ]
  },
  "USD/JPY": {
    pair: "USD/JPY", rate: "155.62", change: "-1.45%", trend: "down",
    points: [
      { day: "Mon", val: 157.90 }, { day: "Tue", val: 157.50 },
      { day: "Wed", val: 157.10 }, { day: "Thu", val: 156.40 },
      { day: "Fri", val: 156.80 }, { day: "Sat", val: 156.10 },
      { day: "Sun", val: 155.95 }, { day: "Today", val: 155.62 }
    ]
  },
  "USD/INR": {
    pair: "USD/INR", rate: "83.45", change: "+0.32%", trend: "up",
    points: [
      { day: "Mon", val: 83.15 }, { day: "Tue", val: 83.22 },
      { day: "Wed", val: 83.20 }, { day: "Thu", val: 83.35 },
      { day: "Fri", val: 83.30 }, { day: "Sat", val: 83.42 },
      { day: "Sun", val: 83.40 }, { day: "Today", val: 83.45 }
    ]
  }
};

const TICKER_PAIRS = [
  { pair: "USD/EUR", base: "USD", quote: "EUR" },
  { pair: "USD/GBP", base: "USD", quote: "GBP" },
  { pair: "USD/JPY", base: "USD", quote: "JPY" },
  { pair: "USD/AUD", base: "USD", quote: "AUD" },
  { pair: "USD/CAD", base: "USD", quote: "CAD" },
  { pair: "USD/INR", base: "USD", quote: "INR" },
];

const STATS = [
  { label: "Active Traders", value: "25M+", icon: Activity },
  { label: "Currency Pairs", value: "140+", icon: Globe },
  { label: "Uptime SLA", value: "99.99%", icon: Layers },
  { label: "Response Time", value: "<120ms", icon: Zap },
];

const FEATURES = [
  {
    title: "Real-Time Exchange Rates",
    desc: "Live FX values refreshed every minute directly from authorized banking APIs.",
    icon: Zap,
    accent: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500/10 dark:bg-indigo-500/15",
  },
  {
    title: "Visual Analytics",
    desc: "Interactive time-series graphs with 7D, 30D, 1Y range granularity for any pair.",
    icon: BarChart3,
    accent: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-500/10 dark:bg-violet-500/15",
  },
  {
    title: "Global FX Coverage",
    desc: "140+ world currencies including major standards and exotic regional pairs.",
    icon: Globe,
    accent: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-500/10 dark:bg-sky-500/15",
  },
  {
    title: "Bank-Grade Security",
    desc: "SSL-encrypted connections protect all your conversion queries and data.",
    icon: Shield,
    accent: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
  },
];

const WHY_US = [
  { icon: Zap,      title: "Aggregated Live Feed",    desc: "Minute-by-minute rates from top central reserve banks worldwide." },
  { icon: BarChart3,title: "Deep Market History",     desc: "Historical data for accurate trend comparison on any active pair." },
  { icon: Star,     title: "Quick-Access Dashboard",  desc: "Save favorite pairs to watch real-time rate differences at a glance." },
  { icon: Clock,    title: "Always Active Service",   desc: "Serverless edge architecture with a guaranteed 99.99% uptime SLA." },
];

const FAQS = [
  {
    q: "Is the currency exchange data live?",
    a: "Yes! We fetch live market exchange rates every minute from authorized banking APIs and reliable financial data providers."
  },
  {
    q: "Which currencies are supported?",
    a: "Our app supports over 140+ world currencies, including major global standards (USD, EUR, GBP, JPY, CHF, CAD, AUD) and a wide array of local currencies."
  },
  {
    q: "Can I track historical trends and charts?",
    a: "Absolutely! Head over to our 'Market' tab to access full interactive charts, select range granularities (7D, 30D, 1Y), and explore detailed historical rate changes."
  },
  {
    q: "Is this platform free to use?",
    a: "Yes — our currency calculator, real-time dashboard, market graphs, and rate alert systems are entirely free of charge."
  }
];

// ─── Hook: Intersection Observer for scroll-reveal ────────────────────────────

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── Animated number counter on reveal ───────────────────────────────────────

function AnimatedStat({ value, label, icon: Icon, delay = 0 }) {
  const { ref, visible } = useReveal(0.2);
  return (
    <div
      ref={ref}
      className={`reveal-scale card-glow border border-border bg-card rounded-2xl p-6 flex flex-col items-center sm:items-start gap-2 ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-10 w-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-1">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight tabular-nums">
        {value}
      </div>
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────

function FeatureCard({ title, desc, icon: Icon, accent, bg, delay = 0 }) {
  const { ref, visible } = useReveal(0.15);
  return (
    <div
      ref={ref}
      className={`reveal card-glow border border-border bg-card rounded-2xl p-6 flex flex-col gap-4 ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`h-12 w-12 rounded-2xl ${bg} ${accent} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="font-bold text-lg text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ─── Decorative Orb ───────────────────────────────────────────────────────────

function Orb({ size, color, top, left, right, bottom, animClass }) {
  return (
    <div
      className={`absolute pointer-events-none rounded-full ${animClass}`}
      style={{
        width: size,
        height: size,
        background: color,
        top, left, right, bottom,
        filter: "blur(60px)",
        opacity: 0.06,
      }}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function LandingPage() {
  const { navigateTo } = useRouter();

  // Ticker rates
  const [rates, setRates] = useState(TICKER_PAIRS.map(p => ({ ...p, rate: 0, trend: "up" })));

  // Mini-converter
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedResult, setConvertedResult] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertError, setConvertError] = useState(null);
  const [swapSpin, setSwapSpin] = useState(false);

  // Chart
  const [activeChartKey, setActiveChartKey] = useState("USD/EUR");
  const [hoveredPointIndex, setHoveredPointIndex] = useState(null);
  const svgRef = useRef(null);

  // FAQ
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // Hero reveal (immediate)
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  // Section refs
  const { ref: statsRef, visible: statsVisible } = useReveal(0.1);
  const { ref: featRef, visible: featVisible } = useReveal(0.1);
  const { ref: whyRef, visible: whyVisible } = useReveal(0.1);
  const { ref: faqRef, visible: faqVisible } = useReveal(0.1);
  const { ref: ctaRef, visible: ctaVisible } = useReveal(0.1);

  // Load ticker rates
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        await fetchExchangeRates("USD", { requireLive: true });
        const updated = await Promise.all(
          TICKER_PAIRS.map(async (r) => {
            const rate = await convertCurrencyAsync(1, r.base, r.quote, { requireLive: true });
            const prev = rates.find(x => x.pair === r.pair)?.rate || 0;
            return { ...r, rate: Number(rate.toFixed(4)), trend: rate >= prev ? "up" : "down" };
          })
        );
        if (active) setRates(updated);
      } catch (err) {
        console.error("Ticker fetch failed:", err);
      }
    };
    load();
    const interval = setInterval(load, 60_000);
    return () => { active = false; clearInterval(interval); };
  }, []);

  // Mini-converter calculation
  useEffect(() => {
    let active = true;
    const convert = async () => {
      const num = parseFloat(amount);
      if (isNaN(num) || num <= 0) { setConvertedResult(null); return; }
      setIsConverting(true);
      setConvertError(null);
      try {
        const result = await convertCurrencyAsync(num, fromCurrency, toCurrency);
        if (active) setConvertedResult(result);
      } catch (err) {
        if (active) { setConvertError("Conversion failed. Try again."); console.error(err); }
      } finally {
        if (active) setIsConverting(false);
      }
    };
    const t = setTimeout(convert, 350);
    return () => { active = false; clearTimeout(t); };
  }, [amount, fromCurrency, toCurrency]);

  const handleSwap = () => {
    setSwapSpin(true);
    setTimeout(() => setSwapSpin(false), 500);
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Chart helpers
  const getSvgCoords = (points) => {
    const W = 320, H = 150, P = 20;
    const minV = Math.min(...points.map(p => p.val));
    const maxV = Math.max(...points.map(p => p.val));
    const range = maxV - minV || 1;
    return points.map((p, i) => ({
      x: P + (i * (W - 2 * P)) / (points.length - 1),
      y: H - P - ((p.val - minV) * (H - 2 * P)) / range,
      ...p,
    }));
  };

  const activeChart = MOCK_CHARTS[activeChartKey];
  const coords = getSvgCoords(activeChart.points);
  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} 145 L ${coords[0].x.toFixed(1)} 145 Z`;

  const handleSvgMouseMove = useCallback((e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    let closest = 0, minD = Infinity;
    coords.forEach((c, i) => {
      const d = Math.abs(c.x - (mx * 320 / rect.width));
      if (d < minD) { minD = d; closest = i; }
    });
    setHoveredPointIndex(closest);
  }, [coords]);

  const toggleFAQ = (i) => setExpandedFAQ(expandedFAQ === i ? null : i);

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">

      {/* ── Decorative background orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <Orb size="500px" color="#4f46e5" top="0"    left="-10%" animClass="float-anim-slow" />
        <Orb size="350px" color="#7c3aed" top="30%"  right="-8%" animClass="float-anim-delay" />
        <Orb size="300px" color="#0ea5e9" bottom="5%" left="20%" animClass="float-anim" />
      </div>

      <div className="relative z-10 space-y-20 pb-28">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="pt-16 pb-4 px-4 max-w-7xl mx-auto">

          {/* Badge */}
          <div className={`flex justify-center mb-10 reveal ${heroVisible ? "visible" : ""}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 dark:border-indigo-500/25 text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="badge-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Live Market · Global FX Exchange
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left: Hero Text */}
            <div className="lg:col-span-7 space-y-8">
              <h1
                className={`reveal text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.12] ${heroVisible ? "visible" : ""}`}
                style={{ transitionDelay: "80ms" }}
              >
                Currency Exchange{" "}
                <br className="hidden sm:inline" />
                <span className="text-indigo-600 dark:text-indigo-400">
                  Reimagined.
                </span>
              </h1>

              <p
                className={`reveal text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed ${heroVisible ? "visible" : ""}`}
                style={{ transitionDelay: "160ms" }}
              >
                Experience lightning-fast currency conversions, interactive trend analytics, and real-time market data — all in a clean, bank-grade secure environment.
              </p>

              <div
                className={`reveal flex flex-col sm:flex-row gap-4 pt-2 ${heroVisible ? "visible" : ""}`}
                style={{ transitionDelay: "240ms" }}
              >
                <Button
                  onClick={() => navigateTo("home")}
                  className="h-12 px-8 text-base font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-all duration-200 hover:scale-105 hover:shadow-indigo-500/20 hover:shadow-lg"
                >
                  Open Full Converter <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  onClick={() => navigateTo("market")}
                  variant="outline"
                  className="h-12 px-8 text-base font-semibold border border-border hover:bg-muted rounded-xl bg-card shadow-sm transition-all duration-200 hover:scale-105"
                >
                  Explore Charts
                </Button>
              </div>

              {/* Inline stats strip */}
              <div
                className={`reveal grid grid-cols-3 gap-6 pt-6 border-t border-border max-w-lg ${heroVisible ? "visible" : ""}`}
                style={{ transitionDelay: "320ms" }}
              >
                {[
                  { value: "140+", label: "Currencies" },
                  { value: "1 min", label: "Rate Refresh" },
                  { value: "Free", label: "Conversions" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-extrabold text-foreground">{s.value}</div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Mini-Converter */}
            <div
              className={`lg:col-span-5 reveal-right ${heroVisible ? "visible" : ""}`}
              style={{ transitionDelay: "200ms" }}
            >
              <Card className="card-glow border border-border bg-card shadow-sm rounded-2xl overflow-hidden">
                <div className="p-6 space-y-5">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                        <ArrowLeftRight className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-sm tracking-wide text-foreground">Quick Converter</span>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <span className="badge-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Live Rates
                    </span>
                  </div>

                  {/* Amount */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount..."
                      className="w-full h-11 px-4 rounded-xl border border-border bg-[var(--input-background)] focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-foreground font-bold transition-shadow"
                    />
                  </div>

                  {/* From / Swap / To */}
                  <div className="grid grid-cols-9 items-center gap-2">
                    <div className="col-span-4 space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">From</label>
                      <Select value={fromCurrency} onValueChange={setFromCurrency}>
                        <SelectTrigger className="w-full h-11 border border-border bg-[var(--input-background)] text-foreground font-semibold text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-48" side="bottom">
                          {currencies.map(c => (
                            <SelectItem key={c.code} value={c.code}>
                              <div className="flex items-center gap-2">
                                <span>{c.flag}</span>
                                <span>{c.code}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-1 flex justify-center pt-5">
                      <button
                        onClick={handleSwap}
                        type="button"
                        className="h-9 w-9 rounded-xl border border-border bg-card hover:bg-muted shadow-sm flex items-center justify-center text-foreground transition-all hover:scale-110 active:scale-95"
                        title="Swap currencies"
                      >
                        <RefreshCw className={`h-4 w-4 text-indigo-500 transition-transform ${swapSpin ? "animate-spin" : ""}`} />
                      </button>
                    </div>

                    <div className="col-span-4 space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">To</label>
                      <Select value={toCurrency} onValueChange={setToCurrency}>
                        <SelectTrigger className="w-full h-11 border border-border bg-[var(--input-background)] text-foreground font-semibold text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-48" side="bottom">
                          {currencies.map(c => (
                            <SelectItem key={c.code} value={c.code}>
                              <div className="flex items-center gap-2">
                                <span>{c.flag}</span>
                                <span>{c.code}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="p-4 rounded-xl bg-muted/60 border border-border flex flex-col justify-center min-h-20 transition-all">
                    {isConverting ? (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-medium text-indigo-500">Calculating...</span>
                      </div>
                    ) : convertError ? (
                      <div className="text-center text-xs text-destructive font-medium">{convertError}</div>
                    ) : convertedResult !== null ? (
                      <div className="text-center">
                        <div className="text-xs font-semibold text-muted-foreground mb-0.5">
                          {amount} {fromCurrency} =
                        </div>
                        <div className="text-2xl font-extrabold text-foreground tracking-tight tabular-nums">
                          {formatCurrency(convertedResult, toCurrency)}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-medium mt-1">
                          1 {fromCurrency} = {(convertedResult / parseFloat(amount)).toFixed(5)} {toCurrency}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-xs text-muted-foreground font-medium">
                        Enter amount to see conversion.
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

          </div>
        </section>

        {/* ── LIVE TICKER ─────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4">
          <div className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden py-3">
            <div className="overflow-hidden">
              <div className="ticker-animate flex w-max gap-4">
                {[...rates, ...rates].map((r, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 px-6 py-2.5 flex items-center gap-3 border-r border-border hover:bg-muted transition-colors cursor-pointer rounded-lg"
                    onClick={() => {
                      if (MOCK_CHARTS[r.pair]) {
                        setActiveChartKey(r.pair);
                        document.getElementById("chart-section")?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{r.pair}</span>
                    <span className="text-sm font-extrabold text-foreground tabular-nums">
                      {r.rate > 0 ? r.rate.toFixed(4) : "···"}
                    </span>
                    {r.rate > 0 && (
                      <span className={`flex items-center text-[10px] font-bold ${r.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600"}`}>
                        {r.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CHART ────────────────────────────────────────────────────────── */}
        <section id="chart-section" className="max-w-3xl mx-auto px-4 scroll-mt-24">
          <Card className="border border-border bg-card shadow-sm rounded-2xl overflow-hidden">
            <div className="p-5 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-bold text-sm tracking-wide text-foreground">Live Rate Trends</span>
                </div>
                <div className="flex gap-1.5 bg-muted p-0.5 rounded-lg">
                  {Object.keys(MOCK_CHARTS).map(key => (
                    <button
                      key={key}
                      onClick={() => { setActiveChartKey(key); setHoveredPointIndex(null); }}
                      className={`text-xs px-2.5 py-1 font-bold rounded-md transition-all duration-200 ${activeChartKey === key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {key.split("/")[1]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rate header */}
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{activeChartKey} Pair</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-foreground tabular-nums">{activeChart.rate}</span>
                    <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${activeChart.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600"}`}>
                      {activeChart.trend === "up" ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      {activeChart.change}
                    </span>
                  </div>
                </div>
                {hoveredPointIndex !== null && (
                  <div className="text-right animate-fade-in">
                    <div className="text-[10px] text-muted-foreground font-bold uppercase">{activeChart.points[hoveredPointIndex].day}</div>
                    <div className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
                      {activeChart.points[hoveredPointIndex].val.toFixed(4)}
                    </div>
                  </div>
                )}
              </div>

              {/* SVG Chart */}
              <div className="relative pt-1">
                <svg
                  ref={svgRef}
                  viewBox="0 0 320 150"
                  className="w-full h-auto cursor-crosshair overflow-visible"
                  onMouseMove={handleSvgMouseMove}
                  onMouseLeave={() => setHoveredPointIndex(null)}
                >
                  <defs>
                    <filter id="line-shadow">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#4f46e5" floodOpacity="0.15" />
                    </filter>
                  </defs>

                  {/* Grid lines */}
                  {[20, 60, 100, 130].map(y => (
                    <line key={y} x1="20" y1={y} x2="300" y2={y} stroke="currentColor" className="text-border" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.5" />
                  ))}

                  {/* Area fill */}
                  <path d={areaPath} fill="#4f46e5" fillOpacity="0.06" className="transition-all duration-500" />

                  {/* Line */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#line-shadow)"
                    className="transition-all duration-500"
                  />

                  {/* Hover line */}
                  {hoveredPointIndex !== null && (
                    <line
                      x1={coords[hoveredPointIndex].x} y1="10"
                      x2={coords[hoveredPointIndex].x} y2="140"
                      stroke="#4f46e5" strokeWidth="1" strokeDasharray="4,4"
                    />
                  )}

                  {/* Dots */}
                  {coords.map((c, i) => (
                    <circle
                      key={i}
                      cx={c.x} cy={c.y}
                      r={hoveredPointIndex === i ? 5.5 : 3}
                      fill={hoveredPointIndex === i ? "#4f46e5" : "var(--card)"}
                      stroke="#4f46e5"
                      strokeWidth={hoveredPointIndex === i ? 2 : 1.5}
                      className="transition-all duration-150 cursor-pointer"
                    />
                  ))}
                </svg>
              </div>

              <p className="text-xs text-muted-foreground text-center">Historical performance data · Click ticker above to switch pair</p>
            </div>
          </Card>
        </section>

        {/* ── STATS ────────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {STATS.map((s, i) => (
              <AnimatedStat key={i} value={s.value} label={s.label} icon={s.icon} delay={i * 80} />
            ))}
          </div>
        </section>

        {/* ── FEATURES ─────────────────────────────────────────────────────── */}
        <section ref={featRef} className="max-w-7xl mx-auto px-4 space-y-10">
          <div className={`text-center max-w-2xl mx-auto space-y-3 reveal ${featVisible ? "visible" : ""}`}>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 dark:bg-indigo-500/15 px-3 py-1.5 rounded-full border border-indigo-500/20">
              <Sparkles className="h-3.5 w-3.5" /> Features
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Packed with Premium Features
            </h2>
            <p className="text-muted-foreground">
              Everything you need to calculate rates, review trends, and monitor foreign markets in one fast interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <FeatureCard key={i} {...f} delay={i * 90} />
            ))}
          </div>
        </section>

        {/* ── WHY US ───────────────────────────────────────────────────────── */}
        <section ref={whyRef} className="max-w-6xl mx-auto px-4">
          <Card className={`reveal-scale border border-border bg-card shadow-sm rounded-3xl overflow-hidden ${whyVisible ? "visible" : ""}`}>

            {/* Header row */}
            <div className="p-8 sm:p-12 border-b border-border">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest bg-violet-500/10 dark:bg-violet-500/15 px-3 py-1.5 rounded-full border border-violet-500/20 mb-4">
                <Lock className="h-3.5 w-3.5" /> Why Choose Us
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
                Why Professional Traders Choose Us
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
                Industry-standard calculations combined with premium analytical speed for the most accurate currency conversions.
              </p>
            </div>

            {/* Feature grid */}
            <div className="grid md:grid-cols-2 gap-5 p-8 sm:p-12 bg-muted/20">
              {WHY_US.map((item, i) => (
                <div
                  key={i}
                  className={`card-glow flex gap-4 p-5 rounded-2xl border border-border bg-card shadow-sm reveal ${whyVisible ? "visible" : ""}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground mb-1">{item.title}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section ref={faqRef} className="max-w-4xl mx-auto px-4 space-y-8">
          <div className={`text-center space-y-3 reveal ${faqVisible ? "visible" : ""}`}>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest bg-sky-500/10 dark:bg-sky-500/15 px-3 py-1.5 rounded-full border border-sky-500/20">
              FAQ
            </div>
            <h2 className="text-3xl font-extrabold text-foreground">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Got questions? We&apos;ve got answers.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const open = expandedFAQ === i;
              return (
                <div
                  key={i}
                  className={`reveal border border-border rounded-2xl bg-card overflow-hidden card-glow ${faqVisible ? "visible" : ""}`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <button
                    onClick={() => toggleFAQ(i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-foreground text-base focus:outline-none hover:bg-muted/50 transition-colors"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <div className={`h-8 w-8 shrink-0 rounded-full border border-border flex items-center justify-center transition-all duration-300 ${open ? "rotate-180 bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400" : "text-muted-foreground"}`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>
                  <div
                    className="transition-all duration-300 ease-in-out"
                    style={{ maxHeight: open ? "200px" : "0", opacity: open ? 1 : 0, overflow: "hidden" }}
                  >
                    <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-border">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
        <section ref={ctaRef} className="max-w-5xl mx-auto px-4">
          <div
            className={`reveal-scale relative overflow-hidden rounded-3xl border border-indigo-500/20 dark:border-indigo-500/25 bg-indigo-600 dark:bg-indigo-700 text-white ${ctaVisible ? "visible" : ""}`}
          >
            {/* Subtle inner texture dots — no gradient */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }} />

            <div className="relative z-10 p-8 sm:p-14 text-center space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-200 uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full border border-white/20 mb-2">
                <Sparkles className="h-3.5 w-3.5" /> Get Started Today
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ready to Convert Currencies?
              </h2>
              <p className="text-indigo-100 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
                Access full-featured converters, add favorites, set rate alerts, and inspect deep financial analytics — all for free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Button
                  onClick={() => navigateTo("home")}
                  className="h-12 px-8 text-base font-bold bg-white text-indigo-700 hover:bg-indigo-50 shadow-md rounded-xl transition-all hover:scale-105 active:scale-95"
                >
                  Start Converting Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => navigateTo("market")}
                  variant="ghost"
                  className="h-12 px-8 text-base font-semibold text-white border border-white/30 hover:bg-white/10 rounded-xl transition-all"
                >
                  View Live Charts
                </Button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}