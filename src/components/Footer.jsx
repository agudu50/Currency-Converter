import { Heart, Globe, TrendingUp, Zap, BarChart3, Star, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-12 overflow-hidden border-t-0">
      {/* Modern gradient background with subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-blue-700 to-purple-700 opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.18),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.14),transparent_30%)]" />

      <div className="relative container mx-auto px-4 py-12 text-white">
        {/* Top row: brand + social */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-lg">CurrencyExchange</span>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="GitHub" className="h-9 px-3 rounded-lg bg-white/15 hover:bg-white/25 transition-colors">
              <Github className="h-4 w-4" />
            </button>
            <button aria-label="Twitter" className="h-9 px-3 rounded-lg bg-white/15 hover:bg-white/25 transition-colors">
              <Twitter className="h-4 w-4" />
            </button>
            <button aria-label="Email" className="h-9 px-3 rounded-lg bg-white/15 hover:bg-white/25 transition-colors">
              <Mail className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About */}
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-4">
            <h3 className="font-semibold text-white/90">About</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Real-time currency conversion and exchange rate tracking for global markets.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
              <span className="text-xs text-white/80 font-medium">Live Data</span>
            </div>
          </div>

          {/* Features */}
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-3">
            <h3 className="font-semibold text-white/90">Features</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-white/80">
                <Zap className="h-3.5 w-3.5" /> Live exchange rates
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <BarChart3 className="h-3.5 w-3.5" /> Historical charts
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <TrendingUp className="h-3.5 w-3.5" /> Currency converter
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Star className="h-3.5 w-3.5" /> Favorite pairs
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Globe className="h-3.5 w-3.5" /> Mobile responsive
              </li>
            </ul>
          </div>

          {/* Currencies */}
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-3">
            <h3 className="font-semibold text-white/90">Currencies</h3>
            <p className="text-sm text-white/75">Supporting 20+ major currencies:</p>
            <div className="flex flex-wrap gap-2 text-sm">
              {['USD','EUR','GBP','JPY','AUD','CAD'].map((c) => (
                <span key={c} className="bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full font-medium">
                  {c}
                </span>
              ))}
              <span className="text-white/70 text-xs self-center">+ more</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
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
