import fs from 'fs';
import path from 'path';

const pages = [
  'LandingPage', 'LoginPage', 'DashboardPage', 'SalesPage', 
  'CustomersPage', 'ReportsPage', 'SettingsPage'
];

const layouts = [
  'PublicLayout', 'DashboardLayout'
];

pages.forEach(page => {
  const content = `export default function ${page}() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">${page}</h1>
    </div>
  );
}`;
  fs.writeFileSync(path.join(process.cwd(), 'src', 'pages', `${page}.tsx`), content);
});

layouts.forEach(layout => {
  const content = `import { Outlet } from 'react-router-dom';

export default function ${layout}() {
  return (
    <div className="min-h-screen bg-background">
      {/* ${layout} header/sidebar will go here */}
      <Outlet />
    </div>
  );
}`;
  fs.writeFileSync(path.join(process.cwd(), 'src', 'components', 'layout', `${layout}.tsx`), content);
});

const routesContent = `import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import DashboardLayout from '../components/layout/DashboardLayout';

import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import SalesPage from '../pages/SalesPage';
import CustomersPage from '../pages/CustomersPage';
import ReportsPage from '../pages/ReportsPage';
import SettingsPage from '../pages/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'sales', element: <SalesPage /> },
      { path: 'customers', element: <CustomersPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);
`;
fs.writeFileSync(path.join(process.cwd(), 'src', 'routes', 'index.tsx'), routesContent);

console.log("Scaffolding complete.");
