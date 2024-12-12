"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AlertTriangle, EditIcon, UploadIcon } from "lucide-react";
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
  const addOpportunity = useMutation({
    mutationKey: ["add-opportunity"],
    mutationFn: async (data: OpportunitySchema) => {
      return await api.post("/opportunity", {
        ...data,
        project_score : impactScore,
        project_impact : impactScore < 50 ? 'Low' : impactScore < 80 ? 'Medium' : 'High',
      }).then((res) => {
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
        <OpportunityForm onSubmit={handleSubmit} setImpactScore={setImpactScore} />
      </DialogContent>
    </Dialog>
  );
};