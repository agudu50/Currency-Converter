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
            return (
              <Card key={alert.id} className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-90" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />
                
                <div className="relative z-10 bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="p-3 sm:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                    <div className="flex items-start gap-3 sm:gap-4 flex-1">
                      <div className="p-2 sm:p-3 rounded-lg bg-white/15 backdrop-blur-sm flex-shrink-0">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <h3 className="text-base sm:text-xl font-semibold text-white truncate">{alert.currency}</h3>
                          <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-200/40 text-xs font-medium w-fit">
                            Active
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-white/80 line-clamp-2">
                          Alert when price is <span className="font-semibold text-white">{alert.condition}</span> {alert.value}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                          <span className="text-white/70">
                            Current: <span className="font-semibold text-white">{alert.current}</span>
                          </span>
                          <span className="text-white/70">
                            Target: <span className="font-semibold text-white">{alert.value}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/25 hover:border-white/40 text-xs sm:text-sm">Edit</Button>
                      <Button variant="destructive" size="sm" className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-200/40 text-xs sm:text-sm">Delete</Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Alert Types Info */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />
          
          <div className="relative z-10 p-6 text-center bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Price Alerts</h3>
            <p className="text-sm text-white/80">
              Get notified when a currency reaches your target price
            </p>
          </div>
        </Card>
        
        <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-red-500 opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />
          
          <div className="relative z-10 p-6 text-center bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm mx-auto mb-4">
              <TrendingDown className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Trend Alerts</h3>
            <p className="text-sm text-white/80">
              Track significant price movements and trend changes
            </p>
          </div>
        </Card>
        
        <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />
          
          <div className="relative z-10 p-6 text-center bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm mx-auto mb-4">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Volatility Alerts</h3>
            <p className="text-sm text-white/80">
              Monitor unusual market volatility and rapid price changes
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
}
