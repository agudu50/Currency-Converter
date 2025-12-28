import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Clock, TrendingUp, Globe, Calendar, ExternalLink, Bell, Activity, AlertTriangle } from "lucide-react";

export function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const newsArticles = [
    {
      id: 1,
      title: "Federal Reserve Signals Potential Interest Rate Changes",
      summary: "The Federal Reserve hints at monetary policy adjustments that could significantly impact USD strength across global markets.",
      category: "central-banks",
      impact: "high",
      time: "2 hours ago",
      source: "Financial Times",
      currencies: ["USD", "EUR", "GBP"],
      image: "📈"
    },
    {
      id: 2,
      title: "European Central Bank Maintains Steady Policy Stance",
      summary: "ECB keeps interest rates unchanged amid inflation concerns, EUR shows mixed reactions in early trading.",
      category: "central-banks",
      impact: "medium",
      time: "4 hours ago",
      source: "Reuters",
      currencies: ["EUR", "USD"],
      image: "🏦"
    },
    {
      id: 3,
      title: "Brexit Negotiations Update Affects GBP Volatility",
      summary: "Latest developments in UK-EU trade discussions cause significant movements in British Pound against major currencies.",
      category: "politics",
      impact: "high",
      time: "6 hours ago",
      source: "Bloomberg",
      currencies: ["GBP", "EUR", "USD"],
      image: "🇬🇧"
    },
    {
      id: 4,
      title: "Asian Markets Show Strong Recovery",
      summary: "Japanese Yen and Chinese Yuan gain ground as Asian economies demonstrate resilience in current market conditions.",
      category: "markets",
      impact: "medium",
      time: "8 hours ago",
      source: "Wall Street Journal",
      currencies: ["JPY", "CNY", "KRW"],
      image: "🌏"
    },
    {
      id: 5,
      title: "Oil Prices Surge Impacts Commodity Currencies",
      summary: "Rising crude oil prices boost Canadian Dollar and Norwegian Krone against major trading partners.",
      category: "commodities",
      impact: "medium",
      time: "12 hours ago",
      source: "MarketWatch",
      currencies: ["CAD", "NOK", "USD"],
      image: "🛢️"
    },
    {
      id: 6,
      title: "Cryptocurrency Regulations Affect Digital Asset Trading",
      summary: "New regulatory frameworks in major economies create ripple effects across traditional and digital currency markets.",
      category: "crypto",
      impact: "high",
      time: "1 day ago",
      source: "CoinDesk",
      currencies: ["BTC", "ETH", "USD"],
      image: "₿"
    },
    {
      id: 7,
      title: "Emerging Markets Currency Outlook Improves",
      summary: "Positive economic indicators from Brazil, India, and South Africa strengthen their respective currencies.",
      category: "emerging",
      impact: "medium",
      time: "1 day ago",
      source: "Financial Express",
      currencies: ["BRL", "INR", "ZAR"],
      image: "📊"
    },
    {
      id: 8,
      title: "Swiss National Bank Intervention Rumors",
      summary: "Market speculation about potential SNB intervention sends Swiss Franc on a volatile trading session.",
      category: "central-banks",
      impact: "medium",
      time: "2 days ago",
      source: "Swiss Info",
      currencies: ["CHF", "EUR", "USD"],
      image: "🇨🇭"
    }
  ];

  const marketAlerts = [
    { type: "breaking", title: "USD/EUR breaks key resistance level", time: "15 min ago", impact: "high" },
    { type: "warning", title: "High volatility expected in GBP pairs", time: "1 hour ago", impact: "medium" },
    { type: "info", title: "Asian session opens with mixed sentiment", time: "3 hours ago", impact: "low" }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default: return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case "breaking": return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800";
      case "warning": return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800";
      default: return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800";
    }
  };

  const filteredNews = selectedCategory === "all" 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2 sm:space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Currency News & Analysis</h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
          Stay updated with the latest market-moving news and expert analysis
        </p>
      </div>

      {/* Alert Types */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {[ 
          {
            title: "Price Alerts",
            desc: "Get notified when a currency reaches your target price.",
            icon: Bell,
            accent: "from-indigo-500/70 via-blue-500/60 to-cyan-400/60",
            bg: "from-indigo-500/10 via-blue-500/5 to-white",
          },
          {
            title: "Trend Alerts",
            desc: "Track significant price movements and trend changes.",
            icon: TrendingUp,
            accent: "from-emerald-500/70 via-teal-400/60 to-lime-300/60",
            bg: "from-emerald-500/10 via-teal-500/5 to-white",
          },
          {
            title: "Volatility Alerts",
            desc: "Monitor unusual market volatility and rapid price changes.",
            icon: AlertTriangle,
            accent: "from-purple-500/70 via-pink-500/60 to-rose-400/60",
            bg: "from-purple-500/10 via-pink-500/5 to-background",
          },
        ].map((item, idx) => (
          <Card
            key={idx}
            className={`border border-border/60 bg-gradient-to-br ${item.bg} shadow-lg shadow-slate-900/10 overflow-hidden`}
          >
            <div className={`h-1 w-full bg-gradient-to-r ${item.accent}`} />
            <CardContent className="p-5 sm:p-6 space-y-3">
              <div className="h-11 w-11 rounded-xl bg-card/80 text-foreground flex items-center justify-center shadow-sm">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="text-xl font-semibold text-foreground">{item.title}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Market Alerts */}
      <Card className="overflow-hidden border border-border/70 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-background shadow-lg backdrop-blur-sm text-foreground">
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500/80 via-sky-500/70 to-cyan-400/70" />

        <CardHeader className="flex items-center gap-2 bg-card/70 backdrop-blur-sm border-b border-border/60 p-6 pb-4">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <TrendingUp className="h-4 w-4" />
          </span>
          <CardTitle className="text-xl font-semibold text-foreground">Live Market Alerts</CardTitle>
        </CardHeader>

        <CardContent className="p-6 bg-card/70 backdrop-blur-sm space-y-3">
          {marketAlerts.map((alert, index) => {
            const getBadgeColor = (type) => {
              switch (type) {
                case "breaking": return "bg-rose-100 text-rose-700 border border-rose-200";
                case "warning": return "bg-amber-100 text-amber-700 border border-amber-200";
                default: return "bg-cyan-100 text-cyan-700 border border-cyan-200";
              }
            };
            return (
              <div key={index} className="p-4 rounded-xl bg-card border border-border/60 hover:border-primary/60 hover:shadow-sm transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <Badge variant="secondary" className={`uppercase text-xs font-semibold ${getBadgeColor(alert.type)}`}>
                      {alert.type}
                    </Badge>
                    <span className="font-semibold text-sm sm:text-base text-foreground">{alert.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" /> {alert.time}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* News Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex w-auto min-w-full">
            <TabsTrigger value="all" className="flex-shrink-0">All</TabsTrigger>
            <TabsTrigger value="central-banks" className="flex-shrink-0">Central Banks</TabsTrigger>
            <TabsTrigger value="politics" className="flex-shrink-0">Politics</TabsTrigger>
            <TabsTrigger value="markets" className="flex-shrink-0">Markets</TabsTrigger>
            <TabsTrigger value="commodities" className="flex-shrink-0">Commodities</TabsTrigger>
            <TabsTrigger value="crypto" className="flex-shrink-0">Crypto</TabsTrigger>
            <TabsTrigger value="emerging" className="flex-shrink-0">Emerging</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={selectedCategory} className="mt-6 sm:mt-8">
          <div className="grid gap-4 sm:gap-6">
            {filteredNews.map((article) => (
              <Card key={article.id} className="overflow-hidden border border-border/70 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-background shadow-lg backdrop-blur-sm text-foreground hover:shadow-xl transition-all duration-200">
                <div className="h-1 w-full bg-gradient-to-r from-indigo-500/80 via-sky-500/70 to-cyan-400/70" />
                <CardContent className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="flex-shrink-0 self-start">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-xl sm:text-2xl">
                        {article.image}
                      </div>
                    </div>

                    <div className="flex-1 space-y-2 sm:space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <h2 className="text-base sm:text-lg md:text-xl font-semibold leading-tight text-foreground">
                          {article.title}
                        </h2>
                        <Badge
                          variant="secondary"
                          className={`flex-shrink-0 w-fit text-xs font-semibold ${
                            article.impact === 'high'
                              ? 'bg-rose-100 text-rose-700 border border-rose-200'
                              : article.impact === 'medium'
                              ? 'bg-amber-100 text-amber-700 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {article.impact} impact
                        </Badge>
                      </div>

                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{article.summary}</p>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                            <Globe className="h-3 w-3 sm:h-4 sm:w-4" /> {article.source}
                          </div>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4" /> {article.time}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex gap-1 flex-wrap">
                            {article.currencies.map((currency) => (
                              <Badge key={currency} variant="secondary" className="text-xs bg-primary/10 text-primary border border-primary/20">
                                {currency}
                              </Badge>
                            ))}
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-primary hover:text-primary bg-primary/10 hover:bg-primary/20">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Economic Calendar Preview */}
      <Card className="overflow-hidden border border-border/70 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-background shadow-lg backdrop-blur-sm text-foreground">
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500/80 via-sky-500/70 to-cyan-400/70" />

        <CardHeader className="flex items-center gap-2 bg-card/70 backdrop-blur-sm border-b border-border/60 p-6 pb-4">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Calendar className="h-4 w-4" />
          </span>
          <CardTitle className="text-xl font-semibold text-foreground">Upcoming Economic Events</CardTitle>
        </CardHeader>

        <CardContent className="p-6 bg-card/70 backdrop-blur-sm">
          <div className="space-y-3 sm:space-y-4">
            {[
              { time: "09:30 GMT", event: "US CPI", currency: "USD", impact: "high", forecast: "3.2%", previous: "3.1%" },
              { time: "14:00 GMT", event: "ECB Interest Rate Decision", currency: "EUR", impact: "high", forecast: "4.25%", previous: "4.25%" },
              { time: "Tomorrow 12:30 GMT", event: "UK Employment Data", currency: "GBP", impact: "medium", forecast: "4.0%", previous: "3.9%" }
            ].map((event, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 bg-card border border-border/60 rounded-xl hover:border-primary/60 hover:shadow-sm transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="text-xs sm:text-sm text-muted-foreground sm:min-w-24">{event.time}</div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base text-foreground">{event.event}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      Forecast: {event.forecast} | Previous: {event.previous}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border border-primary/20">{event.currency}</Badge>
                  <Badge variant="secondary" className={`text-xs font-semibold ${
                    event.impact === 'high' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                    event.impact === 'medium' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                    'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  }`}>
                    {event.impact}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
