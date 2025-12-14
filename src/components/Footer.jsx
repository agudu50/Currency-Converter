import { Heart, Globe, TrendingUp, Zap, BarChart3, Star } from "lucide-react";
import { useRouter } from "./components/Router";

export default function Footer() {
  return (
    <footer className="relative mt-12 bg-gradient-to-br from-primary/5 via-chart-1/5 to-chart-2/5 border-t border-border/50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      
      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-chart-1 to-chart-2 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-lg bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
                CurrencyExchange
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Real-time currency conversion and exchange rate tracking for global markets.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-2 h-2 bg-chart-1 rounded-full animate-pulse" />
              <span className="text-xs text-chart-1 font-medium">Live Data</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold mb-4 text-chart-2">Features</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground hover:text-chart-1 transition-colors">
                <Zap className="h-3 w-3 text-chart-1" />
                Live exchange rates
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-chart-2 transition-colors">
                <BarChart3 className="h-3 w-3 text-chart-2" />
                Historical charts
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-chart-3 transition-colors">
                <TrendingUp className="h-3 w-3 text-chart-3" />
                Currency converter
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-chart-4 transition-colors">
                <Star className="h-3 w-3 text-chart-4" />
                Favorite pairs
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-chart-5 transition-colors">
                <Globe className="h-3 w-3 text-chart-5" />
                Mobile responsive
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold mb-4 text-chart-3">Currencies</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Supporting 20+ major world currencies including:
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-gradient-to-r from-chart-1/20 to-chart-1/10 border border-chart-1/30 text-chart-1 px-3 py-1 rounded-full font-medium">USD</span>
              <span className="bg-gradient-to-r from-chart-2/20 to-chart-2/10 border border-chart-2/30 text-chart-2 px-3 py-1 rounded-full font-medium">EUR</span>
              <span className="bg-gradient-to-r from-chart-3/20 to-chart-3/10 border border-chart-3/30 text-chart-3 px-3 py-1 rounded-full font-medium">GBP</span>
              <span className="bg-gradient-to-r from-chart-4/20 to-chart-4/10 border border-chart-4/30 text-chart-4 px-3 py-1 rounded-full font-medium">JPY</span>
              <span className="text-muted-foreground text-xs self-center">+16 more</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-chart-2 rounded-full" />
              <Globe className="h-4 w-4 text-chart-2" />
              <span>Global Exchange Rates</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-chart-3 rounded-full animate-pulse" />
              <span>Updated Every Minute</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span className="bg-gradient-to-r from-chart-1 to-chart-2 bg-clip-text text-transparent font-medium">
              for global traders
            </span>
          </div>
        </div>
        
        {/* Additional Visual Elements */}
        <div className="absolute top-4 right-4 opacity-10">
          <div className="w-32 h-32 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full blur-3xl" />
        </div>
        <div className="absolute bottom-4 left-4 opacity-10">
          <div className="w-24 h-24 bg-gradient-to-br from-chart-3 to-chart-4 rounded-full blur-3xl" />
        </div>
      </div>
    </footer>
  );
}
