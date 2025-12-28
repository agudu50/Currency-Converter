import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X, RefreshCw } from "lucide-react";
import {
  currencies,
  convertCurrencyAsync,
  formatCurrency,
  fetchExchangeRates,
} from "../utils/currencyData";

export default function FavoritesPairs({ favorites, onRemoveFavorite }) {
  const [refreshing, setRefreshing] = useState(false);
  const [, forceUpdate] = useState(0);

  // Ensure we have live rates on mount
  useEffect(() => {
    fetchExchangeRates('USD').catch((err) => console.error('Failed to fetch rates for favorites:', err));
  }, []);

  const refreshRates = async () => {
    setRefreshing(true);
    try {
      await fetchExchangeRates('USD');
      // Force component re-render to show new rates
      forceUpdate(prev => prev + 1);
    } catch (error) {
      console.error('Failed to refresh rates:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const getCurrencyFlag = (code) => {
    return currencies.find((c) => c.code === code)?.flag || "🏳️";
  };

  if (!favorites || favorites.length === 0) {
    return (
      <Card className="relative overflow-hidden border border-border/70 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-white shadow-lg backdrop-blur-sm text-foreground">
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500/80 via-sky-500/70 to-cyan-400/70" />
        <CardHeader className="space-y-2 pb-4 bg-white/70 backdrop-blur-sm border-b border-border/60">
          <CardTitle className="text-lg sm:text-2xl flex items-center gap-2 text-foreground">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">★</span>
            Favorite Currency Pairs
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-white/70 backdrop-blur-sm p-6 text-center">
          <p className="text-muted-foreground">No favorite pairs yet.</p>
          <p className="text-sm mt-1 text-muted-foreground">
            Click the star icon in the converter to add favorites.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden border border-border/70 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-white shadow-lg backdrop-blur-sm text-foreground">
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500/80 via-sky-500/70 to-cyan-400/70" />

      <CardHeader className="space-y-2 pb-4 bg-card/70 backdrop-blur-sm border-b border-border/60">
        <div className="flex items-center justify-between flex-col sm:flex-row gap-2">
          <CardTitle className="text-lg sm:text-2xl flex items-center gap-2 text-foreground">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">★</span>
            Favorite Currency Pairs
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={refreshRates}
            disabled={refreshing}
            className="text-primary hover:text-primary bg-primary/10 hover:bg-primary/20"
            title="Refresh rates"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="bg-card/70 backdrop-blur-sm">
        <div className="grid gap-2 sm:gap-3">
          {favorites.map((pair, index) => {
            return (
              <div
                key={`${pair.from}-${pair.to}-${index}`}
                className="flex items-center justify-between p-3 sm:p-4 bg-card border border-border/60 rounded-xl hover:border-primary/60 hover:shadow-md transition-colors flex-col sm:flex-row gap-3"
              >
                <div className="flex items-center gap-2 sm:gap-3 text-foreground">
                  <div className="flex items-center gap-1">
                    <span className="text-base sm:text-lg">{getCurrencyFlag(pair.from)}</span>
                    <span className="font-semibold text-sm sm:text-base">{pair.from}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">→</span>
                  <div className="flex items-center gap-1">
                    <span className="text-base sm:text-lg">{getCurrencyFlag(pair.to)}</span>
                    <span className="font-semibold text-sm sm:text-base">{pair.to}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <Badge variant="secondary" className="font-mono text-xs sm:text-sm bg-primary/10 text-primary border border-primary/20">
                    <LiveRate from={pair.from} to={pair.to} />
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveFavorite(index)}
                    className="h-7 w-7 text-muted-foreground hover:text-destructive bg-muted/60 hover:bg-muted"
                    title="Remove favorite"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-xs text-muted-foreground text-center">
          Rates update automatically every minute
        </div>
      </CardContent>
    </Card>
  );
}

function LiveRate({ from, to }) {
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
