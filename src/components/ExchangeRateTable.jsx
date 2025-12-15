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
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  currencies,
  convertCurrency,
  formatCurrency,
} from "../utils/currencyData";


export default function ExchangeRateTable() {
  const baseCurrency = "USD";

  // Generate rate data with mock trend information
  const rateData = currencies
    .filter((currency) => currency.code !== baseCurrency)
    .map((currency) => {
      const rate = convertCurrency(1, baseCurrency, currency.code);
      // Mock trend data - in a real app this would come from historical data
      const trend = Math.random() > 0.5 ? "up" : "down";
      const change = (Math.random() * 2 - 1).toFixed(2); // Random change between -1 and 1

      return {
        ...currency,
        rate,
        trend,
        change: parseFloat(change),
        formattedRate: formatCurrency(rate, currency.code),
      };
    })
    .slice(0, 12); // Show top 12 currencies

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Exchange Rates</CardTitle>
        <p className="text-sm text-muted-foreground">
          Base currency: {baseCurrency} • Updated every minute
        </p>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Currency</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>24h Change</TableHead>
              <TableHead>Trend</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rateData.map((currency) => (
              <TableRow key={currency.code}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{currency.flag}</span>
                    <div>
                      <div className="font-medium">{currency.code}</div>
                      <div className="text-sm text-muted-foreground">
                        {currency.name}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="font-mono">{currency.formattedRate}</TableCell>

                <TableCell>
                  <div
                    className={`flex items-center gap-1 ${
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
                    className={
                      currency.trend === "up"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {currency.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {currency.trend}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
