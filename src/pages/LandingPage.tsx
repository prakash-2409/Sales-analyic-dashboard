import { Link } from "react-router-dom";
import { Target, BarChart3, Users, LineChart, Shield, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Navigation */}
      <header className="border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">InsightIQ</span>
          </div>
          <Link
            to="/dashboard"
            className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
          >
            Open Dashboard
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-32 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
          <Zap className="w-3.5 h-3.5" />
          AI-Powered Analytics
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Sales Performance &<br />Customer Analytics
        </h1>
        <p className="mt-6 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Transform your sales data into actionable business intelligence. InsightIQ helps enterprises track revenue, analyze customer behavior, and make data-driven decisions.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Go to Dashboard
          </Link>
          <a
            href="#features"
            className="px-6 py-3 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24 border-t border-slate-100 dark:border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Built for Enterprise</h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Everything you need to understand your business at a glance.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: BarChart3,
              title: "Revenue Analytics",
              description: "Track revenue trends, regional performance, and product distribution with interactive charts."
            },
            {
              icon: Users,
              title: "Customer Insights",
              description: "Analyze customer segments, track growth, and identify your most valuable accounts."
            },
            {
              icon: LineChart,
              title: "Sales Pipeline",
              description: "Monitor order volumes, completion rates, and sales performance across all regions."
            },
            {
              icon: Shield,
              title: "AI-Powered Insights",
              description: "Get automated business recommendations based on your performance data."
            },
            {
              icon: Target,
              title: "Executive Reports",
              description: "Generate comprehensive reports with one click. Revenue, sales, customer, and product analytics."
            },
            {
              icon: Zap,
              title: "Real-time Dashboard",
              description: "Beautiful, responsive dashboard that works seamlessly on desktop, tablet, and mobile."
            },
          ].map((feature) => (
            <div key={feature.title} className="p-6 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm transition-all group">
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg w-fit mb-4 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                <feature.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 dark:border-slate-900">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Target className="h-4 w-4 text-indigo-600" />
            <span>InsightIQ Analytics</span>
          </div>
          <p className="text-sm text-slate-400">MBA Internship Demonstration Project</p>
        </div>
      </footer>
    </div>
  );
}