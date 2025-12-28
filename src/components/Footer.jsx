import { Heart, Globe, TrendingUp, Zap, BarChart3, Star, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-12 overflow-hidden border-t-0">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.08),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.08),transparent_30%)]" />

      <div className="relative container mx-auto px-4 py-12 text-foreground">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-card shadow-sm rounded-lg flex items-center justify-center text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="font-semibold text-lg">CurrencyExchange</span>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="GitHub" className="h-9 px-3 rounded-lg border border-border/60 bg-card/85 hover:bg-card shadow-sm transition-colors text-foreground">
              <Github className="h-4 w-4" />
            </button>
            <button aria-label="Twitter" className="h-9 px-3 rounded-lg border border-border/60 bg-card/85 hover:bg-card shadow-sm transition-colors text-foreground">
              <Twitter className="h-4 w-4" />
            </button>
            <button aria-label="Email" className="h-9 px-3 rounded-lg border border-border/60 bg-card/85 hover:bg-card shadow-sm transition-colors text-foreground">
              <Mail className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-background shadow-lg">
            <div className="h-1 w-full bg-gradient-to-r from-indigo-500/70 via-blue-500/60 to-cyan-400/60" />
            <div className="p-6 space-y-4">
              <h3 className="font-semibold">About</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Real-time currency conversion and exchange rate tracking for global markets.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground font-medium">Live Data</span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-background shadow-lg">
            <div className="h-1 w-full bg-gradient-to-r from-emerald-500/70 via-teal-400/60 to-lime-300/60" />
            <div className="p-6 space-y-3">
              <h3 className="font-semibold">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Zap className="h-3.5 w-3.5" /> Live exchange rates</li>
                <li className="flex items-center gap-2"><BarChart3 className="h-3.5 w-3.5" /> Historical charts</li>
                <li className="flex items-center gap-2"><TrendingUp className="h-3.5 w-3.5" /> Currency converter</li>
                <li className="flex items-center gap-2"><Star className="h-3.5 w-3.5" /> Favorite pairs</li>
                <li className="flex items-center gap-2"><Globe className="h-3.5 w-3.5" /> Mobile responsive</li>
              </ul>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-background shadow-lg">
            <div className="h-1 w-full bg-gradient-to-r from-purple-500/70 via-pink-500/60 to-rose-400/60" />
            <div className="p-6 space-y-3">
              <h3 className="font-semibold">Currencies</h3>
              <p className="text-sm text-muted-foreground">Supporting 20+ major currencies:</p>
              <div className="flex flex-wrap gap-2 text-sm">
                { ["USD", "EUR", "GBP", "JPY", "AUD", "CAD"].map((c) => (
                  <span key={c} className="bg-card/85 border border-border/60 text-foreground px-3 py-1 rounded-full font-medium shadow-sm">
                    {c}
                  </span>
                )) }
                <span className="text-muted-foreground text-xs self-center">+ more</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/60 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-foreground/80">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <Globe className="h-4 w-4 text-foreground" />
              <span>Global Exchange Rates</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>Updated Every Minute</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/80">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-rose-500 animate-pulse" />
            <span className="font-medium">for global traders</span>
          </div>
        </div>

        <div className="absolute top-6 right-6 opacity-25 pointer-events-none">
          <div className="w-32 h-32 bg-indigo-200/50 rounded-full blur-3xl" />
        </div>
        <div className="absolute bottom-6 left-6 opacity-25 pointer-events-none">
          <div className="w-24 h-24 bg-cyan-200/50 rounded-full blur-3xl" />
        </div>
      </div>
    </footer>
  );
}
