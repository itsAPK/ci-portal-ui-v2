import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-transparent px-4 py-1.5 text-sm font-medium transition-shadow duration-500 ease-out [--bg-size:300%] ",
        className,
      )}
    >
    

      {children}
    </div>
  );
}
