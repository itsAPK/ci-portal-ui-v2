'use client';
import Link from 'next/link';
import { LayoutGrid, LogOut, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export function UserNav() {
  const role = getCookie('ci-portal.role');
  const user = getCookie('ci-portal.user');
  const name = getCookie('ci-portal.name') as string;
  const plant = getCookie('ci-portal.plant');
  const router = useRouter();
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-transparent">{name.slice(0,2).toUpperCase() ?? "CI"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground capitalize">{role?.toString().replace('_', ' ')} ({plant})</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/" className="flex items-center">
              <LayoutGrid className="mr-3 h-4 w-4 text-muted-foreground" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/account-management" className="flex items-center">
              <User className="mr-3 h-4 w-4 text-muted-foreground" />
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer" onClick={() => {
          deleteCookie('ci-portal.role');
          deleteCookie('ci-portal.user');
          deleteCookie('ci-portal.name');
          deleteCookie('ci-portal.plant');
          deleteCookie('ci-portal.access_token');
          deleteCookie('ci-portal.email');
          deleteCookie('ci-portal.employee_id');
          deleteCookie('ci-portal.bussiness_unit');
          deleteCookie('ci-portal.department');
          deleteCookie('ci-portal.user_id');
          router.push('/auth/login');
        }}>
          <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
