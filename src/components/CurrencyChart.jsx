import { useEffect, useState } from "react";
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
import { currencies, fetchHistoricalRates, getAvailableCurrencyCodes, fetchExchangeRates } from "../utils/currencyData";
import { Activity } from "lucide-react";



export default function CurrencyChart() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [timeframe, setTimeframe] = useState("30");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ensure live codes are available for dropdowns
  useEffect(() => {
    fetchExchangeRates("USD").catch(() => {});
  }, []);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      const data = await fetchHistoricalRates(fromCurrency, toCurrency, parseInt(timeframe));
      if (active) setChartData(data);
      setLoading(false);
    };
    load();
    return () => { active = false; };
  }, [fromCurrency, toCurrency, timeframe]);

  const formatTooltip = (value, name) => {
    return [value.toFixed(4), `${fromCurrency}/${toCurrency}`];
  };

  return (
    <Card className="overflow-hidden border border-border/70 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-background shadow-lg backdrop-blur-sm text-foreground">
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500/80 via-sky-500/70 to-cyan-400/70" />

      <CardHeader className="space-y-2 p-6 pb-4 bg-card/70 backdrop-blur-sm border-b border-border/60">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                <Activity className="w-4 h-4" />
              </span>
              Historical Exchange Rates
            </CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Track trends between popular pairs over time
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* From currency */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">From:</span>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-32 bg-input-background border border-border/60 text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {(() => {
                      const live = new Set(getAvailableCurrencyCodes());
                      return currencies.filter(c => live.has(c.code)).slice(0, 20).map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code}</span>
                      </div>
                    </SelectItem>
                      ));
                    })()}
                </SelectContent>
              </Select>
            </div>

            {/* To currency */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">To:</span>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-32 bg-input-background border border-border/60 text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(() => {
                    const live = new Set(getAvailableCurrencyCodes());
                    return currencies.filter(c => live.has(c.code)).slice(0, 20).map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code}</span>
                      </div>
                    </SelectItem>
                    ));
                  })()}
                </SelectContent>
              </Select>
            </div>

            {/* Timeframe */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Period:</span>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-32 bg-input-background border border-border/60 text-foreground">
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
        </div>
      </CardHeader>

      <CardContent className="p-6 bg-card/70 backdrop-blur-sm min-w-0">
          <div className="min-w-0 h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.08)" />
              <XAxis
                dataKey="dateFormatted"
                tick={{ fontSize: 12, fill: "#0f172a" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#0f172a" }}
                axisLine={false}
                tickLine={false}
                domain={["dataMin - 0.01", "dataMax + 0.01"]}
              />
              <Tooltip
                formatter={formatTooltip}
                labelStyle={{ color: "#0f172a" }}
                contentStyle={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  border: "1px solid rgba(15,23,42,0.1)",
                  borderRadius: "10px",
                  color: "#0f172a",
                }}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, fill: "#2563eb" }}
                isAnimationActive={!loading}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-card border border-border/60 rounded-xl p-3 shadow-sm">
            <div className="text-sm text-muted-foreground">Current Rate</div>
            <div className="font-semibold text-foreground">
              {chartData[chartData.length - 1]?.rate?.toFixed(4) ?? "-"}
            </div>
          </div>

          <div className="bg-card border border-border/60 rounded-xl p-3 shadow-sm">
            <div className="text-sm text-muted-foreground">Highest</div>
            <div className="font-semibold text-emerald-600">
              {chartData.length ? Math.max(...chartData.map((d) => d.rate)).toFixed(4) : "-"}
            </div>
          </div>

          <div className="bg-card border border-border/60 rounded-xl p-3 shadow-sm">
            <div className="text-sm text-muted-foreground">Lowest</div>
            <div className="font-semibold text-rose-600">
              {chartData.length ? Math.min(...chartData.map((d) => d.rate)).toFixed(4) : "-"}
            </div>
          </div>

          <div className="bg-card border border-border/60 rounded-xl p-3 shadow-sm">
            <div className="text-sm text-muted-foreground">Change</div>
            <div
              className={`font-semibold ${
                chartData[chartData.length - 1]?.rate >
                chartData[0]?.rate
                  ? "text-emerald-600"
                  : "text-rose-600"
              }`}
            >
              {chartData.length > 1 && chartData[0]?.rate
                ? (
                    ((chartData[chartData.length - 1]?.rate - chartData[0]?.rate) /
                      chartData[0]?.rate) *
                    100
                  ).toFixed(2)
                : "-"}
              %
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
