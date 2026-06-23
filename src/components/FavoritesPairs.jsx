import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X, RefreshCw, Star } from "lucide-react";
import {
  currencies,
  convertCurrencyAsync,
  formatCurrency,
  fetchExchangeRates,
} from "../utils/currencyData";

export default function FavoritesPairs({ favorites, onRemoveFavorite }) {
  const [refreshing, setRefreshing] = useState(false);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    fetchExchangeRates("USD", { requireLive: true }).catch(console.error);
  }, []);

  const refreshRates = async () => {
    setRefreshing(true);
    try {
      await fetchExchangeRates("USD", { requireLive: true });
      forceUpdate(p => p + 1);
    } catch (e) {
      console.error("Failed to refresh favorites rates:", e);
    } finally {
      setRefreshing(false);
    }
  };

  const getFlag = (code) => currencies.find(c => c.code === code)?.flag || "🏳️";

  const EmptyState = () => (
    <Card className="card-glow relative overflow-hidden border border-border bg-card shadow-sm">
      <CardHeader className="space-y-2 pb-4 bg-card border-b border-border">
        <CardTitle className="text-lg sm:text-xl flex items-center gap-2.5 text-foreground font-bold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <Star className="h-4 w-4 fill-current" />
          </span>
          Favorite Pairs
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-card p-8 text-center space-y-2">
        <div className="text-3xl mb-3">⭐</div>
        <p className="text-muted-foreground font-medium">No favorites yet.</p>
        <p className="text-sm text-muted-foreground">
          Click the ⭐ star in the converter above to save a pair.
        </p>
      </CardContent>
    </Card>
  );

  if (!favorites || favorites.length === 0) return <EmptyState />;

  return (
    <Card className="card-glow relative overflow-hidden border border-border bg-card shadow-sm">
      <CardHeader className="space-y-2 pb-4 bg-card border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl flex items-center gap-2.5 text-foreground font-bold">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Star className="h-4 w-4 fill-current" />
            </span>
            Favorite Pairs
            <Badge className="ml-1 bg-amber-500/10 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold">
              {favorites.length}
            </Badge>
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={refreshRates}
            disabled={refreshing}
            className="h-9 w-9 rounded-xl text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-500/15 hover:bg-indigo-500/20 transition-all hover:scale-110"
            title="Refresh rates"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="bg-card p-4">
        <div className="grid gap-2.5">
          {favorites.map((pair, idx) => (
            <div
              key={`${pair.from}-${pair.to}-${idx}`}
              className="card-glow flex items-center justify-between p-3.5 bg-card border border-border rounded-2xl flex-col sm:flex-row gap-3"
              style={{ transitionDelay: `${idx * 40}ms` }}
            >
              {/* Currency pair display */}
              <div className="flex items-center gap-3 text-foreground">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">{getFlag(pair.from)}</span>
                  <span className="font-bold text-sm">{pair.from}</span>
                </div>
                <div className="h-6 w-px bg-border" />
                <span className="text-muted-foreground text-sm">→</span>
                <div className="h-6 w-px bg-border" />
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">{getFlag(pair.to)}</span>
                  <span className="font-bold text-sm">{pair.to}</span>
                </div>
              </div>

              {/* Rate + remove */}
              <div className="flex items-center gap-2.5">
                <Badge className="font-mono text-xs bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 px-3 py-1">
                  <LiveRate from={pair.from} to={pair.to} />
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveFavorite(idx)}
                  className="h-7 w-7 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-all"
                  title="Remove"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 badge-pulse-dot" />
          Rates update automatically every minute
        </div>
      </CardContent>
    </Card>
  );
}

function LiveRate({ from, to }) {
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
  return <span>{formatCurrency(rate, to)}</span>;
}
