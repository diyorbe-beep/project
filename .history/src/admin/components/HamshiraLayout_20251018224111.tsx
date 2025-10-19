import { ReactNode } from 'react';
import { AdminNavbar } from './AdminNavbar';
import { HamshiraSidebar } from './HamshiraSidebar';

interface HamshiraLayoutProps {
  children: ReactNode;
}

export const HamshiraLayout = ({ children }: HamshiraLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex">
        <HamshiraSidebar />
        <div className="flex-1 overflow-hidden">
          <main className="h-full overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
