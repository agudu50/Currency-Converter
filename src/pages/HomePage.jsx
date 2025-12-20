import { useState } from "react";
import CurrencyConverter from "../components/CurrencyConverter";
import ExchangeRateTable from "../components/ExchangeRateTable";
import CurrencyChart from "../components/CurrencyChart";
import FavoritesPairs from "../components/FavoritesPairs";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowRight, Zap, BarChart3, Star, Globe, Shield, Clock } from "lucide-react";
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
          { value: "20+", label: "Currencies Supported", from: "from-indigo-500", to: "to-blue-500", text: "text-indigo-50", icon: "🌐" },
          { value: "24/7", label: "Live Updates", from: "from-emerald-500", to: "to-teal-400", text: "text-emerald-50", icon: "⚡" },
          { value: "99.9%", label: "Uptime", from: "from-amber-500", to: "to-orange-400", text: "text-amber-50", icon: "🛡️" },
          { value: "1M+", label: "Conversions Daily", from: "from-purple-500", to: "to-pink-500", text: "text-purple-50", icon: "📈" },
        ].map((stat, idx) => (
          <Card
            key={idx}
            className="relative overflow-hidden p-4 sm:p-6 text-center border-0 shadow-lg shadow-slate-900/5"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.from} ${stat.to} opacity-90`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.15),transparent_30%)]" />
            <div className="relative space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold text-white shadow-sm">
                <span>{stat.icon}</span>
                <span>{stat.label}</span>
              </div>
              <div className={`text-2xl sm:text-3xl font-extrabold drop-shadow-sm text-white`}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/90">{stat.label}</div>
            </div>
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

      {/* Live Rates and Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="min-w-0">
          <ExchangeRateTable />
        </section>
        <section className="min-w-0">
          <CurrencyChart />
        </section>
      </div>

      {/* Why Choose Section - Gradient Glass Card */}
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
    </div>
  );
}
