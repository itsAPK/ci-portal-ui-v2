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
import { MonthlySavingsRow } from './monthly-savings-row';

export const MonthlySavings = ({ opportunities }: { opportunities: any }) => {
  const [open, setOpen] = useState(false);
  const role = getCookie('ci-portal.role');
  const plant = getCookie('ci-portal.plant');
  const userId = getCookie('ci-portal.user_id');
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
                <TableHead className="bg-primary text-center text-xs">Actual</TableHead>
                <TableHead className="bg-primary text-center text-xs"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunities.monthly_savings.length > 0 ? (
                opportunities.monthly_savings.map((item: any, index: number) => (
                  <MonthlySavingsRow
                    item={item}
                    csHeadId={
                      opportunities.plant.cs_head ? opportunities.plant.cs_head._id.$oid : ''
                    }
                    key={index}
                    opportunityId={opportunities._id.$oid}
                    category={opportunities.category}
                  />
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
