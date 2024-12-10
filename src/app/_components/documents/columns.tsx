import { Button } from "@/components/ui/button";
import { Template } from "@/schema/template";
import { ColumnDef } from "@tanstack/react-table";
import { RiDeleteBin6Fill, RiDownload2Fill } from '@remixicon/react';
import { useRouter } from "next/navigation";
import { DeleteTemplate } from "./delete";
export const templateColumns = (): ColumnDef<Template>[] => {
    return [
      {
        accessorKey: "name",
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
          accessorKey: "created_at",
          header: ({ column }) => (
            <div className="text-xs flex  justify-center font-medium text-center ">
              Date of Upload
            </div>
          ),
          cell: ({ row }) => {
            return new Date(row.original.created_at).toDateString();
          }
        },
        
   
      {
        id: "actions",
        cell: function Cell({ row }) {
        
          return (
            <div className="flex justify-center space-x-2 pl-2">
               <Button variant="edit" size={"sm"} className="gap-2 text-xs">
         <RiDownload2Fill className="mr-2 h-4 w-4" /> Download
               </Button>
               <DeleteTemplate id={row.original._id} />
            </div>
          );
        },
      }, 
    ];
  };