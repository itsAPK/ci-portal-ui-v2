import { DialogHeader ,Dialog, DialogTrigger, DialogContent, DialogTitle} from "@/components/ui/dialog";
import { UploadIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OpportunityForm } from "../../opportunity/form";
import { RiAddCircleFill } from '@remixicon/react';
import { ToolsForm } from "./tools-form";
export const AddTools = () => {
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
    return ( <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button size={'sm'}><RiAddCircleFill className="mr-2 h-4 w-4" /> Add Tools</Button>
        </DialogTrigger>
        <DialogContent className="overflow-y-auto min-w-xl max-w-[425px] h-[90vh] ">
          <DialogHeader>
            <DialogTitle>Add Tools</DialogTitle>
          </DialogHeader>
          <ToolsForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>)}