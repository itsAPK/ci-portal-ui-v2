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
import { Documents } from '../documents';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BASEURL } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { EditMeasureAnalysis } from './edit';
import { getCookie } from 'cookies-next';
const data = [
  {
    source: 'Mounting height	',
    tools: "Product/Process Search , 2't' test",
    rootCause: 'Eliminated',
  },
  {
    source: 'Container hole punching height from bottom container	',
    tools: "Product/Process Search , 2't' test",
    rootCause: 'Eliminated',
  },
  {
    source: 'Flange height	',
    tools: "Product/Process Search , 2't' test",
    rootCause: 'Confirmed',
  },
  {
    source: 'Paper/PE shim peel off (Paper accumulated between the flange)	',
    tools: 'Gemba Observation ,',
    rootCause: 'Confirmed',
  },
];

export const MeasureAnalysisPhase = ({
  ma,
  isReport = false,
  opportunity,
}: {
  ma: any;
  isReport?: boolean;
  opportunity: any;
}) => {
  const router = useRouter();
  const userId = getCookie('ci-portal.user_id');
  return (
    <div className="py-4">
      <Card className={cn('bg-white', isReport ? 'border-none shadow-none' : 'border-gray-500/20')}>
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Measure Analysis Phase</div>
          <div className="flex gap-4">
            {!isReport && (
              <Button
                variant="ghost-1"
                size={'sm'}
                className="gap-1"
                onClick={() => router.push(`${BASEURL}/files/download/${ma.document}`)}
              >
                <RiDownload2Fill className="h-3 w-3" /> Download Document
              </Button>
            )}
            {!isReport &&
              opportunity.project_leader._id === userId &&
              opportunity.status !== 'Opportunity Completed' && (
                <EditMeasureAnalysis opportunities={opportunity} />
              )}
          </div>
        </div>
        <CardContent className="overflow-y-auto p-4 pt-0">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center text-xs">
                  Suspected Source of Variation{' '}
                </TableHead>
                <TableHead className="w-[600px] text-center text-xs">Tools</TableHead>
                <TableHead className="text-center text-xs">Identified Root Cause</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ma.data.map((item: any) => (
                <TableRow key={item.source}>
                  <TableCell className="text-center text-xs">{item.suspected_source}</TableCell>
                  <TableCell className="flex w-[600px] flex-wrap justify-center gap-2 text-center text-xs">
                    {item.tools.map((i: any) => (
                      <Badge variant={'ghost'} key={i}>
                        {i}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell className="text-center text-xs">{item.root_cause}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
