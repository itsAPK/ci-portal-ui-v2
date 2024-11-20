'use client';
import Link from 'next/link';
import { PanelsTopLeft } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useStore } from '@/hooks/use-store';
import { Button } from '@/components/ui/button';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { SidebarToggle } from './sidebar-toggle';
import { Menu } from './menu';

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-20 h-screen w-48 -translate-x-full  transition-[width] duration-300 ease-in-out lg:translate-x-0',
        sidebar?.isOpen === false ? 'w-[90px]' : 'w-72',
      )}
      style={{ background: 'linear-gradient(90deg,#e52e71,#ff8a00)' }}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative flex h-full flex-col overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Link href="/" style={{
          boxShadow: "rgba(231, 231, 231, 0.867) 0px 10px 46px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"
        }} className="flex items-center pb-5 py-3 bg-black rounded-b-full   gap-2 text-center">
        <img
                width={"280px"}
                height={"280px"}
                src="https://i.ibb.co/71KHvty/image-removebg-preview-2.png"
                alt=""
              />
        </Link>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
