import { Heart, Globe, TrendingUp, Zap, BarChart3, Star, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-16 border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12 text-foreground">
        
        {/* Upper footer header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-8 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg text-foreground">CurrencyExchange</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button aria-label="GitHub" className="h-9 px-3 rounded-lg border border-border bg-card hover:bg-muted shadow-sm transition-colors text-foreground">
              <Github className="h-4 w-4" />
            </button>
            <button aria-label="Twitter" className="h-9 px-3 rounded-lg border border-border bg-card hover:bg-muted shadow-sm transition-colors text-foreground">
              <Twitter className="h-4 w-4" />
            </button>
            <button aria-label="Email" className="h-9 px-3 rounded-lg border border-border bg-card hover:bg-muted shadow-sm transition-colors text-foreground">
              <Mail className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Footer column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: About */}
          <div className="rounded-2xl border border-border bg-muted/30 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-foreground">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Real-time currency conversion and exchange rate tracking for global financial markets.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
              <span className="text-xs text-muted-foreground font-semibold">Live Data Feed</span>
            </div>
          </div>

          {/* Card 2: Features */}
          <div className="rounded-2xl border border-border bg-muted/30 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-foreground">Features</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Live exchange rates</span>
              </li>
              <li className="flex items-center gap-2">
                <BarChart3 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Historical trends</span>
              </li>
              <li className="flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Currency converter</span>
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Favorite pair tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Responsive interface</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Currencies */}
          <div className="rounded-2xl border border-border bg-muted/30 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-foreground">Currencies</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Supporting 140+ major and regional currencies globally:
            </p>
            <div className="flex flex-wrap gap-2 text-sm pt-1">
              {["USD", "EUR", "GBP", "JPY", "AUD", "CAD"].map((c) => (
                <span key={c} className="bg-card border border-border text-foreground px-2.5 py-1 rounded-lg font-bold shadow-sm">
                  {c}
                </span>
              ))}
              <span className="text-muted-foreground text-xs self-center font-semibold ml-1">+ more</span>
            </div>
          </div>

        </div>

        {/* Lower footer notes */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-muted-foreground">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
              <span>Global Exchange Rates</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
              <span>Updated Every Minute</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span className="font-semibold text-foreground">for global traders</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
