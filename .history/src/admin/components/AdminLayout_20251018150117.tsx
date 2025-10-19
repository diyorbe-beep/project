import { ReactNode } from 'react';
import { AdminNavbar } from './AdminNavbar';
import { Sidebar } from './feature/Sidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <main className="h-full overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
