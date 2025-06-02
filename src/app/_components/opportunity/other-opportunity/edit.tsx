'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AlertTriangle, CheckCircle, EditIcon, PencilIcon, UploadIcon } from 'lucide-react';
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

export const EditOpportunity = ({opportunity}: {opportunity: any}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const [impactScore, setImpactScore] = useState<number>(opportunity.project_score);
  const [projectLeader, setProjectLeader] = useState<any>(opportunity.project_leader._id.$oid);
  const [file, setFile] = useState<File[] | null>([]);
  const [a3File, setA3File] = useState<File[] | null>([]);
  const addOpportunity = useMutation({
    mutationKey: ['edit-otjer-opportunity'],
    mutationFn: async (data: OpportunitySchema) => {
    
    

      const res = await api
        .patch(`/opportunity/${opportunity._id.$oid}`, {
          ...data,
          estimated_savings: Number(data.estimated_savings?.replace(/,/g, '')),
          project_score: impactScore.toFixed(3),
          project_impact: impactScore < 50 ? 'Low' : impactScore < 80 ? 'Medium' : 'High',
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data;
        });

      if (projectLeader) {
        await api
          .post(`/opportunity/assign-project-leader`, {
            opportunity_id: opportunity._id.$oid,
            employee_id: projectLeader.value,
          })
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.message);
            return res.data;
          });
      } 

     
      

      

      return res;
    },
    onError: (error) => {
      toast.error(error.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: () => {
      toast.success('Opportunity Updated successfully', {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
     setOpen(false);
      queryClient.refetchQueries({
        queryKey: ['get-other-opportunities'],
      });
    },
  });

  const handleSubmit = async (data: OpportunitySchema) => {
    await addOpportunity.mutateAsync(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size={'sm'} className="gap-2">
          <PencilIcon className="h-4 w-4" /> <span className='-mt-[1px] '>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl h-[90vh] max-w-[800px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Opportunity</DialogTitle>
        </DialogHeader>
        <OpportunityForm
          onSubmit={handleSubmit}
          file={file}
          setFile={setFile}
          setImpactScore={setImpactScore}
          projectLeader={projectLeader}
          setProjectLeader={setProjectLeader}
          setA3File={setA3File}
          a3File={a3File}
          mode = {'update'}
          defaultValues={processValues({...opportunity, plant : opportunity.plant ? opportunity.plant._id.$oid : opportunity.plant})}
        />
      </DialogContent>
    </Dialog>
  );
};
