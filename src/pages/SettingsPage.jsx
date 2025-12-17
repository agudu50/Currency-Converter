import { useState } from "react";
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

export function SettingsPage() {
  const [settings, setSettings] = useState({
    // Profile
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    timezone: "UTC-5",
    
    // Preferences
    baseCurrency: "USD",
    decimalPlaces: 4,
    theme: "system",
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
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />
            
            <CardHeader className="relative z-10 border-b border-white/15">
              <CardTitle className="flex items-center gap-2 text-white">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                  <User className="h-4 w-4" />
                </span>
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 border-t-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white/90">First Name</Label>
                  <Input
                    id="firstName"
                    value={settings.firstName}
                    onChange={(e) => updateSetting('firstName', e.target.value)}
                    className="bg-white/10 border-white/25 text-white placeholder:text-white/50 focus:border-white/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white/90">Last Name</Label>
                  <Input
                    id="lastName"
                    value={settings.lastName}
                    onChange={(e) => updateSetting('lastName', e.target.value)}
                    className="bg-white/10 border-white/25 text-white placeholder:text-white/50 focus:border-white/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateSetting('email', e.target.value)}
                  className="bg-white/10 border-white/25 text-white placeholder:text-white/50 focus:border-white/40"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white/90">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => updateSetting('timezone', value)}>
                  <SelectTrigger className="bg-white/10 border-white/25 text-white focus:border-white/40">
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
            <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 opacity-90" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />
              
              <CardHeader className="relative z-10 border-b border-white/15">
                <CardTitle className="flex items-center gap-2 text-white">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                    <Globe className="h-4 w-4" />
                  </span>
                  Currency & Display
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 border-t-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white/90">Base Currency</Label>
                    <Select value={settings.baseCurrency} onValueChange={(value) => updateSetting('baseCurrency', value)}>
                      <SelectTrigger className="bg-white/10 border-white/25 text-white focus:border-white/40">
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
                    <Label className="text-white/90">Decimal Places</Label>
                    <Select value={settings.decimalPlaces.toString()} onValueChange={(value) => updateSetting('decimalPlaces', parseInt(value))}>
                      <SelectTrigger className="bg-white/10 border-white/25 text-white focus:border-white/40">
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

            <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 opacity-90" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />
              
              <CardHeader className="relative z-10 border-b border-white/15">
                <CardTitle className="flex items-center gap-2 text-white">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                    <Palette className="h-4 w-4" />
                  </span>
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 border-t-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white/90">Theme</Label>
                    <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                      <SelectTrigger className="bg-white/10 border-white/25 text-white focus:border-white/40">
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
                    <Label className="text-white/90">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                      <SelectTrigger className="bg-white/10 border-white/25 text-white focus:border-white/40">
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
          <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 opacity-90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />
            
            <CardHeader className="relative z-10 border-b border-white/15">
              <CardTitle className="flex items-center gap-2 text-white">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                  <Bell className="h-4 w-4" />
                </span>
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 border-t-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">Email Notifications</h3>
                    <p className="text-sm text-white/70">Receive rate alerts and updates via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>

                <Separator className="bg-white/15" />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">Push Notifications</h3>
                    <p className="text-sm text-white/70">Get instant browser notifications</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                  />
                </div>

                <Separator className="bg-white/15" />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">SMS Alerts</h3>
                    <p className="text-sm text-white/70">Receive critical alerts via SMS</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-amber-500/20 text-amber-200 border border-amber-200/40">Premium</Badge>
                    <Switch
                      checked={settings.smsAlerts}
                      onCheckedChange={(checked) => updateSetting('smsAlerts', checked)}
                    />
                  </div>
                </div>

                <Separator className="bg-white/15" />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">Market Updates</h3>
                    <p className="text-sm text-white/70">Daily market summaries and analysis</p>
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
          <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />
            
            <CardHeader className="relative z-10 border-b border-white/15">
              <CardTitle className="flex items-center gap-2 text-white">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                  <Shield className="h-4 w-4" />
                </span>
                Privacy & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 border-t-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">Share Usage Data</h3>
                    <p className="text-sm text-white/70">Help improve our service by sharing anonymous usage data</p>
                  </div>
                  <Switch
                    checked={settings.shareData}
                    onCheckedChange={(checked) => updateSetting('shareData', checked)}
                  />
                </div>

                <Separator className="bg-white/15" />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">Cookie Consent</h3>
                    <p className="text-sm text-white/70">Allow cookies for enhanced functionality</p>
                  </div>
                  <Switch
                    checked={settings.cookieConsent}
                    onCheckedChange={(checked) => updateSetting('cookieConsent', checked)}
                  />
                </div>

                <Separator className="bg-white/15" />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">Marketing Emails</h3>
                    <p className="text-sm text-white/70">Receive promotional content and product updates</p>
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
            <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 opacity-90" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.18),transparent_30%)]" />

              <CardHeader className="relative z-10 border-b border-white/15">
                <CardTitle className="flex items-center gap-2 text-white">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                    <Download className="h-4 w-4" />
                  </span>
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 space-y-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 border-t-0">
                <div className="flex items-start justify-between gap-4 p-4 bg-white/10 border border-white/15 rounded-xl">
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">Export Data</h3>
                    <p className="text-sm text-white/70">Download all your data in JSON format</p>
                  </div>
                  <Button variant="outline" onClick={exportData} className="bg-white/10 hover:bg-white/20 text-white border-white/25 hover:border-white/40">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                <div className="flex items-start justify-between gap-4 p-4 bg-white/10 border border-white/15 rounded-xl">
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">Account Statistics</h3>
                    <p className="text-sm text-white/70">
                      Member since: January 2024 • Total conversions: 1,247
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-100 border border-emerald-200/40">Active</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-900/5 bg-slate-950 text-white">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-600 via-red-600 to-orange-500 opacity-90" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.18),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.15),transparent_30%)]" />

              <CardHeader className="relative z-10 border-b border-white/15">
                <CardTitle className="flex items-center gap-2 text-white">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                    <Trash2 className="h-4 w-4" />
                  </span>
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 space-y-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 border-t-0">
                <div className="flex items-start justify-between gap-4 p-4 bg-white/10 border border-white/15 rounded-xl">
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">Delete Account</h3>
                    <p className="text-sm text-white/75">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button variant="destructive" className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
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
