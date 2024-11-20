import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Providers } from './provider';
import { Toaster } from '@/components/ui/sonner';
import UILayout from '@/components/ui-layout';

export const metadata: Metadata = {
  title: 'CI Portal',
  description: 'CI Portal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('max-w-[100%] overflow-x-hidden font-sans dark:bg-primary/10  text-foreground')}>
        <Providers>
          {' '}
       {children}
        </Providers>
      </body>
    </html>
  );
}
