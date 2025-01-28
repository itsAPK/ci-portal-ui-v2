import { PencilIcon } from 'lucide-react';
import { RiAddCircleFill, RiBox3Fill, RiDeleteBin2Fill, RiDownload2Fill, RiEyeFill } from '@remixicon/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { ContentCard

 } from '../overview/content-card';
import { cn } from '@/lib/utils';
import { BASEURL } from '@/lib/api';
import { formatToIndianNumber } from '../../../../lib/utils';
const data = [
  {
    source: 'Mounting height	',
    tools: 'Updated in drawing	',
    rootCause: 'Process Design',
  },
  {
    source: 'Container hole punching height from bottom container	',
    tools: 'Updated in drawing	',
    rootCause: 'Process Design',
  },
  {
    source: 'Flange height	',
    tools: 'Updated in drawing		',
    rootCause: 'Process Design',
  },
  {
    source: 'Paper/PE shim peel off (Paper accumulated between the flange)	',
    tools: 'Updated in drawing	',
    rootCause: 'Process Design',
  },
];

export const ControlPhase = ({contol,isReport = false} : {contol: any,isReport?: boolean}) => {
  const router  = useRouter();
  return (
    <div className="py-4">
      <Card className={cn('bg-white',isReport ? 'border-none shadow-none' : 'border-gray-500/20')}>
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Control Phase</div>
          {!isReport && <Button variant="ghost-1" size={'sm'} className="gap-1" onClick={() => router.push(`${BASEURL}/files/download/${contol.document}`)}>
            <RiDownload2Fill className="h-3 w-3" /> Download Document
          </Button>}
        </div>
        <CardContent className="overflow-y-auto p-4 pt-0">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center text-xs">Confirmed Causes </TableHead>
                <TableHead className="text-center text-xs">Control Mechanism Implemented	</TableHead>
                <TableHead className="text-center text-xs">Tools                </TableHead>
           
              </TableRow>
            </TableHeader>
            <TableBody>
              {contol.data.map((item : any) => (
                <TableRow key={item.source}>
                  <TableCell className="text-center text-xs">{item.confirmed_cause}</TableCell>
                  <TableCell className="text-center text-xs">{item.mechanism}</TableCell>
                  <TableCell className="text-center text-xs">{item.contol_tools}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className={cn('my-4 ',isReport ? 'border-none bg-white shadow-none' : 'border-gray-500/20')}>
        <CardHeader>
          <CardTitle className="text-sm">Control Response</CardTitle>
        </CardHeader>
        <CardContent className="gap-4 text-sm grid grid-cols-4">
          <ContentCard
          isReport={isReport}
            title={'Baseline'}
            value={contol.control_response.baseline}
            icon={<RiBox3Fill className="h-4 w-4" />}
          />
          <ContentCard
          isReport={isReport}
            title={'Target'}
            value={contol.control_response.target}
            icon={<RiBox3Fill className="h-4 w-4" />}
          />
          <ContentCard
          isReport={isReport}
            title={'Actual'}
            value={contol.control_response.actual}
            icon={<RiBox3Fill className="h-4 w-4" />}
          />
          <ContentCard
          isReport={isReport}
            title={'UOM'}
            value={contol.control_response.uom}
            icon={<RiBox3Fill className="h-4 w-4" />}/>
        </CardContent>
      </Card>
      <Card className={cn('my-4',isReport ? 'border-none bg-white shadow-none' : 'border-gray-500/20')}>
      <CardHeader>
        <CardTitle className="text-sm">Savings</CardTitle>
      </CardHeader>
        <CardContent className="gap-4 text-sm grid grid-cols-3">
          <ContentCard
          isReport={isReport}
            title={'Estimated'}
            value={`Rs ${formatToIndianNumber(contol.control_cost.estimated)}`}
            icon={<RiBox3Fill className="h-4 w-4" />}
          />
          <ContentCard
          isReport={isReport}
            title={'Actual'}
            value={`Rs ${formatToIndianNumber(contol.control_cost.actual)}`}
            icon={<RiBox3Fill className="h-4 w-4" />}
          />
          <ContentCard
          isReport={isReport}
            title={'UOM'}
            value={contol.control_cost.uom}
            icon={<RiBox3Fill className="h-4 w-4" />}
          />
        </CardContent>
      </Card>
    
    </div>
  );
};
