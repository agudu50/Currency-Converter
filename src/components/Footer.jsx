import { Heart, Globe, TrendingUp, Zap, BarChart3, Star } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-12 overflow-hidden border-t-0">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-amber-500 opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.24),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />

      <div className="relative container mx-auto px-4 py-12 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-lg text-white">CurrencyExchange</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Real-time currency conversion and exchange rate tracking for global markets.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
              <span className="text-xs text-white/80 font-medium">Live Data</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold mb-4 text-white/90">Features</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <Zap className="h-3.5 w-3.5" />
                Live exchange rates
              </li>
              <li className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <BarChart3 className="h-3.5 w-3.5" />
                Historical charts
              </li>
              <li className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <TrendingUp className="h-3.5 w-3.5" />
                Currency converter
              </li>
              <li className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <Star className="h-3.5 w-3.5" />
                Favorite pairs
              </li>
              <li className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <Globe className="h-3.5 w-3.5" />
                Mobile responsive
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold mb-4 text-white/90">Currencies</h3>
            <p className="text-sm text-white/75 mb-3">
              Supporting 20+ major world currencies including:
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full font-medium">USD</span>
              <span className="bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full font-medium">EUR</span>
              <span className="bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full font-medium">GBP</span>
              <span className="bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full font-medium">JPY</span>
              <span className="text-white/70 text-xs self-center">+16 more</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/15 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-sm text-white/75">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white/80 rounded-full" />
              <Globe className="h-4 w-4 text-white" />
              <span>Global Exchange Rates</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse" />
              <span>Updated Every Minute</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-white/80">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-rose-200 animate-pulse" />
            <span className="font-medium">for global traders</span>
          </div>
        </div>

        {/* Glow accents */}
        <div className="absolute top-6 right-6 opacity-25">
          <div className="w-32 h-32 bg-white/20 rounded-full blur-3xl" />
        </div>
        <div className="absolute bottom-6 left-6 opacity-20">
          <div className="w-24 h-24 bg-white/15 rounded-full blur-3xl" />
        </div>
      </div>
    </footer>
  );
}
