import { Card, CardContent, } from "../components/ui/card";
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
    {
      label: "Active Users",
      value: "1M+",
      icon: Users,
    },
    {
      label: "Daily Conversions",
      value: "10M+",
      icon: TrendingUp,
    },
    {
      label: "Countries Served",
      value: "150+",
      icon: Globe,
    },
    {
      label: "API Calls/Day",
      value: "100M+",
      icon: Zap,
    },
  ];

  return (
    <div className="space-y-12 animate-page-fade">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12 bg-muted/40 border border-border rounded-2xl">
          <h1 className="text-3xl sm:text-6xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15] sm:leading-[1.1]">
            About Currency Exchange{" "}
            <br className="hidden sm:inline" />
            <span className="text-indigo-600 dark:text-indigo-400">
              Reimagined.
            </span>
          </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          We're on a mission to make currency exchange transparent, accessible,
          and reliable for everyone worldwide.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">Start Converting</Button>
          <Button variant="outline" size="lg">
            Contact Us <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="overflow-hidden border border-border bg-card text-foreground shadow-sm text-center hover-lift"
          >
            <CardContent className="relative p-6 space-y-3">
              {(() => { const Icon = stat.icon; return (
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm mb-1" aria-label={`${stat.label} icon`}>
                  {Icon ? <Icon className="h-6 w-6" /> : null}
                </div>
              ); })()}
              <div className="text-3xl font-extrabold tracking-tight">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Platform Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <Card
            key={i}
            className="overflow-hidden border border-border bg-card text-foreground shadow-sm hover-lift"
          >
            <CardContent className="relative p-6 space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
                {f.icon}
              </div>
              <div className="font-semibold text-foreground mb-1">{f.title}</div>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Team */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, index) => {
          return (
            <Card
              key={index}
              className="overflow-hidden border border-border bg-card text-foreground shadow-sm text-center hover-lift"
            >
              <CardContent className="relative p-6 space-y-3">
                <div className="text-6xl mb-2">{member.image}</div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <div className="mt-1">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/20">{member.role}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{member.bio}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Mission & Vision */}
      <section>
        <Card className="overflow-hidden border border-border bg-card shadow-sm text-foreground">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Our Mission</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We make currency exchange transparent and accessible for everyone—from individual travelers to global businesses—by providing accurate live rates, intuitive tools, and secure experiences.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {["Real-time market insights", "Bank-grade security", "Global coverage", "Mobile-first design"].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-muted border border-border text-sm font-medium">
                  • {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Technology & Integrations */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden border border-border bg-card shadow-sm text-foreground">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Technology</h3>
            <div className="grid grid-cols-2 gap-3">
              {["React 19", "Vite 7", "Tailwind CSS", "Radix UI", "Recharts", "CurrencyAPI", "exchangerate.host", "Vercel"].map((t, i) => (
                <Badge key={i} variant="secondary" className="bg-muted text-foreground border border-border">{t}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border border-border bg-card shadow-sm text-foreground">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Security & Compliance</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Encrypted transport (HTTPS)</li>
              <li>• Strict API key handling via environment variables</li>
              <li>• Privacy-first analytics (opt-in)</li>
              <li>• Regular dependency updates</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Contact & Community */}
      <section>
        <Card className="overflow-hidden border border-border bg-card shadow-sm text-foreground">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Get in Touch</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" size="sm" className="bg-card text-foreground border border-border"><Github className="h-4 w-4 mr-2" /> GitHub</Button>
              <Button variant="outline" size="sm" className="bg-card text-foreground border border-border"><Twitter className="h-4 w-4 mr-2" /> Twitter</Button>
              <Button variant="outline" size="sm" className="bg-card text-foreground border border-border"><Mail className="h-4 w-4 mr-2" /> Email</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section>
        <Card className="overflow-hidden border border-border bg-card shadow-sm text-foreground">
          <CardContent className="p-6 space-y-3">
            <h3 className="text-xl font-semibold text-foreground">FAQ</h3>
            <div className="space-y-3">
              <div>
                <div className="font-semibold text-foreground">Is the data live?</div>
                <p className="text-sm text-muted-foreground">Yes, latest rates are fetched from CurrencyAPI; historical trends from exchangerate.host.</p>
              </div>
              <div>
                <div className="font-semibold text-foreground">Do you support mobile?</div>
                <p className="text-sm text-muted-foreground">The UI is mobile-first with responsive layouts and optimized charts.</p>
              </div>
              <div>
                <div className="font-semibold text-foreground">How do I report an issue?</div>
                <p className="text-sm text-muted-foreground">Reach out via GitHub or email; we respond quickly to production-impacting issues.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="text-center py-12 bg-muted/40 border border-border rounded-2xl">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="text-muted-foreground mt-2">
          Join millions of users who trust CurrencyExchange.
        </p>
        <Button size="lg" className="mt-4">
          Start Converting Now
        </Button>
      </section>
    </div>
  );
}
