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
import { ArrowUpDown, Star, RefreshCw } from "lucide-react";
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

  // Fetch exchange rates on component mount
  useEffect(() => {
    loadExchangeRates();
  }, []);

  // Recalculate when inputs change
  useEffect(() => {
    let active = true;
    const run = async () => {
      if (amount && fromCurrency && toCurrency) {
        const numAmount = parseFloat(amount) || 0;
        const converted = await convertCurrencyAsync(
          numAmount,
          fromCurrency,
          toCurrency
        );
        if (active) setResult(converted);
      }
    };
    run();
    return () => { active = false; };
  }, [amount, fromCurrency, toCurrency]);

  const loadExchangeRates = async () => {
    setLoading(true);
    try {
      await fetchExchangeRates('USD');
      setLastUpdated(new Date());
      // Recalculate current conversion with fresh rates
      if (amount && fromCurrency && toCurrency) {
        const numAmount = parseFloat(amount) || 0;
        const converted = await convertCurrencyAsync(numAmount, fromCurrency, toCurrency);
        setResult(converted);
      }
    } catch (error) {
      console.error('Failed to fetch rates:', error);
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const addToFavorites = () => {
    if (onFavoriteAdd) {
      onFavoriteAdd({ from: fromCurrency, to: toCurrency });
    }
  };

  return (
    <Card className="relative w-full max-w-2xl mx-auto overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.18),transparent_30%)]" />

      <CardHeader className="relative z-10 border-b border-white/15 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-2xl text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-sm font-semibold">⇄</span>
            Currency Converter
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={loadExchangeRates}
              disabled={loading}
              className={`text-white/80 hover:text-white bg-white/10 hover:bg-white/20 ${loading ? 'animate-spin' : ''}`}
              title="Refresh rates"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={addToFavorites}
              className="text-white/80 hover:text-amber-200 bg-white/10 hover:bg-white/20"
              title="Add to favorites"
            >
              <Star className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {lastUpdated && (
          <p className="text-xs text-white/70 mt-2">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </CardHeader>

      <CardContent className="relative z-10 space-y-4 sm:space-y-6 bg-white/5 backdrop-blur-sm rounded-b-3xl border border-white/10 border-t-0">
        {/* Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm text-white/90">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="text-lg sm:text-xl h-11 sm:h-14 text-center bg-white/90 text-slate-900 border-white/40 focus:border-white focus:ring-white/60"
          />
        </div>

        {/* Currency Selectors */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-4">
          {/* From */}
          <div className="flex-1 space-y-2 w-full">
            <Label className="text-sm text-white/90">From</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="text-sm sm:text-lg h-11 sm:h-12 bg-white/90 text-slate-900 border-white/40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(() => {
                  const live = new Set(getAvailableCurrencyCodes());
                  return currencies.filter(c => live.has(c.code)).map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                      <span className="text-slate-500 text-xs sm:text-sm">- {currency.name}</span>
                    </div>
                  </SelectItem>
                  ));
                })()}
              </SelectContent>
            </Select>
          </div>

          {/* Swap */}
          <Button
            variant="outline"
            size="icon"
            onClick={swapCurrencies}
            className="rounded-full h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 border-2 border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-colors sm:mb-0 mt-3"
          >
            <ArrowUpDown className="h-5 w-5" />
          </Button>

          {/* To */}
          <div className="flex-1 space-y-2 w-full">
            <Label className="text-sm text-white/90">To</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="text-sm sm:text-lg h-11 sm:h-12 bg-white/90 text-slate-900 border-white/40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(() => {
                  const live = new Set(getAvailableCurrencyCodes());
                  return currencies.filter(c => live.has(c.code)).map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                      <span className="text-slate-500 text-xs sm:text-sm">- {currency.name}</span>
                    </div>
                  </SelectItem>
                  ));
                })()}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Result */}
        <div className="bg-white/10 border border-white/15 rounded-xl p-4 sm:p-6 text-center text-white">
          <div className="text-sm text-white/80 mb-2">{amount} {fromCurrency} equals</div>
          <div className="text-2xl sm:text-3xl font-bold">{formatCurrency(result, toCurrency)}</div>
          <div className="text-xs sm:text-sm text-white/70 mt-2">
            1 {fromCurrency} = {" "}
            {/* Compute live unit rate asynchronously */}
            <UnitRate from={fromCurrency} to={toCurrency} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function UnitRate({ from, to }) {
  const [rate, setRate] = useState(null);
  useEffect(() => {
    let active = true;
    const load = async () => {
      const r = await convertCurrencyAsync(1, from, to);
      if (active) setRate(r);
    };
    load();
    return () => { active = false; };
  }, [from, to]);
  if (rate == null) return <span className="text-white/70">…</span>;
  return <span>{formatCurrency(rate, to)}</span>;
}
