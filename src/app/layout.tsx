import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Providers } from './provider';

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
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body
        className={cn(
          'max-w-[100%] overflow-x-hidden bg-primary/10 font-sans text-foreground dark:bg-primary/10',
        )}
      >
        <Providers>
           <div>
           {children}
           </div>
          </Providers>
      </body>
    </html>
  );
}
