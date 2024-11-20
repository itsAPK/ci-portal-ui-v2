'use client';

import { cn } from '@/lib/utils';
import { useStore } from '@/hooks/use-store';
// import { Footer } from "@/components/admin-panel/footer";
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { Sidebar } from './sidebar/sidebar';

export default function UILayout({ children }: { children: React.ReactNode }) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px) transition-[margin-left] duration-300 ease-in-out dark:bg-primary/10 ',
          sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72',
        )}
      >
        {children}
      </main>
      {/* <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
    
      </footer> */}
    </>
  );
}
