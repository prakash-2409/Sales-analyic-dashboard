import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  IndianRupee,
  Users,
  ShoppingCart,
  Package,
  Download,
  FileText,
  TrendingUp,
} from "lucide-react";
import { sales, customers, products } from "@/lib/mock-data";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#0ea5e9", "#ec4899", "#14b8a6"];

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function ReportsPage() {
  // Monthly revenue
  const monthlyRevenue = useMemo(() => {
    const months: Record<string, number> = {};
    sales.forEach((sale) => {
      const date = new Date(sale.date);
      const month = date.toLocaleString("default", { month: "short", year: "2-digit" });
      months[month] = (months[month] || 0) + sale.amount;
    });
    const sortedKeys = Object.keys(months).sort((a, b) => new Date(`1 ${a}`).getTime() - new Date(`1 ${b}`).getTime());
    return sortedKeys.map((key) => ({ name: key, revenue: months[key] }));
  }, []);

  // Monthly orders
  const monthlyOrders = useMemo(() => {
    const months: Record<string, number> = {};
    sales.forEach((sale) => {
      const date = new Date(sale.date);
      const month = date.toLocaleString("default", { month: "short", year: "2-digit" });
      months[month] = (months[month] || 0) + 1;
    });
    const sortedKeys = Object.keys(months).sort((a, b) => new Date(`1 ${a}`).getTime() - new Date(`1 ${b}`).getTime());
    return sortedKeys.map((key) => ({ name: key, orders: months[key] }));
  }, []);

  // Region performance
  const regionData = useMemo(() => {
    const regions: Record<string, { revenue: number; orders: number }> = {};
    sales.forEach((sale) => {
      if (!regions[sale.region]) regions[sale.region] = { revenue: 0, orders: 0 };
      regions[sale.region].revenue += sale.amount;
      regions[sale.region].orders += 1;
    });
    return Object.entries(regions)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.revenue - a.revenue);
  }, []);

  // Product revenue
  const productRevenue = useMemo(() => {
    const prodSales: Record<string, number> = {};
    sales.forEach((sale) => {
      prodSales[sale.productName] = (prodSales[sale.productName] || 0) + sale.amount;
    });
    return Object.entries(prodSales)
      .map(([name, revenue]) => ({ name, revenue }))
      .sort((a, b) => b.revenue - a.revenue);
  }, []);

  // Category distribution
  const categoryData = useMemo(() => {
    const categories: Record<string, number> = {};
    sales.forEach((sale) => {
      categories[sale.category] = (categories[sale.category] || 0) + sale.amount;
    });
    return Object.entries(categories)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, []);

  // Customer segment distribution
  const segmentData = useMemo(() => {
    const segments: Record<string, number> = {};
    customers.forEach((c) => {
      segments[c.segment] = (segments[c.segment] || 0) + 1;
    });
    return Object.entries(segments).map(([name, value]) => ({ name, value }));
  }, []);

  // Customer by region
  const customersByRegion = useMemo(() => {
    const regions: Record<string, number> = {};
    customers.forEach((c) => {
      regions[c.region] = (regions[c.region] || 0) + 1;
    });
    return Object.entries(regions)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const totalRevenue = sales.reduce((sum, s) => sum + s.amount, 0);

  const ReportHeader = ({ title, icon: Icon, description }: { title: string; icon: any; description: string }) => (
    <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
          <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <FileText className="w-4 h-4" />
          Download PDF
        </button>
        <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Reports</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Detailed analytics and downloadable business reports.</p>
      </div>

      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <TabsTrigger value="revenue" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm text-sm">Revenue</TabsTrigger>
          <TabsTrigger value="sales" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm text-sm">Sales</TabsTrigger>
          <TabsTrigger value="customers" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm text-sm">Customers</TabsTrigger>
          <TabsTrigger value="products" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm text-sm">Products</TabsTrigger>
        </TabsList>

        {/* Revenue Report */}
        <TabsContent value="revenue" className="mt-6">
          <ReportHeader title="Revenue Report" icon={IndianRupee} description="Comprehensive revenue analysis and trends" />
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="text-sm text-slate-500">Total Revenue</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{formatINR(totalRevenue)}</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1 mt-2"><TrendingUp className="w-3 h-3" /> +12.5% YoY</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="text-sm text-slate-500">Monthly Avg.</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{formatINR(totalRevenue / 12)}</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1 mt-2"><TrendingUp className="w-3 h-3" /> Stable trend</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="text-sm text-slate-500">Best Month</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{monthlyRevenue.reduce((best, m) => m.revenue > best.revenue ? m : best, monthlyRevenue[0]).name}</p>
                <p className="text-xs text-slate-500 mt-2">{formatINR(Math.max(...monthlyRevenue.map(m => m.revenue)))}</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent className="pl-0 pb-4">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyRevenue} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 100000}L`} />
                      <Tooltip formatter={(value: any) => [formatINR(value), "Revenue"]} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                      <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#revenueGrad)" animationDuration={1500} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Revenue by Region</CardTitle>
              </CardHeader>
              <CardContent className="pl-0 pb-4">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={regionData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 100000}L`} />
                      <Tooltip formatter={(value: any) => [formatINR(value), "Revenue"]} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                      <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} animationDuration={1500} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sales Report */}
        <TabsContent value="sales" className="mt-6">
          <ReportHeader title="Sales Report" icon={ShoppingCart} description="Order volumes and sales pipeline analysis" />
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="text-sm text-slate-500">Total Orders</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{sales.length}</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1 mt-2"><TrendingUp className="w-3 h-3" /> +8.2% MoM</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="text-sm text-slate-500">Completed</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{sales.filter(s => s.status === "Completed").length}</p>
                <p className="text-xs text-slate-500 mt-2">{((sales.filter(s => s.status === "Completed").length / sales.length) * 100).toFixed(1)}% success rate</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="text-sm text-slate-500">Avg. Order Value</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{formatINR(totalRevenue / sales.length)}</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1 mt-2"><TrendingUp className="w-3 h-3" /> Increasing</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Monthly Order Volume</CardTitle>
              </CardHeader>
              <CardContent className="pl-0 pb-4">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyOrders} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                      <Bar dataKey="orders" fill="#6366f1" radius={[4, 4, 0, 0]} animationDuration={1500} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 pt-4">
                  {["Completed", "Processing", "Pending"].map((status) => {
                    const count = sales.filter((s) => s.status === status).length;
                    const pct = (count / sales.length) * 100;
                    const color = status === "Completed" ? "bg-emerald-500" : status === "Processing" ? "bg-blue-500" : "bg-amber-500";
                    return (
                      <div key={status}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{status}</span>
                          <span className="text-sm text-slate-500">{count} ({pct.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customer Report */}
        <TabsContent value="customers" className="mt-6">
          <ReportHeader title="Customer Report" icon={Users} description="Customer demographics and engagement analysis" />
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="text-sm text-slate-500">Total Customers</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{customers.length}</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1 mt-2"><TrendingUp className="w-3 h-3" /> Growing base</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="text-sm text-slate-500">Enterprise</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{customers.filter(c => c.segment === "Enterprise").length}</p>
                <p className="text-xs text-slate-500 mt-2">High-value accounts</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="text-sm text-slate-500">Revenue/Customer</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{formatINR(totalRevenue / customers.length)}</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1 mt-2"><TrendingUp className="w-3 h-3" /> +5.8%</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Customers by Region</CardTitle>
              </CardHeader>
              <CardContent className="pl-0 pb-4">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={customersByRegion} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                      <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} animationDuration={1500} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Segment Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={segmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                        {segmentData.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  {segmentData.map((seg, i) => (
                    <div key={seg.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                        <span className="text-slate-700 dark:text-slate-300">{seg.name}</span>
                      </div>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{seg.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Product Report */}
        <TabsContent value="products" className="mt-6">
          <ReportHeader title="Product Report" icon={Package} description="Product performance and category analysis" />
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="text-sm text-slate-500">Total Products</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{products.length}</p>
                <p className="text-xs text-slate-500 mt-2">In product catalog</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="text-sm text-slate-500">Best Seller</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{productRevenue[0]?.name}</p>
                <p className="text-xs text-emerald-600 mt-2">{formatINR(productRevenue[0]?.revenue)}</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="text-sm text-slate-500">Categories</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{categoryData.length}</p>
                <p className="text-xs text-slate-500 mt-2">Active categories</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Product Revenue Ranking</CardTitle>
              </CardHeader>
              <CardContent className="pl-0 pb-4">
                <div className="h-[360px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productRevenue.slice(0, 10)} margin={{ top: 5, right: 30, left: 10, bottom: 5 }} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                      <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 100000}L`} />
                      <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} width={110} />
                      <Tooltip formatter={(value: any) => [formatINR(value), "Revenue"]} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                      <Bar dataKey="revenue" fill="#6366f1" radius={[0, 4, 4, 0]} animationDuration={1500} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                        {categoryData.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => [formatINR(value), "Revenue"]} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  {categoryData.map((cat, i) => (
                    <div key={cat.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                        <span className="text-slate-700 dark:text-slate-300">{cat.name}</span>
                      </div>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{formatINR(cat.value)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}