'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AlertTriangle, CheckCircle, EditIcon, UploadIcon } from 'lucide-react';
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

import { OpportunityForm } from './form';
import { OpportunitySchema } from '@/schema/opportunity';

export const AddOpportunity = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const [impactScore, setImpactScore] = useState<number>(0);
  const [projectLeader, setProjectLeader] = useState<any>();
  const [file, setFile] = useState<File[] | null>([]);
  const [a3File, setA3File] = useState<File[] | null>([]);
  const addOpportunity = useMutation({
    mutationKey: ['add-opportunity'],
    mutationFn: async (data: OpportunitySchema) => {
    

      if (data.category === 'Green Belt' && (!a3File || a3File.length === 0)) {
        throw new Error('Please upload a A3 signed project charter.');
      }

      const res = await api
        .post('/opportunity', {
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
            opportunity_id: res.data._id,
            employee_id: projectLeader.value,
          })
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.message);
            return res.data;
          });
      } else {
        throw new Error('Project Leader is required');
      }

      if(a3File && a3File.length > 0) {
        const formData = new FormData();
        a3File.forEach((f) => {
          formData.append('file', f); // Use 'files' as the key for multiple files
        });

        // Await the file upload API call
        const r = await api.post(`/opportunity/upload_a3/${res.data._id}`, formData);

        // Handle success response
        toast.success('A3 Signed Project Charter uploaded successfully', {
          icon: <CheckCircle className="h-4 w-4" />,
        });

        // Optionally, handle the response data if needed
      
      }
      

      if (file && file.length > 0) {
        // Iterate over each file
    
          try {
            const formData = new FormData();
            file.forEach((f) => {
              formData.append('files', f); // Use 'files' as the key for multiple files
          });
      
            // Await the file upload API call
            const r = await api.post(`/opportunity/upload/${res.data._id}`, formData);
            
            // Handle success response
            toast.success('Document uploaded successfully', {
              icon: <CheckCircle className="h-4 w-4" />,
            });
      
            // Optionally, handle the response data if needed
            return r.data;
      
          } catch (error) {
            // Handle error (file upload failed)
            toast.error('Failed to upload document');
            console.error("Error uploading file:", error);
          }
        
      }
      

      return res;
    },
    onError: (error) => {
      toast.error(error.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: () => {
      toast.success('Opportunity Created successfully', {
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
        <Button size={'sm'}>
          <UploadIcon className="mr-2 h-4 w-4" /> Add Opportunity
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl h-[90vh] max-w-[800px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Opportunity</DialogTitle>
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
        />
      </DialogContent>
    </Dialog>
  );
};
