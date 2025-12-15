import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  TrendingUp,
  Users,
  Award,
  Globe,
  Shield,
  Zap,
  ExternalLink,
  Github,
  Twitter,
  Mail,
} from "lucide-react";

export function AboutPage() {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-Time Data",
      description:
        "Live exchange rates updated every minute from major financial markets worldwide.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Coverage",
      description:
        "Support for 20+ major currencies including exotic pairs and emerging markets.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Bank-Grade Security",
      description:
        "Enterprise-level security with encrypted connections and secure data handling.",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "99.9% Uptime",
      description:
        "Reliable service with guaranteed uptime and redundant infrastructure.",
    },
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      bio: "Former Goldman Sachs trader with 15+ years in FX markets",
      image: "👩‍💼",
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      bio: "Ex-Google engineer specializing in high-frequency trading systems",
      image: "👨‍💻",
    },
    {
      name: "Emily Johnson",
      role: "Head of Product",
      bio: "Financial technology expert with background in user experience",
      image: "👩‍🎨",
    },
    {
      name: "David Kim",
      role: "Lead Data Scientist",
      bio: "PhD in Economics, specialist in currency forecasting models",
      image: "👨‍🔬",
    },
  ];

  const stats = [
    { label: "Active Users", value: "1M+", icon: Users },
    { label: "Daily Conversions", value: "10M+", icon: TrendingUp },
    { label: "Countries Served", value: "150+", icon: Globe },
    { label: "API Calls/Day", value: "100M+", icon: Zap },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12 bg-gradient-to-br from-primary/5 via-chart-1/5 to-chart-2/5 rounded-2xl">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent">
          About CurrencyExchange
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          We're on a mission to make currency exchange transparent, accessible,
          and reliable for everyone worldwide.
        </p>

        <div className="flex gap-4 justify-center">
          <Button size="lg">Start Converting</Button>
          <Button variant="outline" size="lg">
            Contact Us <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center p-6">
            <CardContent>
              <stat.icon className="h-6 w-6 mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* CTA */}
      <section className="text-center py-12 bg-gradient-to-r from-primary/10 via-chart-1/10 to-chart-2/10 rounded-2xl">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
          Join millions of users who trust CurrencyExchange.
        </p>
        <Button size="lg" className="mt-4">
          Start Converting Now
        </Button>
      </section>
    </div>
  );
}
