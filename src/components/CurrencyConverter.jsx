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
          toCurrency,
          { requireLive: true }
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
      await fetchExchangeRates('USD', { requireLive: true });
      setLastUpdated(new Date());
      // Recalculate current conversion with fresh rates
      if (amount && fromCurrency && toCurrency) {
        const numAmount = parseFloat(amount) || 0;
        const converted = await convertCurrencyAsync(numAmount, fromCurrency, toCurrency, { requireLive: true });
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
    <Card className="relative w-full overflow-hidden border border-border bg-card shadow-sm text-foreground">

      <CardHeader className="space-y-2 border-b border-border pb-4 bg-card">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-2xl text-foreground flex items-center gap-2 font-bold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-base">⇄</span>
            Currency Converter
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={loadExchangeRates}
              disabled={loading}
              className="text-foreground hover:text-indigo-600 bg-muted hover:bg-muted"
              title="Refresh rates"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={addToFavorites}
              className="text-amber-600 hover:text-amber-700 bg-amber-500/10 hover:bg-amber-500/20"
              title="Add to favorites"
            >
              <Star className="h-4 w-4 fill-current" />
            </Button>
          </div>
        </div>
        {lastUpdated && (
          <p className="text-xs text-muted-foreground mt-2">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4 sm:space-y-6 bg-card p-6">
        {/* Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="text-lg sm:text-xl h-11 sm:h-13 text-center border border-border bg-input-background text-foreground focus:border-indigo-500 focus:ring-indigo-500/20"
          />
        </div>

        {/* Currency Selectors */}
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          {/* From */}
          <div className="flex-1 space-y-2 w-full">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">From</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="text-sm sm:text-base h-11 border border-border bg-input-background text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-48" side="bottom">
                {(() => {
                  const live = new Set(getAvailableCurrencyCodes());
                  return currencies.filter(c => live.has(c.code)).map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code}</span>
                        <span className="text-muted-foreground text-xs sm:text-sm">- {currency.name}</span>
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
            className="rounded-full h-11 w-11 flex-shrink-0 border border-border bg-card text-foreground hover:bg-muted transition-colors sm:self-end"
          >
            <ArrowUpDown className="h-5 w-5" />
          </Button>

          {/* To */}
          <div className="flex-1 space-y-2 w-full">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">To</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="text-sm sm:text-base h-11 border border-border bg-input-background text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-48" side="bottom">
                {(() => {
                  const live = new Set(getAvailableCurrencyCodes());
                  return currencies.filter(c => live.has(c.code)).map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code}</span>
                        <span className="text-muted-foreground text-xs sm:text-sm">- {currency.name}</span>
                      </div>
                    </SelectItem>
                  ));
                })()}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Result */}
        <div className="bg-muted/50 border border-border rounded-xl p-4 sm:p-6 text-center text-foreground shadow-sm">
          <div className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wider">{amount} {fromCurrency} equals</div>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">{formatCurrency(result, toCurrency)}</div>
          <div className="text-xs text-muted-foreground mt-2 font-medium">
            1 {fromCurrency} = {" "}
            {/* Compute live unit rate asynchronously */}
            <UnitRate from={fromCurrency} to={toCurrency} />
          </div>
        </div>

        {/* Multi-Currency Conversions */}
        <div className="space-y-3 border-t border-border pt-4">
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Quick conversions:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {['EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF']
              .filter(code => {
                const live = new Set(getAvailableCurrencyCodes());
                return live.has(code) && code !== fromCurrency;
              })
              .map((currencyCode) => (
                <MultiCurrencyCard 
                  key={currencyCode}
                  amount={amount}
                  from={fromCurrency}
                  to={currencyCode}
                />
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
          const numAmount = parseFloat(amount) || 0;
          const converted = await convertCurrencyAsync(numAmount, from, to, { requireLive: true });
          if (active) {
            setResult(converted);
            setError(false);
          }
        }
      } catch (err) {
        console.error('Failed to convert currency:', err);
        if (active) setError(true);
      }
    };
    run();
    return () => { active = false; };
  }, [amount, from, to]);

  const currencyObj = currencies.find(c => c.code === to);
  const currencyName = currencyObj ? currencyObj.name.split(' ')[0] : to;
  
  if (error) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 text-center">
        <div className="text-xs text-muted-foreground mb-1">{to}</div>
        <div className="text-sm text-rose-500 font-bold">Error</div>
      </div>
    );
  }
  
  return (
    <div className="bg-card border border-border rounded-lg p-3 text-center hover:border-indigo-500/50 hover:shadow-sm transition-colors">
      <div className="text-xs font-bold text-muted-foreground mb-1">{to}</div>
      <div className="text-lg font-extrabold text-foreground">{formatCurrency(result, to)}</div>
      <div className="text-xs text-muted-foreground mt-1 font-semibold">{currencyObj?.flag || ''} {currencyName}</div>
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
        if (active) {
          setRate(r);
          setError(false);
        }
      } catch (err) {
        console.error('Failed to load unit rate:', err);
        if (active) setError(true);
      }
    };
    load();
    return () => { active = false; };
  }, [from, to]);
  if (error) return <span className="text-rose-500 text-xs">Error</span>;
  if (rate == null) return <span className="text-muted-foreground">…</span>;
  return <span>{formatCurrency(rate, to)}</span>;
}
