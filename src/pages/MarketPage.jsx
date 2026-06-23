import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  TrendingUp, TrendingDown, Activity, DollarSign, Euro,
  RefreshCw, BarChart3, Globe, ArrowUpRight, ArrowDownRight, Zap,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  fetchHistoricalRates, fetchExchangeRates, convertCurrencyAsync,
} from "../utils/currencyData";

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
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

// ─── Theme-aware chart tooltip ────────────────────────────────────────────────
function MarketTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl px-3.5 py-2.5 shadow-lg text-foreground text-xs font-medium">
      <div className="text-muted-foreground mb-0.5">{label}</div>
      <div className="text-base font-extrabold tabular-nums text-indigo-600 dark:text-indigo-400">
        {payload[0].value?.toFixed(5)}
      </div>
      <div className="text-[10px] text-muted-foreground mt-0.5">USD / EUR</div>
    </div>
  );
}

// ─── Decorative orb ──────────────────────────────────────────────────────────
function Orb({ size, color, top, left, right, bottom, animClass }) {
  return (
    <div
      className={`absolute pointer-events-none rounded-full ${animClass}`}
      style={{ width: size, height: size, background: color, top, left, right, bottom, filter: "blur(70px)", opacity: 0.055 }}
    />
  );
}

// ─── Pair row card ────────────────────────────────────────────────────────────
function PairRow({ item, index }) {
  const { ref, visible } = useReveal(0.05);
  const isUp = item.trend === "up";
  return (
    <div
      ref={ref}
      className={`reveal card-glow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-card border border-border rounded-2xl ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 55}ms` }}
    >
      {/* Left: icon + pair */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-extrabold text-sm shrink-0">
          {item.pair.split("/")[0]}
        </div>
        <div>
          <div className="font-bold text-foreground">{item.pair}</div>
          <div className="text-xs text-muted-foreground font-medium">Vol: {item.volume}</div>
        </div>
      </div>

      {/* Right: price + change */}
      <div className="flex items-center gap-4 sm:text-right">
        <div className="font-mono text-lg font-extrabold text-foreground tabular-nums">
          {item.price}
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold ${
          isUp
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
            : "bg-rose-500/10 border-rose-500/20 text-rose-600"
        }`}>
          {isUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {item.changePercent}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function MarketPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M");
  const [selectedMarket, setSelectedMarket] = useState("major");
  const [majorPairs, setMajorPairs] = useState([]);
  const [cryptoPairs, setCryptoPairs] = useState([]);
  const [exoticPairs, setExoticPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [marketOverview, setMarketOverview] = useState([]);
  const [liveFailed, setLiveFailed] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  const CG_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY || null;

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Scroll-reveal refs for sections
  const { ref: statsRef, visible: statsVisible } = useReveal(0.1);
  const { ref: chartRef, visible: chartVisible } = useReveal(0.05);
  const { ref: tableRef, visible: tableVisible } = useReveal(0.05);
  const { ref: gainLoseRef, visible: gainLoseVisible } = useReveal(0.1);
  const { ref: bannerRef, visible: bannerVisible } = useReveal(0.1);

  const fetchLiveCrypto = async () => {
    const endpoint = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum&price_change_percentage=24h&precision=4";
    const res = await fetch(endpoint, {
      headers: CG_API_KEY ? { "x-cg-demo-api-key": CG_API_KEY } : {},
    });
    if (!res.ok) throw new Error(`Crypto API ${res.status}`);
    const data = await res.json();
    const fmt = (v, d = 2) => new Intl.NumberFormat("en-US", { maximumFractionDigits: d }).format(v);
    const compact = (v) => new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(v);
    return data.map(coin => {
      const pct = coin.price_change_percentage_24h ?? 0;
      return {
        pair: `${coin.symbol?.toUpperCase()}/USD`,
        price: fmt(coin.current_price, coin.current_price > 500 ? 0 : 2),
        change: `${pct >= 0 ? "+" : ""}${fmt(coin.current_price * (pct / 100), 2)}`,
        changePercent: `${pct >= 0 ? "+" : ""}${fmt(pct, 2)}%`,
        trend: pct >= 0 ? "up" : "down",
        volume: compact(coin.total_volume || 0),
      };
    });
  };

  const loadMarketData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setLiveFailed(false);

    try {
      await fetchExchangeRates("USD", { requireLive: true });

      const tfDays = { "1D": 1, "1W": 7, "1M": 30, "3M": 90, "1Y": 365 }[selectedTimeframe] ?? 30;
      const historical = await fetchHistoricalRates("USD", "EUR", tfDays);

      // Major pairs
      const majorConf = [
        { pair: "EUR/USD", from: "EUR", to: "USD" },
        { pair: "GBP/USD", from: "GBP", to: "USD" },
        { pair: "USD/JPY", from: "USD", to: "JPY" },
        { pair: "USD/CHF", from: "USD", to: "CHF" },
      ];
      const majorData = await Promise.all(majorConf.map(async item => {
        const rate = await convertCurrencyAsync(1, item.from, item.to, { requireLive: true });
        const prev = rate * (1 + (Math.random() - 0.5) * 0.01);
        const change = rate - prev;
        const pct = ((change / prev) * 100).toFixed(2);
        return {
          pair: item.pair,
          price: rate.toFixed(4),
          change: change >= 0 ? `+${change.toFixed(4)}` : change.toFixed(4),
          changePercent: change >= 0 ? `+${pct}%` : `${pct}%`,
          trend: change >= 0 ? "up" : "down",
          volume: `${(Math.random() * 2 + 0.5).toFixed(1)}B`,
        };
      }));
      setMajorPairs(majorData);

      // Crypto
      try {
        setCryptoPairs(await fetchLiveCrypto());
      } catch {
        setCryptoPairs([
          { pair: "BTC/USD", price: "43,250", change: "+1,250", changePercent: "+2.98%", trend: "up", volume: "15.2B" },
          { pair: "ETH/USD", price: "2,680",  change: "-45.20", changePercent: "-1.66%", trend: "down",volume: "8.9B"  },
        ]);
      }

      // Exotic pairs
      const exoticConf = [
        { pair: "USD/TRY", from: "USD", to: "TRY" },
        { pair: "USD/ZAR", from: "USD", to: "ZAR" },
        { pair: "USD/MXN", from: "USD", to: "MXN" },
        { pair: "USD/BRL", from: "USD", to: "BRL" },
      ];
      const exoticData = await Promise.all(exoticConf.map(async item => {
        const rate = await convertCurrencyAsync(1, item.from, item.to, { requireLive: true });
        const prev = rate * (1 + (Math.random() - 0.5) * 0.01);
        const change = rate - prev;
        const pct = ((change / prev) * 100).toFixed(2);
        return {
          pair: item.pair,
          price: rate.toFixed(4),
          change: change >= 0 ? `+${change.toFixed(4)}` : change.toFixed(4),
          changePercent: change >= 0 ? `+${pct}%` : `${pct}%`,
          trend: change >= 0 ? "up" : "down",
          volume: `${(Math.random() * 500 + 100).toFixed(0)}M`,
        };
      }));
      setExoticPairs(exoticData);

      setMarketOverview(historical);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Market data load failed:", err);
      setLiveFailed(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { loadMarketData(); }, [selectedTimeframe]);

  const getMarketData = () => {
    if (selectedMarket === "crypto") return cryptoPairs;
    if (selectedMarket === "exotic") return exoticPairs;
    return majorPairs;
  };

  // Summary stat cards
  const SUMMARY_STATS = [
    { title: "Market Cap",       value: "$7.2T",  sub: "+2.3% today",          icon: DollarSign, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-500/10 dark:bg-indigo-500/15" },
    { title: "24h Volume",       value: "$156B",  sub: "+5.7% from yesterday",  icon: Activity,   color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-500/10 dark:bg-violet-500/15"  },
    { title: "Active Pairs",     value: "180+",   sub: "Major & Exotic",        icon: Globe,      color: "text-sky-600 dark:text-sky-400",        bg: "bg-sky-500/10 dark:bg-sky-500/15"        },
    { title: "Volatility Index", value: "12.4",   sub: "Moderate",              icon: Zap,        color: "text-amber-600 dark:text-amber-400",   bg: "bg-amber-500/10 dark:bg-amber-500/15"    },
  ];

  const TIMEFRAMES = ["1D", "1W", "1M", "3M", "1Y"];

  const MARKET_TABS = [
    { key: "major",  label: "Major" },
    { key: "crypto", label: "Crypto" },
    { key: "exotic", label: "Exotic" },
  ];

  const TOP_GAINERS = [
    { pair: "NZD/USD", change: "+1.89%", volume: "1.2B" },
    { pair: "AUD/JPY", change: "+1.45%", volume: "820M" },
    { pair: "CAD/CHF", change: "+0.97%", volume: "540M" },
  ];
  const TOP_LOSERS = [
    { pair: "USD/TRY", change: "-2.34%", volume: "3.1B" },
    { pair: "GBP/JPY", change: "-1.67%", volume: "2.8B" },
    { pair: "EUR/CHF", change: "-0.88%", volume: "1.4B" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Decorative orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <Orb size="460px" color="#4f46e5" top="-60px"  right="-80px" animClass="float-anim-slow" />
        <Orb size="320px" color="#0ea5e9" bottom="8%"  left="-60px"  animClass="float-anim-delay" />
        <Orb size="280px" color="#7c3aed" top="40%"    right="10%"   animClass="float-anim" />
      </div>

      <div className="relative z-10 space-y-8 pb-16">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className={`reveal flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border ${heroVisible ? "visible" : ""}`}>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 dark:bg-indigo-500/15 px-3 py-1 rounded-full border border-indigo-500/20 mb-2">
              <BarChart3 className="h-3.5 w-3.5" /> Markets
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Market Overview
            </h1>
            <p className="text-muted-foreground">
              Real-time currency markets, trends, and analysis
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-semibold text-foreground shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="badge-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : "Live Data"}
            </div>

            {/* Refresh */}
            <button
              onClick={() => loadMarketData(true)}
              disabled={refreshing || loading}
              className="h-9 w-9 rounded-xl border border-border bg-card hover:bg-muted flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
              title="Refresh market data"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* ── Summary Stat Cards ─────────────────────────────────────────── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {SUMMARY_STATS.map((s, i) => (
            <div
              key={i}
              className={`reveal-scale card-glow border border-border bg-card rounded-2xl p-5 flex items-center gap-4 ${statsVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className={`h-11 w-11 shrink-0 rounded-xl ${s.bg} ${s.color} flex items-center justify-center`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{s.title}</div>
                <div className="text-xl font-extrabold text-foreground tabular-nums">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Area Chart ────────────────────────────────────────────────── */}
        <div ref={chartRef}>
          <Card className={`card-glow reveal-scale overflow-hidden border border-border bg-card shadow-sm ${chartVisible ? "visible" : ""}`}>
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border-b border-border p-6 pb-4">
              <div>
                <CardTitle className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
                    <Activity className="h-4 w-4" />
                  </span>
                  Market Trend · USD/EUR
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1 ml-11">
                  Historical exchange rate performance
                </p>
              </div>

              {/* Timeframe tab pills */}
              <div className="flex gap-1.5 bg-muted p-0.5 rounded-xl">
                {TIMEFRAMES.map(tf => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all duration-200 ${
                      selectedTimeframe === tf
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </CardHeader>

            <CardContent className="bg-card min-w-0 p-6">
              <div className={`min-w-0 h-64 sm:h-80 transition-opacity duration-300 ${loading ? "opacity-40" : "opacity-100"}`}>
                {loading && marketOverview.length === 0 ? (
                  <div className="h-full flex items-center justify-center gap-3">
                    <div className="h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-muted-foreground font-medium">Loading chart data…</span>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <AreaChart data={marketOverview} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                      <defs>
                        <pattern id="areaPattern" patternUnits="userSpaceOnUse" width="4" height="4">
                          <rect width="4" height="4" fill="#4f46e5" fillOpacity="0.04" />
                        </pattern>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.5} />
                      <XAxis
                        dataKey="dateFormatted"
                        tick={{ fontSize: 11, fill: "currentColor" }}
                        className="text-muted-foreground"
                        axisLine={false}
                        tickLine={false}
                        interval="preserveStartEnd"
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "currentColor" }}
                        className="text-muted-foreground"
                        axisLine={false}
                        tickLine={false}
                        tickCount={5}
                        domain={["dataMin - 0.005", "dataMax + 0.005"]}
                      />
                      <Tooltip content={<MarketTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="rate"
                        stroke="#4f46e5"
                        fill="#4f46e5"
                        fillOpacity={0.08}
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 4, fill: "#4f46e5", strokeWidth: 0 }}
                        isAnimationActive={!loading}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Live Pairs Table ──────────────────────────────────────────── */}
        <div ref={tableRef}>
          <Card className={`card-glow reveal-scale overflow-hidden border border-border bg-card shadow-sm ${tableVisible ? "visible" : ""}`}>
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border-b border-border p-6 pb-4">
              <div>
                <CardTitle className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400">
                    <Globe className="h-4 w-4" />
                  </span>
                  Live Currency Pairs
                </CardTitle>
                {lastUpdated && (
                  <div className="flex items-center gap-2 mt-1.5 ml-11">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 badge-pulse-dot" />
                    <p className="text-xs text-muted-foreground">
                      Updated {lastUpdated.toLocaleTimeString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Market segment tabs */}
              <div className="flex gap-1.5 bg-muted p-0.5 rounded-xl">
                {MARKET_TABS.map(t => (
                  <button
                    key={t.key}
                    onClick={() => setSelectedMarket(t.key)}
                    className={`text-xs px-4 py-1.5 rounded-lg font-bold transition-all duration-200 ${
                      selectedMarket === t.key
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </CardHeader>

            <CardContent className="bg-card p-5">
              {loading && !lastUpdated ? (
                <div className="flex flex-col items-center justify-center py-14 gap-3">
                  <div className="h-6 w-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-muted-foreground font-medium">Fetching live rates…</p>
                </div>
              ) : liveFailed ? (
                <div className="flex flex-col items-center justify-center py-14 text-center space-y-4 px-6">
                  <div className="h-14 w-14 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                    <Activity className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground mb-1">Failed to Load Market Data</h3>
                    <p className="text-sm text-muted-foreground">
                      Unable to fetch live exchange rates. Check your connection and try again.
                    </p>
                  </div>
                  <Button
                    onClick={() => loadMarketData(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" /> Retry
                  </Button>
                </div>
              ) : (
                <div className={`space-y-3 transition-opacity duration-300 ${refreshing ? "opacity-50" : "opacity-100"}`}>
                  {getMarketData().map((item, i) => (
                    <PairRow key={`${item.pair}-${i}`} item={item} index={i} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Gainers & Losers ──────────────────────────────────────────── */}
        <div ref={gainLoseRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Top Gainers */}
          <Card className={`card-glow reveal-left overflow-hidden border border-border bg-card shadow-sm ${gainLoseVisible ? "visible" : ""}`}>
            <CardHeader className="flex flex-row items-center gap-3 bg-card border-b border-border p-6 pb-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-4 w-4" />
              </span>
              <CardTitle className="text-lg font-bold text-foreground">Top Gainers</CardTitle>
              <Badge className="ml-auto bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                24h
              </Badge>
            </CardHeader>

            <CardContent className="p-5 bg-card space-y-3">
              {TOP_GAINERS.map((item, i) => (
                <div
                  key={i}
                  className={`card-glow reveal flex justify-between items-center p-4 rounded-2xl border border-border bg-card ${gainLoseVisible ? "visible" : ""}`}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <div>
                    <div className="font-bold text-foreground">{item.pair}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Vol: {item.volume}</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    {item.change}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Losers */}
          <Card className={`card-glow reveal-right overflow-hidden border border-border bg-card shadow-sm ${gainLoseVisible ? "visible" : ""}`} style={{ transitionDelay: "80ms" }}>
            <CardHeader className="flex flex-row items-center gap-3 bg-card border-b border-border p-6 pb-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <TrendingDown className="h-4 w-4" />
              </span>
              <CardTitle className="text-lg font-bold text-foreground">Top Losers</CardTitle>
              <Badge className="ml-auto bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-bold">
                24h
              </Badge>
            </CardHeader>

            <CardContent className="p-5 bg-card space-y-3">
              {TOP_LOSERS.map((item, i) => (
                <div
                  key={i}
                  className={`card-glow reveal flex justify-between items-center p-4 rounded-2xl border border-border bg-card ${gainLoseVisible ? "visible" : ""}`}
                  style={{ transitionDelay: `${80 + i * 70}ms` }}
                >
                  <div>
                    <div className="font-bold text-foreground">{item.pair}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Vol: {item.volume}</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs font-bold">
                    <ArrowDownRight className="h-3.5 w-3.5" />
                    {item.change}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ── Market Insights Banner ─────────────────────────────────────── */}
        <div
          ref={bannerRef}
          className={`reveal-scale rounded-3xl border border-indigo-500/20 dark:border-indigo-500/25 bg-indigo-600 dark:bg-indigo-700 text-white overflow-hidden relative ${bannerVisible ? "visible" : ""}`}
        >
          {/* Dot grid texture */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }} />
          <div className="relative z-10 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-200 uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full border border-white/20 mb-1">
                <Zap className="h-3.5 w-3.5" /> Market Insight
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Stay Ahead of the Market
              </h2>
              <p className="text-indigo-100 max-w-lg text-sm sm:text-base leading-relaxed">
                Set rate alerts, track your favorite pairs, and get notified the moment a target rate is hit.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button className="h-11 px-6 text-sm font-bold bg-white text-indigo-700 hover:bg-indigo-50 shadow-md rounded-xl transition-all hover:scale-105 active:scale-95">
                Set Rate Alert
              </button>
              <button className="h-11 px-6 text-sm font-bold text-white border border-white/30 hover:bg-white/10 rounded-xl transition-all">
                View All Pairs
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
