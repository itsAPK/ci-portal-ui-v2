import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TemplateForm } from "./form";
import { RiAddCircleFill } from "@remixicon/react";

export const AddTemplate = () => {
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
        <Button size={'sm'}><RiAddCircleFill className="mr-2 h-4 w-4" /> Upload Template</Button>
        </DialogTrigger>
        <DialogContent className="overflow-y-auto min-w-xl max-w-[435px] ">
          <DialogHeader>
            <DialogTitle>Upload Template</DialogTitle>
          </DialogHeader>
          <TemplateForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>)}