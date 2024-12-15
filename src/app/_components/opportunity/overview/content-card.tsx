import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
    RiBox3Fill
} from '@remixicon/react'
import {cn} from '@/lib/utils'
export const ContentCard = ({
    title,
    value,
    icon,
    className,
    isReport = false
} : {
    title: string,
    value: string,
    icon?: any
    className?: string
    isReport?: boolean
}) => {
  return (
    <Card className={cn(className,isReport && 'shadow-none border-gray-200 bg-white')}>
        <CardContent className="p-4 flex flex-col">
            <div className="flex gap-2">
                {icon && icon}
                 <div className='font-semibold text-gray-800 text-sm -mt-[2px]'>
                    {title}
                 </div>
            </div>
            <div className="flex gap-2 pl-6 text-sm pt-1">
{value} </div>
        </CardContent>
    </Card>
  )}