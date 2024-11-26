import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export const toolsColumns = (): ColumnDef<any>[] => {
    return [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <div className="text-xs flex justify-center  font-medium text-center ">
           Tools
          </div>
        ),
      },
      {
          accessorKey: "category",
          header: ({ column }) => (
            <div className="text-xs flex justify-center font-medium text-center ">
              Category
            </div>
          ),
        },
        {
          accessorKey: "status",
          header: ({ column }) => (
            <div className="text-xs flex  justify-center font-medium text-center ">
              Status
            </div>
          ),
        },
       
   
      {
        id: "actions",
        cell: function Cell({ row }) {
        
          return (
            <div className="flex justify-center space-x-2 pl-2">
               <Button variant="outline" size={"sm"} className="rounded-[4px] text-xs">
                Edit
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