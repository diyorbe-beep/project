import { ReactNode } from 'react';
import { AdminNavbar } from './AdminNavbar';
import { ShifokorSidebar } from './ShifokorSidebar';

interface ShifokorLayoutProps {
  children: ReactNode;
}

export const ShifokorLayout = ({ children }: ShifokorLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex">
        <ShifokorSidebar />
        <div className="flex-1 overflow-hidden">
          <main className="h-full overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
