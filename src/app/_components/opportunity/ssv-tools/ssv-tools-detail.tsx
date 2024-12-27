import { PencilIcon } from 'lucide-react';
import {RiAddCircleFill, RiDeleteBin2Fill, RiDownload2Fill, RiEyeFill} from '@remixicon/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Documents } from '../documents';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BASEURL } from '@/lib/api';


export const SSVTools = ({ssvTools,isReport = false} : {ssvTools: any,isReport?: boolean}) => {
  const router  = useRouter();
    return (
        <div className="py-4">
        <Card className={cn('bg-white',isReport ? 'border-none shadow-none' : 'border-gray-500/20')}>
          <div className="flex justify-between p-4">
            <div className="text-base font-semibold pt-2 ">SSV's & Tools</div>
            {!isReport && <Button variant="ghost-1" size={'sm'} className=" gap-1" onClick={() => router.push(`${BASEURL}/files/download/${ssvTools.document}`)}>
              <RiDownload2Fill className='w-3 h-3'/>  Download Document
            </Button>}
          </div>
          <CardContent className=" overflow-y-auto p-4 pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center text-xs">
                  Suspected Source of Variation{' '}
                </TableHead>
                <TableHead className=" text-center text-xs">Tools</TableHead>
                <TableHead className=" text-center text-xs">Type of SSV</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {
              ssvTools.data.map((item : any) => (
                  <TableRow key={item._id}>
                    <TableCell className='text-center text-xs'>{item.suspected_source}</TableCell>
                    <TableCell className='text-center text-xs'>{item.tools}</TableCell>
                    <TableCell className='text-center text-xs'>{item.type_of_ssv}</TableCell>
                    
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