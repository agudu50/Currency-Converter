import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown, RefreshCw, BarChart3 } from "lucide-react";
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

  useEffect(() => {
    loadRates();
  }, []);

  const calculateTrend = (historicalData) => {
    if (!historicalData || historicalData.length < 2) {
      return { trend: "neutral", change: 0 };
    }

    const oldestRate = historicalData[0].rate;
    const newestRate = historicalData[historicalData.length - 1].rate;
    const change = ((newestRate - oldestRate) / oldestRate * 100).toFixed(2);

    return {
      trend: parseFloat(change) >= 0 ? "up" : "down",
      change: parseFloat(change),
    };
  };

  const loadRates = async () => {
    setLoading(true);
    try {
      await fetchExchangeRates(baseCurrency);
      const available = new Set(getAvailableCurrencyCodes());

      // Filter to currencies present in live rates, then take top 12
      const topCurrencies = currencies
        .filter((currency) => currency.code !== baseCurrency && available.has(currency.code))
        .slice(0, 12);

      // Fetch historical data in one batch to avoid rate limits
      const symbols = topCurrencies.map(c => c.code);
      const historicalMap = await fetchHistoricalRatesBatch(baseCurrency, symbols, 7);

      const data = await Promise.all(topCurrencies.map(async (currency) => {
        const rate = await convertCurrencyAsync(1, baseCurrency, currency.code);
        const historicalData = historicalMap.get(currency.code) || [];
        const { trend, change } = calculateTrend(historicalData);
        return {
          ...currency,
          rate,
          trend,
          change,
          formattedRate: formatCurrency(rate, currency.code),
        };
      }));
      setRateData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load rates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden border border-border/70 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-background shadow-lg backdrop-blur-sm text-foreground">
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500/80 via-sky-500/70 to-cyan-400/70" />

      <CardHeader className="space-y-2 p-6 pb-4 bg-card/70 backdrop-blur-sm border-b border-border/60">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                <BarChart3 className="w-4 h-4" />
              </span>
              Live Exchange Rates
            </CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Base currency: {baseCurrency} {lastUpdated && `• Updated: ${lastUpdated.toLocaleTimeString()}`}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={loadRates}
            disabled={loading}
            className="text-primary hover:text-primary bg-primary/10 hover:bg-primary/20"
            aria-label="Refresh rates"
            title="Refresh rates"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6 bg-card/70 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/40">
                <TableHead className="text-xs sm:text-sm text-muted-foreground">Currency</TableHead>
                <TableHead className="text-xs sm:text-sm text-muted-foreground">Rate</TableHead>
                <TableHead className="text-xs sm:text-sm text-muted-foreground">24h Change</TableHead>
                <TableHead className="text-xs sm:text-sm text-muted-foreground">Trend</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rateData.map((currency) => (
                <TableRow key={currency.code} className="border-border/30 hover:border-primary/50 bg-card">
                  <TableCell className="text-foreground">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-base sm:text-lg">{currency.flag}</span>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-foreground">{currency.code}</div>
                        <div className="text-xs text-muted-foreground hidden sm:block">
                          {currency.name}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="font-mono text-xs sm:text-sm text-foreground">{currency.formattedRate}</TableCell>

                  <TableCell>
                    <div
                      className={`flex items-center gap-1 text-xs sm:text-sm font-semibold ${
                        currency.change >= 0 ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {currency.change >= 0 ? "+" : ""}
                      {currency.change}%
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="text-xs sm:text-sm border border-primary/20 bg-primary/10 text-primary inline-flex items-center"
                    >
                      {currency.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : currency.trend === "down" ? (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      ) : null}
                      <span className="hidden sm:inline capitalize">{currency.trend === "neutral" ? "stable" : currency.trend}</span>
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
