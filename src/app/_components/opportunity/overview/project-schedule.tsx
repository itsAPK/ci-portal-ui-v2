import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartAreaIcon, PencilIcon, TrendingUpIcon } from 'lucide-react';
import { RiLockFill,RiStackFill } from '@remixicon/react';
import { ProjectScheduleCard } from './project-schedule-card';
import { cn } from '@/lib/utils';
export const ProjectSchedule = ({isReport = false} : {isReport?: boolean}) => {
  return (
    <Card className={cn('mt-3  bg-white',isReport ? 'border-none shadow-none' : 'border-gray-500/20')}>
      <div className="flex justify-between p-4">
        <div className="pt-2 text-base font-semibold">Project Schedule</div>
       
      </div>
      <CardContent className="overflow-y-auto p-4 pt-0">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ProjectScheduleCard
            isReport={isReport}
              title={'Define Phase'}
              data={{
                planned_start_date: '2023-01-01',
                planned_end_date: '2023-01-31',
                actual_start_date: '2023-01-01',
                actual_end_date: '2023-01-31'
              }}
              icon={<RiLockFill className="h-4 w-4 mt-1" />}
            />
            <ProjectScheduleCard
            isReport={isReport}
              title={'Measure & Analysis Phase'}
              data={{
                planned_start_date: '2023-01-01',
                planned_end_date: '2023-01-31',
                actual_start_date: '2023-01-01',
                actual_end_date: '2023-01-31'
              }}
              icon={<ChartAreaIcon className="h-4 w-4 mt-1" />}
            />
            <ProjectScheduleCard
            isReport={isReport}
              title={'Improvement Phase'}
              data={{
                planned_start_date: '2023-01-01',
                planned_end_date: '2023-01-31',
                actual_start_date: '2023-01-01',
                actual_end_date: '2023-01-31'
              }}
              icon={<TrendingUpIcon className="h-4 w-4 mt-1" />}
            />
            <ProjectScheduleCard
            isReport={isReport}
              title={'Control Phase'}
              data={{
                planned_start_date: '2023-01-01',
                planned_end_date: '2023-01-31',
                actual_start_date: '2023-01-01',
                actual_end_date: '2023-01-31'
              }}
              icon={<RiStackFill className="h-4 w-4 mt-1" />}/>
        </div>
      </CardContent>
    </Card>
  );
};
