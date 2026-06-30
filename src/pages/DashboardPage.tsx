import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from "recharts";
import { 
  IndianRupee, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  MapPin,
  Package,
  HeartHandshake,
  Sparkles,
  Lightbulb
} from "lucide-react";
import { sales, customers, products } from "@/lib/mock-data";
import { useMemo } from "react";

export default function DashboardPage() {
  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);
    const totalOrders = sales.length;
    const totalCustomers = customers.length;
    
    // Fake growth metrics for demo
    const revenueGrowth = "+12.5%";
    const orderGrowth = "+8.2%";
    
    return { totalRevenue, totalOrders, totalCustomers, revenueGrowth, orderGrowth };
  }, []);

  // Process data for Monthly Revenue Chart
  const monthlyRevenue = useMemo(() => {
    const months: Record<string, number> = {};
    sales.forEach(sale => {
      const date = new Date(sale.date);
      const month = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      months[month] = (months[month] || 0) + sale.amount;
    });
    // Sort chronologically (May 25 to Apr 26)
    const sortedKeys = Object.keys(months).sort((a, b) => {
      const dateA = new Date(`1 ${a}`);
      const dateB = new Date(`1 ${b}`);
      return dateA.getTime() - dateB.getTime();
    });
    
    return sortedKeys.map(key => ({ name: key, total: months[key] }));
  }, []);

  // Process data for Sales by Region
  const regionSales = useMemo(() => {
    const regions: Record<string, number> = {};
    sales.forEach(sale => {
      regions[sale.region] = (regions[sale.region] || 0) + sale.amount;
    });
    return Object.entries(regions)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total);
  }, []);

  // Process data for Top Products
  const topProducts = useMemo(() => {
    const prodSales: Record<string, number> = {};
    sales.forEach(sale => {
      prodSales[sale.productName] = (prodSales[sale.productName] || 0) + sale.amount;
    });
    return Object.entries(prodSales)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, []);

  // Recent 8 Sales
  const recentSales = sales.slice(0, 8);

  // Currency Formatter (INR)
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getInitials = (name: string) => {
    if (!name) return "UK";
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Overview of your business performance in India.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Revenue</CardTitle>
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-full">
              <IndianRupee className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{formatINR(kpis.totalRevenue)}</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" /> {kpis.revenueGrowth}
              </span> 
              <span>Compared to last year</span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Sales Orders</CardTitle>
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-full">
              <ShoppingCart className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">+{kpis.totalOrders}</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" /> {kpis.orderGrowth}
              </span> 
              <span>Compared to last month</span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Customers</CardTitle>
            <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-full">
              <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{kpis.totalCustomers}</div>
            <p className="text-xs text-slate-500 mt-1">
              Active accounts across all regions
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Overall Growth</CardTitle>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-full">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">+14.2%</div>
            <p className="text-xs text-slate-500 mt-1">
              QoQ Average Growth
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Performance over the last 12 months</CardDescription>
          </CardHeader>
          <CardContent className="pl-0 pb-4">
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    dy={10} 
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `₹${value / 100000}L`}
                    dx={-10}
                  />
                  <Tooltip 
                    formatter={(value: any) => [formatINR(value), "Revenue"]}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#6366f1", strokeWidth: 0 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    animationDuration={1500} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-3 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Sales by Region</CardTitle>
            <CardDescription>Revenue distribution across India</CardDescription>
          </CardHeader>
          <CardContent className="pl-0 pb-4">
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionSales} margin={{ top: 5, right: 30, left: 10, bottom: 5 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis 
                    type="number"
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `₹${value / 100000}L`}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category"
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    width={80}
                  />
                  <Tooltip 
                    formatter={(value: any) => [formatINR(value), "Sales"]}
                    cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar 
                    dataKey="total" 
                    fill="#10b981" 
                    radius={[0, 4, 4, 0]} 
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Business Summary Widget */}
        <Card className="col-span-1 lg:col-span-2 flex flex-col hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle>Executive Summary</CardTitle>
            <CardDescription>Key operational metrics</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
                  <MapPin className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Top Region</p>
                  <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">{regionSales[0]?.name}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
                  <Package className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Top Product</p>
                  <p className="text-lg font-bold text-slate-700 dark:text-slate-300 truncate max-w-[150px]" title={topProducts[0]?.name}>{topProducts[0]?.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
                  <HeartHandshake className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Avg. Order Value</p>
                  <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">
                    {formatINR(kpis.totalRevenue / kpis.totalOrders)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-5 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest enterprise software purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Client</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSales.map((sale) => {
                    const saleDate = new Date(sale.date).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    });
                    
                    return (
                      <TableRow key={sale.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border border-slate-200 dark:border-slate-800 shadow-sm">
                              <AvatarFallback className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400 font-semibold text-xs">
                                {getInitials(sale.customerName)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-slate-900 dark:text-slate-100">{sale.customerCompany || 'Unknown Inc'}</div>
                              <div className="text-xs text-slate-500">{sale.customerName}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-slate-700 dark:text-slate-300">{sale.productName}</div>
                          <div className="text-xs text-slate-500">{saleDate}</div>
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-400">{sale.region}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary"
                            className={
                              sale.status === 'Completed' 
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 border-none' 
                                : sale.status === 'Processing'
                                ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 border-none'
                                : 'bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400 border-none'
                            }
                          >
                            {sale.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-slate-900 dark:text-slate-100">
                          {formatINR(sale.amount)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights + Product Distribution */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4 hover:shadow-md transition-shadow border-indigo-100 dark:border-indigo-900/30">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-md">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <CardTitle>AI Business Insights</CardTitle>
            </div>
            <CardDescription>Powered by InsightIQ Analytics Engine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-emerald-900 dark:text-emerald-300 text-sm">Revenue Growth Detected</p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-400/80 mt-1">Revenue increased <strong>12.5%</strong> year-over-year. {regionSales[0]?.name} generated the highest revenue at {formatINR(regionSales[0]?.total)}.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-blue-900 dark:text-blue-300 text-sm">Top Product Performance</p>
                    <p className="text-sm text-blue-700 dark:text-blue-400/80 mt-1"><strong>{topProducts[0]?.name}</strong> is the best-selling product with {formatINR(topProducts[0]?.value)} in total revenue across {kpis.totalOrders} orders.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-amber-900 dark:text-amber-300 text-sm">Strategic Recommendation</p>
                    <p className="text-sm text-amber-700 dark:text-amber-400/80 mt-1">Increase marketing campaigns in <strong>{regionSales[regionSales.length - 1]?.name}</strong> to improve regional performance. Consider bundling {topProducts[1]?.name} with {topProducts[2]?.name} for cross-sell opportunities.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Product Distribution</CardTitle>
            <CardDescription>Revenue by top products</CardDescription>
          </CardHeader>
          <CardContent className="pl-0 pb-4">
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `₹${value / 100000}L`}
                  />
                  <Tooltip 
                    formatter={(value: any) => [formatINR(value), "Revenue"]}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#8b5cf6" 
                    radius={[4, 4, 0, 0]} 
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}