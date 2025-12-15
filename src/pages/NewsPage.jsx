import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Clock, TrendingUp, Globe, Calendar, ExternalLink } from "lucide-react";

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
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Currency News & Analysis</h1>
        <p className="text-lg text-muted-foreground">
          Stay updated with the latest market-moving news and expert analysis
        </p>
      </div>

      {/* Market Alerts */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" /> Live Market Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {marketAlerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="uppercase text-xs">{alert.type}</Badge>
                    <span className="font-medium">{alert.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" /> {alert.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* News Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="central-banks">Central Banks</TabsTrigger>
          <TabsTrigger value="politics">Politics</TabsTrigger>
          <TabsTrigger value="markets">Markets</TabsTrigger>
          <TabsTrigger value="commodities">Commodities</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="emerging">Emerging</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-8">
          <div className="grid gap-6">
            {filteredNews.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-2xl">
                        {article.image}
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="text-xl font-semibold leading-tight hover:text-primary cursor-pointer">
                          {article.title}
                        </h2>
                        <Badge className={getImpactColor(article.impact)}>
                          {article.impact} impact
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">{article.summary}</p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Globe className="h-4 w-4" /> {article.source}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" /> {article.time}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {article.currencies.map((currency) => (
                              <Badge key={currency} variant="secondary" className="text-xs">{currency}</Badge>
                            ))}
                          </div>
                          <Button variant="ghost" size="sm">
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" /> Upcoming Economic Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "09:30 GMT", event: "US CPI", currency: "USD", impact: "high", forecast: "3.2%", previous: "3.1%" },
              { time: "14:00 GMT", event: "ECB Interest Rate Decision", currency: "EUR", impact: "high", forecast: "4.25%", previous: "4.25%" },
              { time: "Tomorrow 12:30 GMT", event: "UK Employment Data", currency: "GBP", impact: "medium", forecast: "4.0%", previous: "3.9%" }
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground min-w-24">{event.time}</div>
                  <div>
                    <div className="font-medium">{event.event}</div>
                    <div className="text-sm text-muted-foreground">
                      Forecast: {event.forecast} | Previous: {event.previous}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{event.currency}</Badge>
                  <Badge className={getImpactColor(event.impact)}>{event.impact}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
