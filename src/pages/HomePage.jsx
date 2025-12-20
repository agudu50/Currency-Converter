
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
    <div className="space-y-6 sm:space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4 sm:space-y-6 py-6 sm:py-12 px-2 sm:px-4 bg-gradient-to-br from-primary/5 via-chart-1/5 to-chart-2/5 rounded-lg sm:rounded-2xl">
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight         text-foreground">
          Currency Exchange <br />
          <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
    Reimagined.
  </span>
</h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get real-time exchange rates, convert currencies instantly, and track market trends with our comprehensive currency tools.
          </p>
        </div>
        
        <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center pt-2">
          <Button size="lg" className="w-full sm:w-auto px-6 sm:px-8 text-sm sm:text-base" onClick={() => navigateTo('market')}>
            Explore Markets <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 sm:px-8 text-sm sm:text-base" onClick={() => navigateTo('news')}>
            Latest News
          </Button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {[ 
          {
            value: "20+",
            label: "Currencies Supported",
            icon: "🌐",
            accent: "from-indigo-500/70 via-blue-500/60 to-cyan-400/60",
            bg: "from-indigo-500/10 via-blue-500/5 to-white",
          },
          {
            value: "24/7",
            label: "Live Updates",
            icon: "⚡",
            accent: "from-emerald-500/70 via-teal-400/60 to-lime-300/60",
            bg: "from-emerald-500/10 via-teal-500/5 to-white",
          },
          {
            value: "99.9%",
            label: "Uptime",
            icon: "🛡️",
            accent: "from-amber-500/70 via-orange-500/60 to-yellow-400/60",
            bg: "from-amber-500/10 via-orange-500/5 to-white",
          },
          {
            value: "1M+",
            label: "Conversions Daily",
            icon: "📈",
            accent: "from-purple-500/70 via-pink-500/60 to-rose-400/60",
            bg: "from-purple-500/10 via-pink-500/5 to-white",
          },
        ].map((stat, idx) => (
          <Card
            key={idx}
            className={`overflow-hidden text-center border border-border/60 bg-gradient-to-br ${stat.bg} shadow-lg shadow-slate-900/5`}
          >
            <div className={`h-1 w-full bg-gradient-to-r ${stat.accent}`} />
            <CardContent className="relative space-y-2 p-4 sm:p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 text-xs font-semibold text-slate-900 shadow-sm">
                <span>{stat.icon}</span>
                <span>{stat.label}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-foreground drop-shadow-sm">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Home Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {[ 
          {
            title: "Convert in seconds",
            desc: "Swap between 20+ currencies with live rates and instant math you can trust.",
            icon: Zap,
            accent: "from-amber-500/70 via-orange-400/60 to-yellow-300/60",
            bg: "from-amber-500/10 via-orange-400/5 to-white",
          },
          {
            title: "Track what matters",
            desc: "Pin your pairs, monitor volatility, and glance at intraday moves without opening a new tab.",
            icon: Activity,
            accent: "from-sky-500/70 via-cyan-400/60 to-emerald-300/60",
            bg: "from-sky-500/10 via-cyan-400/5 to-white",
          },
          {
            title: "Stay notified",
            desc: "Set smart alerts for target rates and receive heads-up before markets move.",
            icon: Bell,
            accent: "from-indigo-500/70 via-purple-500/60 to-pink-400/60",
            bg: "from-indigo-500/10 via-purple-500/5 to-white",
          },
        ].map((item, idx) => (
          <Card
            key={idx}
            className={`border border-border/60 bg-gradient-to-br ${item.bg} backdrop-blur-sm shadow-lg overflow-hidden`}
          >
            <div className={`h-1 w-full bg-gradient-to-r ${item.accent}`} />
            <CardContent className="p-5 sm:p-6 space-y-3">
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="text-xl font-semibold text-foreground">{item.title}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Currency Converter */}
      <section>
        <CurrencyConverter onFavoriteAdd={onFavoriteAdd} />
      </section>

      {/* Favorites */}
      <section>
        <FavoritesPairs 
          favorites={favorites} 
          onRemoveFavorite={onRemoveFavorite} 
        />
      </section>

      {/* Workflows */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {[ 
          {
            title: "Monitor markets",
            desc: "Start with the live table to compare base currencies, spreads, and intraday deltas at a glance.",
            cta: "View markets",
            action: () => navigateTo("market"),
            accent: "from-sky-500/20 to-sky-600/10",
            bg: "from-sky-500/10 via-cyan-400/5 to-white",
          },
          {
            title: "Automate alerts",
            desc: "Set thresholds for your favorite pairs so you get notified when opportunity knocks.",
            cta: "Create alert",
            action: () => navigateTo("alerts"),
            accent: "from-emerald-500/20 to-emerald-600/10",
            bg: "from-emerald-500/10 via-lime-400/5 to-white",
          },
          {
            title: "Personalize dashboard",
            desc: "Arrange favorites, tweak chart defaults, and save your preferred base currency in settings.",
            cta: "Open settings",
            action: () => navigateTo("settings"),
            accent: "from-indigo-500/20 to-indigo-600/10",
            bg: "from-indigo-500/10 via-purple-500/5 to-white",
          },
        ].map((item, idx) => (
          <Card
            key={idx}
            className={`border border-border/70 bg-gradient-to-br ${item.bg} shadow-lg overflow-hidden`}
          >
            <div className={`h-1 w-full bg-gradient-to-r ${item.accent}`} />
            <CardContent className="p-5 sm:p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-foreground">{item.title}</div>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={item.action}>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              <Button variant="outline" className="w-full" onClick={item.action}>
                {item.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Live Rates and Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="min-w-0">
          <ExchangeRateTable />
        </section>
        <section className="min-w-0">
          <CurrencyChart />
        </section>
      </div>

      {/* Mobile & Reliability */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {[ 
          {
            title: "Mobile ready",
            desc: "Use the same dashboard on phone or tablet with responsive layouts and quick actions.",
            icon: Smartphone,
            accent: "from-sky-500/70 via-sky-400/60 to-cyan-300/60",
            bg: "from-sky-500/10 via-cyan-500/5 to-white",
          },
          {
            title: "Performance first",
            desc: "Optimized charts, cached requests, and lean UI keep things fast even on slow networks.",
            icon: Activity,
            accent: "from-emerald-500/70 via-lime-400/60 to-amber-300/60",
            bg: "from-emerald-500/10 via-lime-500/5 to-white",
          },
          {
            title: "Secure by default",
            desc: "Encrypted requests, safe storage for preferences, and strict data handling.",
            icon: Shield,
            accent: "from-indigo-500/70 via-purple-500/60 to-pink-400/60",
            bg: "from-indigo-500/10 via-purple-500/5 to-white",
          },
        ].map((item, idx) => (
          <Card
            key={idx}
            className={`border border-border/60 bg-gradient-to-br ${item.bg} shadow-lg overflow-hidden`}
          >
            <div className={`h-1 w-full bg-gradient-to-r ${item.accent}`} />
            <CardContent className="p-5 sm:p-6 space-y-3">
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="text-xl font-semibold text-foreground">{item.title}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Choose Section - Gradient Glass Card */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto">
          <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-amber-400 opacity-90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />

            <div className="relative z-10 p-8 sm:p-10 border-b border-white/15">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose Our Platform?</h2>
              <p className="text-white/80 text-lg mt-3 max-w-3xl">
                Built for professionals and everyday users who need reliable, accurate currency data.
              </p>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-4 sm:gap-6 p-8 sm:p-10 bg-white/5 backdrop-blur-sm rounded-b-3xl border border-white/10 border-t-0">
              {[ 
                { icon: Zap, title: "Real-Time Rates", desc: "Get live exchange rates updated every minute from global financial markets and major banks." },
                { icon: BarChart3, title: "Advanced Analytics", desc: "Analyze currency trends with interactive charts, historical data, and technical indicators." },
                { icon: Star, title: "Smart Favorites", desc: "Save your most used currency pairs for quick access and get personalized insights." },
                { icon: Globe, title: "Global Coverage", desc: "Access rates for major world currencies including exotic pairs and emerging markets." },
                { icon: Shield, title: "Bank-Grade Security", desc: "Enterprise-level security with encrypted connections and secure data handling." },
                { icon: Clock, title: "24/7 Availability", desc: "Round-the-clock access to currency data with 99.9% uptime guarantee." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group flex gap-4 p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-lg text-white">{item.title}</div>
                    <p className="text-sm text-white/80 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <Card className="border border-border/70 bg-gradient-to-r from-indigo-600 via-sky-600 to-teal-500 text-white overflow-hidden">
          <CardContent className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                <SettingsIcon className="h-4 w-4" />
                Tailor your workspace
              </div>
              <div className="text-2xl sm:text-3xl font-bold">Launch your home setup</div>
              <p className="text-sm sm:text-base text-white/90 max-w-2xl">
                Save your base currency, reorder favorites, and toggle alerts so the homepage is tuned to how you work.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:ml-auto w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto hover:bg-white/60" onClick={() => navigateTo("settings")}>
                Go to settings
              </Button>
              <Button variant="outline" className="w-full sm:w-auto border-white/50 text-black hover:bg-white/60" onClick={() => navigateTo("market")}>
                View markets
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
