import { PencilIcon } from 'lucide-react';
import { RiAddCircleFill, RiDeleteBin2Fill, RiDownload2Fill, RiEyeFill } from '@remixicon/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Documents } from '../documents';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BASEURL } from '@/lib/api';


export const ImprovementPhase = ({ improvements ,isReport = false }: { improvements: any,isReport?: boolean }) => {
  const router = useRouter();
  return (
    <div className="py-4">
      <Card className={cn('bg-white',isReport ? 'border-none shadow-none' : 'border-gray-500/20')}>
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Improvement Phase</div>
          {!isReport && <Button variant="ghost-1" size={'sm'} className="gap-1" onClick={() => router.push(`${BASEURL}/files/download/${improvements.document}`)}>
            <RiDownload2Fill className='w-3 h-3'/>  Download Document
            </Button>}
        </div>
        <CardContent className="overflow-y-auto p-4 pt-0">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center text-xs">Confirmed Causes </TableHead>
                <TableHead className="text-center text-xs">Action Taken </TableHead>
                <TableHead className="text-center text-xs">Type of Action </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {improvements.data.map((item : any) => (
                <TableRow key={item.source}>
                  <TableCell className="text-center text-xs">{item.confirmed_cause}</TableCell>
                  <TableCell className="text-center text-xs">{item.action_taken}</TableCell>
                  <TableCell className="text-center text-xs">{item.type_of_action}</TableCell>
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
