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

  // Load exchange rates
  const loadMarketData = async () => {
    setLoading(true);
    try {
      await fetchExchangeRates("USD");
      const historical = await fetchHistoricalRates("USD", "EUR", 30);

      // Major pairs
      const majorPairsConfig = [
        { pair: "EUR/USD", from: "EUR", to: "USD" },
        { pair: "GBP/USD", from: "GBP", to: "USD" },
        { pair: "USD/JPY", from: "USD", to: "JPY" },
        { pair: "USD/CHF", from: "USD", to: "CHF" },
      ];
      const majorData = await Promise.all(majorPairsConfig.map(async (item) => {
        const rate = await convertCurrencyAsync(1, item.from, item.to);
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

      // Crypto pairs (mock data)
      setCryptoPairs([
        { pair: "BTC/USD", price: "43,250", change: "+1,250", changePercent: "+2.98%", trend: "up", volume: "15.2B" },
        { pair: "ETH/USD", price: "2,680", change: "-45.20", changePercent: "-1.66%", trend: "down", volume: "8.9B" },
      ]);

      // Exotic pairs
      const exoticPairsConfig = [
        { pair: "USD/TRY", from: "USD", to: "TRY" },
        { pair: "USD/ZAR", from: "USD", to: "ZAR" },
        { pair: "USD/MXN", from: "USD", to: "MXN" },
        { pair: "USD/BRL", from: "USD", to: "BRL" },
      ];
      const exoticData = await Promise.all(exoticPairsConfig.map(async (item) => {
        const rate = await convertCurrencyAsync(1, item.from, item.to);
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
    } catch (error) {
      console.error("Error loading market data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMarketData();
  }, []);

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
          { title: "Market Cap", value: "$7.2T", sub: "+2.3% today", icon: DollarSign, gradient: "from-emerald-500 via-green-500 to-teal-400" },
          { title: "24h Volume", value: "$156B", sub: "+5.7% from yesterday", icon: Activity, gradient: "from-blue-500 via-indigo-500 to-cyan-400" },
          { title: "Active Pairs", value: "180+", sub: "Major & Exotic", icon: Euro, gradient: "from-purple-500 via-fuchsia-500 to-pink-400" },
          { title: "Volatility Index", value: "12.4", sub: "Moderate", icon: TrendingUp, gradient: "from-amber-500 via-orange-500 to-rose-400" },
        ].map((item, idx) => (
          <Card key={idx} className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-90`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.18),transparent_30%)]" />
            <CardContent className="relative p-6 flex items-center justify-between bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <div className="space-y-1">
                <p className="text-sm text-white/80">{item.title}</p>
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="text-sm text-white/80">{item.sub}</p>
              </div>
              <div className="p-3 rounded-full bg-white/15 backdrop-blur-sm text-white">
                <item.icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Chart */}
      <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-blue-600 to-emerald-400 opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />

        <CardHeader className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/15">
          <CardTitle className="text-xl font-semibold text-white">Market Trend - USD/EUR</CardTitle>
          <div className="flex gap-2 flex-wrap">
            {["1D", "1W", "1M", "3M", "1Y"].map((timeframe) => (
              <Button
                key={timeframe}
                variant={selectedTimeframe === timeframe ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe)}
                className={selectedTimeframe === timeframe ? "bg-white text-slate-900 hover:bg-white/90" : "border-white/40 text-white hover:bg-white/10"}
              >
                {timeframe}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="relative z-10 bg-white/5 backdrop-blur-sm rounded-b-3xl border border-white/10 border-t-0">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketOverview}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
                <XAxis dataKey="dateFormatted" tick={{ fontSize: 12, fill: '#e2e8f0' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#e2e8f0' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid rgba(15,23,42,0.1)', borderRadius: '10px', color: '#0f172a' }}
                  labelStyle={{ color: '#0f172a' }}
                />
                <Area type="monotone" dataKey="rate" stroke="#e0f2fe" fill="#e0f2fe" fillOpacity={0.2} strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Currency Pairs Table */}
      <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-blue-600 to-emerald-400 opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />

        <CardHeader className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/15">
          <div>
            <CardTitle className="text-white">Live Currency Pairs</CardTitle>
            {lastUpdated && (
              <p className="text-sm text-white/70 mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <Select value={selectedMarket} onValueChange={setSelectedMarket}>
              <SelectTrigger className="w-48 bg-white/90 text-slate-900 border-white/40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="major">Major Pairs</SelectItem>
                <SelectItem value="crypto">Crypto Pairs</SelectItem>
                <SelectItem value="exotic">Exotic Pairs</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={loadMarketData}
              disabled={loading}
              className={`text-white/80 hover:text-white bg-white/10 hover:bg-white/20 ${loading ? 'animate-spin' : ''}`}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="relative z-10 bg-white/5 backdrop-blur-sm rounded-b-3xl border border-white/10 border-t-0">
          {loading && !lastUpdated ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-white/70" />
            </div>
          ) : (
            <div className="space-y-4">
              {getMarketData().map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white/10 border border-white/15 rounded-xl hover:bg-white/15 transition-colors">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center text-white">
                      <span className="font-semibold text-sm">{item.pair.split('/')[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{item.pair}</h3>
                      <p className="text-sm text-white/70">Volume: {item.volume}</p>
                    </div>
                  </div>
                  <div className="text-right sm:text-right">
                    <div className="font-mono text-lg font-semibold text-white">{item.price}</div>
                    <div className={`flex items-center gap-1 text-sm ${item.trend === 'up' ? 'text-emerald-200' : 'text-rose-200'}`}>
                      {item.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      <span>{item.change}</span>
                      <Badge variant="secondary" className="border border-white/25 bg-white/15 text-white">
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
          color: "from-emerald-500 via-green-500 to-teal-400",
          items: [
            { pair: "NZD/USD", change: "+1.89%" },
            { pair: "AUD/JPY", change: "+1.45%" },
          ],
          badgeClass: "text-emerald-200 border border-emerald-200/40 bg-white/10",
        }, {
          title: "Top Losers",
          icon: TrendingDown,
          color: "from-rose-500 via-red-500 to-orange-400",
          items: [
            { pair: "USD/TRY", change: "-2.34%" },
            { pair: "GBP/JPY", change: "-1.67%" },
          ],
          badgeClass: "text-rose-200 border border-rose-200/40 bg-white/10",
        }].map((block, idx) => (
          <Card key={idx} className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
            <div className={`absolute inset-0 bg-gradient-to-br ${block.color} opacity-90`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.18),transparent_30%)]" />

            <CardHeader className="relative z-10 pb-2 border-b border-white/15">
              <CardTitle className="flex items-center gap-2 text-white">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                  <block.icon className="h-4 w-4" />
                </span>
                {block.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 p-6 bg-white/5 backdrop-blur-sm rounded-b-3xl border border-white/10 border-t-0 space-y-3">
              {block.items.map((item, i) => {
                const isNegative = item.change.trim().startsWith("-");
                const badgeTone = isNegative
                  ? "text-rose-200 border border-rose-200/40 bg-white/10"
                  : "text-emerald-200 border border-emerald-200/40 bg-white/10";
                return (
                  <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/10 border border-white/15 hover:bg-white/15 transition-colors">
                    <span className="font-semibold text-white">{item.pair}</span>
                    <Badge variant="secondary" className={badgeTone}>
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
