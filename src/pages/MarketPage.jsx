import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { TrendingUp, TrendingDown, Activity, DollarSign, Euro, RefreshCw } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { fetchHistoricalRates, fetchExchangeRates, convertCurrencyAsync } from "../utils/currencyData";

export function MarketPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  const [selectedMarket, setSelectedMarket] = useState("major");
  const [majorPairs, setMajorPairs] = useState([]);
  const [cryptoPairs, setCryptoPairs] = useState([]);
  const [exoticPairs, setExoticPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [marketOverview, setMarketOverview] = useState([]);
  const [liveFailed, setLiveFailed] = useState(false);
  const CG_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY || null;

  const fetchLiveCrypto = async () => {
    const endpoint = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum&price_change_percentage=24h&precision=4";
    const res = await fetch(endpoint, {
      headers: CG_API_KEY ? { "x-cg-demo-api-key": CG_API_KEY } : {},
    });
    if (!res.ok) throw new Error(`Crypto API error ${res.status}`);
    const data = await res.json();

    const formatNumber = (value, maximumFractionDigits = 2) =>
      new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);

    const formatCompact = (value) =>
      new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);

    return data.map((coin) => {
      const pct = coin.price_change_percentage_24h ?? 0;
      const changeValue = coin.current_price * (pct / 100);
      const trend = pct >= 0 ? "up" : "down";

      return {
        pair: `${coin.symbol?.toUpperCase() || "CRYPTO"}/USD`,
        price: formatNumber(coin.current_price, coin.current_price > 500 ? 0 : 2),
        change: `${pct >= 0 ? "+" : ""}${formatNumber(changeValue, 2)}`,
        changePercent: `${pct >= 0 ? "+" : ""}${formatNumber(pct, 2)}%`,
        trend,
        volume: formatCompact(coin.total_volume || 0),
      };
    });
  };

  // Load exchange rates
  const loadMarketData = async () => {
    setLoading(true);
    setLiveFailed(false);
    try {
      await fetchExchangeRates("USD", { requireLive: true });
      const tfDays = (tf => {
        switch (tf) {
          case "1D": return 1;
          case "1W": return 7;
          case "1M": return 30;
          case "3M": return 90;
          case "1Y": return 365;
          default: return 30;
        }
      })(selectedTimeframe);
      const historical = await fetchHistoricalRates("USD", "EUR", tfDays);

      // Major pairs
      const majorPairsConfig = [
        { pair: "EUR/USD", from: "EUR", to: "USD" },
        { pair: "GBP/USD", from: "GBP", to: "USD" },
        { pair: "USD/JPY", from: "USD", to: "JPY" },
        { pair: "USD/CHF", from: "USD", to: "CHF" },
      ];
      const majorData = await Promise.all(majorPairsConfig.map(async (item) => {
        const rate = await convertCurrencyAsync(1, item.from, item.to, { requireLive: true });
        const prevRate = rate * (1 + (Math.random() - 0.5) * 0.01); // Simulated previous rate
        const change = rate - prevRate;
        const changePercent = ((change / prevRate) * 100).toFixed(2);
        return {
          pair: item.pair,
          price: rate.toFixed(4),
          change: change >= 0 ? `+${change.toFixed(4)}` : change.toFixed(4),
          changePercent: change >= 0 ? `+${changePercent}%` : `${changePercent}%`,
          trend: change >= 0 ? "up" : "down",
          volume: `${(Math.random() * 2 + 0.5).toFixed(1)}B`,
        };
      }));
      setMajorPairs(majorData);
      // Crypto pairs (live)
      try {
        const liveCrypto = await fetchLiveCrypto();
        setCryptoPairs(liveCrypto);
      } catch (cryptoErr) {
        console.warn("Live crypto fetch failed, using fallback", cryptoErr);
        setCryptoPairs([
          { pair: "BTC/USD", price: "43,250", change: "+1,250", changePercent: "+2.98%", trend: "up", volume: "15.2B" },
          { pair: "ETH/USD", price: "2,680", change: "-45.20", changePercent: "-1.66%", trend: "down", volume: "8.9B" },
        ]);
      }

      // Exotic pairs
      const exoticPairsConfig = [
        { pair: "USD/TRY", from: "USD", to: "TRY" },
        { pair: "USD/ZAR", from: "USD", to: "ZAR" },
        { pair: "USD/MXN", from: "USD", to: "MXN" },
        { pair: "USD/BRL", from: "USD", to: "BRL" },
      ];
      const exoticData = await Promise.all(exoticPairsConfig.map(async (item) => {
        const rate = await convertCurrencyAsync(1, item.from, item.to, { requireLive: true });
        const prevRate = rate * (1 + (Math.random() - 0.5) * 0.01);
        const change = rate - prevRate;
        const changePercent = ((change / prevRate) * 100).toFixed(2);
        return {
          pair: item.pair,
          price: rate.toFixed(4),
          change: change >= 0 ? `+${change.toFixed(4)}` : change.toFixed(4),
          changePercent: change >= 0 ? `+${changePercent}%` : `${changePercent}%`,
          trend: change >= 0 ? "up" : "down",
          volume: `${(Math.random() * 500 + 100).toFixed(0)}M`,
        };
      }));
      setExoticPairs(exoticData);

      setMarketOverview(historical);
      setLastUpdated(new Date());
      setLiveFailed(false);
    } catch (error) {
      console.error("Error loading market data:", error);
      setLiveFailed(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMarketData();
  }, [selectedTimeframe]);

  const getMarketData = () => {
    switch (selectedMarket) {
      case "crypto":
        return cryptoPairs;
      case "exotic":
        return exoticPairs;
      default:
        return majorPairs;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Market Overview</h1>
        <p className="text-lg text-muted-foreground">
          Real-time currency markets, trends, and analysis
        </p>
      </div>

      {/* Market Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[ 
          {
            title: "Market Cap",
            value: "$7.2T",
            sub: "+2.3% today",
            icon: DollarSign,
            accent: "from-indigo-500/70 via-blue-500/60 to-cyan-400/60",
            bg: "from-indigo-500/10 via-blue-500/5 to-white",
          },
          {
            title: "24h Volume",
            value: "$156B",
            sub: "+5.7% from yesterday",
            icon: Activity,
            accent: "from-emerald-500/70 via-teal-400/60 to-lime-300/60",
            bg: "from-emerald-500/10 via-teal-500/5 to-white",
          },
          {
            title: "Active Pairs",
            value: "180+",
            sub: "Major & Exotic",
            icon: Euro,
            accent: "from-purple-500/70 via-pink-500/60 to-rose-400/60",
            bg: "from-purple-500/10 via-pink-500/5 to-background",
          },
          {
            title: "Volatility Index",
            value: "12.4",
            sub: "Moderate",
            icon: TrendingUp,
            accent: "from-amber-500/70 via-orange-500/60 to-rose-400/60",
            bg: "from-amber-500/10 via-orange-500/5 to-background",
          },
        ].map((item, idx) => (
          <Card
            key={idx}
            className={`overflow-hidden border border-border/50 bg-gradient-to-br ${item.bg} text-foreground shadow-lg`}
          >
            <div className={`h-1 w-full bg-gradient-to-r ${item.accent}`} />
            <CardContent className="relative p-5 sm:p-6 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <p className="text-2xl font-bold text-foreground drop-shadow-sm">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.sub}</p>
              </div>
              {(() => { const Icon = item.icon; return (
                <div className="p-3 rounded-full bg-card/75 text-foreground shadow-sm" aria-label={`${item.title} icon`}>
                  {Icon ? <Icon className="h-6 w-6" /> : null}
                </div>
              ); })()}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Chart */}
      <Card className="overflow-hidden border border-border/70 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-background shadow-lg backdrop-blur-sm text-foreground">
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500/80 via-sky-500/70 to-cyan-400/70" />

        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/70 backdrop-blur-sm border-b border-border/60 p-6 pb-4">
          <CardTitle className="text-xl font-semibold text-foreground">Market Trend - USD/EUR</CardTitle>
          <div className="flex gap-2 flex-wrap">
            {["1D", "1W", "1M", "3M", "1Y"].map((timeframe) => (
              <Button
                key={timeframe}
                variant={selectedTimeframe === timeframe ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe)}
                className={
                  selectedTimeframe === timeframe
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "border-border/60 text-foreground hover:border-primary hover:text-primary"
                }
              >
                {timeframe}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="bg-card/70 backdrop-blur-sm min-w-0 p-6">
          <div className="min-w-0 h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <AreaChart data={marketOverview}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.08)" />
                <XAxis dataKey="dateFormatted" tick={{ fontSize: 12, fill: '#0f172a' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#0f172a' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid rgba(15,23,42,0.1)', borderRadius: '10px', color: '#0f172a' }}
                  labelStyle={{ color: '#0f172a' }}
                />
                <Area type="monotone" dataKey="rate" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Currency Pairs Table */}
      <Card className="overflow-hidden border border-border/60 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-background text-foreground shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500/70 via-blue-500/60 to-cyan-400/60" />

        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60">
          <div>
            <CardTitle className="text-slate-900">Live Currency Pairs</CardTitle>
            {lastUpdated && (
              <p className="text-sm text-slate-700 mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <Select value={selectedMarket} onValueChange={setSelectedMarket}>
              <SelectTrigger className="w-48 bg-input-background text-foreground border border-border/60 shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="major">Major Pairs</SelectItem>
                <SelectItem value="crypto">Crypto Pairs</SelectItem>
                <SelectItem value="exotic">Exotic Pairs</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={loadMarketData}
              disabled={loading}
              className={`border-border/60 text-foreground bg-card hover:bg-muted ${loading ? 'animate-spin' : ''}`}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="border-t border-border/60 bg-card rounded-b-3xl">
          {loading && !lastUpdated ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-slate-500" />
            </div>
          ) : liveFailed ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="text-rose-500 mb-4">
                <Activity className="h-12 w-12" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Failed to Load Market Data</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Unable to fetch live exchange rates. Please check your internet connection and try again.
              </p>
              <Button onClick={loadMarketData} variant="default">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {getMarketData().map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-card/85 border border-border/60 rounded-xl hover:shadow-sm hover:-translate-y-[1px] transition-all text-foreground"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 bg-slate-900/5 rounded-full flex items-center justify-center text-slate-900 font-semibold text-sm">
                      {item.pair.split('/')[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.pair}</h3>
                      <p className="text-sm text-muted-foreground">Volume: {item.volume}</p>
                    </div>
                  </div>
                  <div className="text-right sm:text-right space-y-1">
                    <div className="font-mono text-lg font-semibold text-foreground">{item.price}</div>
                    <div className={`flex items-center gap-1 text-sm ${item.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {item.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      <span>{item.change}</span>
                      <Badge variant="secondary" className="border border-border/60 bg-muted text-foreground">
                        {item.changePercent}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Market Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[{
          title: "Top Gainers",
          icon: TrendingUp,
          accent: "from-emerald-500/80 via-green-500/70 to-teal-400/70",
          items: [
            { pair: "NZD/USD", change: "+1.89%" },
            { pair: "AUD/JPY", change: "+1.45%" },
          ],
        }, {
          title: "Top Losers",
          icon: TrendingDown,
          accent: "from-rose-500/80 via-red-500/70 to-orange-400/70",
          items: [
            { pair: "USD/TRY", change: "-2.34%" },
            { pair: "GBP/JPY", change: "-1.67%" },
          ],
        }].map((block, idx) => (
          <Card key={idx} className="overflow-hidden border border-border/70 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-background shadow-lg backdrop-blur-sm text-foreground">
            <div className={`h-1 w-full bg-gradient-to-r ${block.accent}`} />

            <CardHeader className="flex items-center gap-2 bg-card/70 backdrop-blur-sm border-b border-border/60 p-6 pb-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <block.icon className="h-4 w-4" />
              </span>
              <CardTitle className="text-lg font-semibold text-foreground">{block.title}</CardTitle>
            </CardHeader>

            <CardContent className="p-6 bg-card/70 backdrop-blur-sm space-y-3">
              {block.items.map((item, i) => {
                const isNegative = item.change.trim().startsWith("-");
                const badgeTone = isNegative
                  ? "text-rose-700 border border-rose-200 bg-rose-50"
                  : "text-emerald-700 border border-emerald-200 bg-emerald-50";
                return (
                  <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-card border border-border/60 hover:border-primary/60 hover:shadow-sm transition-colors">
                    <span className="font-semibold text-foreground">{item.pair}</span>
                    <Badge variant="secondary" className={`${badgeTone} font-semibold`}>
                      {item.change}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
