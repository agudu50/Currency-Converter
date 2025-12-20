import React, { useEffect, useState, lazy, Suspense } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useRouter } from "../components/Router";
import { 
  ArrowRight, 
  Zap, 
  BarChart3, 
  Globe, 
  Shield, 
  Star, 
  Clock, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const ExchangeRateTable = lazy(() => import("../components/ExchangeRateTable"));
const CurrencyChart = lazy(() => import("../components/CurrencyChart"));
import { fetchExchangeRates, convertCurrencyAsync } from "../utils/currencyData";


export function LandingPage() {
  const { navigateTo } = useRouter();

  const tickerPairs = [
    { pair: "USD/EUR", base: "USD", quote: "EUR" },
    { pair: "USD/GBP", base: "USD", quote: "GBP" },
    { pair: "USD/JPY", base: "USD", quote: "JPY" },
    { pair: "USD/AUD", base: "USD", quote: "AUD" },
  ];

  const [rates, setRates] = useState(tickerPairs.map(p => ({ ...p, rate: 0, trend: 'up' })));

  // Load live ticker rates and refresh periodically
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        await fetchExchangeRates('USD');
        const updated = await Promise.all(
          tickerPairs.map(async (r) => {
            const rate = await convertCurrencyAsync(1, r.base, r.quote);
            const prev = rates.find(x => x.pair === r.pair)?.rate || 0;
            const trend = rate > prev ? 'up' : 'down';
            return { ...r, rate: Number(rate.toFixed(4)), trend };
          })
        );
        setRates(updated);
      } catch (err) {
        console.error('Ticker fetch failed:', err);
      }
    };

    load();
    const interval = setInterval(load, 60_000);
    return () => { active = false; clearInterval(interval); };
  }, []);

  return (
    <div className="min-h-screen  selection:bg-indigo-500/30">
      
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative space-y-16 pb-20">
        
        {/* Hero Section */}
        <section className="relative pt-20 pb-12 px-4">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Live Market Data
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900">
              Currency Exchange <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                Reimagined.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Experience the fastest way to convert currencies, analyze trends, and manage your global portfolio with bank-grade security.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                onClick={() => navigateTo('home')} 
                className="h-12 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 rounded-xl transition-all hover:scale-105"
              >
                Start Converting <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => navigateTo('market')} 
                variant="outline"
                className="h-12 px-8 text-lg border-2 border-slate-200 hover:bg-white hover:text-indigo-600 rounded-xl bg-white/50 backdrop-blur-sm"
              >
                View Live Market
              </Button>
            </div>

            {/* Modern Ticker */}
            <div className="mt-12 max-w-4xl mx-auto">
              <style>{`
                @keyframes ticker-scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .ticker-animate {
                  animation: ticker-scroll 25s linear infinite;
                }
                .ticker-animate:hover {
                  animation-play-state: paused;
                }
                @media (min-width: 768px) {
                  .ticker-animate {
                    animation: none !important;
                  }
                }
              `}</style>
              <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-xl rounded-2xl overflow-hidden">
                {/* Mobile: Scrolling Animation */}
                <div className="md:hidden overflow-hidden">
                  <div className="ticker-animate flex w-max gap-1">
                    {[...rates, ...rates].map((r, i) => (
                      <div key={i} className="flex-shrink-0 px-6 py-4 min-w-max flex flex-col items-center">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{r.pair}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-slate-800 tabular-nums">{r.rate}</span>
                          {r.trend === 'up' ? 
                            <ArrowUpRight className="w-4 h-4 text-emerald-500" /> : 
                            <ArrowDownRight className="w-4 h-4 text-rose-500" />
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop: Static Grid */}
                <div className="hidden md:flex justify-around items-center py-4 divide-x divide-slate-100">
                  {rates.map((r, i) => (
                    <div key={i} className="flex-1 px-4 flex flex-col items-center group cursor-pointer hover:bg-slate-50 transition-colors rounded-lg py-2">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{r.pair}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-slate-800 tabular-nums">{r.rate}</span>
                        {r.trend === 'up' ? 
                          <ArrowUpRight className="w-4 h-4 text-emerald-500" /> : 
                          <ArrowDownRight className="w-4 h-4 text-rose-500" />
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 space-y-16">
          
          {/* Quick Stats - Glass Cards */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Active Traders", value: "20M+", color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Currency Pairs", value: "200+", color: "text-purple-600", bg: "bg-purple-50" },
              { label: "Global Support", value: "24/7", color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Data Accuracy", value: "99.9%", color: "text-amber-600", bg: "bg-amber-50" }
            ].map((stat, idx) => (
              <Card key={idx} className="p-6 border-none shadow-lg shadow-slate-200/50 bg-white hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col items-center sm:items-start">
                  <div className={`text-3xl sm:text-4xl font-extrabold ${stat.color} mb-2 tracking-tight`}>
                    {stat.value}
                  </div>
                  <div className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${stat.bg} ${stat.color.replace('text', 'bg').replace('600', '100')}/10`}>
                    {stat.label}
                  </div>
                </div>
              </Card>
            ))}
          </section>

          {/* Main Functional Area */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-500" /> Market Highlights
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  {/* Top Movers */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Top Movers Today</h3>
                    {[
                      { pair: "USD/JPY", change: "+2.34%", value: "¥144.52", trend: "up" },
                      { pair: "EUR/GBP", change: "+1.87%", value: "£0.87", trend: "up" },
                      { pair: "AUD/CAD", change: "-1.52%", value: "C$0.92", trend: "down" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${item.trend === 'up' ? 'bg-emerald-100' : 'bg-rose-100'} flex items-center justify-center`}>
                            {item.trend === 'up' ? 
                              <ArrowUpRight className="w-5 h-5 text-emerald-600" /> : 
                              <ArrowDownRight className="w-5 h-5 text-rose-600" />
                            }
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">{item.pair}</div>
                            <div className="text-sm text-slate-500">{item.value}</div>
                          </div>
                        </div>
                        <div className={`font-bold ${item.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {item.change}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Action */}
                  <div className="pt-4 border-t border-slate-100">
                    <Button 
                      onClick={() => navigateTo('market')} 
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    >
                      View Full Market Analysis <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading chart…</div>}>
                <CurrencyChart />
              </Suspense>
            </div>

            <div className="space-y-8">
              {/* Trading Insights Card */}
              <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Star className="w-5 h-5 text-purple-500" /> Trading Insights
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  {/* Popular Pairs */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">Most Traded Pairs</h3>
                    <div className="space-y-2">
                      {[
                        { pair: "EUR/USD", volume: "High", badge: "Trending" },
                        { pair: "GBP/USD", volume: "Medium", badge: "Popular" },
                        { pair: "USD/JPY", volume: "High", badge: "Active" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-xs font-bold">
                              {item.pair.slice(0, 2)}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-800 group-hover:text-purple-600 transition-colors">{item.pair}</div>
                              <div className="text-xs text-slate-500">{item.volume} Volume</div>
                            </div>
                          </div>
                          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-100 text-purple-600">
                            {item.badge}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Market Sentiment */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-600">Market Sentiment</span>
                      <span className="text-sm font-bold text-emerald-600">Bullish 62%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Live Exchange Rates Card */}
              <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading rates…</div>}>
                <ExchangeRateTable />
              </Suspense>
            </div>
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
      </div>
    </div>
  );
}