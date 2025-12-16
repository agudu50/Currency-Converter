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
    <Card className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
      <CardHeader className="p-6 border-b border-slate-100 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" /> Live Exchange Rates
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
            className={`${loading ? 'animate-spin' : ''}`}
            aria-label="Refresh rates"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs sm:text-sm">Currency</TableHead>
                <TableHead className="text-xs sm:text-sm">Rate</TableHead>
                <TableHead className="text-xs sm:text-sm">24h Change</TableHead>
                <TableHead className="text-xs sm:text-sm">Trend</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rateData.map((currency) => (
                <TableRow key={currency.code}>
                  <TableCell>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-base sm:text-lg">{currency.flag}</span>
                      <div>
                        <div className="font-medium text-xs sm:text-sm">{currency.code}</div>
                        <div className="text-xs text-muted-foreground hidden sm:block">
                          {currency.name}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="font-mono text-xs sm:text-sm">{currency.formattedRate}</TableCell>

                  <TableCell>
                    <div
                      className={`flex items-center gap-1 text-xs sm:text-sm ${
                        currency.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {currency.change >= 0 ? "+" : ""}
                      {currency.change}%
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={currency.trend === "up" ? "default" : "secondary"}
                      className={`text-xs sm:text-sm ${
                        currency.trend === "up"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {currency.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      <span className="hidden sm:inline">{currency.trend}</span>
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
