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

export const AddOpportunity = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();
//   const addSchedule = useMutation({
//     mutationKey: ["add-schedule"],
//     mutationFn: async (data: ScheduleSchema) => {
//       return await api.post("/schedule", data).then((res) => {
//         if (!res.data.success) throw new Error(res.data.message);
//         return res.data;
//       });
//     },
//     onError: (error) => {
//       toast.error(error.message, {
//         icon: <AlertTriangle className="h-4 w-4" />,
//       });
//     },
//     onSuccess: () => {

//     setOpen(false);
//     toast.success("Schedule added successfully", {
//         icon: <AlertTriangle className="h-4 w-4" />,
//       });
//     router.push(`${pathname}?${params.toString()}`);
//     setOpen(false);
//     },
//   });

  const handleSubmit = async (data: any) => {
    
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
        <OpportunityForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};