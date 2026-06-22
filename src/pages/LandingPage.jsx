import React, { useEffect, useState, useRef } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useRouter } from "../components/Router";
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
  HelpCircle,
  TrendingDown,
  ArrowLeftRight,
  Percent
} from "lucide-react";

// Curated list of currencies for the mini-converter to keep the UI clean
const POPULAR_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
];

const MOCK_CHARTS = {
  "USD/EUR": {
    pair: "USD/EUR",
    rate: "0.9184",
    change: "+1.25%",
    trend: "up",
    points: [
      { day: "Mon", val: 0.9080 },
      { day: "Tue", val: 0.9110 },
      { day: "Wed", val: 0.9095 },
      { day: "Thu", val: 0.9130 },
      { day: "Fri", val: 0.9120 },
      { day: "Sat", val: 0.9150 },
      { day: "Sun", val: 0.9145 },
      { day: "Today", val: 0.9184 }
    ]
  },
  "USD/GBP": {
    pair: "USD/GBP",
    rate: "0.7842",
    change: "+0.85%",
    trend: "up",
    points: [
      { day: "Mon", val: 0.7760 },
      { day: "Tue", val: 0.7790 },
      { day: "Wed", val: 0.7780 },
      { day: "Thu", val: 0.7810 },
      { day: "Fri", val: 0.7800 },
      { day: "Sat", val: 0.7825 },
      { day: "Sun", val: 0.7820 },
      { day: "Today", val: 0.7842 }
    ]
  },
  "USD/JPY": {
    pair: "USD/JPY",
    rate: "155.62",
    change: "-1.45%",
    trend: "down",
    points: [
      { day: "Mon", val: 157.90 },
      { day: "Tue", val: 157.50 },
      { day: "Wed", val: 157.10 },
      { day: "Thu", val: 156.40 },
      { day: "Fri", val: 156.80 },
      { day: "Sat", val: 156.10 },
      { day: "Sun", val: 155.95 },
      { day: "Today", val: 155.62 }
    ]
  },
  "USD/INR": {
    pair: "USD/INR",
    rate: "83.45",
    change: "+0.32%",
    trend: "up",
    points: [
      { day: "Mon", val: 83.15 },
      { day: "Tue", val: 83.22 },
      { day: "Wed", val: 83.20 },
      { day: "Thu", val: 83.35 },
      { day: "Fri", val: 83.30 },
      { day: "Sat", val: 83.42 },
      { day: "Sun", val: 83.40 },
      { day: "Today", val: 83.45 }
    ]
  }
};

