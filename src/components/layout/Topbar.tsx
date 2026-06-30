import { Menu, Search, Bell, Target } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  LineChart, 
  Users, 
  FileText, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }
];

const analyticsNavigation = [
  { name: 'Sales', href: '/dashboard/sales', icon: LineChart },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText }
];

const systemNavigation = [
  { name: 'Settings', href: '/dashboard/settings', icon: Settings }
];

function MobileNavLinks() {
  return (
    <nav className="grid gap-6 text-sm font-medium mt-4">
      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Main</h4>
        <div className="grid gap-1">
          {mainNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === '/dashboard'}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 transition-all hover:bg-slate-200 dark:hover:bg-slate-800",
                  isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-400"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Analytics</h4>
        <div className="grid gap-1">
          {analyticsNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 transition-all hover:bg-slate-200 dark:hover:bg-slate-800",
                  isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-400"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">System</h4>
        <div className="grid gap-1">
          {systemNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 transition-all hover:bg-slate-200 dark:hover:bg-slate-800",
                  isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-400"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function Topbar() {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-white dark:bg-slate-950 px-4 lg:px-6 shrink-0">
      <Sheet>
        <SheetTrigger asChild>
          <button className="md:hidden shrink-0 p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 rounded-md">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-4 flex flex-col gap-4">
          <NavLink to="/" className="flex items-center gap-2 font-bold tracking-tight text-lg mb-4">
            <Target className="h-6 w-6 text-indigo-600 dark:text-indigo-500" />
            <span className="text-slate-900 dark:text-white">InsightIQ</span>
          </NavLink>
          <div className="flex-1 overflow-y-auto -mx-4 px-4">
            <MobileNavLinks />
          </div>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1 flex items-center max-w-2xl">
        <form className="w-full">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="search"
              placeholder="Search customers, products or invoices..."
              className="w-full h-10 appearance-none bg-slate-100 dark:bg-slate-900 pl-10 shadow-none rounded-full border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-950 px-4 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20"
            />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-950"></span>
          <span className="sr-only">Notifications</span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

        <button className="flex items-center gap-3 text-left">
          <Avatar className="h-9 w-9 border border-slate-200 dark:border-slate-800">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="John Mathew" />
            <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400 font-semibold">JM</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm font-medium leading-none text-slate-900 dark:text-slate-100">John Mathew</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sales Manager</p>
          </div>
        </button>
      </div>
    </header>
  );
}
