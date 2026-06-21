
import CurrencyConverter from "../components/CurrencyConverter";
import ExchangeRateTable from "../components/ExchangeRateTable";
import CurrencyChart from "../components/CurrencyChart";
import FavoritesPairs from "../components/FavoritesPairs";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  Zap,
  BarChart3,
  Star,
  Globe,
  Shield,
  Clock,
  Bell,
  Smartphone,
  Activity,
  Settings as SettingsIcon,
} from "lucide-react";
import { useRouter } from "../components/Router";

export function HomePage({ favorites, onFavoriteAdd, onRemoveFavorite }) {
  const { navigateTo } = useRouter();

  return (
    <div className="space-y-8">
      
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Workspace Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Analyze market trends, track favorites, and convert major global currencies.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-card text-xs font-semibold text-foreground self-start md:self-center">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live Connection Active
        </div>
      </div>

      {/* Main Grid: Converter/Favorites vs Rates/Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Conversion Operations (Col span 5) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Currency Converter Card */}
          <CurrencyConverter onFavoriteAdd={onFavoriteAdd} />
          
          {/* Favorites Pairs */}
          <FavoritesPairs 
            favorites={favorites} 
            onRemoveFavorite={onRemoveFavorite} 
          />
        </div>

        {/* Right Column: Analytics & Rates (Col span 7) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Chart Section */}
          <div className="border border-border bg-card rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Trend Analysis
            </h2>
            <CurrencyChart />
          </div>

          {/* Rates Table Section */}
          <div className="border border-border bg-card rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Live Rates Dashboard
            </h2>
            <ExchangeRateTable />
          </div>
        </div>

      </div>

    </div>
  );
}