export function LandingPage() {
  const { navigateTo } = useRouter();

  // --- Live Ticker State ---
  const tickerPairs = [
    { pair: "USD/EUR", base: "USD", quote: "EUR" },
    { pair: "USD/GBP", base: "USD", quote: "GBP" },
    { pair: "USD/JPY", base: "USD", quote: "JPY" },
    { pair: "USD/AUD", base: "USD", quote: "AUD" },
    { pair: "USD/CAD", base: "USD", quote: "CAD" },
    { pair: "USD/INR", base: "USD", quote: "INR" },
  ];
  const [rates, setRates] = useState(tickerPairs.map(p => ({ ...p, rate: 0, trend: 'up' })));

  // --- Mini-Converter State ---
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedResult, setConvertedResult] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertError, setConvertError] = useState(null);
  const [swapSpin, setSwapSpin] = useState(false);

  // --- Mock Chart State ---
  const [activeChartKey, setActiveChartKey] = useState("USD/EUR");
  const [hoveredPointIndex, setHoveredPointIndex] = useState(null);
  const svgRef = useRef(null);

  // --- FAQ State ---
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // Load ticker rates
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        await fetchExchangeRates('USD', { requireLive: true });
        const updated = await Promise.all(
          tickerPairs.map(async (r) => {
            const rate = await convertCurrencyAsync(1, r.base, r.quote, { requireLive: true });
            const prev = rates.find(x => x.pair === r.pair)?.rate || 0;
            const trend = rate >= prev ? 'up' : 'down';
            return { ...r, rate: Number(rate.toFixed(4)), trend };
          })
        );
        if (active) setRates(updated);
      } catch (err) {
        console.error('Ticker fetch failed:', err);
      }
    };

    load();
    const interval = setInterval(load, 60_000);
    return () => { active = false; clearInterval(interval); };
  }, []);

  // Run Mini-Converter Async Calculation
  useEffect(() => {
    let active = true;
    const convert = async () => {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        setConvertedResult(null);
        return;
      }

      setIsConverting(true);
      setConvertError(null);
      try {
        const result = await convertCurrencyAsync(numAmount, fromCurrency, toCurrency);
        if (active) {
          setConvertedResult(result);
        }
      } catch (err) {
        if (active) {
          setConvertError("Conversion failed. Try again.");
          console.error(err);
        }
      } finally {
        if (active) setIsConverting(false);
      }
    };

    const debounce = setTimeout(convert, 350);
    return () => {
      active = false;
      clearTimeout(debounce);
    };
  }, [amount, fromCurrency, toCurrency]);

  // Swap function for mini-converter
  const handleSwap = () => {
    setSwapSpin(true);
    setTimeout(() => setSwapSpin(false), 500);
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  // Render SVG Chart Paths
  const getSvgCoordinates = (points) => {
    const width = 320;
    const height = 150;
    const padding = 20;

    const minVal = Math.min(...points.map(p => p.val));
    const maxVal = Math.max(...points.map(p => p.val));
    const valRange = maxVal - minVal || 1;

    return points.map((p, idx) => {
      const x = padding + (idx * (width - 2 * padding)) / (points.length - 1);
      // Invert Y because SVG coordinates start from top-left (0,0)
      const y = height - padding - ((p.val - minVal) * (height - 2 * padding)) / valRange;
      return { x, y, ...p };
    });
  };

  const activeChart = MOCK_CHARTS[activeChartKey];
  const chartCoordinates = getSvgCoordinates(activeChart.points);

  // SVG Line path
  const linePath = chartCoordinates
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(" ");

  // SVG Filled area path
  const areaPath = `${linePath} L ${chartCoordinates[chartCoordinates.length - 1].x.toFixed(1)} 145 L ${chartCoordinates[0].x.toFixed(1)} 145 Z`;

  // Handle Chart Hover / Mousemove
  const handleSvgMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    // Find the closest point index based on X coordinate
    let closestIdx = 0;
    let minDiff = Infinity;
    chartCoordinates.forEach((c, idx) => {
      const diff = Math.abs(c.x - (mouseX * 320 / rect.width));
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    setHoveredPointIndex(closestIdx);
  };

  const handleSvgMouseLeave = () => {
    setHoveredPointIndex(null);
  };

  // FAQ helper toggler
  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const faqs = [
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
      a: "Absolutely! You can head over to our 'Market' tab to access full interactive charts, select range granularities (7D, 30D, 1Y), and look up detailed historical rate changes."
    },
    {
      q: "Is this platform free to use?",
      a: "Yes, our currency calculator, real-time rates dashboard, market graphs, and custom email rate alert systems are entirely free of cost."
    }
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-indigo-500/30 overflow-hidden relative animate-page-fade">
      
      <div className="relative z-10 space-y-16 pb-24">
        
        {/* HERO SECTION */}
        <section className="pt-16 pb-12 px-4 max-w-7xl mx-auto space-y-10">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600 dark:bg-indigo-400"></span>
              </span>
              Global FX Exchange
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <h1 className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.15] sm:leading-[1.1]">
                Currency Exchange{" "}
                <br className="hidden sm:inline" />
                <span className="text-indigo-600 dark:text-indigo-400">
                  Reimagined.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Experience lightning-fast currency conversions, interactive trend analytics, and real-time market data wrapped in a clean, bank-grade secure environment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button 
                  onClick={() => navigateTo('home')} 
                  className="h-13 px-8 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md rounded-xl transition-all hover:scale-105"
                >
                  Open Full Converter <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  onClick={() => navigateTo('market')} 
                  variant="outline"
                  className="h-13 px-8 text-base font-semibold border border-border hover:bg-muted rounded-xl bg-card shadow-sm transition-all"
                >
                  Explore Interactive Charts
                </Button>
              </div>

              {/* Minimal inline stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border max-w-lg">
                <div>
                  <div className="text-2xl font-bold text-foreground">140+</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Supported Currencies</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">1 min</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Rate Refresh Period</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">Free</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Unlimited Conversions</div>
                </div>
              </div>
            </div>

            {/* Right Column: Mini-Converter */}
            <div className="lg:col-span-5">
              
              {/* Mini-Converter Card */}
              <Card className="border border-border bg-card shadow-sm rounded-2xl overflow-hidden relative">
                <div className="p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                        <ArrowLeftRight className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-sm tracking-wide text-foreground">Quick Converter</span>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live Rates
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Amount Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Enter amount..."
                          className="w-full h-11 px-4 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-foreground font-bold"
                        />
                      </div>
                    </div>

                    {/* From / To Controls */}
                    <div className="grid grid-cols-9 items-center gap-2">
                      
                      {/* From Currency */}
                      <div className="col-span-4 space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">From</label>
                        <select
                          value={fromCurrency}
                          onChange={(e) => setFromCurrency(e.target.value)}
                          className="w-full h-11 px-2.5 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-foreground font-semibold text-sm appearance-none cursor-pointer"
                          style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%23717182\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>')", backgroundPosition: "right 10px center", backgroundSize: "16px", backgroundRepeat: "no-repeat" }}
                        >
                          {POPULAR_CURRENCIES.map(c => (
                            <option key={c.code} value={c.code} className="bg-card text-foreground">
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Swap Button */}
                      <div className="col-span-1 flex justify-center pt-5">
                        <button
                          onClick={handleSwap}
                          type="button"
                          className="h-9 w-9 rounded-xl border border-border bg-card hover:bg-muted shadow-sm flex items-center justify-center text-foreground transition-all hover:scale-105"
                          title="Swap currencies"
                        >
                          <RefreshCw className={`h-4 w-4 text-indigo-500 ${swapSpin ? "animate-spin" : ""}`} />
                        </button>
                      </div>

                      {/* To Currency */}
                      <div className="col-span-4 space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">To</label>
                        <select
                          value={toCurrency}
                          onChange={(e) => setToCurrency(e.target.value)}
                          className="w-full h-11 px-2.5 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-foreground font-semibold text-sm appearance-none cursor-pointer"
                          style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%23717182\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>')", backgroundPosition: "right 10px center", backgroundSize: "16px", backgroundRepeat: "no-repeat" }}
                        >
                          {POPULAR_CURRENCIES.map(c => (
                            <option key={c.code} value={c.code} className="bg-card text-foreground">
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Result Panel */}
                  <div className="p-4 rounded-xl bg-muted/60 border border-border flex flex-col justify-center min-h-20 transition-all">
                    {isConverting ? (
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-medium text-indigo-500">Calculating Rate...</span>
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
                        Enter amount to see quick conversion.
                      </div>
                    )}
                  </div>
                </div>
              </Card>

            </div>

          </div>
        </section>

        {/* LIVE TICKER RATES BAR */}
        <section className="max-w-7xl mx-auto px-4">
          <style>{`
            @keyframes ticker-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .ticker-animate {
              animation: ticker-scroll 35s linear infinite;
            }
            .ticker-animate:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden py-3 relative">
            <div className="overflow-hidden">
              <div className="ticker-animate flex w-max gap-4">
                {[...rates, ...rates].map((r, i) => (
                  <div 
                    key={i} 
                    className="flex-shrink-0 px-6 py-2.5 flex items-center gap-3 border-r border-border hover:bg-muted transition-colors cursor-pointer rounded-lg"
                    onClick={() => {
                      if (MOCK_CHARTS[r.pair]) {
                        setActiveChartKey(r.pair);
                        const el = document.getElementById("ticker-target");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{r.pair}</span>
                    <span className="text-sm font-extrabold text-foreground tabular-nums">
                      {r.rate > 0 ? r.rate.toFixed(4) : "..."}
                    </span>
                    {r.rate > 0 && (
                      <span className={`flex items-center text-[10px] font-bold ${
                        r.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'
                      }`}>
                        {r.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TRENDING RATES CHART SECTION */}
        <section id="ticker-target" className="max-w-3xl mx-auto px-4 scroll-mt-24">
          <Card className="border border-border bg-card shadow-sm rounded-2xl overflow-hidden">
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm tracking-wide text-foreground">Trending Rates</span>
                <div className="flex gap-1.5 bg-muted p-0.5 rounded-lg">
                  {Object.keys(MOCK_CHARTS).map(key => (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveChartKey(key);
                        setHoveredPointIndex(null);
                      }}
                      className={`text-xs px-2 py-1 font-bold rounded-md transition-all ${
                        activeChartKey === key 
                          ? "bg-card text-foreground shadow-sm" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {key.split("/")[1]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Rate Metric Header */}
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{activeChartKey} Pair</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-foreground tracking-tight tabular-nums">
                      {activeChart.rate}
                    </span>
                    <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${
                      activeChart.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'
                    }`}>
                      {activeChart.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      {activeChart.change}
                    </span>
                  </div>
                </div>

                {/* Hover tooltip stats */}
                {hoveredPointIndex !== null && (
                  <div className="text-right">
                    <div className="text-[10px] text-muted-foreground font-bold uppercase">{activeChart.points[hoveredPointIndex].day}</div>
                    <div className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
                      {activeChart.points[hoveredPointIndex].val.toFixed(4)}
                    </div>
                  </div>
                )}
              </div>

              {/* SVG Chart Drawing */}
              <div className="relative pt-1">
                <svg
                  ref={svgRef}
                  viewBox="0 0 320 150"
                  className="w-full h-auto cursor-crosshair overflow-visible"
                  onMouseMove={handleSvgMouseMove}
                  onMouseLeave={handleSvgMouseLeave}
                >
                  <defs>
                    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#4f46e5" floodOpacity="0.1" />
                    </filter>
                  </defs>

                  {/* Y Grid Lines */}
                  <line x1="20" y1="20" x2="300" y2="20" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.6" />
                  <line x1="20" y1="60" x2="300" y2="60" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.6" />
                  <line x1="20" y1="100" x2="300" y2="100" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.6" />
                  <line x1="20" y1="130" x2="300" y2="130" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.6" />

                  {/* Area Under Curve */}
                  <path
                    d={areaPath}
                    fill="#4f46e5"
                    fillOpacity="0.05"
                    className="transition-all duration-500 ease-out"
                  />

                  {/* Trend Curve Path */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#shadow)"
                    className="transition-all duration-500 ease-out"
                  />

                  {/* Hover Indicator Vertical Line */}
                  {hoveredPointIndex !== null && (
                    <line
                      x1={chartCoordinates[hoveredPointIndex].x}
                      y1="10"
                      x2={chartCoordinates[hoveredPointIndex].x}
                      y2="140"
                      stroke="#4f46e5"
                      strokeWidth="1"
                      strokeDasharray="4,4"
                    />
                  )}

                  {/* Anchor dots */}
                  {chartCoordinates.map((c, i) => (
                    <circle
                      key={i}
                      cx={c.x}
                      cy={c.y}
                      r={hoveredPointIndex === i ? 5.5 : 3}
                      fill={hoveredPointIndex === i ? "#4f46e5" : "#ffffff"}
                      stroke="#4f46e5"
                      strokeWidth={hoveredPointIndex === i ? 2 : 1.5}
                      className="transition-all duration-150 cursor-pointer"
                    />
                  ))}
                </svg>
              </div>
            </div>
          </Card>
        </section>

        {/* QUICK STATS - MODERN SOLID CARDS */}
        <section className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Active Traders", value: "25M+" },
            { label: "Currency Pairs", value: "140+" },
            { label: "Uptime SLA", value: "99.99%" },
            { label: "Response Time", value: "< 120ms" }
          ].map((stat, idx) => (
            <Card key={idx} className="border border-border bg-card shadow-sm overflow-hidden group hover:border-indigo-500/50 transition-all duration-300">
              <div className="p-6">
                <div className="flex flex-col items-center sm:items-start space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight tabular-nums group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </section>

        {/* DETAILED FEATURES GRID */}
        <section className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Packed with Premium Features
            </h2>
            <p className="text-muted-foreground">
              Everything you need to calculate rates, review trends, and monitor foreign markets in one fast interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Real-Time Exchange Rates", desc: "Live FX values directly refreshed every minute to ensure absolute transactional accuracy.", icon: <Zap className="h-5 w-5" />, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-500/10" },
              { title: "Visual Analytics Charts", desc: "Interactive time-series graphs enabling full overview on currency trends over 7D, 30D, or 1Y.", icon: <BarChart3 className="h-5 w-5" />, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-500/10" },
              { title: "Global FX Coverage", desc: "Wide access for over 140+ countries and exotic currency pairs across all financial continents.", icon: <Globe className="h-5 w-5" />, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-500/10" },
              { title: "Enterprise-grade Safety", desc: "Encrypted secure socket layer connections protecting all calculated results and local user queries.", icon: <Shield className="h-5 w-5" />, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-500/10" },
            ].map((f, i) => (
              <Card key={i} className="border border-border bg-card shadow-sm overflow-hidden group hover:border-indigo-500/50 hover:bg-muted/30 transition-all duration-300 flex flex-col justify-between">
                <div className="p-6 space-y-4">
                  <div className={`h-11 w-11 rounded-xl ${f.bg} ${f.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-lg text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US SECTION */}
        <section className="max-w-6xl mx-auto px-4">
          <Card className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm text-foreground">
            
            <div className="relative z-10 p-8 sm:p-12 text-center md:text-left space-y-4 border-b border-border">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                Why Professional Traders Choose Us
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
                We combine industry-standard exchange calculations with premium analytical speed to offer the fastest currency conversions.
              </p>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-6 p-8 sm:p-12 bg-muted/20">
              {[ 
                { icon: Zap, title: "Aggregated Live Feed", desc: "Direct minute-by-minute rates aggregated from top central reserve banks and financial institutions." },
                { icon: BarChart3, title: "Deep Market History", desc: "Access standard historical parameters to run accurate comparison charts on active pairs." },
                { icon: Star, title: "Quick-Access Dashboard", desc: "Save frequently converted pairs as favorites to watch real-time rate differences at a glance." },
                { icon: Clock, title: "Always Active Service", desc: "Designed with serverless edge architecture, offering a guaranteed 99.99% uptime converter." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group flex gap-4 p-5 rounded-2xl border border-border bg-card shadow-sm hover:border-indigo-500/40 hover:bg-muted/30 transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-foreground">{item.title}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* INTERACTIVE FAQ ACCORDION SECTION */}
        <section className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-foreground">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Got questions? We've got answers.</p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFAQ === idx;
              return (
                <div 
                  key={idx}
                  className="border border-border rounded-2xl bg-card overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-foreground text-base sm:text-lg focus:outline-none hover:bg-muted transition-colors"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <div className={`h-8 w-8 rounded-full border border-border flex items-center justify-center text-foreground transition-transform duration-300 ${
                      isExpanded ? "rotate-180 bg-indigo-500/10 border-indigo-500/20 text-indigo-500" : ""
                    }`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  <div 
                    className="transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: isExpanded ? "200px" : "0",
                      opacity: isExpanded ? "1" : "0",
                      overflow: "hidden"
                    }}
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

        {/* CTA BANNER */}
        <section className="max-w-5xl mx-auto px-4">
          <Card className="bg-indigo-600 dark:bg-indigo-700 border-none shadow-md rounded-3xl overflow-hidden relative text-white">
            <div className="relative z-10 p-8 sm:p-12 text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to Convert Currencies?</h2>
              <p className="text-indigo-100 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
                Access full-featured converters, add favorites, set local currency alerts, and inspect deep financial analytics.
              </p>
              <div>
                <Button
                  onClick={() => navigateTo('home')}
                  className="h-12 px-8 text-base font-bold bg-white text-indigo-600 hover:bg-slate-100 shadow-md rounded-xl transition-all hover:scale-105"
                >
                  Start Converting Now
                </Button>
              </div>
            </div>
          </Card>
        </section>

      </div>
    </div>
  );
}