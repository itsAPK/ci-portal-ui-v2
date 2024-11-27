

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export const trainingColumns = (): ColumnDef<any>[] => {
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
          accessorKey: "department",
          header: ({ column }) => (
            <div className="text-xs flex  justify-center font-medium text-center ">
              Department
            </div>
          ),
        },
        {
            accessorKey: "grade",
            header: ({ column }) => (
              <div className="text-xs flex  justify-center font-medium text-center ">
                Grade
              </div>
            ),
          },
          {
            accessorKey: "work_location",
            header: ({ column }) => (
              <div className="text-xs flex  justify-center font-medium text-center ">
                Work Location
              </div>
            ),
          },
          {
            accessorKey: "bussiness_unit",
            header: ({ column }) => (
              <div className="text-xs flex  justify-center font-medium text-center ">
                Bussiness Unit
              </div>
            ),
          },
          {
            accessorKey: "division",
            header: ({ column }) => (
              <div className="text-xs flex  justify-center font-medium text-center ">
                Division
              </div>
            ),
          },
          {
            accessorKey: "company",
            header: ({ column }) => (
              <div className="text-xs flex  justify-center font-medium text-center ">
                Company
              </div>
            ),
          },
          {
            accessorKey: "batch",
            header: ({ column }) => (
              <div className="text-xs flex  justify-center font-medium text-center ">
                Batch
              </div>
            ),
          },
          {
            accessorKey: "year",
            header: ({ column }) => (
              <div className="text-xs flex  justify-center font-medium text-center ">
                Year
              </div>
            ),
          },
          {
            accessorKey: "trainer",
            header: ({ column }) => (
              <div className="text-xs flex  justify-center font-medium text-center ">
                Trainer
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