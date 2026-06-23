import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { ArrowUpDown, Star, RefreshCw, ArrowLeftRight } from "lucide-react";
import {
  currencies,
  convertCurrencyAsync,
  formatCurrency,
  fetchExchangeRates,
  getAvailableCurrencyCodes,
} from "../utils/currencyData";

export default function CurrencyConverter({ onFavoriteAdd }) {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [swapSpin, setSwapSpin] = useState(false);
  const [starPop, setStarPop] = useState(false);

  useEffect(() => { loadExchangeRates(); }, []);

  useEffect(() => {
    let active = true;
    const run = async () => {
      if (amount && fromCurrency && toCurrency) {
        const num = parseFloat(amount) || 0;
        const converted = await convertCurrencyAsync(num, fromCurrency, toCurrency, { requireLive: true });
        if (active) setResult(converted);
      }
    };
    run();
    return () => { active = false; };
  }, [amount, fromCurrency, toCurrency]);

  const loadExchangeRates = async () => {
    setLoading(true);
    try {
      await fetchExchangeRates("USD", { requireLive: true });
      setLastUpdated(new Date());
      if (amount && fromCurrency && toCurrency) {
        const num = parseFloat(amount) || 0;
        const converted = await convertCurrencyAsync(num, fromCurrency, toCurrency, { requireLive: true });
        setResult(converted);
      }
    } catch (e) {
      console.error("Failed to fetch rates:", e);
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setSwapSpin(true);
    setTimeout(() => setSwapSpin(false), 500);
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const addToFavorites = () => {
    setStarPop(true);
    setTimeout(() => setStarPop(false), 400);
    if (onFavoriteAdd) onFavoriteAdd({ from: fromCurrency, to: toCurrency });
  };

  const liveCodes = new Set(getAvailableCurrencyCodes());

  return (
    <Card className="card-glow relative w-full overflow-hidden border border-border bg-card shadow-sm">

      {/* Header */}
      <CardHeader className="space-y-2 border-b border-border pb-4 bg-card">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl text-foreground flex items-center gap-2.5 font-bold">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
              <ArrowLeftRight className="h-4 w-4" />
            </span>
            Currency Converter
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={loadExchangeRates}
              disabled={loading}
              className="h-9 w-9 rounded-xl text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 bg-muted hover:bg-muted transition-all hover:scale-105"
              title="Refresh rates"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={addToFavorites}
              className={`h-9 w-9 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 transition-all ${starPop ? "scale-125" : "hover:scale-110"}`}
              title="Add to favorites"
            >
              <Star className="h-4 w-4 fill-current" />
            </Button>
          </div>
        </div>
        {lastUpdated && (
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 badge-pulse-dot" />
            <p className="text-xs text-muted-foreground">
              Updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-5 bg-card p-6">

        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Amount
          </Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="text-xl h-12 text-center border border-border bg-[var(--input-background)] text-foreground font-bold focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-shadow"
          />
        </div>

        {/* Currency Selectors */}
        <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-end">
          {/* From */}
          <div className="flex-1 space-y-2 w-full">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">From</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="h-11 border border-border bg-[var(--input-background)] text-foreground text-sm font-semibold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-48" side="bottom">
                {currencies.filter(c => liveCodes.has(c.code)).map(c => (
                  <SelectItem key={c.code} value={c.code}>
                    <div className="flex items-center gap-2">
                      <span>{c.flag}</span>
                      <span className="font-semibold">{c.code}</span>
                      <span className="text-muted-foreground text-xs">- {c.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Swap */}
          <button
            onClick={swapCurrencies}
            className="h-11 w-11 shrink-0 rounded-xl border border-border bg-card hover:bg-muted flex items-center justify-center text-indigo-500 shadow-sm transition-all hover:scale-110 active:scale-95"
            title="Swap currencies"
          >
            <ArrowUpDown className={`h-5 w-5 transition-transform ${swapSpin ? "animate-spin" : ""}`} />
          </button>

          {/* To */}
          <div className="flex-1 space-y-2 w-full">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">To</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="h-11 border border-border bg-[var(--input-background)] text-foreground text-sm font-semibold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-48" side="bottom">
                {currencies.filter(c => liveCodes.has(c.code)).map(c => (
                  <SelectItem key={c.code} value={c.code}>
                    <div className="flex items-center gap-2">
                      <span>{c.flag}</span>
                      <span className="font-semibold">{c.code}</span>
                      <span className="text-muted-foreground text-xs">- {c.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Result Panel */}
        <div className="bg-muted/50 border border-border rounded-2xl p-5 text-center shadow-sm">
          <div className="text-xs text-muted-foreground mb-1.5 font-semibold uppercase tracking-wider">
            {amount} {fromCurrency} equals
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground tabular-nums">
            {formatCurrency(result, toCurrency)}
          </div>
          <div className="text-xs text-muted-foreground mt-2 font-medium">
            1 {fromCurrency} = <UnitRate from={fromCurrency} to={toCurrency} />
          </div>
        </div>

        {/* Quick Conversions */}
        <div className="space-y-3 border-t border-border pt-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Quick conversions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {["EUR", "GBP", "JPY", "AUD", "CAD", "CHF"]
              .filter(code => liveCodes.has(code) && code !== fromCurrency)
              .map(code => (
                <MultiCurrencyCard key={code} amount={amount} from={fromCurrency} to={code} />
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MultiCurrencyCard({ amount, from, to }) {
  const [result, setResult] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    const run = async () => {
      try {
        if (amount && from && to) {
          const r = await convertCurrencyAsync(parseFloat(amount) || 0, from, to, { requireLive: true });
          if (active) { setResult(r); setError(false); }
        }
      } catch {
        if (active) setError(true);
      }
    };
    run();
    return () => { active = false; };
  }, [amount, from, to]);

  const obj = currencies.find(c => c.code === to);

  if (error) {
    return (
      <div className="bg-card border border-border rounded-xl p-3 text-center">
        <div className="text-xs text-muted-foreground mb-1">{to}</div>
        <div className="text-sm text-rose-500 font-bold">Error</div>
      </div>
    );
  }

  return (
    <div className="card-glow bg-card border border-border rounded-xl p-3 text-center cursor-default">
      <div className="text-xs font-bold text-muted-foreground mb-1 flex items-center justify-center gap-1">
        <span>{obj?.flag}</span> {to}
      </div>
      <div className="text-base font-extrabold text-foreground tabular-nums">{formatCurrency(result, to)}</div>
      <div className="text-[10px] text-muted-foreground mt-0.5 font-medium">{obj?.name.split(" ")[0]}</div>
    </div>
  );
}

function UnitRate({ from, to }) {
  const [rate, setRate] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const r = await convertCurrencyAsync(1, from, to, { requireLive: true });
        if (active) { setRate(r); setError(false); }
      } catch {
        if (active) setError(true);
      }
    };
    load();
    return () => { active = false; };
  }, [from, to]);
  if (error) return <span className="text-rose-500 text-xs">Error</span>;
  if (rate == null) return <span className="text-muted-foreground animate-pulse">···</span>;
  return <span className="font-semibold text-foreground">{formatCurrency(rate, to)}</span>;
}
