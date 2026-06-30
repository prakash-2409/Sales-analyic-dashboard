import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Building2,
  Palette,
  Bell,
  Info,
  Save,
  Target,
} from "lucide-react";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [salesAlerts, setSalesAlerts] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);
  const [monthlyDigest, setMonthlyDigest] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your account and application preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-full sm:w-auto flex flex-wrap">
          <TabsTrigger value="profile" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm text-sm flex items-center gap-2">
            <User className="w-4 h-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="company" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm text-sm flex items-center gap-2">
            <Building2 className="w-4 h-4" /> Company
          </TabsTrigger>
          <TabsTrigger value="appearance" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm text-sm flex items-center gap-2">
            <Palette className="w-4 h-4" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm text-sm flex items-center gap-2">
            <Bell className="w-4 h-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="about" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm text-sm flex items-center gap-2">
            <Info className="w-4 h-4" /> About
          </TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 border-2 border-slate-200 dark:border-slate-800">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="John Mathew" />
                  <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400 font-semibold text-xl">JM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-lg">John Mathew</p>
                  <p className="text-sm text-slate-500">Sales Manager</p>
                  <button className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Change Photo</button>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</Label>
                  <input id="firstName" defaultValue="John" className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</Label>
                  <input id="lastName" defaultValue="Mathew" className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</Label>
                  <input id="email" defaultValue="john.mathew@insightiq.in" className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium text-slate-700 dark:text-slate-300">Role</Label>
                  <input id="role" defaultValue="Sales Manager" disabled className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-500 cursor-not-allowed" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</Label>
                  <input id="phone" defaultValue="+91 98765 43210" className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
              </div>

              <div className="flex justify-end">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company */}
        <TabsContent value="company" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Manage your organization details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Company Name</Label>
                  <input defaultValue="InsightIQ Analytics Pvt. Ltd." className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Industry</Label>
                  <input defaultValue="Business Analytics & SaaS" className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">GST Number</Label>
                  <input defaultValue="27AABCI1234F1ZH" className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Founded</Label>
                  <input defaultValue="2020" className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Address</Label>
                  <input defaultValue="Plot 12, Cyber Hub, Gurugram, Haryana 122002" className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
              </div>
              <div className="flex justify-end">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-slate-900 dark:text-white">Dark Mode</Label>
                  <p className="text-sm text-slate-500 mt-1">Toggle between light and dark themes.</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <Separator />
              <div className="space-y-4">
                <Label className="text-sm font-medium text-slate-900 dark:text-white">Accent Color</Label>
                <div className="flex gap-3">
                  {[
                    { name: "Indigo", color: "bg-indigo-500" },
                    { name: "Blue", color: "bg-blue-500" },
                    { name: "Emerald", color: "bg-emerald-500" },
                    { name: "Violet", color: "bg-violet-500" },
                    { name: "Rose", color: "bg-rose-500" },
                  ].map((c) => (
                    <button
                      key={c.name}
                      className={`w-8 h-8 rounded-full ${c.color} ring-offset-2 ring-offset-white dark:ring-offset-slate-950 transition-all hover:scale-110 ${c.name === "Indigo" ? "ring-2 ring-indigo-500" : ""}`}
                      title={c.name}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-500">Currently set to Indigo (default).</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-slate-900 dark:text-white">Compact Mode</Label>
                  <p className="text-sm text-slate-500 mt-1">Reduce spacing for denser layouts.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-slate-900 dark:text-white">Email Notifications</Label>
                  <p className="text-sm text-slate-500 mt-1">Receive important updates via email.</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-slate-900 dark:text-white">Sales Alerts</Label>
                  <p className="text-sm text-slate-500 mt-1">Get notified when a new sale is completed.</p>
                </div>
                <Switch checked={salesAlerts} onCheckedChange={setSalesAlerts} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-slate-900 dark:text-white">Weekly Summary</Label>
                  <p className="text-sm text-slate-500 mt-1">Receive a weekly performance digest.</p>
                </div>
                <Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-slate-900 dark:text-white">Monthly Digest</Label>
                  <p className="text-sm text-slate-500 mt-1">Get a comprehensive monthly report.</p>
                </div>
                <Switch checked={monthlyDigest} onCheckedChange={setMonthlyDigest} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About */}
        <TabsContent value="about" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>About InsightIQ</CardTitle>
              <CardDescription>Application information and version details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl">
                  <Target className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">InsightIQ Analytics</h3>
                  <p className="text-sm text-slate-500">AI-Powered Sales Performance & Customer Analytics Dashboard</p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Version</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">1.0.0 (Build 2026.06)</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">License</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">MIT License</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Framework</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">React + Vite + TypeScript</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">UI Library</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">shadcn/ui + Tailwind CSS</p>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  InsightIQ is a demonstration project built for an MBA Internship Report. It showcases a modern, AI-powered business analytics dashboard with sales tracking, customer management, and intelligent reporting capabilities. All data shown is static and for demonstration purposes only.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}