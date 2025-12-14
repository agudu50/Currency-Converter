import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { currencies, generateHistoricalData } from "../utils/currencyData";
import { useRouter } from "./components/Router"



export default function CurrencyChart() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [timeframe, setTimeframe] = useState("30");

  const chartData = generateHistoricalData(
    fromCurrency,
    toCurrency,
    parseInt(timeframe)
  );

  const formatTooltip = (value, name) => {
    return [value.toFixed(4), `${fromCurrency}/${toCurrency}`];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historical Exchange Rates</CardTitle>

        <div className="flex flex-wrap gap-4">
          {/* From currency */}
          <div className="flex items-center gap-2">
            <span className="text-sm">From:</span>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.slice(0, 8).map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* To currency */}
          <div className="flex items-center gap-2">
            <span className="text-sm">To:</span>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.slice(0, 8).map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Timeframe */}
          <div className="flex items-center gap-2">
            <span className="text-sm">Period:</span>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="dateFormatted"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={["dataMin - 0.01", "dataMax + 0.01"]}
              />
              <Tooltip
                formatter={formatTooltip}
                labelStyle={{ color: "var(--foreground)" }}
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "hsl(var(--chart-1))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-sm text-muted-foreground">Current Rate</div>
            <div className="font-semibold">
              {chartData[chartData.length - 1]?.rate.toFixed(4)}
            </div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground">Highest</div>
            <div className="font-semibold text-green-600">
              {Math.max(...chartData.map((d) => d.rate)).toFixed(4)}
            </div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground">Lowest</div>
            <div className="font-semibold text-red-600">
              {Math.min(...chartData.map((d) => d.rate)).toFixed(4)}
            </div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground">Change</div>
            <div
              className={`font-semibold ${
                chartData[chartData.length - 1]?.rate >
                chartData[0]?.rate
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {(
                ((chartData[chartData.length - 1]?.rate -
                  chartData[0]?.rate) /
                  chartData[0]?.rate) *
                100
              ).toFixed(2)}
              %
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
