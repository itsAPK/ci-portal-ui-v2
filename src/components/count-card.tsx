import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export const CountCard = ({
  name,
  icon,
  count,
  color,
}: {
  name: string;
  icon: any;
  count: string | number;
  color: string;
}) => {
  return (
    <div className="flex h-full w-full  border border-primary/50  items-center space-x-6 rounded-xl bg-background px-10  align-middle shadow md:h-32 md:px-8">
      <div
        className={cn(
          `${color} col-span-1 flex h-[64px] w-[64px] items-center justify-center rounded-full`,
        )}
      >
        {icon}
      </div>
      <div className="col-span-3">
        <div className=" text-[15px] font-semibold text-muted-foreground">{name}</div>
        <div className="px-1 py-1 text-xl font-semibold">{count}</div>
      </div>
    </div>
  );
};