
import { PencilIcon } from 'lucide-react';
import {RiAddCircleFill, RiDeleteBin2Fill, RiDownload2Fill, RiEyeFill} from '@remixicon/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Documents } from '../documents';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
const data = [
{
    source : 'Mounting height	',
    tools : "Product/Process Search , 2't' test",
    rootCause : 'Eliminated',
},
{
    source : 'Container hole punching height from bottom container	',
    tools : "Product/Process Search , 2't' test",
    rootCause : 'Eliminated'
},{
    source : 'Flange height	',
    tools : "Product/Process Search , 2't' test",
    rootCause : 'Confirmed'
},{
    source : 'Paper/PE shim peel off (Paper accumulated between the flange)	',
    tools : "Gemba Observation ,",
    rootCause : 'Confirmed'
},
]

export const MeasureAnalysisPhase = ({ma,isReport = false} : {ma: any,isReport?: boolean}) => {
  const router  = useRouter();
    return (
        <div className="py-4">
        <Card className={cn('bg-white',isReport ? 'border-none shadow-none' : 'border-gray-500/20')}>
          <div className="flex justify-between p-4">
            <div className="text-base font-semibold pt-2 ">Measure Analysis Phase</div>
            {!isReport && <Button variant="ghost-1" size={'sm'} className=" gap-1" onClick={() => router.push(`${process.env.NEXT_PUBLIC_API_URL}/api/files/download/${ma.document}`)}>
              <RiDownload2Fill className='w-3 h-3'/>  Download Document
            </Button>}
          </div>
          <CardContent className=" overflow-y-auto p-4 pt-0">
          <Table className="w-full ">
          <TableHeader>
            <TableRow>
              <TableHead className='text-center text-xs'>Suspected Source of Variation	</TableHead>
              <TableHead className='text-center text-xs'>Tools</TableHead>
              <TableHead className='text-center text-xs'>Identified Root Cause</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
                ma.data.map((item : any) => (
                  <TableRow key={item.source}>
                    <TableCell className='text-center text-xs'>{item.suspected_source}</TableCell>
                    <TableCell className='text-center text-xs'>{item.tools}</TableCell>
                    <TableCell className='text-center text-xs'>{item.root_cause}</TableCell>
                   
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
            </CardContent>
        </Card>
        </div>
    )
}