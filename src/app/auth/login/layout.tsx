import type { Metadata } from 'next';
import '@/app/globals.css';
import { cn } from '@/lib/utils';
import { Providers } from '@/app/provider';

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
    <div
      style={{
        background: 'linear-gradient(90deg,#e52e71,#ff8a00)',
      }}
      className={cn(
        'min-h-screen max-w-[100%] overflow-x-hidden font-sans text-foreground'
      )}
    >
      {children}
    </div>
  );
}
