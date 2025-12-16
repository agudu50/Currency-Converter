import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X, RefreshCw } from "lucide-react";
import {
  currencies,
  convertCurrency,
  formatCurrency,
} from "../utils/currencyData";

export default function FavoritesPairs({ favorites, onRemoveFavorite }) {
  const [refreshing, setRefreshing] = useState(false);

  const refreshRates = async () => {
    setRefreshing(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const getCurrencyFlag = (code) => {
    return currencies.find((c) => c.code === code)?.flag || "🏳️";
  };

  if (!favorites || favorites.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Favorite Currency Pairs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>No favorite pairs yet.</p>
            <p className="text-sm mt-1">
              Click the star icon in the converter to add favorites.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-col sm:flex-row gap-2">
          <CardTitle className="text-lg sm:text-2xl">Favorite Currency Pairs</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={refreshRates}
            disabled={refreshing}
            className={refreshing ? "animate-spin" : ""}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-2 sm:gap-3">
          {favorites.map((pair, index) => {
            const rate = convertCurrency(1, pair.from, pair.to);
            return (
              <div
                key={`${pair.from}-${pair.to}-${index}`}
                className="flex items-center justify-between p-2 sm:p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors flex-col sm:flex-row gap-2"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-base sm:text-lg">{getCurrencyFlag(pair.from)}</span>
                    <span className="font-medium text-sm sm:text-base">{pair.from}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">→</span>
                  <div className="flex items-center gap-1">
                    <span className="text-base sm:text-lg">{getCurrencyFlag(pair.to)}</span>
                    <span className="font-medium text-sm sm:text-base">{pair.to}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <Badge variant="secondary" className="font-mono text-xs sm:text-sm">
                    {formatCurrency(rate, pair.to)}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveFavorite(index)}
                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
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
