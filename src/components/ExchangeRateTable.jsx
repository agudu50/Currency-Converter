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
  convertCurrency,
  formatCurrency,
  fetchExchangeRates,
} from "../utils/currencyData";


export default function ExchangeRateTable() {
  const baseCurrency = "USD";
  const [rateData, setRateData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    loadRates();
  }, []);

  const loadRates = async () => {
    setLoading(true);
    try {
      await fetchExchangeRates(baseCurrency);
      
      // Generate rate data with mock trend information
      const data = currencies
        .filter((currency) => currency.code !== baseCurrency)
        .map((currency) => {
          const rate = convertCurrency(1, baseCurrency, currency.code);
          // Mock trend data - in a real app this would come from historical data
          const trend = Math.random() > 0.5 ? "up" : "down";
          const change = (Math.random() * 2 - 1).toFixed(2);

          return {
            ...currency,
            rate,
            trend,
            change: parseFloat(change),
            formattedRate: formatCurrency(rate, currency.code),
          };
        })
        .slice(0, 12); // Show top 12 currencies
      
      setRateData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load rates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-blue-600 to-emerald-400 opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />

      <CardHeader className="relative z-10 p-6 border-b border-white/15">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-sm font-semibold">
                <BarChart3 className="w-4 h-4" />
              </span>
              Live Exchange Rates
            </CardTitle>
            <p className="text-xs sm:text-sm text-white/70 mt-1">
              Base currency: {baseCurrency} {lastUpdated && `• Updated: ${lastUpdated.toLocaleTimeString()}`}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={loadRates}
            disabled={loading}
            className={`text-white/80 hover:text-white bg-white/10 hover:bg-white/20 ${loading ? 'animate-spin' : ''}`}
            aria-label="Refresh rates"
            title="Refresh rates"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 p-6 bg-white/5 backdrop-blur-sm rounded-b-3xl border border-white/10 border-t-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-xs sm:text-sm text-white/70">Currency</TableHead>
                <TableHead className="text-xs sm:text-sm text-white/70">Rate</TableHead>
                <TableHead className="text-xs sm:text-sm text-white/70">24h Change</TableHead>
                <TableHead className="text-xs sm:text-sm text-white/70">Trend</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rateData.map((currency) => (
                <TableRow key={currency.code} className="border-white/10 hover:bg-white/10">
                  <TableCell className="text-white">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-base sm:text-lg">{currency.flag}</span>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-white">{currency.code}</div>
                        <div className="text-xs text-white/70 hidden sm:block">
                          {currency.name}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="font-mono text-xs sm:text-sm text-white/90">{currency.formattedRate}</TableCell>

                  <TableCell>
                    <div
                      className={`flex items-center gap-1 text-xs sm:text-sm font-semibold ${
                        currency.change >= 0 ? "text-emerald-200" : "text-rose-200"
                      }`}
                    >
                      {currency.change >= 0 ? "+" : ""}
                      {currency.change}%
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`text-xs sm:text-sm border border-white/25 bg-white/15 text-white inline-flex items-center ${
                        currency.trend === "up" ? "" : ""
                      }`}
                    >
                      {currency.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      <span className="hidden sm:inline capitalize">{currency.trend}</span>
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
