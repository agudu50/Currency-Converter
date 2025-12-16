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
              <Card key={alert.id} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-lg bg-muted ${alert.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold">{alert.currency}</h3>
                        <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                          Active
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        Alert when price is <span className="font-semibold">{alert.condition}</span> {alert.value}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          Current: <span className="font-semibold text-foreground">{alert.current}</span>
                        </span>
                        <span className="text-muted-foreground">
                          Target: <span className="font-semibold text-foreground">{alert.value}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Alert Types Info */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <Card className="p-6 text-center">
          <TrendingUp className="h-12 w-12 mx-auto mb-4 text-emerald-500" />
          <h3 className="text-xl font-semibold mb-2">Price Alerts</h3>
          <p className="text-sm text-muted-foreground">
            Get notified when a currency reaches your target price
          </p>
        </Card>
        <Card className="p-6 text-center">
          <TrendingDown className="h-12 w-12 mx-auto mb-4 text-rose-500" />
          <h3 className="text-xl font-semibold mb-2">Trend Alerts</h3>
          <p className="text-sm text-muted-foreground">
            Track significant price movements and trend changes
          </p>
        </Card>
        <Card className="p-6 text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-amber-500" />
          <h3 className="text-xl font-semibold mb-2">Volatility Alerts</h3>
          <p className="text-sm text-muted-foreground">
            Monitor unusual market volatility and rapid price changes
          </p>
        </Card>
      </section>
    </div>
  );
}
