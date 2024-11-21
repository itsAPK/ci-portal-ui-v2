
import { PencilIcon } from 'lucide-react';
import {RiAddCircleFill, RiDeleteBin2Fill, RiEyeFill} from '@remixicon/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Documents } from './documents';
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

export const MeasureAnalysisPhase = () => {
    return (
        <div className="py-4">
        <Card className="border-gray-500/20 bg-white">
          <div className="flex justify-between p-4">
            <div className="text-base font-semibold pt-2 ">Measure Analysis Phase</div>
            <Button variant="ghost-1" size={'sm'} className=" gap-1">
             <RiAddCircleFill className='w-3 h-3'/>  Add 
            </Button>
          </div>
          <CardContent className=" overflow-y-auto p-4 pt-0">
          <Table className="w-full ">
          <TableHeader>
            <TableRow>
              <TableHead className='text-center text-xs'>Suspected Source of Variation	</TableHead>
              <TableHead className='text-center text-xs'>Tools</TableHead>
              <TableHead className='text-center text-xs'>Identified Root Cause</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
                data.map((item) => (
                  <TableRow key={item.source}>
                    <TableCell className='text-center text-xs'>{item.source}</TableCell>
                    <TableCell className='text-center text-xs'>{item.tools}</TableCell>
                    <TableCell className='text-center text-xs'>{item.rootCause}</TableCell>
                    <TableCell className='flex gap-2 mt-1  justify-end'>
                      <Button variant="ghost-1" className="h-6 flex gap-2" size={'sm'}>
                        <PencilIcon className="h-3 w-3" /> Edit
                      </Button>
                      
                     
                      <Button variant="ghost-1" size={'sm'} className="h-6 flex gap-2 bg-red-500/40 border-red-500 hover:bg-red-500/60">
                        <RiDeleteBin2Fill className="h-3 w-3" /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
            </CardContent>
        </Card>
        <Documents />
        </div>
    )
}