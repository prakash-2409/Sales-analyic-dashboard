import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background">
      {/* PublicLayout header/sidebar will go here */}
      <Outlet />
    </div>
  );
}