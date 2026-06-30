import { useState, useMemo } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Users,
  UserPlus,
  TrendingUp,
  Building2,
  Search,
  ChevronLeft,
  ChevronRight,
  Crown,
} from "lucide-react";
import { sales, customers } from "@/lib/mock-data";

const ITEMS_PER_PAGE = 10;
const SEGMENT_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const getInitials = (name: string) => {
  if (!name) return "UK";
  return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
};

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate customer revenue map
  const customerRevenue = useMemo(() => {
    const map: Record<string, number> = {};
    sales.forEach((sale) => {
      map[sale.customerId] = (map[sale.customerId] || 0) + sale.amount;
    });
    return map;
  }, []);

  // Customer order count
  const customerOrders = useMemo(() => {
    const map: Record<string, number> = {};
    sales.forEach((sale) => {
      map[sale.customerId] = (map[sale.customerId] || 0) + 1;
    });
    return map;
  }, []);

  // KPIs
  const kpis = useMemo(() => {
    const total = customers.length;
    const enterprise = customers.filter((c) => c.segment === "Enterprise").length;
    const newCustomers = customers.filter((c) => {
      const joined = new Date(c.joinedAt);
      return joined.getFullYear() >= 2022 && joined.getMonth() >= 6;
    }).length;
    const avgRevenuePerCustomer = sales.reduce((sum, s) => sum + s.amount, 0) / total;
    return { total, enterprise, newCustomers, avgRevenuePerCustomer };
  }, []);

  // Customer growth by quarter
  const customerGrowth = useMemo(() => {
    const quarters = [
      { name: "Q1 2022", count: 22 },
      { name: "Q2 2022", count: 38 },
      { name: "Q3 2022", count: 55 },
      { name: "Q4 2022", count: 72 },
      { name: "Q1 2023", count: 85 },
      { name: "Q2 2023", count: 98 },
      { name: "Q3 2023", count: 112 },
      { name: "Q4 2023", count: 125 },
      { name: "Q1 2024", count: 133 },
      { name: "Q2 2024", count: 140 },
      { name: "Q3 2024", count: 145 },
      { name: "Q4 2024", count: 150 },
    ];
    return quarters;
  }, []);

  // Segment distribution
  const segmentData = useMemo(() => {
    const segments: Record<string, number> = {};
    customers.forEach((c) => {
      segments[c.segment] = (segments[c.segment] || 0) + 1;
    });
    return Object.entries(segments).map(([name, value]) => ({ name, value }));
  }, []);

  // Top 5 customers
  const topCustomers = useMemo(() => {
    return customers
      .map((c) => ({
        ...c,
        revenue: customerRevenue[c.id] || 0,
        orders: customerOrders[c.id] || 0,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [customerRevenue, customerOrders]);

  // Filtered customers
  const filteredCustomers = useMemo(() => {
    return customers
      .map((c) => ({
        ...c,
        revenue: customerRevenue[c.id] || 0,
        orders: customerOrders[c.id] || 0,
      }))
      .filter((c) => {
        const matchesSearch =
          searchQuery === "" ||
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSegment = segmentFilter === "all" || c.segment === segmentFilter;
        const matchesRegion = regionFilter === "all" || c.region === regionFilter;
        return matchesSearch && matchesSegment && matchesRegion;
      })
      .sort((a, b) => b.revenue - a.revenue);
  }, [searchQuery, segmentFilter, regionFilter, customerRevenue, customerOrders]);

  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const segments = [...new Set(customers.map((c) => c.segment))];
  const regions = [...new Set(customers.map((c) => c.region))];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Customers</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Analyze customer segments and engagement.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Total Customers</CardTitle>
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-full">
              <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{kpis.total}</div>
            <p className="text-xs text-slate-500 mt-1">Across all segments</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Enterprise Clients</CardTitle>
            <div className="p-2 bg-violet-50 dark:bg-violet-500/10 rounded-full">
              <Building2 className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{kpis.enterprise}</div>
            <p className="text-xs text-slate-500 mt-1">{((kpis.enterprise / kpis.total) * 100).toFixed(0)}% of total base</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">New This Year</CardTitle>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-full">
              <UserPlus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{kpis.newCustomers}</div>
            <p className="text-xs text-slate-500 mt-1">Onboarded recently</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Avg. Revenue</CardTitle>
            <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-full">
              <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{formatINR(kpis.avgRevenuePerCustomer)}</div>
            <p className="text-xs text-slate-500 mt-1">Per customer</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription>Cumulative customer acquisition over time</CardDescription>
          </CardHeader>
          <CardContent className="pl-0 pb-4">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={customerGrowth} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                  <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCount)" animationDuration={1500} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Segmentation</CardTitle>
            <CardDescription>Customer distribution by segment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={segmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                    {segmentData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={SEGMENT_COLORS[index % SEGMENT_COLORS.length]} />
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
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }} />
                    <span className="text-slate-700 dark:text-slate-300">{seg.name}</span>
                  </div>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{seg.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Customers */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-500" />
            <CardTitle>Top Customers</CardTitle>
          </div>
          <CardDescription>Highest revenue generating accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {topCustomers.map((customer, i) => (
              <div key={customer.id} className="flex flex-col items-center text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Avatar className="h-12 w-12 border-2 border-slate-200 dark:border-slate-700 mb-3">
                  <AvatarFallback className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400 font-semibold">
                    {getInitials(customer.name)}
                  </AvatarFallback>
                </Avatar>
                <p className="font-medium text-sm text-slate-900 dark:text-slate-100">{customer.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{customer.company}</p>
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-2">{formatINR(customer.revenue)}</p>
                <p className="text-xs text-slate-500">{customer.orders} orders</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>All Customers</CardTitle>
              <CardDescription>{filteredCustomers.length} customers</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="h-9 w-full sm:w-[200px] bg-slate-100 dark:bg-slate-900 pl-9 pr-4 rounded-lg border-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-950 transition-all"
                />
              </div>
              <Select value={segmentFilter} onValueChange={(v) => { setSegmentFilter(v); setCurrentPage(1); }}>
                <SelectTrigger className="h-9 w-full sm:w-[140px] text-sm">
                  <SelectValue placeholder="Segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Segments</SelectItem>
                  {segments.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={regionFilter} onValueChange={(v) => { setRegionFilter(v); setCurrentPage(1); }}>
                <SelectTrigger className="h-9 w-full sm:w-[150px] text-sm">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Customer</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Segment</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCustomers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border border-slate-200 dark:border-slate-800">
                          <AvatarFallback className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400 font-semibold text-xs">
                            {getInitials(customer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm text-slate-900 dark:text-slate-100">{customer.name}</div>
                          <div className="text-xs text-slate-500">{customer.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-700 dark:text-slate-300">{customer.company}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="border-none bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {customer.segment}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">{customer.region}</TableCell>
                    <TableCell className="text-sm text-slate-700 dark:text-slate-300">{customer.orders}</TableCell>
                    <TableCell className="text-right font-semibold text-slate-900 dark:text-slate-100">{formatINR(customer.revenue)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <p className="text-sm text-slate-500">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredCustomers.length)} of {filteredCustomers.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
                const page = startPage + i;
                if (page > totalPages) return null;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}