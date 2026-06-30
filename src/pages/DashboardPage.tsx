import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
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
  PieChart,
  Pie,
  Cell
} from "recharts";
import { IndianRupee, Users, ShoppingCart, TrendingUp } from "lucide-react";
import { sales, customers, products } from "@/lib/mock-data";
import { useMemo } from "react";

// Colors for Pie Chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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
    // Sort by date (we know it's May 25 to Apr 26)
    const sortedKeys = Object.keys(months).sort((a, b) => {
      const [mA, yA] = a.split(' ');
      const [mB, yB] = b.split(' ');
      if (yA !== yB) return yA.localeCompare(yB);
      const monthOrder = { Jan:1, Feb:2, Mar:3, Apr:4, May:5, Jun:6, Jul:7, Aug:8, Sep:9, Oct:10, Nov:11, Dec:12 };
      return monthOrder[mA as keyof typeof monthOrder] - monthOrder[mB as keyof typeof monthOrder];
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
      .slice(0, 5); // Top 5
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

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your business performance in India.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatINR(kpis.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 font-medium">{kpis.revenueGrowth}</span> from last year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Sales Orders</CardTitle>
            <ShoppingCart className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{kpis.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 font-medium">{kpis.orderGrowth}</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              Across all Indian regions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Overall Growth</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">+14.2%</div>
            <p className="text-xs text-muted-foreground">
              QoQ Average Growth
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Performance over the last 12 months</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `₹${value / 100000}L`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatINR(value), "Revenue"]}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#0f172a" 
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#0f172a" }}
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Sales by Region</CardTitle>
            <CardDescription>Revenue distribution across India</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionSales} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `₹${value / 100000}L`}
                  />
                  <Tooltip 
                    formatter={(value: any) => [formatINR(value), "Sales"]}
                    cursor={{ fill: 'var(--muted)' }}
                  />
                  <Bar dataKey="total" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topProducts}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ percent = 0 }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {topProducts.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [formatINR(value), "Revenue"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {topProducts.map((product, i) => (
                <div key={product.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="font-medium truncate max-w-[150px]">{product.name}</span>
                  </div>
                  <span className="text-muted-foreground">{formatINR(product.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Latest transactions from clients</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{sale.customerName}</div>
                      <div className="text-xs text-muted-foreground hidden sm:block">{sale.customerEmail}</div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{sale.region}</TableCell>
                    <TableCell>
                      <Badge variant={sale.status === 'Completed' ? 'default' : 'secondary'} 
                             className={sale.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200' : ''}>
                        {sale.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatINR(sale.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}