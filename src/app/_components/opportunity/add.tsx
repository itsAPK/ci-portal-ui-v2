"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle, EditIcon, UploadIcon } from "lucide-react";
import api from "@/lib/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { OpportunityForm } from "./form";
import { OpportunitySchema } from "@/schema/opportunity";

export const AddOpportunity = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const [impactScore, setImpactScore] = useState<number>(0);
  const [file, setFile] = useState<File[] | null>([]);
  const addOpportunity = useMutation({
    mutationKey: ["add-opportunity"],
    mutationFn: async (data: OpportunitySchema) => {

      if (data.category !== 'Black Belt' && (!file || file.length === 0)) {
       throw new Error("Please upload a document for non-Black Belt categories.")
      }
      

      const res = await api.post("/opportunity", {
        ...data,
        project_score : impactScore.toFixed(3),
        project_impact : impactScore < 50 ? 'Low' : impactScore < 80 ? 'Medium' : 'High',
      }).then((res) => {
        if (!res.data.success) throw new Error(res.data.message);
        return res.data;
      });


      if (file && file.length > 0) {
        const formData = new FormData();
        formData.append('file', file![0]);
        await api
          .post(`/opportunity/upload/${res.data._id}`, formData)
          .then((res) => {
            return res.data;
          })
          .then((res) => {
            toast.success('Document uploaded successfully', {
              icon: <CheckCircle className="h-4 w-4" />,
            });
            return res.data;
          });
      }

      return res
    },
    onError: (error) => {
      toast.error(error.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: () => {

    setOpen(false);
    toast.success("Opportunity Created successfully", {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    setOpen(false);
    queryClient.refetchQueries(
      {
        queryKey: ["get-opportunities"],
      }
    );
    },
  });

  const handleSubmit = async (data: OpportunitySchema) => {    
    await addOpportunity.mutateAsync(data);
    
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button size={'sm'}><UploadIcon className="mr-2 h-4 w-4" /> Add Opportunity</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto min-w-xl max-w-[800px] h-[90vh] ">
        <DialogHeader>
          <DialogTitle>Add Opportunity</DialogTitle>
        </DialogHeader>
        <OpportunityForm onSubmit={handleSubmit} file={file} setFile={setFile} setImpactScore={setImpactScore} />
      </DialogContent>
    </Dialog>
  );
};