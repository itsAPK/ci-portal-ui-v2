'use client';
import React, { useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { useStore } from '@/hooks/use-store';
import { UserNav } from './user-nav';
import { Input } from '../ui/input';
import { Bell, MailOpen, Search } from 'lucide-react';
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
 
interface NavbarProps {
  title: string;
}

export function Header() {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    console.log(value); // Logs the current value of the input to the console
  };

  return (
    <div className="flex h-16 my-4 items-center rounded-full bg-white dark:bg-background px-5 shadow-md">
      <div className="flex w-1/3 items-center space-x-4 ">
        <div className="relative w-full">
          
          <AnimatedGradientText>
        <span
          className={cn(
            `inline animate-gradient text-[20px] font-semibold bg-gradient-to-r from-[#ff8a00] via-[#e52e71] to-[#ff8a00] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
          style={{fontFamily : '"Montserrat", sans-serif',}}
        >
          CI ROBUST TRACKING SYSTEM
        </span>
      </AnimatedGradientText>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end space-x-5 text-primary">
       
    
        <UserNav />

      </div>
    </div>
  );
}
