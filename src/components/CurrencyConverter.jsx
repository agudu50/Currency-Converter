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
import { ArrowUpDown, Star } from "lucide-react";
import {
  currencies,
  convertCurrency,
  formatCurrency,
} from "../utils/currencyData";


export default function CurrencyConverter({ onFavoriteAdd }) {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(0);

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      const numAmount = parseFloat(amount) || 0;
      const converted = convertCurrency(
        numAmount,
        fromCurrency,
        toCurrency
      );
      setResult(converted);
    }
  }, [amount, fromCurrency, toCurrency]);

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
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg sm:text-2xl">
          Currency Converter
          <Button
            variant="ghost"
            size="icon"
            onClick={addToFavorites}
            className="text-muted-foreground hover:text-yellow-500"
          >
            <Star className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 sm:space-y-6">
        {/* Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="text-lg sm:text-xl h-11 sm:h-14 text-center"
          />
        </div>

        {/* Currency Selectors */}
        <div className="flex flex-col sm:flex-row items-end gap-3 sm:gap-4">
          {/* From */}
          <div className="flex-1 space-y-2 w-full">
            <Label className="text-sm">From</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="text-sm sm:text-lg h-11 sm:h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                      <span className="text-muted-foreground text-xs sm:text-sm">
                        - {currency.name}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Swap */}
          <Button
            variant="outline"
            size="icon"
            onClick={swapCurrencies}
            className="rounded-full h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 border-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ArrowUpDown className="h-5 w-5" />
          </Button>

          {/* To */}
          <div className="flex-1 space-y-2 w-full">
            <Label className="text-sm">To</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="text-sm sm:text-lg h-11 sm:h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                      <span className="text-muted-foreground text-xs sm:text-sm">
                        - {currency.name}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Result */}
        <div className="bg-muted/50 rounded-lg p-4 sm:p-6 text-center">
          <div className="text-xs sm:text-sm text-muted-foreground mb-1">
            {amount} {fromCurrency} equals
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-primary">
            {formatCurrency(result, toCurrency)}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground mt-2">
            1 {fromCurrency} ={" "}
            {formatCurrency(
              convertCurrency(1, fromCurrency, toCurrency),
              toCurrency
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
