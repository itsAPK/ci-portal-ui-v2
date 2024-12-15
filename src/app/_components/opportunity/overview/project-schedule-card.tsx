import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export const ProjectScheduleCard = ({
  title,
  data,
  icon,
  isReport = false,
}: {
  title: string;
  data: {
    planned_start_date: string;
    planned_end_date: string;
    actual_start_date: string;
    actual_end_date: string;
  };
  icon: any;
  isReport?: boolean;
}) => {
  return (
    <Card className={cn('px-1', isReport ? 'border-gray-200 shadow-none bg-white' : 'border-gray-500/20')}>
      <CardHeader className="flex items-center justify-between pt-4">
        <CardTitle className="flex gap-3 text-base font-semibold">
          {icon} {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-3 rounded border border-gray-200 bg-gray-50 p-2 text-xs font-medium">
          <div className="p-1"></div>
          <div className="p-1 text-sm font-semibold">Planned</div>
          <div className="p-1 text-sm font-semibold">Actual</div>
          <div className="text-xs">Start Date</div>
          <div>{data.planned_start_date}</div>
          <div>{data.actual_start_date}</div>
          <div>End Date</div>
          <div>{data.planned_end_date}</div>
          <div>{data.actual_end_date}</div>
        </div>
      </CardContent>
    </Card>
  );
};
