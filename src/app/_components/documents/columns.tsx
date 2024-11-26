import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export const templateColumns = (): ColumnDef<any>[] => {
    return [
      {
        accessorKey: "title",
        header: ({ column }) => (
          <div className="text-xs flex justify-center  font-medium text-center ">
           Template Title
          </div>
        ),
      },
      {
          accessorKey: "author",
          header: ({ column }) => (
            <div className="text-xs flex justify-center font-medium text-center ">
              Author
            </div>
          ),
        },
        {
          accessorKey: "date",
          header: ({ column }) => (
            <div className="text-xs flex  justify-center font-medium text-center ">
              Date of Upload
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