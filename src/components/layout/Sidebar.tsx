import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  LineChart, 
  Users, 
  FileText, 
  Settings,
  Target
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

export function Sidebar() {
  return (
    <div className="hidden border-r bg-slate-50 dark:bg-slate-900 md:block w-64 flex-shrink-0">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-6 lg:h-[60px]">
          <NavLink to="/" className="flex items-center gap-2 font-bold tracking-tight text-lg">
            <Target className="h-6 w-6 text-indigo-600 dark:text-indigo-500" />
            <span className="text-slate-900 dark:text-white">InsightIQ</span>
          </NavLink>
        </div>
        <div className="flex-1 overflow-auto">
          <nav className="grid items-start px-4 py-4 gap-6 text-sm font-medium">
            
            {/* MAIN Section */}
            <div>
              <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Main</h4>
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

            {/* ANALYTICS Section */}
            <div>
              <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Analytics</h4>
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

            {/* SYSTEM Section */}
            <div>
              <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">System</h4>
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
        </div>
      </div>
    </div>
  );
}
