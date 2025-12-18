import { useEffect, useMemo, useState } from "react";
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
import { currencies, fetchHistoricalRates } from "../utils/currencyData";
import { Activity } from "lucide-react";



export default function CurrencyChart() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [timeframe, setTimeframe] = useState("30");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-cyan-500 to-teal-400 opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.16),transparent_30%)]" />

      <CardHeader className="relative z-10 p-6 border-b border-white/15">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-sm font-semibold">
                <Activity className="w-4 h-4" />
              </span>
              Historical Exchange Rates
            </CardTitle>
            <p className="text-xs sm:text-sm text-white/70 mt-2">
              Track trends between popular pairs over time
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* From currency */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/80">From:</span>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-32 bg-white/90 text-slate-900 border-white/40">
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
              <span className="text-sm text-white/80">To:</span>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-32 bg-white/90 text-slate-900 border-white/40">
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
              <span className="text-sm text-white/80">Period:</span>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-32 bg-white/90 text-slate-900 border-white/40">
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

      <CardContent className="relative z-10 p-6 bg-white/5 backdrop-blur-sm rounded-b-3xl border border-white/10 border-t-0">
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
              <XAxis
                dataKey="dateFormatted"
                tick={{ fontSize: 12, fill: "#e2e8f0" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#e2e8f0" }}
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
                stroke="#e0f2fe"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, fill: "#e0f2fe" }}
                isAnimationActive={!loading}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white/10 border border-white/15 rounded-xl p-3">
            <div className="text-sm text-white/70">Current Rate</div>
            <div className="font-semibold text-white">
              {chartData[chartData.length - 1]?.rate?.toFixed(4) ?? "-"}
            </div>
          </div>

          <div className="bg-white/10 border border-white/15 rounded-xl p-3">
            <div className="text-sm text-white/70">Highest</div>
            <div className="font-semibold text-emerald-200">
              {chartData.length ? Math.max(...chartData.map((d) => d.rate)).toFixed(4) : "-"}
            </div>
          </div>

          <div className="bg-white/10 border border-white/15 rounded-xl p-3">
            <div className="text-sm text-white/70">Lowest</div>
            <div className="font-semibold text-rose-200">
              {chartData.length ? Math.min(...chartData.map((d) => d.rate)).toFixed(4) : "-"}
            </div>
          </div>

          <div className="bg-white/10 border border-white/15 rounded-xl p-3">
            <div className="text-sm text-white/70">Change</div>
            <div
              className={`font-semibold ${
                chartData[chartData.length - 1]?.rate >
                chartData[0]?.rate
                  ? "text-emerald-200"
                  : "text-rose-200"
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
