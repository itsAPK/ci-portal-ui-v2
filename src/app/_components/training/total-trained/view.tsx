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
import { AddCumulativeTraining } from './add';
import { getCookie } from 'cookies-next';
import { RiMoneyRupeeCircleFill, RiPresentationFill } from '@remixicon/react';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { DeleteCumulativeTraining } from './delete';
export const CumulativeTrainingView = () => {
  const [open, setOpen] = useState(false);
  const role = getCookie('ci-portal.role');
  const belts = useQuery({
    queryKey: ['total-training-tarined'],
    queryFn: async (): Promise<any> => {
      return await api
        .post('/training/cumulative/export', {
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

  console.log(belts.data);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'} className="gap-2">
          <RiPresentationFill className="h-4 w-4" /> Trained Certified Belts
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl min-h-[300px] max-h-[80vh] overflow-y-auto max-w-[1005px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Trained Certified Belts</DialogTitle>
        </DialogHeader>
        {role === 'admin' && (
          <div className="flex justify-end pt-5">
            <AddCumulativeTraining />
          </div>
        )}

        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="rounded-tl-xl bg-primary text-center text-xs">Year</TableHead>
                <TableHead className="bg-primary text-center text-xs">
                  Total Black Certified Belt
                </TableHead>
                <TableHead className="bg-primary text-center text-xs">
                  Total Green Certified Belt
                </TableHead>
                <TableHead className="bg-primary text-center text-xs rounded-tr-xl"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {belts.data && belts.data.data.length > 0 ? (
                belts.data.data.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="text-center text-xs" >
                      {item.year}
                    </TableCell>
                    <TableCell className="text-center text-xs">
                      {item.total_black_belt}
                    </TableCell>
                    <TableCell className="text-center text-xs">
                      {item.total_green_belt}
                    </TableCell>
                    <TableCell className="text-center text-xs">
                        <DeleteCumulativeTraining id={item._id.$oid} />
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
