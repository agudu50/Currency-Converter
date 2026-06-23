import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
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
  Check,
  ChevronDown,
  Info,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Code2,
  PhoneCall
} from "lucide-react";

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export function AboutPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Reveal handlers
  const { ref: statsRef, visible: statsVisible } = useReveal(0.08);
  const { ref: featuresRef, visible: featuresVisible } = useReveal(0.08);
  const { ref: missionRef, visible: missionVisible } = useReveal(0.08);
  const { ref: teamRef, visible: teamVisible } = useReveal(0.08);
  const { ref: techRef, visible: techVisible } = useReveal(0.08);
  const { ref: contactRef, visible: contactVisible } = useReveal(0.08);
  const { ref: faqRef, visible: faqVisible } = useReveal(0.08);
  const { ref: ctaRef, visible: ctaVisible } = useReveal(0.08);

  const features = [
    {
      icon: Zap,
      title: "Real-Time Data",
      description: "Live exchange rates updated every minute from major financial markets worldwide.",
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10 dark:bg-indigo-500/15"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Support for 140+ major currencies including exotic pairs and emerging markets.",
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-500/10 dark:bg-violet-500/15"
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Enterprise-level security with fully encrypted connections and secure data storage.",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10 dark:bg-emerald-500/15"
    },
    {
      icon: Award,
      title: "99.99% Uptime SLA",
      description: "Highly redundant database infrastructure guaranteeing round-the-clock availability.",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10 dark:bg-amber-500/15"
    },
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      bio: "Former Goldman Sachs trader with 15+ years in FX liquidity markets",
      image: "👩‍💼",
      bg: "bg-amber-500/10 border-amber-500/20",
      socials: { twitter: "#", github: "#", email: "mailto:sarah@example.com" }
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      bio: "Ex-Google systems architect specializing in sub-millisecond trading pipelines",
      image: "👨‍💻",
      bg: "bg-indigo-500/10 border-indigo-500/20",
      socials: { twitter: "#", github: "#", email: "mailto:michael@example.com" }
    },
    {
      name: "Emily Johnson",
      role: "Head of Product",
      bio: "Fintech interface specialist with background in behavioral design",
      image: "👩‍🎨",
      bg: "bg-violet-500/10 border-violet-500/20",
      socials: { twitter: "#", github: "#", email: "mailto:emily@example.com" }
    },
    {
      name: "David Kim",
      role: "Lead Data Scientist",
      bio: "PhD in Quantitative Economics, focusing on algorithmic trend modeling",
      image: "👨‍🔬",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      socials: { twitter: "#", github: "#", email: "mailto:david@example.com" }
    },
  ];

  const stats = [
    {
      label: "Active Users",
      value: "1M+",
      icon: Users,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10 dark:bg-indigo-500/15"
    },
    {
      label: "Daily Conversions",
      value: "10M+",
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10 dark:bg-emerald-500/15"
    },
    {
      label: "Countries Served",
      value: "150+",
      icon: Globe,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-500/10 dark:bg-violet-500/15"
    },
    {
      label: "API Queries/Day",
      value: "100M+",
      icon: Zap,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10 dark:bg-amber-500/15"
    },
  ];

  const faqs = [
    {
      q: "Where does the currency rate data come from?",
      a: "Our core exchange rates are sourced dynamically from CurrencyAPI, which aggregates interbank rates from over 15 global liquidity providers. Historical charts and trends utilize data from exchangerate.host to maintain high resolution accuracy."
    },
    {
      q: "How frequently are the exchange rates updated?",
      a: "Live market rates refresh automatically every 60 seconds on the landing page and dashboard. Premium tiers support sub-second real-time web-socket streaming integrations."
    },
    {
      q: "Is there a usage limit for the converter tools?",
      a: "No! The browser-based interface is 100% free and supports unlimited conversions. For developers requiring programmatic API access, we offer structured developer keys with generous rate limit thresholds."
    },
  ];

  return (
    <div className="relative min-h-screen pb-24 overflow-hidden">
      
      {/* ─── Background Decorative Orbs ───────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute rounded-full float-anim-slow"
          style={{ width: 460, height: 460, background: "#4f46e5", top: "-100px", right: "-80px", filter: "blur(90px)", opacity: 0.05 }} />
        <div className="absolute rounded-full float-anim-delay"
          style={{ width: 320, height: 320, background: "#10b981", bottom: "20%", left: "-50px", filter: "blur(80px)", opacity: 0.04 }} />
      </div>

      <div className="relative z-10 space-y-16">
        
        {/* ─── Hero Section ───────────────────────────────────────────────────── */}
        <section className={`reveal text-center space-y-6 py-16 px-4 rounded-3xl border border-border bg-card shadow-sm relative overflow-hidden ${heroVisible ? "visible" : ""}`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
          <div className="max-w-4xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 dark:bg-indigo-500/15 px-3 py-1 rounded-full border border-indigo-500/20">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Our Mission
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1] sm:leading-[1.05]">
              About Currency Exchange <br className="hidden sm:inline" />
              <span className="text-indigo-600 dark:text-indigo-400">Reimagined.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're on a mission to make international currency conversion transparent, accessible, and reliably secure for travelers, creators, and businesses worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-12 px-6 font-bold shadow-sm transition-all hover:scale-105 active:scale-95">
                Start Converting Now
              </Button>
              <Button variant="outline" size="lg" className="rounded-2xl h-12 px-6 border-border/80 hover:bg-muted text-foreground font-semibold transition-all hover:scale-105 active:scale-95">
                Contact Developer <ExternalLink className="ml-2 h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </section>

        {/* ─── Stats Grid ────────────────────────────────────────────────────── */}
        <section ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className={`reveal-scale card-glow overflow-hidden border border-border bg-card text-foreground rounded-2xl shadow-sm text-center ${statsVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <CardContent className="p-5 space-y-3">
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.color} shadow-sm`} aria-label={`${stat.label} icon`}>
                    {Icon ? <Icon className="h-5 w-5" /> : null}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground tabular-nums">{stat.value}</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* ─── Platform Features Bento Grid ──────────────────────────────────── */}
        <section ref={featuresRef} className="space-y-6">
          <div className={`reveal text-center max-w-2xl mx-auto space-y-2 ${featuresVisible ? "visible" : ""}`}>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Built on Core Value Pillars</h2>
            <p className="text-sm text-muted-foreground">Every integration is measured against our standards of reliability, performance, and accessibility.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <Card
                key={i}
                className={`reveal-scale card-glow overflow-hidden border border-border bg-card text-foreground rounded-2xl shadow-sm ${featuresVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${f.bg} ${f.color} shadow-sm`}>
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base text-foreground">{f.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ─── Mission & Vision Detailed Card ────────────────────────────────── */}
        <section ref={missionRef}>
          <Card className={`reveal card-glow overflow-hidden border border-border bg-card shadow-sm text-foreground rounded-3xl ${missionVisible ? "visible" : ""}`}>
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div className="space-y-2 max-w-xl">
                  <h3 className="text-xl sm:text-2xl font-black text-foreground">Global Access Commitment</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    By leveraging optimized multi-provider API gateways, we guarantee minimal conversion lag. Whether checking rates for travel transactions, business bills, or global software subscriptions, your queries remain fully verified and securely compiled.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 w-full md:w-auto shrink-0">
                  {["Real-time market insights", "Bank-grade connection encryption", "Full global coin coverage", "Mobile-optimized layouts"].map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-muted/60 border border-border text-xs font-semibold flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ─── Team Grid ──────────────────────────────────────────────────────── */}
        <section ref={teamRef} className="space-y-6">
          <div className={`reveal text-center max-w-2xl mx-auto space-y-2 ${teamVisible ? "visible" : ""}`}>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">The Architecture Team</h2>
            <p className="text-sm text-muted-foreground">The engineers and market analysts behind our real-time exchange algorithm calculations.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, index) => {
              return (
                <Card
                  key={index}
                  className={`reveal-scale card-glow overflow-hidden border border-border bg-card text-foreground rounded-2xl shadow-sm text-center ${teamVisible ? "visible" : ""}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <CardContent className="p-6 space-y-4">
                    {/* Circle image avatar */}
                    <div className="relative inline-flex items-center justify-center">
                      <div className={`h-20 w-20 rounded-full border flex items-center justify-center text-4xl shadow-sm hover:scale-110 transition-transform duration-300 ${member.bg}`}>
                        {member.image}
                      </div>
                      <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-card" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-bold text-base text-foreground leading-tight">{member.name}</h3>
                      <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                        {member.role}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed px-1 min-h-[40px]">{member.bio}</p>

                    <Separator className="bg-border/40" />

                    {/* Social connection row */}
                    <div className="flex justify-center gap-3 pt-1">
                      <a href={member.socials.github} className="h-8 w-8 rounded-lg border border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center transition-colors">
                        <Github className="h-4 w-4" />
                      </a>
                      <a href={member.socials.twitter} className="h-8 w-8 rounded-lg border border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center transition-colors">
                        <Twitter className="h-4 w-4" />
                      </a>
                      <a href={member.socials.email} className="h-8 w-8 rounded-lg border border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center transition-colors">
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ─── Tech stack and Security Section ────────────────────────────────── */}
        <section ref={techRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <Card className={`reveal card-glow overflow-hidden border border-border bg-card shadow-sm text-foreground rounded-3xl ${techVisible ? "visible" : ""}`}>
            <CardHeader className="border-b border-border/60 p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                  <Code2 className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold">Technology Stack</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">Built using robust modern web development solutions.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {[
                  "React 19 Core Library", "Vite 7 Packager", "Tailwind CSS Layout Engine", 
                  "Radix UI Components", "Lucide Icon Suite", "Recharts Interactive Analytics", 
                  "CurrencyAPI Provider", "exchangerate.host Historical Database", "LocalStorage State Sync", 
                  "End-to-End ESM Bundles"
                ].map((t, i) => (
                  <Badge key={i} variant="secondary" className="bg-muted text-foreground hover:bg-muted/80 border border-border px-3 py-1 text-xs font-semibold rounded-xl transition-colors">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className={`reveal card-glow overflow-hidden border border-border bg-card shadow-sm text-foreground rounded-3xl ${techVisible ? "visible" : ""}`} style={{ transitionDelay: "100ms" }}>
            <CardHeader className="border-b border-border/60 p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold">Security & Compliance</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">Rigorous transport-layer privacy protocols are active.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <ul className="text-xs text-muted-foreground space-y-2.5">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Encrypted transport tunnels via secure Hypertext Transfer Protocol (HTTPS).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Strict API token encapsulation preventing exposure to third-party endpoints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Privacy-first client configurations. State data metrics are entirely local.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Routine dependency monitoring to guard against system package vulnerabilities.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* ─── FAQ Section ────────────────────────────────────────────────────── */}
        <section ref={faqRef} className="space-y-6">
          <div className={`reveal text-center max-w-2xl mx-auto space-y-2 ${faqVisible ? "visible" : ""}`}>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-sm text-muted-foreground">Answers to common inquiries about rate calculation updates and limits.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => {
              const active = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`reveal border border-border bg-card rounded-2xl overflow-hidden transition-all duration-300 ${
                    active ? "ring-1 ring-indigo-500/20 border-indigo-500/20 shadow-sm" : "hover:border-border/80"
                  } ${faqVisible ? "visible" : ""}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <button
                    onClick={() => setActiveFaq(active ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-foreground hover:bg-muted/10 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300 ${active ? "rotate-180 text-indigo-500" : ""}`} />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      active ? "max-h-[200px] border-t border-border/40" : "max-h-0"
                    }`}
                  >
                    <p className="p-5 text-xs sm:text-sm text-muted-foreground leading-relaxed bg-muted/10">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Contact & Community Section ────────────────────────────────────── */}
        <section ref={contactRef}>
          <Card className={`reveal card-glow overflow-hidden border border-border bg-card shadow-sm text-foreground rounded-3xl ${contactVisible ? "visible" : ""}`}>
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="space-y-1 text-center md:text-left">
                <h3 className="text-lg font-bold text-foreground">Get in Touch with Developer</h3>
                <p className="text-xs text-muted-foreground">Reach out via standard social coordinates or email for suggestions and reports.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 shrink-0">
                <Button variant="outline" size="sm" className="bg-card text-foreground hover:bg-muted hover:text-indigo-500 border-border/80 hover:border-indigo-500 rounded-xl h-10 px-4 text-xs font-semibold flex items-center gap-2">
                  <Github className="h-4 w-4" /> GitHub Project
                </Button>
                <Button variant="outline" size="sm" className="bg-card text-foreground hover:bg-muted hover:text-sky-500 border-border/80 hover:border-sky-500 rounded-xl h-10 px-4 text-xs font-semibold flex items-center gap-2">
                  <Twitter className="h-4 w-4" /> Twitter Updates
                </Button>
                <Button variant="outline" size="sm" className="bg-card text-foreground hover:bg-rose-500/10 hover:text-rose-500 border-border/80 hover:border-rose-500 rounded-xl h-10 px-4 text-xs font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Contact Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ─── CTA Banner ─────────────────────────────────────────────────────── */}
        <section ref={ctaRef}>
          <div className={`reveal relative overflow-hidden rounded-3xl bg-indigo-600 text-white p-8 sm:p-12 text-center space-y-6 shadow-md ${ctaVisible ? "visible" : ""}`}>
            {/* Grid background pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            
            {/* Solid orbs */}
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white/[0.04] -translate-x-12 -translate-y-12 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-44 h-44 rounded-full bg-white/[0.04] translate-x-16 translate-y-16 pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Ready to Start Converting?</h2>
              <p className="text-sm sm:text-base text-indigo-100 max-w-md mx-auto leading-relaxed">
                Experience lightning-fast rates, custom watch alerts, and visual trend analytics now.
              </p>
              <div className="pt-2">
                <Button size="lg" className="bg-white hover:bg-indigo-50 text-indigo-600 font-bold rounded-2xl h-12 px-8 transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 mx-auto">
                  Get Started <ArrowRight className="h-4.5 w-4.5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
