import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown, RefreshCw, BarChart3, Minus } from "lucide-react";
import { Button } from "./ui/button";
import {
  currencies,
  convertCurrencyAsync,
  formatCurrency,
  fetchExchangeRates,
  fetchHistoricalRatesBatch,
  getAvailableCurrencyCodes,
} from "../utils/currencyData";

export default function ExchangeRateTable() {
  const baseCurrency = "USD";
  const [rateData, setRateData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => { loadRates(); }, []);

  const calculateTrend = (historical) => {
    if (!historical || historical.length < 2) return { trend: "neutral", change: 0 };
    const old = historical[0].rate;
    const nw = historical[historical.length - 1].rate;
    const change = parseFloat(((nw - old) / old * 100).toFixed(2));
    return { trend: change >= 0 ? "up" : "down", change };
  };

  const loadRates = async () => {
    setLoading(true);
    setError(null);
    try {
      await fetchExchangeRates(baseCurrency, { requireLive: true });
      const available = new Set(getAvailableCurrencyCodes());
      const topCurrencies = currencies
        .filter(c => c.code !== baseCurrency && available.has(c.code))
        .slice(0, 12);

      const symbols = topCurrencies.map(c => c.code);
      const historicalMap = await fetchHistoricalRatesBatch(baseCurrency, symbols, 7);

      const data = await Promise.all(topCurrencies.map(async c => {
        const rate = await convertCurrencyAsync(1, baseCurrency, c.code, { requireLive: true });
        const hist = historicalMap.get(c.code) || [];
        const { trend, change } = calculateTrend(hist);
        return { ...c, rate, trend, change, formattedRate: formatCurrency(rate, c.code) };
      }));
      setRateData(data);
      setLastUpdated(new Date());
    } catch (e) {
      console.error("Failed to load rates:", e);
      setError(e.message || "Failed to load exchange rates");
    } finally {
      setLoading(false);
    }
  };

  const filtered = filter === "up"
    ? rateData.filter(r => r.trend === "up")
    : filter === "down"
    ? rateData.filter(r => r.trend === "down")
    : rateData;

  return (
    <Card className="card-glow overflow-hidden border border-border bg-card shadow-sm">
      {/* Header */}
      <CardHeader className="space-y-3 p-6 pb-4 bg-card border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400">
                <BarChart3 className="w-4 h-4" />
              </span>
              Live Exchange Rates
            </CardTitle>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 badge-pulse-dot" />
              <p className="text-xs text-muted-foreground">
                Base: {baseCurrency}
                {lastUpdated && ` · Updated ${lastUpdated.toLocaleTimeString()}`}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={loadRates}
            disabled={loading}
            className="h-9 w-9 rounded-xl text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-500/15 hover:bg-indigo-500/20 transition-all hover:scale-110"
            aria-label="Refresh rates"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1.5 bg-muted p-0.5 rounded-xl w-fit">
          {[
            { key: "all",  label: "All" },
            { key: "up",   label: "↑ Rising" },
            { key: "down", label: "↓ Falling" },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all duration-200 ${filter === f.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-0 bg-card">
        {error ? (
          <div className="flex flex-col items-center justify-center py-14 text-center px-6 space-y-3">
            <div className="h-12 w-12 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div className="text-rose-500 font-semibold">Failed to load rates</div>
            <div className="text-sm text-muted-foreground">{error}</div>
            <Button onClick={loadRates} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
              <RefreshCw className="h-3.5 w-3.5 mr-2" /> Retry
            </Button>
          </div>
        ) : loading && rateData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 gap-3">
            <div className="h-6 w-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-muted-foreground font-medium">Loading live rates…</p>
          </div>
        ) : (
          <div className={`overflow-x-auto transition-opacity duration-300 ${loading ? "opacity-50" : "opacity-100"}`}>
            <Table>
              <TableHeader>
                <TableRow className="border-border/40 hover:bg-transparent">
                  <TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-6">Currency</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Rate</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider">7d Change</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider pr-6">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((currency, i) => (
                  <TableRow
                    key={currency.code}
                    className="border-border/30 hover:bg-muted/40 transition-colors"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    {/* Currency */}
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{currency.flag}</span>
                        <div>
                          <div className="font-bold text-sm text-foreground">{currency.code}</div>
                          <div className="text-xs text-muted-foreground hidden sm:block">{currency.name}</div>
                        </div>
                      </div>
                    </TableCell>

                    {/* Rate */}
                    <TableCell className="font-mono text-sm font-semibold text-foreground tabular-nums">
                      {currency.formattedRate}
                    </TableCell>

                    {/* Change */}
                    <TableCell>
                      <span className={`text-sm font-bold tabular-nums ${currency.change >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600"}`}>
                        {currency.change >= 0 ? "+" : ""}{currency.change}%
                      </span>
                    </TableCell>

                    {/* Trend badge */}
                    <TableCell className="pr-6">
                      <Badge
                        className={`text-xs border inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-lg ${
                          currency.trend === "up"
                            ? "bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : currency.trend === "down"
                            ? "bg-rose-500/10 text-rose-600 border-rose-500/20"
                            : "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        {currency.trend === "up" ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : currency.trend === "down" ? (
                          <TrendingDown className="h-3 w-3" />
                        ) : (
                          <Minus className="h-3 w-3" />
                        )}
                        <span className="hidden sm:inline capitalize">
                          {currency.trend === "neutral" ? "Stable" : currency.trend}
                        </span>
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filtered.length === 0 && (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No currencies match this filter.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
