import { PencilIcon } from 'lucide-react';
import { RiAddCircleFill, RiDeleteBin2Fill, RiEyeFill } from '@remixicon/react';
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
import { Documents } from './documents';
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

export const ControlPhase = () => {
  return (
    <div className="py-4">
      <Card className="border-gray-500/20 bg-white">
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Control Phase</div>
          <Button variant="ghost-1" size={'sm'} className="gap-1">
            <RiAddCircleFill className="h-3 w-3" /> Add
          </Button>
        </div>
        <CardContent className="overflow-y-auto p-4 pt-0">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center text-xs">Confirmed Causes </TableHead>
                <TableHead className="text-center text-xs">Control Mechanism Implemented	</TableHead>
                <TableHead className="text-center text-xs">Tools                </TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.source}>
                  <TableCell className="text-center text-xs">{item.source}</TableCell>
                  <TableCell className="text-center text-xs">{item.tools}</TableCell>
                  <TableCell className="text-center text-xs">{item.rootCause}</TableCell>
                  <TableCell className="mt-1 flex justify-end gap-2">
                    <Button variant="ghost-1" className="flex h-6 gap-2" size={'sm'}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <PencilIcon className="h-3 w-3" />
                          </TooltipTrigger>
                          <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Button>

                    <Button
                      variant="ghost-1"
                      size={'sm'}
                      className="flex h-6 gap-2 border-red-500 bg-red-500/40 hover:bg-red-500/60"
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <RiDeleteBin2Fill className="h-3 w-3" />
                          </TooltipTrigger>
                          <TooltipContent>Delete</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Documents />
    </div>
  );
};
