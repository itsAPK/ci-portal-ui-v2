'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AlertTriangle, EditIcon, Loader2, UploadIcon, Users2Icon } from 'lucide-react';
import api from '@/lib/api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

import { OpportunityForm } from './form';
import { OpportunitySchema } from '@/schema/opportunity';
import { AutoComplete, Option } from '@/components/ui/autocomplete';
import { cn } from '@/lib/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

export const AssignProjectLeader = ({ opportunity }: { opportunity: any }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [employeeId, setEmployeeId] = useState<Option>();

  const assignProjectLeader = useMutation({
    mutationKey: ['assign-project-leader'],
    mutationFn: async () => {
      if (!employeeId) {
        throw new Error('Employee is not selected');
      }
      console.log(employeeId);
      return await api
        .post(`/opportunity/assign-project-leader`, {
          opportunity_id: opportunity._id.$oid,
          employee_id: employeeId.value,
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data;
        });
    },
    onError: (error) => {
      toast.error(error.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: () => {
      setOpen(false);
      toast.success('Project Leader Assigned successfully');
      queryClient.refetchQueries({
        queryKey: ['get-opportunities'],
      });
    },
  });

  const employee = useMutation({
    mutationKey: ['get-employee'],
    mutationFn: async (search: string) => {
      return await api
        .post(`/employee/export`, {
          filter: [
            {
              $match: {
                plant: { $eq: opportunity.plant.name },
                $or: [
                  { employee_id: { $regex: search, $options: 'i' } },
                  { name: { $regex: search, $options: 'i' } },
                ],
              },
            },
          ],
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data.data.data;
        });
    },
    onError: (error) => {
      toast.error(error.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: () => {},
  });

  const handleSubmit = async () => {
    await assignProjectLeader.mutateAsync();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size={'sm'} className="gap-2">
          <Users2Icon className="h-4 w-4" />{' '}
          <span className="-mt-[1px]">Assign Project Leader</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl h-[240px] max-w-[460px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign Project Leader</DialogTitle>
        </DialogHeader>
        <Popover modal>
          <PopoverTrigger asChild>
            <button
              type="button"
              role="combobox"
              className={cn(
                'flex h-12 items-center rounded-md border border-primary bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-[#099bab] focus-visible:ring-1 focus-visible:ring-[#099bab] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              )}
            >
              {employeeId ? employeeId.label : 'Select Employee'}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="h-full bg-white">
            <AutoComplete
              options={
                employee.data
                  ? employee.data.map((i: any) => ({
                      value: String(i._id.$oid),
                      label: `${i.employee_id} - ${i.name}`,
                    }))
                  : []
              }
              onSearch={async (e) => await employee.mutateAsync(e)}
              value={employeeId}
              emptyMessage="No Employee Found."
              isLoading={employee.isPending}
              onValueChange={(e) => {
                setEmployeeId(e);
              }}
            />
          </PopoverContent>
        </Popover>
        <DialogFooter>
          <Button onClick={handleSubmit} size="lg" className="w-[200px] gap-3">
            {assignProjectLeader.isPending && <Loader2 className="h-4 w-3" />} Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
