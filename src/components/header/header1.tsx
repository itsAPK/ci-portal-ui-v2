'use client';
import React, { useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { useStore } from '@/hooks/use-store';
import { UserNav } from './user-nav';
import { Input } from '../ui/input';
import { Bell, MailOpen, Search } from 'lucide-react';

interface NavbarProps {
  title: string;
}

export function Header1() {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    console.log(value); // Logs the current value of the input to the console
  };

  return (
    <div className="py-5 ">
      <header className="sticky top-0 z-10 w-full border-b bg-background shadow-sm dark:shadow-secondary">
        <div className="flex h-16 items-center bg-background px-5 shadow-md">
          <div className="flex w-1/3 items-center space-x-4">
            <div className="relative w-full">
              <Input
                placeholder="Type here to search..."
                className="w-full bg-[#ceebee] pl-4 pr-10"
                value={searchValue}
                onChange={handleSearchChange} // Handles the input change
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-[#089bab]"
                size={17}
              />
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-5 text-[#089bab]">
            <Bell size={18} />
            <MailOpen size={18} />
            <UserNav />
          </div>
        </div>
      </header>
    </div>
  );
}
