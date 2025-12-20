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
    { label: "Active Users", value: "1M+", icon: Users },
    { label: "Daily Conversions", value: "10M+", icon: TrendingUp },
    { label: "Countries Served", value: "150+", icon: Globe },
    { label: "API Calls/Day", value: "100M+", icon: Zap },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12 bg-gradient-to-br from-primary/5 via-chart-1/5 to-chart-2/5 rounded-2xl">
         <h1 className="text-3xl sm:text-6xl md:text-6xl font-extrabold tracking-tight         text-foreground"> About <br />
          Currency Exchange <br />
          <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
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
            className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-400 opacity-90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />
            <CardContent className="relative z-10 p-6 bg-white/5 backdrop-blur-sm border border-white/10">
              {(() => { const Icon = stat.icon; return (
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm mb-3" aria-label={`${stat.label} icon`}>
                  {Icon ? <Icon className="h-6 w-6 text-white" /> : null}
                </div>
              ); })()}
              <div className="text-3xl font-extrabold tracking-tight">{stat.value}</div>
              <div className="text-sm text-white/75">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Platform Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <Card key={i} className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-400 opacity-90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />
            <CardContent className="relative z-10 p-6 bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm mb-3">
                {f.icon}
              </div>
              <div className="font-semibold text-white mb-1">{f.title}</div>
              <p className="text-sm text-white/80">{f.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Team */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, index) => (
          <Card
            key={index}
            className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 opacity-90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />
            <CardContent className="relative z-10 p-6 bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-6xl mb-4">{member.image}</div>
              <h3 className="font-semibold text-white">{member.name}</h3>
              <div className="mt-1">
                <Badge variant="secondary" className="bg-white/15 text-white border border-white/25">{member.role}</Badge>
              </div>
              <p className="text-sm text-white/75 mt-2">{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Mission & Vision */}
      <section>
        <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />
          <CardContent className="relative z-10 p-6 bg-white/5 backdrop-blur-sm border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">Our Mission</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              We make currency exchange transparent and accessible for everyone—from individual travelers to global businesses—by providing accurate live rates, intuitive tools, and secure experiences.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {["Real-time market insights", "Bank-grade security", "Global coverage", "Mobile-first design"].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/10 border border-white/15 text-sm text-white/85">
                  • {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Technology & Integrations */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-400 opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />
          <CardContent className="relative z-10 p-6 bg-white/5 backdrop-blur-sm border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">Technology</h3>
            <div className="grid grid-cols-2 gap-3">
              {["React 19", "Vite 7", "Tailwind CSS", "Radix UI", "Recharts", "CurrencyAPI", "exchangerate.host", "Vercel"].map((t, i) => (
                <Badge key={i} variant="secondary" className="bg-white/15 text-white border border-white/25">{t}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-400 opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />
          <CardContent className="relative z-10 p-6 bg-white/5 backdrop-blur-sm border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">Security & Compliance</h3>
            <ul className="text-sm text-white/80 space-y-2">
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
        <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />
          <CardContent className="relative z-10 p-6 bg-white/5 backdrop-blur-sm border border-white/10">
            <h3 className="text-xl font-semibold mb-4 text-white">Get in Touch</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" size="sm" className="bg-white/90 text-slate-900 border-white/40"><Github className="h-4 w-4 mr-2" /> GitHub</Button>
              <Button variant="outline" size="sm" className="bg-white/90 text-slate-900 border-white/40"><Twitter className="h-4 w-4 mr-2" /> Twitter</Button>
              <Button variant="outline" size="sm" className="bg-white/90 text-slate-900 border-white/40"><Mail className="h-4 w-4 mr-2" /> Email</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section>
        <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />
          <CardContent className="relative z-10 p-6 bg-white/5 backdrop-blur-sm border border-white/10">
            <h3 className="text-xl font-semibold mb-4 text-white">FAQ</h3>
            <div className="space-y-3">
              <div>
                <div className="font-semibold text-white">Is the data live?</div>
                <p className="text-sm text-white/80">Yes, latest rates are fetched from CurrencyAPI; historical trends from exchangerate.host.</p>
              </div>
              <div>
                <div className="font-semibold text-white">Do you support mobile?</div>
                <p className="text-sm text-white/80">The UI is mobile-first with responsive layouts and optimized charts.</p>
              </div>
              <div>
                <div className="font-semibold text-white">How do I report an issue?</div>
                <p className="text-sm text-white/80">Reach out via GitHub or email; we respond quickly to production-impacting issues.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="text-center py-12 bg-gradient-to-r from-primary/10 to-chart-2/10 rounded-2xl">
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
