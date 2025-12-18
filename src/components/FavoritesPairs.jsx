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
      <Card className="relative overflow-hidden border-0 shadow-xl bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-fuchsia-500 to-amber-400 opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.15),transparent_32%)]" />
        <CardHeader className="relative z-10 pb-3 border-b border-white/15">
          <CardTitle className="text-lg sm:text-2xl text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-sm font-semibold">★</span>
            Favorite Currency Pairs
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 bg-white/5 backdrop-blur-sm rounded-b-3xl border border-white/10 border-t-0 p-6 text-center">
          <p className="text-white/80">No favorite pairs yet.</p>
          <p className="text-sm mt-1 text-white/70">
            Click the star icon in the converter to add favorites.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden border-0 shadow-xl bg-slate-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-fuchsia-500 to-amber-400 opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.15),transparent_32%)]" />

      <CardHeader className="relative z-10 border-b border-white/15 pb-4">
        <div className="flex items-center justify-between flex-col sm:flex-row gap-2">
          <CardTitle className="text-lg sm:text-2xl text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-sm font-semibold">★</span>
            Favorite Currency Pairs
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={refreshRates}
            disabled={refreshing}
            className={`text-white/80 hover:text-white bg-white/10 hover:bg-white/20 ${refreshing ? "animate-spin" : ""}`}
            title="Refresh rates"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 bg-white/5 backdrop-blur-sm rounded-b-3xl border border-white/10 border-t-0">
        <div className="grid gap-2 sm:gap-3">
          {favorites.map((pair, index) => {
            return (
              <div
                key={`${pair.from}-${pair.to}-${index}`}
                className="flex items-center justify-between p-3 sm:p-4 bg-white/10 border border-white/15 rounded-xl hover:bg-white/15 transition-colors flex-col sm:flex-row gap-3"
              >
                <div className="flex items-center gap-2 sm:gap-3 text-white">
                  <div className="flex items-center gap-1">
                    <span className="text-base sm:text-lg">{getCurrencyFlag(pair.from)}</span>
                    <span className="font-semibold text-sm sm:text-base">{pair.from}</span>
                  </div>
                  <span className="text-white/70 text-sm">→</span>
                  <div className="flex items-center gap-1">
                    <span className="text-base sm:text-lg">{getCurrencyFlag(pair.to)}</span>
                    <span className="font-semibold text-sm sm:text-base">{pair.to}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <Badge variant="secondary" className="font-mono text-xs sm:text-sm bg-white/20 text-white border border-white/30">
                    <LiveRate from={pair.from} to={pair.to} />
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveFavorite(index)}
                    className="h-7 w-7 text-white/80 hover:text-amber-200 bg-white/10 hover:bg-white/20"
                    title="Remove favorite"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-xs text-white/70 text-center">
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
  if (rate == null) return <span className="text-white/70">…</span>;
  return <span>{formatCurrency(rate, to)}</span>;
}
