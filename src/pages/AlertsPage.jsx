import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Bell, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

export function AlertsPage() {
  const alerts = [
    {
      id: 1,
      type: "price",
      currency: "EUR/USD",
      condition: "above",
      value: 1.10,
      current: 1.0932,
      active: true,
      icon: TrendingUp,
      color: "text-emerald-500"
    },
    {
      id: 2,
      type: "price",
      currency: "GBP/USD",
      condition: "below",
      value: 1.25,
      current: 1.2654,
      active: true,
      icon: TrendingDown,
      color: "text-rose-500"
    },
    {
      id: 3,
      type: "volatility",
      currency: "USD/JPY",
      condition: "high volatility",
      value: 5,
      current: 3.2,
      active: true,
      icon: AlertTriangle,
      color: "text-amber-500"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Bell className="h-10 w-10 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold">Price Alerts</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Set up custom alerts to stay informed about important currency movements and market conditions.
        </p>
      </div>

      {/* Create Alert Button */}
      <div className="flex justify-center">
        <Button size="lg" className="gap-2">
          <Bell className="h-5 w-5" />
          Create New Alert
        </Button>
      </div>

      {/* Active Alerts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Active Alerts</h2>
        <div className="grid gap-4">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            const isPrice = alert.type === "price";
            const isVolatility = alert.type === "volatility";
            return (
              <Card key={alert.id} className="overflow-hidden border border-border/70 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-white shadow-lg backdrop-blur-sm text-foreground">
                <div className="h-1 w-full bg-gradient-to-r from-indigo-500/80 via-sky-500/70 to-cyan-400/70" />

                <div className="p-3 sm:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div className="flex items-start gap-3 sm:gap-4 flex-1">
                    <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <h3 className="text-base sm:text-xl font-semibold text-foreground truncate">{alert.currency}</h3>
                        <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-medium w-fit">
                          Active
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                        Alert when price is <span className="font-semibold text-foreground">{alert.condition}</span> {alert.value}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                        <span>
                          Current: <span className="font-semibold text-foreground">{alert.current}</span>
                        </span>
                        <span>
                          Target: <span className="font-semibold text-foreground">{alert.value}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button variant="outline" size="sm" className="border-border/70 text-foreground hover:border-primary hover:text-primary text-xs sm:text-sm">Edit</Button>
                    <Button variant="destructive" size="sm" className="text-xs sm:text-sm">Delete</Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Alert Types Info */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {[ 
          {
            title: "Price Alerts",
            desc: "Get notified when a currency reaches your target price",
            icon: TrendingUp,
            accent: "from-indigo-500/70 via-blue-500/60 to-cyan-400/60",
            bg: "from-indigo-500/10 via-blue-500/5 to-white",
          },
          {
            title: "Trend Alerts",
            desc: "Track significant price movements and trend changes",
            icon: TrendingDown,
            accent: "from-emerald-500/70 via-teal-400/60 to-lime-300/60",
            bg: "from-emerald-500/10 via-teal-500/5 to-white",
          },
          {
            title: "Volatility Alerts",
            desc: "Monitor unusual market volatility and rapid price changes",
            icon: AlertTriangle,
            accent: "from-purple-500/70 via-pink-500/60 to-rose-400/60",
            bg: "from-purple-500/10 via-pink-500/5 to-white",
          },
        ].map((item, idx) => (
          <Card
            key={idx}
            className={`overflow-hidden border border-border/60 bg-gradient-to-br ${item.bg} shadow-lg shadow-slate-900/10`}
          >
            <div className={`h-1 w-full bg-gradient-to-r ${item.accent}`} />
            <div className="p-6 text-center space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-slate-900 shadow-sm">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-800/80 leading-relaxed">{item.desc}</p>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
