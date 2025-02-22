'use client';
import { DialogHeader } from '@/components/ui/dialog';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AddCumulative } from './add';
import { getCookie } from 'cookies-next';
import { RiShapeFill, RiPresentationFill } from '@remixicon/react';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { DeleteCumulativeArchive } from './delete';
export const CumulativeArchives = () => {
  const [open, setOpen] = useState(false);
  const role = getCookie('ci-portal.role');
  const cumulatives = useQuery({
    queryKey: ['total-cumulative'],
    queryFn: async (): Promise<any> => {
      return await api
        .post('/archive/cumulative/export', {
          filter: [
            {
              $sort : {year : 1}
            }
          ],
        })
        .then((res) => {
            if (!res.data.success) {
              throw new Error(res.data.message);
            }
            return res.data.data;
          })
          .catch((err) => {
            throw err;
          })}
  });

  console.log(cumulatives.data);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'} className="gap-2">
          <RiShapeFill className="h-4 w-4" /> Cumulatives
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl min-h-[300px] max-h-[80vh] overflow-y-auto max-w-[1005px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cumulatives</DialogTitle>
        </DialogHeader>
        {role === 'admin' && (
          <div className="flex justify-end pt-5">
            <AddCumulative />
          </div>
        )}

        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="rounded-tl-xl bg-primary text-center text-xs">Year</TableHead>
                <TableHead className="bg-primary text-center text-xs">
                  No. of Projects
                </TableHead>
                <TableHead className="bg-primary text-center text-xs">
                  Cumulative
                </TableHead>
                <TableHead className="bg-primary text-center text-xs rounded-tr-xl"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cumulatives.data && cumulatives.data.data.length > 0 ? (
                cumulatives.data.data.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="text-center text-xs" >
                      {item.year}
                    </TableCell>
                    <TableCell className="text-center text-xs">
                      {item.projects}
                    </TableCell>
                    <TableCell className="text-center text-xs">
                      {item.cumulative}
                    </TableCell>
                    <TableCell className="text-center text-xs">
                        <DeleteCumulativeArchive id={item._id.$oid} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-center text-xs" colSpan={10}>
                    No Record Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
