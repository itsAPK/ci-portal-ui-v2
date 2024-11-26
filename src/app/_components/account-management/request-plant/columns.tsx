import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export const requestPlantColumns = (): ColumnDef<any>[] => {
    return [
      {
        accessorKey: "employee_id",
        header: ({ column }) => (
          <div className="text-xs flex justify-center  font-medium text-center ">
           Employee ID
          </div>
        ),
      },
      {
          accessorKey: "employee_name",
          header: ({ column }) => (
            <div className="text-xs flex justify-center font-medium text-center ">
              Employee Name
            </div>
          ),
      },
      {
        accessorKey: "current_plant",
        header: ({ column }) => (
          <div className="text-xs flex justify-center  font-medium text-center ">
           Current Plant/Division
          </div>
        ),
      },
      {
          accessorKey: "new_plant",
          header: ({ column }) => (
            <div className="text-xs flex justify-center font-medium text-center ">
             New Plant/Division
            </div>
          ),
      },
        
       
       
   
      {
        id: "actions",
        cell: function Cell({ row }) {
        
          return (
            <div className="flex justify-center space-x-2 pl-2">
               <Button variant="outline" size={"sm"} className="rounded-[4px] text-xs">
                Approve
               </Button>
               <Button variant="outline" size={"sm"} className="rounded-[4px] text-xs">
                Reject
               </Button>
            </div>
          );
        },
      },
    ];
  };