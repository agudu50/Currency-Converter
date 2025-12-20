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
    <Card className="relative w-full max-w-2xl mx-auto overflow-hidden border border-border/70 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-white shadow-lg backdrop-blur-sm text-foreground">
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500/80 via-sky-500/70 to-cyan-400/70" />

      <CardHeader className="space-y-2 border-b border-border/60 pb-4 bg-white/70 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-2xl text-foreground flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">⇄</span>
            Currency Converter
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={loadExchangeRates}
              disabled={loading}
              className="text-primary hover:text-primary bg-primary/10 hover:bg-primary/20"
              title="Refresh rates"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={addToFavorites}
              className="text-amber-700 hover:text-amber-800 bg-amber-100/60 hover:bg-amber-100"
              title="Add to favorites"
            >
              <Star className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {lastUpdated && (
          <p className="text-xs text-muted-foreground mt-2">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4 sm:space-y-6 bg-white/70 backdrop-blur-sm p-6">
        {/* Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm text-foreground">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="text-lg sm:text-xl h-11 sm:h-14 text-center bg-white border border-border/60 text-foreground focus:border-primary focus:ring-primary/20"
          />
        </div>

        {/* Currency Selectors */}
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {/* From */}
          <div className="flex-1 space-y-2">
            <Label className="text-sm text-foreground">From</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="text-sm sm:text-lg h-11 sm:h-12 bg-white border border-border/60 text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-80">
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
            className="rounded-full h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 border border-border/70 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-white text-foreground hover:border-primary hover:text-primary transition-colors self-end"
          >
            <ArrowUpDown className="h-5 w-5" />
          </Button>

          {/* To */}
          <div className="flex-1 space-y-2">
            <Label className="text-sm text-foreground">To</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="text-sm sm:text-lg h-11 sm:h-12 bg-white border border-border/60 text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-80">
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
        <div className="bg-white/80 border border-border/70 rounded-xl p-4 sm:p-6 text-center text-foreground shadow-sm">
          <div className="text-sm text-muted-foreground mb-2">{amount} {fromCurrency} equals</div>
          <div className="text-2xl sm:text-3xl font-bold">{formatCurrency(result, toCurrency)}</div>
          <div className="text-xs sm:text-sm text-muted-foreground mt-2">
            1 {fromCurrency} = {" "}
            {/* Compute live unit rate asynchronously */}
            <UnitRate from={fromCurrency} to={toCurrency} />
          </div>
        </div>

        {/* Multi-Currency Conversions */}
        <div className="space-y-3 border-t border-border/30 pt-4">
          <h3 className="text-sm font-semibold text-foreground">Quick conversions:</h3>
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
  useEffect(() => {
    let active = true;
    const run = async () => {
      if (amount && from && to) {
        const numAmount = parseFloat(amount) || 0;
        const converted = await convertCurrencyAsync(numAmount, from, to);
        if (active) setResult(converted);
      }
    };
    run();
    return () => { active = false; };
  }, [amount, from, to]);

  const currencyObj = currencies.find(c => c.code === to);
  const currencyName = currencyObj ? currencyObj.name.split(' ')[0] : to;
  
  return (
    <div className="bg-white border border-border/60 rounded-lg p-3 text-center hover:border-primary/60 hover:shadow-sm transition-colors">
      <div className="text-xs text-muted-foreground mb-1">{to}</div>
      <div className="text-lg font-semibold text-foreground">{formatCurrency(result, to)}</div>
      <div className="text-xs text-muted-foreground mt-1">{currencyObj?.flag || ''} {currencyName}</div>
    </div>
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
  if (rate == null) return <span className="text-muted-foreground">…</span>;
  return <span>{formatCurrency(rate, to)}</span>;
}
