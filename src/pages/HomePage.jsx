import { useState } from "react";
import { CurrencyConverter } from "../components/CurrencyConverter";
import { ExchangeRateTable } from "../components/ExchangeRateTable";
import { CurrencyChart } from "../components/CurrencyChart";
import { FavoritesPairs } from "../components/FavoritesPairs";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowRight, Zap, BarChart3, Star, Globe, Shield, Clock } from "lucide-react";
import { useRouter } from "../components/Router";

export function HomePage({ favorites, onFavoriteAdd, onRemoveFavorite }) {
  const { navigateTo } = useRouter();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12 bg-gradient-to-br from-primary/5 via-chart-1/5 to-chart-2/5 rounded-2xl">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent">
            Currency Exchange
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get real-time exchange rates, convert currencies instantly, and track market trends with our comprehensive currency tools.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="px-8" onClick={() => navigateTo('market')}>
            Explore Markets <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="px-8" onClick={() => navigateTo('news')}>
            Latest News
          </Button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center bg-gradient-to-br from-chart-1/10 to-chart-1/5 border-chart-1/20">
          <div className="text-2xl font-bold text-chart-1">20+</div>
          <div className="text-sm text-muted-foreground">Currencies Supported</div>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-chart-2/20">
          <div className="text-2xl font-bold text-chart-2">24/7</div>
          <div className="text-sm text-muted-foreground">Live Updates</div>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
          <div className="text-2xl font-bold text-chart-3">99.9%</div>
          <div className="text-sm text-muted-foreground">Uptime</div>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20">
          <div className="text-2xl font-bold text-chart-4">1M+</div>
          <div className="text-sm text-muted-foreground">Conversions Daily</div>
        </Card>
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
        <section>
          <ExchangeRateTable />
        </section>
        <section>
          <CurrencyChart />
        </section>
      </div>

      {/* Features Section */}
      <section className="py-12">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Our Platform?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for professionals and everyday users who need reliable, accurate currency data.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-6 bg-chart-1/10 rounded-2xl flex items-center justify-center">
                <Zap className="h-8 w-8 text-chart-1" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Rates</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get live exchange rates updated every minute from global financial markets and major banks.
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-6 bg-chart-2/10 rounded-2xl flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-chart-2" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
              <p className="text-muted-foreground leading-relaxed">
                Analyze currency trends with interactive charts, historical data, and technical indicators.
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-6 bg-chart-3/10 rounded-2xl flex items-center justify-center">
                <Star className="h-8 w-8 text-chart-3" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Favorites</h3>
              <p className="text-muted-foreground leading-relaxed">
                Save your most used currency pairs for quick access and get personalized insights.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-6 bg-chart-4/10 rounded-2xl flex items-center justify-center">
                <Globe className="h-8 w-8 text-chart-4" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Coverage</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access rates for major world currencies including exotic pairs and emerging markets.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-6 bg-chart-5/10 rounded-2xl flex items-center justify-center">
                <Shield className="h-8 w-8 text-chart-5" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Bank-Grade Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                Enterprise-level security with encrypted connections and secure data handling.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Availability</h3>
              <p className="text-muted-foreground leading-relaxed">
                Round-the-clock access to currency data with 99.9% uptime guarantee.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
