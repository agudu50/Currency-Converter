import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "./ui/select";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  currencies, fetchHistoricalRates, getAvailableCurrencyCodes, fetchExchangeRates,
} from "../utils/currencyData";
import { Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";

// Theme-aware chart tooltip
function ChartTooltip({ active, payload, label, fromCurrency, toCurrency }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl px-3.5 py-2.5 shadow-md text-foreground text-xs font-medium">
      <div className="text-muted-foreground mb-0.5">{label}</div>
      <div className="text-base font-extrabold tabular-nums text-indigo-600 dark:text-indigo-400">
        {payload[0].value?.toFixed(5)}
      </div>
      <div className="text-muted-foreground text-[10px] mt-0.5">
        {fromCurrency}/{toCurrency}
      </div>
    </div>
  );
}

export default function CurrencyChart() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [timeframe, setTimeframe] = useState("30");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExchangeRates("USD", { requireLive: true }).catch(() => {});
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

  const liveCodes = new Set(getAvailableCurrencyCodes());

  // Compute stats from chartData
  const latest = chartData[chartData.length - 1]?.rate;
  const first = chartData[0]?.rate;
  const highest = chartData.length ? Math.max(...chartData.map(d => d.rate)) : null;
  const lowest = chartData.length ? Math.min(...chartData.map(d => d.rate)) : null;
  const changePct = (latest && first) ? (((latest - first) / first) * 100).toFixed(2) : null;
  const isUp = changePct >= 0;

  return (
    <Card className="card-glow overflow-hidden border border-border bg-card shadow-sm">
      {/* Header */}
      <CardHeader className="space-y-3 p-6 pb-4 bg-card border-b border-border">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <CardTitle className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400">
                <Activity className="w-4 h-4" />
              </span>
              Historical Exchange Rates
            </CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1.5">
              Track trends between popular currency pairs over time
            </p>
          </div>

          {/* Timeframe tabs */}
          <div className="flex gap-1.5 bg-muted p-0.5 rounded-xl">
            {[{ val: "7", label: "7D" }, { val: "30", label: "30D" }, { val: "90", label: "90D" }, { val: "365", label: "1Y" }].map(t => (
              <button
                key={t.val}
                onClick={() => setTimeframe(t.val)}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all duration-200 ${timeframe === t.val ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Currency selectors */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">From:</span>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="w-28 bg-[var(--input-background)] border border-border text-foreground text-sm font-semibold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-48" side="bottom">
                {currencies.filter(c => liveCodes.has(c.code)).slice(0, 20).map(c => (
                  <SelectItem key={c.code} value={c.code}>
                    <div className="flex items-center gap-2">
                      <span>{c.flag}</span><span>{c.code}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <span className="text-muted-foreground text-sm font-bold">→</span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">To:</span>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="w-28 bg-[var(--input-background)] border border-border text-foreground text-sm font-semibold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-48" side="bottom">
                {currencies.filter(c => liveCodes.has(c.code)).slice(0, 20).map(c => (
                  <SelectItem key={c.code} value={c.code}>
                    <div className="flex items-center gap-2">
                      <span>{c.flag}</span><span>{c.code}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Live change badge */}
          {changePct !== null && (
            <div className={`ml-auto flex items-center gap-1 text-sm font-bold px-3 py-1.5 rounded-xl border ${
              isUp
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                : "bg-rose-500/10 border-rose-500/20 text-rose-600"
            }`}>
              {isUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              {isUp ? "+" : ""}{changePct}%
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 bg-card min-w-0">
        {/* Chart */}
        <div className={`min-w-0 h-64 sm:h-80 transition-opacity duration-300 ${loading ? "opacity-40" : "opacity-100"}`}>
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <LineChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.5} />
              <XAxis
                dataKey="dateFormatted"
                tick={{ fontSize: 11, fill: "currentColor" }}
                className="text-muted-foreground"
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 11, fill: "currentColor" }}
                className="text-muted-foreground"
                axisLine={false}
                tickLine={false}
                domain={["dataMin - 0.005", "dataMax + 0.005"]}
                tickCount={5}
              />
              <Tooltip
                content={<ChartTooltip fromCurrency={fromCurrency} toCurrency={toCurrency} />}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#4f46e5"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, fill: "#4f46e5", strokeWidth: 0 }}
                isAnimationActive={!loading}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stats row */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Current Rate", value: latest?.toFixed(4) ?? "–", color: "text-foreground" },
            { label: "Highest",      value: highest?.toFixed(4) ?? "–", color: "text-emerald-600 dark:text-emerald-400" },
            { label: "Lowest",       value: lowest?.toFixed(4) ?? "–",  color: "text-rose-600" },
            { label: "Period Change",value: changePct !== null ? `${isUp ? "+" : ""}${changePct}%` : "–", color: isUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600" },
          ].map((s, i) => (
            <div key={i} className="card-glow bg-card border border-border rounded-xl p-3 text-center shadow-sm">
              <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">{s.label}</div>
              <div className={`font-extrabold tabular-nums text-sm ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
