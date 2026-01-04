import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { User, Bell, Palette, Globe, Shield, Download, Trash2, Save } from "lucide-react";
import { useTheme } from "../context/theme.jsx";

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
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
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  useEffect(() => {
    // keep local settings in sync if theme changes elsewhere
    setSettings(prev => ({ ...prev, theme }));
  }, [theme]);

  const saveSettings = () => {
    console.log("Saving settings:", settings);
    setHasChanges(false);
  };

  const exportData = () => {
    const data = {
      settings,
      exportDate: new Date().toISOString(),
      version: "1.0"
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'currency-exchange-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-bold">Settings</h1>
          <p className="text-lg text-muted-foreground">
            Customize your currency exchange experience
          </p>
        </div>
        {hasChanges && (
          <Button onClick={saveSettings}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        )}
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList
          className="w-full flex gap-2 md:gap-3 overflow-x-auto md:overflow-visible rounded-xl bg-card/80 border border-border/60 p-2 shadow-sm [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:justify-center"
        >
          <TabsTrigger
            value="profile"
            className="w-full flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm md:text-base whitespace-nowrap data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500/15 data-[state=active]:via-sky-500/10 data-[state=active]:to-cyan-400/10 data-[state=active]:text-foreground data-[state=active]:border data-[state=active]:border-primary/50"
          >
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="w-full flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm md:text-base whitespace-nowrap data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500/15 data-[state=active]:via-sky-500/10 data-[state=active]:to-cyan-400/10 data-[state=active]:text-foreground data-[state=active]:border data-[state=active]:border-primary/50"
          >
            <Palette className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="w-full flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm md:text-base whitespace-nowrap data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500/15 data-[state=active]:via-sky-500/10 data-[state=active]:to-cyan-400/10 data-[state=active]:text-foreground data-[state=active]:border data-[state=active]:border-primary/50"
          >
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="privacy"
            className="w-full flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm md:text-base whitespace-nowrap data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500/15 data-[state=active]:via-sky-500/10 data-[state=active]:to-cyan-400/10 data-[state=active]:text-foreground data-[state=active]:border data-[state=active]:border-primary/50"
          >
            <Shield className="h-4 w-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className="w-full flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm md:text-base whitespace-nowrap data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500/15 data-[state=active]:via-sky-500/10 data-[state=active]:to-cyan-400/10 data-[state=active]:text-foreground data-[state=active]:border data-[state=active]:border-primary/50"
          >
            <Globe className="h-4 w-4" />
            Account
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card className="overflow-hidden border border-border/70 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-background shadow-lg backdrop-blur-sm text-foreground">
            <div className="h-1 w-full bg-gradient-to-r from-indigo-500/80 via-sky-500/70 to-cyan-400/70" />
            
            <CardHeader className="flex items-center gap-2 bg-card/70 backdrop-blur-sm border-b border-border/60 p-6 pb-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-4 w-4" />
              </span>
              <CardTitle className="text-lg font-semibold text-foreground">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 bg-card/70 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                  <Input
                    id="firstName"
                    value={settings.firstName}
                    onChange={(e) => updateSetting('firstName', e.target.value)}
                    className="bg-input-background border border-border/60 text-foreground focus:border-primary focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                  <Input
                    id="lastName"
                    value={settings.lastName}
                    onChange={(e) => updateSetting('lastName', e.target.value)}
                    className="bg-input-background border border-border/60 text-foreground focus:border-primary focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateSetting('email', e.target.value)}
                  className="bg-input-background border border-border/60 text-foreground focus:border-primary focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => updateSetting('timezone', value)}>
                  <SelectTrigger className="bg-input-background border border-border/60 text-foreground focus:border-primary focus:ring-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC-12">UTC-12 (Baker Island)</SelectItem>
                    <SelectItem value="UTC-8">UTC-8 (Pacific)</SelectItem>
                    <SelectItem value="UTC-5">UTC-5 (Eastern)</SelectItem>
                    <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                    <SelectItem value="UTC+1">UTC+1 (CET)</SelectItem>
                    <SelectItem value="UTC+8">UTC+8 (CST)</SelectItem>
                    <SelectItem value="UTC+9">UTC+9 (JST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences">
          <div className="space-y-6">
            <Card className="overflow-hidden border border-border/70 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-background shadow-lg backdrop-blur-sm text-foreground">
              <div className="h-1 w-full bg-gradient-to-r from-indigo-500/80 via-sky-500/70 to-cyan-400/70" />
              
              <CardHeader className="flex items-center gap-2 bg-card/70 backdrop-blur-sm border-b border-border/60 p-6 pb-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Globe className="h-4 w-4" />
                </span>
                <CardTitle className="text-lg font-semibold text-foreground">Currency & Display</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6 bg-card/70 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Base Currency</Label>
                    <Select value={settings.baseCurrency} onValueChange={(value) => updateSetting('baseCurrency', value)}>
                      <SelectTrigger className="bg-input-background border border-border/60 text-foreground focus:border-primary focus:ring-primary/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">🇺🇸 USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">🇪🇺 EUR - Euro</SelectItem>
                        <SelectItem value="GBP">🇬🇧 GBP - British Pound</SelectItem>
                        <SelectItem value="JPY">🇯🇵 JPY - Japanese Yen</SelectItem>
                        <SelectItem value="CAD">🇨🇦 CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground">Decimal Places</Label>
                    <Select value={settings.decimalPlaces.toString()} onValueChange={(value) => updateSetting('decimalPlaces', parseInt(value))}>
                      <SelectTrigger className="bg-input-background border border-border/60 text-foreground focus:border-primary focus:ring-primary/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 decimal places</SelectItem>
                        <SelectItem value="4">4 decimal places</SelectItem>
                        <SelectItem value="6">6 decimal places</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-border/70 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-background shadow-lg backdrop-blur-sm text-foreground">
              <div className="h-1 w-full bg-gradient-to-r from-indigo-500/80 via-sky-500/70 to-cyan-400/70" />
              
              <CardHeader className="flex items-center gap-2 bg-card/70 backdrop-blur-sm border-b border-border/60 p-6 pb-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Palette className="h-4 w-4" />
                </span>
                <CardTitle className="text-lg font-semibold text-foreground">Appearance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6 bg-card/70 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Theme</Label>
                    <Select value={settings.theme} onValueChange={(value) => { updateSetting('theme', value); setTheme(value); }}>
                      <SelectTrigger className="bg-input-background border border-border/60 text-foreground focus:border-primary focus:ring-primary/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                      <SelectTrigger className="bg-input-background border border-border/60 text-foreground focus:border-primary focus:ring-primary/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="ja">日本語</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="overflow-hidden border border-border/70 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-background shadow-lg backdrop-blur-sm text-foreground">
            <div className="h-1 w-full bg-gradient-to-r from-indigo-500/80 via-sky-500/70 to-cyan-400/70" />
            
            <CardHeader className="flex items-center gap-2 bg-card/70 backdrop-blur-sm border-b border-border/60 p-6 pb-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bell className="h-4 w-4" />
              </span>
              <CardTitle className="text-lg font-semibold text-foreground">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 bg-card/70 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive rate alerts and updates via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>

                <Separator className="bg-border/30" />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Push Notifications</h3>
                    <p className="text-sm text-muted-foreground">Get instant browser notifications</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                  />
                </div>

                <Separator className="bg-border/30" />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">SMS Alerts</h3>
                    <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700 border border-amber-200">Premium</Badge>
                    <Switch
                      checked={settings.smsAlerts}
                      onCheckedChange={(checked) => updateSetting('smsAlerts', checked)}
                    />
                  </div>
                </div>

                <Separator className="bg-border/30" />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Market Updates</h3>
                    <p className="text-sm text-muted-foreground">Daily market summaries and analysis</p>
                  </div>
                  <Switch
                    checked={settings.marketUpdates}
                    onCheckedChange={(checked) => updateSetting('marketUpdates', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy */}
        <TabsContent value="privacy">
          <Card className="overflow-hidden border border-border/70 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-background shadow-lg backdrop-blur-sm text-foreground">
            <div className="h-1 w-full bg-gradient-to-r from-indigo-500/80 via-sky-500/70 to-cyan-400/70" />
            
            <CardHeader className="flex items-center gap-2 bg-card/70 backdrop-blur-sm border-b border-border/60 p-6 pb-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Shield className="h-4 w-4" />
              </span>
              <CardTitle className="text-lg font-semibold text-foreground">Privacy & Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 bg-card/70 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Share Usage Data</h3>
                    <p className="text-sm text-muted-foreground">Help improve our service by sharing anonymous usage data</p>
                  </div>
                  <Switch
                    checked={settings.shareData}
                    onCheckedChange={(checked) => updateSetting('shareData', checked)}
                  />
                </div>

                <Separator className="bg-border/30" />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Cookie Consent</h3>
                    <p className="text-sm text-muted-foreground">Allow cookies for enhanced functionality</p>
                  </div>
                  <Switch
                    checked={settings.cookieConsent}
                    onCheckedChange={(checked) => updateSetting('cookieConsent', checked)}
                  />
                </div>

                <Separator className="bg-border/30" />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Marketing Emails</h3>
                    <p className="text-sm text-muted-foreground">Receive promotional content and product updates</p>
                  </div>
                  <Switch
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) => updateSetting('marketingEmails', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account */}
        <TabsContent value="account">
          <div className="space-y-6">
            <Card className="overflow-hidden border border-border/70 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-white shadow-lg backdrop-blur-sm text-foreground">
              <div className="h-1 w-full bg-gradient-to-r from-indigo-500/80 via-sky-500/70 to-cyan-400/70" />

              <CardHeader className="flex items-center gap-2 bg-card/70 backdrop-blur-sm border-b border-border/60 p-6 pb-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Download className="h-4 w-4" />
                </span>
                <CardTitle className="text-lg font-semibold text-foreground">Data Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6 bg-card/70 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4 p-4 bg-card border border-border/60 rounded-xl hover:border-primary/60 hover:shadow-sm transition-colors">
                  <div className="space-y-1">
                    <h3 className="font-medium text-foreground">Export Data</h3>
                    <p className="text-sm text-muted-foreground">Download all your data in JSON format</p>
                  </div>
                  <Button variant="outline" onClick={exportData} className="border-border/70 text-foreground hover:bg-muted hover:border-primary hover:text-primary">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                <div className="flex items-start justify-between gap-4 p-4 bg-card border border-border/60 rounded-xl hover:border-primary/60 hover:shadow-sm transition-colors">
                  <div className="space-y-1">
                    <h3 className="font-medium text-foreground">Account Statistics</h3>
                    <p className="text-sm text-muted-foreground">
                      Member since: January 2024 • Total conversions: 1,247
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-muted text-foreground border">Active</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-border/70 bg-gradient-to-br from-rose-100/20 via-rose-50/10 to-background shadow-lg backdrop-blur-sm text-foreground">
              <div className="h-1 w-full bg-gradient-to-r from-rose-500/80 via-red-500/70 to-orange-400/70" />

              <CardHeader className="flex items-center gap-2 bg-card/70 backdrop-blur-sm border-b border-border/60 p-6 pb-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                  <Trash2 className="h-4 w-4" />
                </span>
                <CardTitle className="text-lg font-semibold text-foreground">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6 bg-card/70 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4 p-4 bg-card border border-border/60 rounded-xl hover:border-rose-300/50 hover:shadow-sm transition-colors">
                  <div className="space-y-1">
                    <h3 className="font-medium text-foreground">Delete Account</h3>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button variant="destructive" className="">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
