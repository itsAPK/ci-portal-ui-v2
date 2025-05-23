
import Link from 'next/link';
import { JSX, SVGProps } from 'react';

export default function Component() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Page not found!
        </h1>
        <p className="mt-4 text-muted-foreground">
          {"The page you're looking for doesn't seem to exist. Let's get you back on track."}
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={true}
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

