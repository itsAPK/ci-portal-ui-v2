import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { RiDeleteBin6Fill, RiDownload2Fill } from '@remixicon/react';
import { useRouter } from "next/navigation";
import { Archive } from "@/schema/archive";
import { BASEURL } from "@/lib/api";
import { DeleteArchive } from "./delete";
export const archiveColumns = (): ColumnDef<Archive>[] => {
    return [
      {
        accessorKey: "company",
        header: ({ column }) => (
          <div className="text-xs flex justify-center w-[200px] items-center  font-medium text-center "> 
            Company
          </div>
        ),
      },
      {
        accessorKey: "plant",
        header: ({ column }) => (
          <div className="text-xs flex justify-center w-[200px] font-medium text-center ">
            Plant
          </div>
        ),
      },
      {
        accessorKey: "department",
        header: ({ column }) => (
          <div className="text-xs flex justify-center w-[200px] font-medium text-center ">
            Department
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: ({ column }) => (
          <div className="text-xs flex justify-center w-[140px] font-medium text-center ">
            Category
          </div>
        ),
      },
      {
        accessorKey: "year",
        header: ({ column }) => (
          <div className="text-xs flex justify-center w-[130px]  font-medium text-center ">
            Year
          </div>
        ),
      },
      
      {
        accessorKey: "project_title",
        header: ({ column }) => (
          <div className="text-xs flex justify-center w-[200px] font-medium text-center ">
           Project Title
          </div>
        ),
      },
      {
        accessorKey: "project_leader",
        header: ({ column }) => (
          <div className="text-xs flex justify-center w-[300px] font-medium text-center ">
            Project Leader
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-xs flex justify-center w-[300px] font-medium text-center ">
            {row.original.project_leader ? `${row.original.project_leader.name} (${row.original.project_leader.employee_id})` : "---"}
          </div>
        ),
      },
      {
          accessorKey: "baseline",
          header: ({ column }) => (
            <div className="text-xs flex justify-center w-[100px] font-medium text-center ">
              Baseline
            </div>
          ),
        },
        {
          accessorKey: "target",
          header: ({ column }) => (
            <div className="text-xs flex  justify-center w-[100px] font-medium text-center ">
              Target 
            </div>
          ),
        },
        {
            accessorKey: "result",
            header: ({ column }) => (
              <div className="text-xs flex  justify-center w-[200px] font-medium text-center ">
                Result
              </div>
            ),
          },
       
   
      {
        id: "actions",
        cell: function Cell({ row }) {
        const router = useRouter();
          return (
            <div className="flex justify-center space-x-2 pl-2 pt-[3px]">
               <Button variant="edit" size={"sm"} className="text-xs gap-2" onClick={() => router.push(`${BASEURL}/files/download/${row.original.file_path}`)}>
           <RiDownload2Fill className="h-3 w-3" /> Download
               </Button>
               <DeleteArchive id={row.original._id.$oid} />
              
            </div>
          );
        },
      },
    ];
  };