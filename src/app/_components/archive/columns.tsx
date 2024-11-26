import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export const archiveColumns = (): ColumnDef<any>[] => {
    return [
      {
        accessorKey: "project_title",
        header: ({ column }) => (
          <div className="text-xs flex justify-center  font-medium text-center ">
           Project Title
          </div>
        ),
      },
      {
          accessorKey: "baseline",
          header: ({ column }) => (
            <div className="text-xs flex justify-center font-medium text-center ">
              Baseline
            </div>
          ),
        },
        {
          accessorKey: "target",
          header: ({ column }) => (
            <div className="text-xs flex  justify-center font-medium text-center ">
              Target
            </div>
          ),
        },
        {
            accessorKey: "result",
            header: ({ column }) => (
              <div className="text-xs flex  justify-center font-medium text-center ">
                Result
              </div>
            ),
          },
       
   
      {
        id: "actions",
        cell: function Cell({ row }) {
        
          return (
            <div className="flex justify-center space-x-2 pl-2">
               <Button variant="outline" size={"sm"} className="rounded-[4px] text-xs">
                Download
               </Button>
               <Button variant="outline" size={"sm"} className="rounded-[4px] text-xs">
                Delete
               </Button>
            </div>
          );
        },
      },
    ];
  };