import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, EyeIcon, PencilIcon, Settings2Icon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import { DeleteDoctor } from "./delete-doctor";
// import { EditDoctor } from "./edit-doctor";

export const opportunityColumns = (): ColumnDef<any>[] => {
  return [
    {
      accessorKey: "oppurtunity_id",
      header: ({ column }) => (
        <div className="text-xs flex justify-center  font-medium text-center w-[150px]">
          Project ID
        </div>
      ),
    },
    {
        accessorKey: "company",
        header: ({ column }) => (
          <div className="text-xs flex justify-center font-medium text-center w-[150px]">
            Company
          </div>
        ),
      },
      {
        accessorKey: "bussiness_unit",
        header: ({ column }) => (
          <div className="text-xs flex justify-center font-medium text-center w-[150px]">
            Business Unit
          </div>
        ),
      },
      {
        accessorKey: "plant",
        header: ({ column }) => (
          <div className="text-xs flex justify-center font-medium text-center w-[150px]">
            Plant
          </div>
        ),
      },
      {
        accessorKey: "department",
        header: ({ column }) => (
          <div className="text-xs flex justify-center font-medium text-center w-[150px]">
            Department
          </div>
        ),
      },
    {
      accessorKey: "problem_statement",
      header: ({ column }) => (
        <div className="text-xs flex justify-center font-medium text-center w-[150px]">
          Problem Statement
        </div>
      ),
    },
    {
        accessorKey: "category",
        header: ({ column }) => (
          <div className="text-xs flex justify-center font-medium text-center w-[150px]">
            Category
          </div>
        ),
      },
    {
        accessorKey: "impact_socre",
    header: ({ column }) => (
      <div className="text-xs flex justify-center font-medium text-center w-[150px]">
        Impact Score
      </div>
    ),
    },
    {
        accessorKey:"problem_impact",
        header: ({ column }) => (
          <div className="text-xs flex justify-center font-medium text-center w-[150px]">
            Problem Impact
          </div>
        ),
    },
    {
      accessorKey: "project_type",
      header: ({ column }) => (
        <div className="text-xs flex justify-center font-medium text-center w-[150px]">
          Project Type
        </div>
      ),
    },
   {
    accessorKey : 'pl_id',
     header : ({ column }) => (
       <div className="text-xs flex justify-center font-medium text-center w-[150px]">
         PL ID
       </div>
     ),
   },
   {
    accessorKey : 'pl_name',
     header : ({ column }) => (
       <div className="text-xs flex justify-center font-medium text-center w-[150px]">
         PL Name
       </div>
     ),
   },
   {
    accessorKey: 'savings_type',
     header : ({ column }) => (
       <div className="text-xs flex justify-center font-medium text-center w-[150px]">
         Savings Type
       </div>
     ),
   },
   {accessorKey : "estimated_savings",
       header : ({ column }) => (
         <div className="text-xs flex justify-center font-medium text-center w-[150px]">
           Estimated Savings
         </div>
       ),
     },
     {
        accessorKey: "status",
        header: ({ column }) => (
          <div className="text-xs flex justify-center font-medium text-center w-[150px]">
            Status
          </div>
        ),
      },
     
    {
      id: "actions",
      cell: function Cell({ row }) {
        const router = useRouter();
        return (
          <div className="flex justify-end space-x-2 pl-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  className="rounded-[4px] text-xs"
                  variant="outline"
                  size={"sm"}
                >
                  <div className="px-2 text-start text-xs">More</div>
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex gap-2" onSelect={(e) => e.preventDefault()} onClick={() => router.push(`/opportunity/1`)}>
           <EyeIcon className="h-4 w-4"  /> View
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2"  onSelect={(e) => e.preventDefault()}>
                   <PencilIcon className="h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2"  onSelect={(e) => e.preventDefault()}>
                   <TrashIcon className="h-4 w-4" /> Delete
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2"  onSelect={(e) => e.preventDefault()}>
                    <Settings2Icon className="h-4 w-4" /> Action Plan
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};