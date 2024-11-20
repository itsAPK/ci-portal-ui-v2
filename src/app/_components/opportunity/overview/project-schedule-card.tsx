import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
export const ProjectScheduleCard = ({
    title,
    data,
    icon,
} : {
    title: string,
    data: {
        planned_start_date: string,
        planned_end_date: string,
        actual_start_date: string,
        actual_end_date: string
    },
    icon: any
}) => {
    return (   <Card className="px-1">
        <CardHeader className="flex items-center justify-between pt-4">
          <CardTitle className="flex gap-3 text-base font-semibold">
           {icon} {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3 rounded border text-xs font-medium border-gray-200 bg-gray-50 p-2">
            <div className=" p-1"></div>
            <div className="  p-1 text-sm font-semibold ">Planned</div>
            <div className=" text-sm p-1 font-semibold">Actual</div>
            <div className=' text-xs'>Start Date</div>
            <div>{data.planned_start_date}</div>
            <div>{data.actual_start_date}</div>
            <div>End Date</div>
            <div>{data.planned_end_date}</div>
            <div>{data.actual_end_date}</div>
        
          </div>
        </CardContent>
      </Card>)
}