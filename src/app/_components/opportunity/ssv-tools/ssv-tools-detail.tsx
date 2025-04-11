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
import { EditSSVTools } from './edit';
import { getCookie } from 'cookies-next';

export const SSVTools = ({
  ssvTools,
  isReport = false,
  opportunity,
}: {
  ssvTools: any;
  isReport?: boolean;
  opportunity: any;
}) => {
  const router = useRouter();
  const userId = getCookie('ci-portal.user_id');
  return (
    <div className="py-4">
      <Card className={cn('bg-white', isReport ? 'border-none shadow-none' : 'border-gray-500/20')}>
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">SSV's & Tools</div>
          <div className="felx gap-4">
            {!isReport && ssvTools.document && (
              <Button
                variant="ghost-1"
                size={'sm'}
                className="gap-1"
                onClick={() => router.push(`${BASEURL}/files/download/${ssvTools.document}`)}
              >
                <RiDownload2Fill className="h-3 w-3" /> Download Document
              </Button>
            )}
            {!isReport &&
              opportunity.project_leader._id === userId &&
              opportunity.status !== 'Opportunity Completed' && (
                <EditSSVTools opportunities={opportunity} />
              )}
          </div>
        </div>
        <CardContent className="overflow-y-auto p-4 pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center text-xs">
                  Suspected Source of Variation{' '}
                </TableHead>
                <TableHead className="w-[400px] text-center text-xs">Tools</TableHead>
                <TableHead className="text-center text-xs">Type of SSV</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ssvTools.data.map((item: any) => (
                <TableRow key={item._id}>
                  <TableCell className="text-center text-xs">{item.suspected_source}</TableCell>
                  <TableCell className="flex w-[600px] flex-wrap justify-center gap-2 text-center text-xs">
                    {item.tools.map((i: any) => (
                      <Badge variant={'ghost'} key={i}>
                        {i}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell className="text-center text-xs">{item.type_of_ssv}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
