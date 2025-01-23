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
import { AddMonthlySavings } from './add';
import { getCookie } from 'cookies-next';
import { RiMoneyRupeeCircleFill } from '@remixicon/react';

export const MonthlySavings = ({ opportunities }: { opportunities: any }) => {
  const [open, setOpen] = useState(false);
  const role = getCookie('ci-portal.role');
  const plant = getCookie('ci-portal.plant');
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size={'sm'} className="gap-2">
          <RiMoneyRupeeCircleFill className="h-4 w-4" /> Monthly Savings Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl min-h-[300px] max-w-[1005px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Monthly Savings</DialogTitle>
        </DialogHeader>
        {(role === 'admin' ||
          ((role === 'ci_team' || role === 'ci_head') && plant === opportunities.plant)) && (
          <div className="flex justify-end pt-5">
            <AddMonthlySavings opportunities={opportunities} />
          </div>
        )}

        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="rounded-tl-xl bg-primary text-center text-xs">Year</TableHead>
                <TableHead className="bg-primary text-center text-xs">Month</TableHead>
                <TableHead className="bg-primary text-center text-xs">Savings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunities.monthly_savings.length > 0 ? (
                opportunities.monthly_savings.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="text-center text-xs">{item.year}</TableCell>
                    <TableCell className="text-center text-xs">{item.month}</TableCell>
                    <TableCell className="text-center text-xs">
                      {`₹ ${item.savings}`}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="flex items-center justify-center" colSpan={10}>
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
