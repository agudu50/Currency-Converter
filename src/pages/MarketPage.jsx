import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { TrendingUp, TrendingDown, Activity, DollarSign, Euro, RefreshCw } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { generateHistoricalData, fetchExchangeRates, convertCurrency } from "../utils/currencyData";

export function MarketPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  const [selectedMarket, setSelectedMarket] = useState("major");
  const [majorPairs, setMajorPairs] = useState([]);
  const [cryptoPairs, setCryptoPairs] = useState([]);
  const [exoticPairs, setExoticPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Load exchange rates
  const loadMarketData = async () => {
    setLoading(true);
    try {
      await fetchExchangeRates('USD');
      
      // Major pairs
      const majorData = [
        { pair: "EUR/USD", from: "EUR", to: "USD" },
        { pair: "GBP/USD", from: "GBP", to: "USD" },
        { pair: "USD/JPY", from: "USD", to: "JPY" },
        { pair: "USD/CHF", from: "USD", to: "CHF" },
      ].map(item => {
        const rate = convertCurrency(1, item.from, item.to);
        const prevRate = rate * (1 + (Math.random() - 0.5) * 0.01); // Simulate previous rate
        const change = rate - prevRate;
        const changePercent = ((change / prevRate) * 100).toFixed(2);
        return {
          pair: item.pair,
          price: rate.toFixed(4),
          change: change >= 0 ? `+${change.toFixed(4)}` : change.toFixed(4),
          changePercent: change >= 0 ? `+${changePercent}%` : `${changePercent}%`,
          trend: change >= 0 ? "up" : "down",
          volume: `${(Math.random() * 2 + 0.5).toFixed(1)}B`
        };
      });
      setMajorPairs(majorData);

      // Crypto pairs (using mock data as API doesn't support crypto)
      setCryptoPairs([
        { pair: "BTC/USD", price: "43,250", change: "+1,250", changePercent: "+2.98%", trend: "up", volume: "15.2B" },
        { pair: "ETH/USD", price: "2,680", change: "-45.20", changePercent: "-1.66%", trend: "down", volume: "8.9B" },
      ]);

      // Exotic pairs
      const exoticData = [
        { pair: "USD/TRY", from: "USD", to: "TRY" },
        { pair: "USD/ZAR", from: "USD", to: "ZAR" },
        { pair: "USD/MXN", from: "USD", to: "MXN" },
        { pair: "USD/BRL", from: "USD", to: "BRL" },
      ].map(item => {
        const rate = convertCurrency(1, item.from, item.to);
        const prevRate = rate * (1 + (Math.random() - 0.5) * 0.01);
        const change = rate - prevRate;
        const changePercent = ((change / prevRate) * 100).toFixed(2);
        return {
          pair: item.pair,
          price: rate.toFixed(4),
          change: change >= 0 ? `+${change.toFixed(4)}` : change.toFixed(4),
          changePercent: change >= 0 ? `+${changePercent}%` : `${changePercent}%`,
          trend: change >= 0 ? "up" : "down",
          volume: `${(Math.random() * 500 + 100).toFixed(0)}M`
        };
      });
      setExoticPairs(exoticData);

      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading market data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMarketData();
  }, []);

  const getMarketData = () => {
    switch (selectedMarket) {
      case "crypto": return cryptoPairs;
      case "exotic": return exoticPairs;
      default: return majorPairs;
    }
  };

  const marketOverview = generateHistoricalData("USD", "EUR", 30);

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
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="text-2xl font-bold text-green-600">$7.2T</p>
              <p className="text-sm text-green-600">+2.3% today</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">24h Volume</p>
              <p className="text-2xl font-bold text-blue-600">$156B</p>
              <p className="text-sm text-blue-600">+5.7% from yesterday</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Pairs</p>
              <p className="text-2xl font-bold text-purple-600">180+</p>
              <p className="text-sm text-purple-600">Major & Exotic</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Euro className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Volatility Index</p>
              <p className="text-2xl font-bold text-orange-600">12.4</p>
              <p className="text-sm text-orange-600">Moderate</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Chart */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle>Market Trend - USD/EUR</CardTitle>
          <div className="flex gap-2">
            {["1D", "1W", "1M", "3M", "1Y"].map((timeframe) => (
              <Button
                key={timeframe}
                variant={selectedTimeframe === timeframe ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe)}
              >
                {timeframe}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketOverview}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="dateFormatted" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="rate" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.2} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Currency Pairs Table */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Live Currency Pairs</CardTitle>
            {lastUpdated && (
              <p className="text-sm text-muted-foreground mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <Select value={selectedMarket} onValueChange={setSelectedMarket}>
              <SelectTrigger className="w-48">
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
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading && !lastUpdated ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-4">
              {getMarketData().map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-primary text-sm">{item.pair.split('/')[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.pair}</h3>
                      <p className="text-sm text-muted-foreground">Volume: {item.volume}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-lg font-semibold">{item.price}</div>
                    <div className={`flex items-center gap-1 text-sm ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      <span>{item.change}</span>
                      <Badge variant={item.trend === 'up' ? 'default' : 'destructive'}>
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Top Gainers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { pair: "NZD/USD", change: "+1.89%" },
                { pair: "AUD/JPY", change: "+1.45%" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{item.pair}</span>
                  <Badge className="bg-green-100 text-green-800">{item.change}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              Top Losers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { pair: "USD/TRY", change: "-2.34%" },
                { pair: "GBP/JPY", change: "-1.67%" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{item.pair}</span>
                  <Badge variant="destructive">{item.change}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
