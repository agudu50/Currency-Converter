import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  User, Bell, Palette, Globe, Shield, Download, Trash2, Save, 
  Settings, Sliders, CheckCircle2, Moon, Sun, Laptop, 
  Sparkles, Check, RefreshCw, Mail, AlertTriangle, ShieldAlert,
  Info, ExternalLink, Key, LogOut, ChevronRight, CheckCircle,
  Clock, Activity, ShieldCheck, FileJson, Laptop2
} from "lucide-react";
import { useTheme } from "../context/theme.jsx";

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

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  
  // Load settings from localStorage if available, or fall back to default settings
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem("app_settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          theme: theme || parsed.theme || "system"
        };
      }
    } catch (e) {
      console.error("Failed to load settings:", e);
    }
    return {
      // Profile
      firstName: "Tony",
      lastName: "Tech",
      email: "tony.tech@gmail.com",
      timezone: "UTC-5",
      
      // Preferences
      baseCurrency: "USD",
      decimalPlaces: 4,
      theme: theme || "system",
      language: "en",
      
      // Notifications
      emailNotifications: true,
      pushNotifications: true,
      smsAlerts: false,
      marketUpdates: true,
      
      // Privacy
      shareData: false,
      cookieConsent: true,
      marketingEmails: false
    };
  });

  const [initialSettings, setInitialSettings] = useState({ ...settings });
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isTestingNotification, setIsTestingNotification] = useState(false);
  const [testNotificationActive, setTestNotificationActive] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  // Scroll reveal handles
  const { ref: sidebarRef, visible: sidebarVisible } = useReveal(0.05);
  const { ref: contentRef, visible: contentVisible } = useReveal(0.05);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const updateSetting = (key, value) => {
    setSettings(prev => {
      const next = { ...prev, [key]: value };
      // Check if there are changes compared to initialSettings
      const changed = Object.keys(next).some(k => next[k] !== initialSettings[k]);
      setHasChanges(changed);
      return next;
    });
  };

  useEffect(() => {
    // Keep settings theme in sync if changed from context provider
    if (theme && settings.theme !== theme) {
      setSettings(prev => ({ ...prev, theme }));
    }
  }, [theme]);

  const saveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem("app_settings", JSON.stringify(settings));
      setInitialSettings({ ...settings });
      setHasChanges(false);
      setIsSaving(false);
      setToast({ message: "Settings saved successfully!", type: "success" });
    }, 800);
  };

  const discardChanges = () => {
    setSettings({ ...initialSettings });
    // If the theme was reverted, update active theme in app context
    if (initialSettings.theme && initialSettings.theme !== theme) {
      setTheme(initialSettings.theme);
    }
    setHasChanges(false);
    setToast({ message: "Changes discarded", type: "info" });
  };

  const exportData = () => {
    const data = {
      settings,
      exportDate: new Date().toISOString(),
      version: "1.0",
      stats: {
        memberSince: "January 2024",
        totalConversions: 1247,
        status: "Active"
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'currency-exchange-settings.json';
    a.click();
    URL.revokeObjectURL(url);
    setToast({ message: "Settings exported successfully!", type: "success" });
  };

  const triggerTestNotification = () => {
    setIsTestingNotification(true);
    setTimeout(() => {
      setIsTestingNotification(false);
      setTestNotificationActive(true);
      // Play a subtle notification animation
      setTimeout(() => setTestNotificationActive(false), 5000);
    }, 1200);
  };

  // Dynamically format base rates for formatting preview card
  const getFormatPreview = () => {
    const amount = 1000;
    const rates = {
      USD: { symbol: "$", eurRate: 0.8752, gbpRate: 0.7549, jpyRate: 161.5800 },
      EUR: { symbol: "€", usdRate: 1.1426, gbpRate: 0.8626, jpyRate: 184.6200 },
      GBP: { symbol: "£", usdRate: 1.3246, eurRate: 1.1593, jpyRate: 214.0300 },
      JPY: { symbol: "¥", usdRate: 0.0062, eurRate: 0.0054, gbpRate: 0.0047 },
      CAD: { symbol: "CA$", usdRate: 0.7062, eurRate: 0.6181, gbpRate: 0.5331 }
    };

    const currentBase = rates[settings.baseCurrency] || { symbol: settings.baseCurrency, usdRate: 1, eurRate: 1, gbpRate: 1 };
    const sym = currentBase.symbol;
    const decimals = settings.decimalPlaces;

    let targetText = "";
    if (settings.baseCurrency === "USD") {
      targetText = `1,000 USD = €${(amount * currentBase.eurRate).toFixed(decimals)} EUR`;
    } else if (settings.baseCurrency === "EUR") {
      targetText = `1,000 EUR = $${(amount * currentBase.usdRate).toFixed(decimals)} USD`;
    } else {
      // General fallbacks
      const targetRate = currentBase.usdRate || currentBase.eurRate || 1.15;
      targetText = `1,000 ${settings.baseCurrency} = $${(amount * targetRate).toFixed(decimals)} USD`;
    }

    return {
      formattedBase: `${sym}${amount.toFixed(decimals)}`,
      formattedConversion: targetText
    };
  };

  const preview = getFormatPreview();

  // Toast autoclose
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  return (
    <div className="relative min-h-screen pb-24 overflow-hidden">
      
      {/* ─── Background decorative Orbs ───────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute rounded-full float-anim-slow"
          style={{ width: 480, height: 480, background: "#4f46e5", top: "-120px", right: "-80px", filter: "blur(95px)", opacity: 0.045 }} />
        <div className="absolute rounded-full float-anim-delay"
          style={{ width: 340, height: 340, background: "#8b5cf6", bottom: "15%", left: "-60px", filter: "blur(85px)", opacity: 0.035 }} />
      </div>

      <div className="relative z-10 space-y-8">
        
        {/* ─── Header ────────────────────────────────────────────────────────── */}
        <div className={`reveal flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 border-b border-border ${heroVisible ? "visible" : ""}`}>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 dark:bg-indigo-500/15 px-3 py-1 rounded-full border border-indigo-500/20 mb-2">
              <Settings className="h-3.5 w-3.5" /> General Configuration
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Account Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your preferences, data sharing parameters, and notification alerts.
            </p>
          </div>

          <div className="flex gap-3">
            {hasChanges && (
              <>
                <Button 
                  variant="outline" 
                  onClick={discardChanges}
                  className="rounded-2xl border-border/80 text-foreground hover:bg-muted h-11 px-5 font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Discard
                </Button>
                <Button 
                  onClick={saveSettings}
                  disabled={isSaving}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-11 px-6 font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                >
                  {isSaving ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>

        {/* ─── Main Tabs Panel ────────────────────────────────────────────────── */}
        <Tabs defaultValue="profile" className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Tab Sidebar */}
          <TabsList 
            ref={sidebarRef}
            className={`reveal flex flex-row lg:flex-col justify-start items-stretch gap-1.5 bg-transparent border-0 p-0 lg:w-72 w-full overflow-x-auto lg:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden shrink-0 ${sidebarVisible ? "visible" : ""}`}
          >
            <TabsTrigger 
              value="profile"
              className="flex items-center justify-center lg:justify-start gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 border border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30 data-[state=active]:bg-indigo-600/10 dark:data-[state=active]:bg-indigo-600/15 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:border-indigo-600/20 data-[state=active]:shadow-none"
            >
              <User className="h-4.5 w-4.5 shrink-0" />
              <span>Profile Information</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="preferences"
              className="flex items-center justify-center lg:justify-start gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 border border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30 data-[state=active]:bg-indigo-600/10 dark:data-[state=active]:bg-indigo-600/15 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:border-indigo-600/20 data-[state=active]:shadow-none"
            >
              <Palette className="h-4.5 w-4.5 shrink-0" />
              <span>Preferences & Theme</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="notifications"
              className="flex items-center justify-center lg:justify-start gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 border border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30 data-[state=active]:bg-indigo-600/10 dark:data-[state=active]:bg-indigo-600/15 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:border-indigo-600/20 data-[state=active]:shadow-none"
            >
              <Bell className="h-4.5 w-4.5 shrink-0" />
              <span>Alert Notifications</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="privacy"
              className="flex items-center justify-center lg:justify-start gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 border border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30 data-[state=active]:bg-indigo-600/10 dark:data-[state=active]:bg-indigo-600/15 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:border-indigo-600/20 data-[state=active]:shadow-none"
            >
              <Shield className="h-4.5 w-4.5 shrink-0" />
              <span>Privacy & Security</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="account"
              className="flex items-center justify-center lg:justify-start gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 border border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30 data-[state=active]:bg-indigo-600/10 dark:data-[state=active]:bg-indigo-600/15 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:border-indigo-600/20 data-[state=active]:shadow-none"
            >
              <Globe className="h-4.5 w-4.5 shrink-0" />
              <span>Account Management</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <div ref={contentRef} className={`reveal flex-1 w-full space-y-6 ${contentVisible ? "visible" : ""}`}>
            
            {/* ─── Profile Settings ───────────────────────────────────────────── */}
            <TabsContent value="profile" className="focus-visible:outline-none">
              <Card className="card-glow overflow-hidden border border-border bg-card shadow-sm text-foreground rounded-3xl">
                <CardHeader className="border-b border-border/60 p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold">Profile Information</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">Update your details and configuration contact point.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6 p-6">
                  {/* Photo Row */}
                  <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-muted/20 border border-border/40">
                    <div className="relative group shrink-0">
                      <div className="h-20 w-20 rounded-full bg-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md ring-4 ring-indigo-500/20">
                        {settings.firstName.charAt(0)}{settings.lastName.charAt(0)}
                      </div>
                      <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold cursor-pointer">
                        Update
                      </div>
                    </div>
                    <div className="space-y-1.5 text-center sm:text-left">
                      <h4 className="text-base font-bold text-foreground">{settings.firstName} {settings.lastName}</h4>
                      <p className="text-xs text-muted-foreground">Personalize your workspace. JPG, PNG or WebP images accepted.</p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setToast({ message: "Simulated avatar update.", type: "info" })}
                          className="h-8 px-3.5 rounded-xl text-xs font-semibold border-border/80 hover:bg-muted hover:text-foreground"
                        >
                          Change Photo
                        </Button>
                        <Button 
                          variant="ghost" 
                          onClick={() => setToast({ message: "Avatar removed.", type: "info" })}
                          className="h-8 px-3 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 hover:text-rose-600"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-semibold text-foreground">First Name</Label>
                      <Input
                        id="firstName"
                        value={settings.firstName}
                        onChange={(e) => updateSetting('firstName', e.target.value)}
                        className="bg-input-background border border-border/60 text-foreground rounded-2xl h-11 px-4 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-semibold text-foreground">Last Name</Label>
                      <Input
                        id="lastName"
                        value={settings.lastName}
                        onChange={(e) => updateSetting('lastName', e.target.value)}
                        className="bg-input-background border border-border/60 text-foreground rounded-2xl h-11 px-4 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => updateSetting('email', e.target.value)}
                      className="bg-input-background border border-border/60 text-foreground rounded-2xl h-11 px-4 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground">Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => updateSetting('timezone', value)}>
                      <SelectTrigger className="bg-input-background border border-border/60 text-foreground rounded-2xl h-11 px-4 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-left">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-border bg-card">
                        <SelectItem value="UTC-12" className="rounded-xl">UTC-12 (Baker Island)</SelectItem>
                        <SelectItem value="UTC-8" className="rounded-xl">UTC-8 (Pacific Time)</SelectItem>
                        <SelectItem value="UTC-5" className="rounded-xl">UTC-5 (Eastern Time)</SelectItem>
                        <SelectItem value="UTC+0" className="rounded-xl">UTC+0 (GMT / London)</SelectItem>
                        <SelectItem value="UTC+1" className="rounded-xl">UTC+1 (CET / Paris)</SelectItem>
                        <SelectItem value="UTC+8" className="rounded-xl">UTC+8 (CST / Singapore)</SelectItem>
                        <SelectItem value="UTC+9" className="rounded-xl">UTC+9 (JST / Tokyo)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ─── Preferences & Theme ────────────────────────────────────────── */}
            <TabsContent value="preferences" className="focus-visible:outline-none space-y-6">
              <Card className="card-glow overflow-hidden border border-border bg-card shadow-sm text-foreground rounded-3xl">
                <CardHeader className="border-b border-border/60 p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold">Currency & Display</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">Select decimal places and core rates display parameters.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-foreground">Base Currency</Label>
                      <Select value={settings.baseCurrency} onValueChange={(value) => updateSetting('baseCurrency', value)}>
                        <SelectTrigger className="bg-input-background border border-border/60 text-foreground rounded-2xl h-11 px-4 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-left">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-border bg-card">
                          <SelectItem value="USD" className="rounded-xl">🇺🇸 USD - US Dollar</SelectItem>
                          <SelectItem value="EUR" className="rounded-xl">🇪🇺 EUR - Euro</SelectItem>
                          <SelectItem value="GBP" className="rounded-xl">🇬🇧 GBP - British Pound</SelectItem>
                          <SelectItem value="JPY" className="rounded-xl">🇯🇵 JPY - Japanese Yen</SelectItem>
                          <SelectItem value="CAD" className="rounded-xl">🇨🇦 CAD - Canadian Dollar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-foreground">Decimal Places</Label>
                      <Select value={settings.decimalPlaces.toString()} onValueChange={(value) => updateSetting('decimalPlaces', parseInt(value))}>
                        <SelectTrigger className="bg-input-background border border-border/60 text-foreground rounded-2xl h-11 px-4 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-left">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-border bg-card">
                          <SelectItem value="2" className="rounded-xl">2 decimal places (e.g. 1.25)</SelectItem>
                          <SelectItem value="4" className="rounded-xl">4 decimal places (e.g. 1.2543)</SelectItem>
                          <SelectItem value="6" className="rounded-xl">6 decimal places (e.g. 1.254321)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Format Preview block */}
              <div className="p-5 rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-500/10 relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-5 pointer-events-none">
                  <Sliders className="h-44 w-44 text-indigo-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      <Sparkles className="h-3 w-3" /> Rate Format Preview
                    </span>
                    <span className="text-[10px] text-muted-foreground font-semibold">Base: {settings.baseCurrency}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Dynamic display representation of transactions & alerts:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div className="bg-card/60 border border-border/40 rounded-xl p-3.5 text-center">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Standard Unit</div>
                        <div className="text-lg font-extrabold text-foreground font-mono">{preview.formattedBase}</div>
                      </div>
                      <div className="bg-card/60 border border-border/40 rounded-xl p-3.5 text-center">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Conversion Sample</div>
                        <div className="text-sm sm:text-base font-extrabold text-foreground font-mono">{preview.formattedConversion}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="card-glow overflow-hidden border border-border bg-card shadow-sm text-foreground rounded-3xl">
                <CardHeader className="border-b border-border/60 p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                      <Palette className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold">Appearance Settings</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">Adjust visual display themes and localisation standards.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-foreground">Theme Selection</Label>
                      <Select value={settings.theme} onValueChange={(value) => { updateSetting('theme', value); setTheme(value); }}>
                        <SelectTrigger className="bg-input-background border border-border/60 text-foreground rounded-2xl h-11 px-4 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-left">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-border bg-card">
                          <SelectItem value="light" className="rounded-xl">
                            <span className="flex items-center gap-2">
                              <Sun className="h-4 w-4 text-amber-500" /> Light Mode
                            </span>
                          </SelectItem>
                          <SelectItem value="dark" className="rounded-xl">
                            <span className="flex items-center gap-2">
                              <Moon className="h-4 w-4 text-indigo-500" /> Dark Mode
                            </span>
                          </SelectItem>
                          <SelectItem value="system" className="rounded-xl">
                            <span className="flex items-center gap-2">
                              <Laptop2 className="h-4 w-4 text-emerald-500" /> System Default
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-foreground">Language</Label>
                      <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                        <SelectTrigger className="bg-input-background border border-border/60 text-foreground rounded-2xl h-11 px-4 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-left">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-border bg-card">
                          <SelectItem value="en" className="rounded-xl">English (US)</SelectItem>
                          <SelectItem value="es" className="rounded-xl">Español (ES)</SelectItem>
                          <SelectItem value="fr" className="rounded-xl">Français (FR)</SelectItem>
                          <SelectItem value="de" className="rounded-xl">Deutsch (DE)</SelectItem>
                          <SelectItem value="ja" className="rounded-xl">日本語 (JP)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ─── Notifications Settings ────────────────────────────────────── */}
            <TabsContent value="notifications" className="focus-visible:outline-none">
              <Card className="card-glow overflow-hidden border border-border bg-card shadow-sm text-foreground rounded-3xl">
                <CardHeader className="border-b border-border/60 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                        <Bell className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold">Alert Notifications</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">Configure the direct dispatch channels for your rate watch alerts.</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  
                  {/* List of Switches */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3.5 rounded-2xl border border-border/40 hover:bg-muted/10 transition-colors">
                      <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                          <Mail className="h-4 w-4 text-indigo-500" /> Email Notifications
                        </h3>
                        <p className="text-xs text-muted-foreground">Receive rate notifications, summaries and critical updates via your mail box.</p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                      />
                    </div>

                    <Separator className="bg-border/30" />

                    <div className="flex items-center justify-between p-3.5 rounded-2xl border border-border/40 hover:bg-muted/10 transition-colors">
                      <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                          <Sliders className="h-4 w-4 text-violet-500" /> Push Notifications
                        </h3>
                        <p className="text-xs text-muted-foreground">Get instant browser desktop alerts on rate crossovers.</p>
                      </div>
                      <Switch
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                      />
                    </div>

                    <Separator className="bg-border/30" />

                    <div className="flex items-center justify-between p-3.5 rounded-2xl border border-border/40 hover:bg-muted/10 transition-colors">
                      <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2.5">
                          <Activity className="h-4 w-4 text-rose-500" /> SMS Rate Alerts
                          <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 px-2 py-0.5 font-bold uppercase tracking-wider text-[9px] badge-pulse-dot">
                            Premium
                          </Badge>
                        </h3>
                        <p className="text-xs text-muted-foreground">Get high priority direct SMS delivery when major thresholds break.</p>
                      </div>
                      <Switch
                        checked={settings.smsAlerts}
                        onCheckedChange={(checked) => updateSetting('smsAlerts', checked)}
                      />
                    </div>

                    <Separator className="bg-border/30" />

                    <div className="flex items-center justify-between p-3.5 rounded-2xl border border-border/40 hover:bg-muted/10 transition-colors">
                      <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                          <Clock className="h-4 w-4 text-emerald-500" /> Daily Market Summaries
                        </h3>
                        <p className="text-xs text-muted-foreground">Daily snapshot digest of international exchange rate trend analyses.</p>
                      </div>
                      <Switch
                        checked={settings.marketUpdates}
                        onCheckedChange={(checked) => updateSetting('marketUpdates', checked)}
                      />
                    </div>
                  </div>

                  {/* Test notification widget */}
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex items-center justify-between gap-4 mt-6">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <Info className="h-4 w-4 text-indigo-500 shrink-0" />
                        Verify Alert Delivery
                      </h4>
                      <p className="text-xs text-muted-foreground">Trigger a simulated system notification to test prompt delivery.</p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={triggerTestNotification}
                      disabled={isTestingNotification}
                      className="h-9 px-4 rounded-xl border-border/80 text-xs font-bold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 shrink-0"
                    >
                      {isTestingNotification ? (
                        <>
                          <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Test Channel"
                      )}
                    </Button>
                  </div>

                  {/* Simulated alert banner */}
                  {testNotificationActive && (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2.5 animate-pulse">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-bold">Test Broadcast Successful!</span> Notification dispatched: Base currency is set to {settings.baseCurrency} at {settings.decimalPlaces} decimal precision.
                      </div>
                    </div>
                  )}

                </CardContent>
              </Card>
            </TabsContent>

            {/* ─── Privacy & Security ────────────────────────────────────────── */}
            <TabsContent value="privacy" className="focus-visible:outline-none">
              <Card className="card-glow overflow-hidden border border-border bg-card shadow-sm text-foreground rounded-3xl">
                <CardHeader className="border-b border-border/60 p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold">Privacy & Security</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">Oversee privacy preferences and data telemetry settings.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3.5 rounded-2xl border border-border/40 hover:bg-muted/10 transition-colors">
                      <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-foreground">Share Performance Telemetry</h3>
                        <p className="text-xs text-muted-foreground">Send anonymous interaction statistics to assist developer performance tuning.</p>
                      </div>
                      <Switch
                        checked={settings.shareData}
                        onCheckedChange={(checked) => updateSetting('shareData', checked)}
                      />
                    </div>

                    <Separator className="bg-border/30" />

                    <div className="flex items-center justify-between p-3.5 rounded-2xl border border-border/40 hover:bg-muted/10 transition-colors">
                      <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-foreground">Functional Cookie Consent</h3>
                        <p className="text-xs text-muted-foreground">Preserve workspace state (themes and layout coordinates) between load cycles.</p>
                      </div>
                      <Switch
                        checked={settings.cookieConsent}
                        onCheckedChange={(checked) => updateSetting('cookieConsent', checked)}
                      />
                    </div>

                    <Separator className="bg-border/30" />

                    <div className="flex items-center justify-between p-3.5 rounded-2xl border border-border/40 hover:bg-muted/10 transition-colors">
                      <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-foreground">Marketing & Update Despatches</h3>
                        <p className="text-xs text-muted-foreground">Receive updates regarding application expansions and system integrations.</p>
                      </div>
                      <Switch
                        checked={settings.marketingEmails}
                        onCheckedChange={(checked) => updateSetting('marketingEmails', checked)}
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/10 border border-indigo-500/10 space-y-2 mt-4">
                    <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4" /> Cryptographic Integrity
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      All connection tunnels and configuration transfers are encrypted end-to-end using standard TLS protocols. Local data settings are isolated locally on sandboxed system domains.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ─── Account Management ─────────────────────────────────────────── */}
            <TabsContent value="account" className="focus-visible:outline-none space-y-6">
              <Card className="card-glow overflow-hidden border border-border bg-card shadow-sm text-foreground rounded-3xl">
                <CardHeader className="border-b border-border/60 p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                      <Download className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold">Data Management</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">Export configuration snapshots or view localized stats metadata.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-border/60 hover:bg-muted/10 transition-colors">
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <FileJson className="h-4 w-4 text-indigo-500" /> Export System Data
                      </h3>
                      <p className="text-xs text-muted-foreground">Save your alerts list, currencies choices and options as a local JSON document.</p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={exportData} 
                      className="border-border/80 text-foreground hover:bg-muted hover:border-indigo-500 hover:text-indigo-500 rounded-xl h-10 px-4 text-xs font-semibold shrink-0"
                    >
                      <Download className="h-3.5 w-3.5 mr-2" />
                      Export JSON
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl border border-border/60 bg-muted/20">
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-foreground">Operational Statistics</h3>
                      <p className="text-xs text-muted-foreground">
                        Member profile created: January 2024 • Total exchange calculations: 1,247
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-semibold text-[10px]">
                      Active
                    </Badge>
                  </div>

                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="overflow-hidden border border-rose-500/20 dark:border-rose-500/10 bg-card shadow-sm text-foreground rounded-3xl">
                <CardHeader className="border-b border-rose-500/10 p-6 bg-rose-500/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                      <Trash2 className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-rose-600 dark:text-rose-400">Danger Zone</CardTitle>
                      <CardDescription className="text-sm text-rose-500/60 dark:text-rose-400/50">Actions that cannot be undone. Please handle with care.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-rose-500/20 bg-rose-500/[0.01]">
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-foreground">Delete Workspace Profile</h3>
                      <p className="text-xs text-muted-foreground">Permanently wipe profile details, saved parameters, and alert configurations.</p>
                    </div>
                    <Button 
                      variant="destructive" 
                      onClick={() => setShowDeleteConfirm(true)}
                      className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl h-10 px-4 text-xs font-semibold shrink-0"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-2" />
                      Delete Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </div>
        </Tabs>
      </div>

      {/* ─── Floating Changes Alert Bar ──────────────────────────────────────── */}
      <div 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl bg-slate-900 border border-slate-800 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-6 transition-all duration-300 ${
          hasChanges ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <AlertTriangle className="h-4.5 w-4.5 text-amber-400 shrink-0 animate-pulse" />
          <span className="text-xs font-semibold truncate">Unsaved configuration changes detected</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={discardChanges}
            className="h-8 px-3 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Discard
          </button>
          <button
            onClick={saveSettings}
            disabled={isSaving}
            className="h-8 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
          >
            {isSaving ? (
              <RefreshCw className="h-3 w-3 animate-spin" />
            ) : (
              <Check className="h-3.5 w-3.5" />
            )}
            Save
          </button>
        </div>
      </div>

      {/* ─── Delete Account Confirmation Modal ─────────────────────────────── */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-card border border-border p-6 rounded-3xl shadow-2xl space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Delete Account Profile</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Are you sure you want to delete your profile? This will wipe your locally stored alert thresholds and customization preferences permanently. This action is irreversible.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-xl border-border/80 text-foreground hover:bg-muted"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setToast({ message: "Simulated account deletion request sent.", type: "info" });
                }}
                className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white"
              >
                Delete Permanently
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Success/Info Toast Alert ────────────────────────────────────────── */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 dark:bg-slate-800 text-white px-5 py-3.5 rounded-2xl border border-slate-800 dark:border-slate-700 shadow-2xl animate-fade-in-up">
          {toast.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          ) : (
            <Info className="h-5 w-5 text-indigo-400 shrink-0" />
          )}
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

    </div>
  );
}
