
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
      <section className="text-center space-y-4 sm:space-y-6 py-6 sm:py-12 px-2 sm:px-4 bg-muted/30 border border-border rounded-2xl">
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Currency Exchange <br />
            <span className="text-indigo-600 dark:text-indigo-400">
              Reimagined.
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get real-time exchange rates, convert currencies instantly, and track market trends with our comprehensive currency tools.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2">
          <Button size="lg" className="w-full sm:w-auto px-6 sm:px-8 text-sm sm:text-base" onClick={() => navigateTo('market')}>
            Explore Markets <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 sm:px-8 text-sm sm:text-base bg-card" onClick={() => navigateTo('news')}>
            Latest News
          </Button>
        </div>
      </section>

      {/* Quick Stats - Modern Solid Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {[ 
          {
            value: "140+",
            label: "Currencies Supported",
            icon: "🌐",
          },
          {
            value: "24/7",
            label: "Live Updates",
            icon: "⚡",
          },
          {
            value: "99.99%",
            label: "Uptime SLA",
            icon: "🛡️",
          },
          {
            value: "1M+",
            label: "Conversions Daily",
            icon: "📈",
          },
        ].map((stat, idx) => (
          <Card
            key={idx}
            className="overflow-hidden text-center border border-border bg-card shadow-sm group hover:border-indigo-500/50 transition-all duration-300"
          >
            <CardContent className="relative space-y-2 p-4 sm:p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-xs font-bold text-foreground">
                <span>{stat.icon}</span>
                <span>{stat.label}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Home Highlights - Modern Solid Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {[ 
          {
            title: "Convert in seconds",
            desc: "Swap between 140+ currencies with live rates and instant math you can trust.",
            icon: Zap,
          },
          {
            title: "Track what matters",
            desc: "Pin your pairs, monitor volatility, and glance at intraday moves without opening a new tab.",
            icon: Activity,
          },
          {
            title: "Stay notified",
            desc: "Set smart alerts for target rates and receive heads-up before markets move.",
            icon: Bell,
          },
        ].map((item, idx) => (
          <Card
            key={idx}
            className="border border-border bg-card shadow-sm overflow-hidden group hover:border-indigo-500/50 transition-all duration-300"
          >
            <CardContent className="p-5 sm:p-6 space-y-3">
              <div className="h-11 w-11 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="text-xl font-bold text-foreground">{item.title}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Currency Converter Section */}
      <section>
        <CurrencyConverter onFavoriteAdd={onFavoriteAdd} />
      </section>

      {/* Favorites Section */}
      <section>
        <FavoritesPairs 
          favorites={favorites} 
          onRemoveFavorite={onRemoveFavorite} 
        />
      </section>

      {/* Workflows - Modern Solid Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {[ 
          {
            title: "Monitor markets",
            desc: "Start with the live table to compare base currencies, spreads, and intraday deltas at a glance.",
            cta: "View markets",
            action: () => navigateTo("market"),
          },
          {
            title: "Automate alerts",
            desc: "Set thresholds for your favorite pairs so you get notified when opportunity knocks.",
            cta: "Create alert",
            action: () => navigateTo("alerts"),
          },
          {
            title: "Personalize dashboard",
            desc: "Arrange favorites, tweak chart defaults, and save your preferred base currency in settings.",
            cta: "Open settings",
            action: () => navigateTo("settings"),
          },
        ].map((item, idx) => (
          <Card
            key={idx}
            className="border border-border bg-card shadow-sm overflow-hidden group hover:border-indigo-500/50 transition-all duration-300"
          >
            <CardContent className="p-5 sm:p-6 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="text-lg font-bold text-foreground">{item.title}</div>
                <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 flex-shrink-0 sm:h-7 sm:w-7 hover:bg-muted" onClick={item.action}>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-3 sm:w-3 text-indigo-600 dark:text-indigo-400" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              <Button variant="outline" className="w-full bg-card hover:bg-muted" onClick={item.action}>
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

      {/* Mobile & Reliability - Modern Solid Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {[ 
          {
            title: "Mobile ready",
            desc: "Use the same dashboard on phone or tablet with responsive layouts and quick actions.",
            icon: Smartphone,
          },
          {
            title: "Performance first",
            desc: "Optimized charts, cached requests, and lean UI keep things fast even on slow networks.",
            icon: Activity,
          },
          {
            title: "Secure by default",
            desc: "Encrypted requests, safe storage for preferences, and strict data handling.",
            icon: Shield,
          },
        ].map((item, idx) => (
          <Card
            key={idx}
            className="border border-border bg-card shadow-sm overflow-hidden group hover:border-indigo-500/50 transition-all duration-300"
          >
            <CardContent className="p-5 sm:p-6 space-y-3">
              <div className="h-11 w-11 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="text-xl font-bold text-foreground">{item.title}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Why Choose us section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto">
          <Card className="relative overflow-hidden border border-border bg-card shadow-sm text-foreground">
            <CardContent className="relative z-10 p-8 sm:p-10 space-y-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-3 max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1 text-xs font-bold shadow-sm">
                    Why Choose Us
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Why Choose Our Platform?</h2>
                  <p className="text-lg text-muted-foreground">
                    Built for professionals and everyday users who need reliable, accurate currency data.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-foreground/80 bg-muted/40 border border-border rounded-2xl p-4 shadow-sm">
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Latency</div>
                    <div className="text-xl font-extrabold tabular-nums text-foreground">&lt; 300ms</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Pairs tracked</div>
                    <div className="text-xl font-extrabold tabular-nums text-foreground">140+</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Uptime</div>
                    <div className="text-xl font-extrabold tabular-nums text-foreground">99.99%</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Updates</div>
                    <div className="text-xl font-extrabold tabular-nums text-foreground">Every 60s</div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { icon: Zap, title: "Real-Time Rates", desc: "Get live exchange rates updated every minute from global financial markets and major banks." },
                  { icon: BarChart3, title: "Advanced Analytics", desc: "Analyze currency trends with interactive charts, historical data, and technical indicators." },
                  { icon: Star, title: "Smart Favorites", desc: "Save your most used currency pairs for quick access and get personalized insights." },
                  { icon: Globe, title: "Global Coverage", desc: "Access rates for major world currencies including exotic pairs and emerging markets." },
                  { icon: Shield, title: "Bank-Grade Security", desc: "Enterprise-level security with encrypted connections and secure data handling." },
                  { icon: Clock, title: "24/7 Availability", desc: "Round-the-clock access to currency data with 99.99% uptime guarantee." },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex gap-4 p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-sm hover:border-indigo-500/40 hover:bg-muted/30 transition-all duration-300"
                  >
                    <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-inner">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-lg text-foreground">{item.title}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA - Solid Banner */}
      <section>
        <Card className="border-none bg-indigo-600 dark:bg-indigo-700 text-white overflow-hidden shadow-md rounded-2xl">
          <CardContent className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
                <SettingsIcon className="h-4 w-4" />
                Tailor your workspace
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">Launch your home setup</div>
              <p className="text-sm sm:text-base text-white/95 max-w-2xl">
                Save your base currency, reorder favorites, and toggle alerts so the homepage is tuned to how you work.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:ml-auto w-full sm:w-auto relative z-10">
              <Button variant="secondary" className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-slate-100" onClick={() => navigateTo("settings")}>
                Go to settings
              </Button>
              <Button variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 bg-transparent" onClick={() => navigateTo("market")}>
                View markets
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
