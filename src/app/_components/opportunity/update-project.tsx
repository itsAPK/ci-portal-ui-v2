'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AlertTriangle, EditIcon, PencilIcon, UploadIcon } from 'lucide-react';
import api from '@/lib/api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { processValues } from '@/lib/utils';
import { OpportunityForm } from './form';
import { OpportunitySchema } from '@/schema/opportunity';
import { RiEditBoxFill } from '@remixicon/react';

export const UpdateProject = ({ opportunity }: { opportunity: any }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const [impactScore, setImpactScore] = useState<number>(0);
  const editOpportunity = useMutation({
    mutationKey: ['edit-opportunity'],
    mutationFn: async (data: OpportunitySchema) => {
      return await api
        .patch(`/opportunity/${opportunity._id.$oid}`, {
            savings_type : data.savings_type,
            estimated_savings: data.estimated_savings
            ? Number(data.estimated_savings.replace(/,/g, ''))
            : null,
          status: 'Details Updated',
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
      toast.success('Opportunity Updated successfully', {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
      setOpen(false);
      queryClient.refetchQueries({
        queryKey: ['get-opportunities'],
      });
    },
  });

  const handleSubmit = async (data: OpportunitySchema) => {
    await editOpportunity.mutateAsync(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size={'sm'} className="gap-2">
          <RiEditBoxFill className="h-4 w-4" /> <span className="-mt-[1px]">Update Project</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl h-[90vh] max-w-[800px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Opportunity</DialogTitle>
        </DialogHeader>
        <OpportunityForm
          onSubmit={handleSubmit}
          setImpactScore={setImpactScore}
          defaultValues={processValues({
            ...opportunity,
            plant: opportunity.plant ? opportunity.plant._id.$oid : opportunity.plant,
          })}
          mode="update"
        />
      </DialogContent>
    </Dialog>
  );
};
