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
import { Settings2Icon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AddActionPlan } from './add';
import { getCookie } from 'cookies-next';
import { DeleteActionPlan } from './delete';
import { EditActionPlan } from './edit';

export const ActionPlan = ({ opportunities }: { opportunities: any }) => {
  const [open, setOpen] = useState(false);
  const role = getCookie('ci-portal.role');
  const plant = getCookie('ci-portal.plant');
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size={'sm'} className="gap-2">
          <Settings2Icon className="h-4 w-4" /> Action Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl min-h-[300px] max-w-[1005px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Action Plan</DialogTitle>
        </DialogHeader>
        {(role === 'admin' ||
          ((role === 'ci_team' || role === 'ci_head') && plant === opportunities.plant)) && (
          <div className="flex justify-end pt-5">
            <AddActionPlan opportunities={opportunities} />
          </div>
        )}

        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="rounded-tl-xl bg-primary text-center text-xs">
                  Created At
                </TableHead>
                <TableHead className="bg-primary text-center text-xs">Action Points</TableHead>
                <TableHead className="bg-primary text-center text-xs">Status</TableHead>
                <TableHead className="bg-primary text-center text-xs">Traget</TableHead>
                <TableHead className="bg-primary text-center text-xs">Findings</TableHead>
                <TableHead className="rounded-tr-xl bg-primary text-center text-xs"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunities.action_plan.length > 0 ? (
                opportunities.action_plan.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="text-center text-xs">
                      {new Date(item.created_at.$date).toDateString()}
                    </TableCell>
                    <TableCell className="text-center text-xs">{item.action}</TableCell>
                    <TableCell className="text-center text-xs">
                      <Badge
                        variant={
                          item.status === 'In Process'
                            ? 'destructive'
                            : item.status === 'Completed'
                              ? 'success'
                              : item.status === 'Referred'
                                ? 'leaf'
                                : 'ghost'
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-xs">
                      {item.target_date.$date
                        ? new Date(item.target_date.$date).toDateString()
                        : '---'}
                    </TableCell>
                    <TableCell className="text-center text-xs">
                      {item.findings ? item.findings : '---'}
                    </TableCell>
                    <TableCell className="flex gap-1">
                      {role !== 'employee' &&
                        role !== 'project_leader' &&
                        (role === 'admin' || plant === opportunities.plant) && (
                          <>
                            <EditActionPlan actionPlan={item} />
                            <DeleteActionPlan actionPlanId={item._id.$oid} />
                          </>
                        )}
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
