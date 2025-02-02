

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { EditTraining } from "./edit";
import { DeleteTraining } from "./delete";
import { getCookie } from "cookies-next";

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
          accessorKey: "name",
          header: ({ column }) => (
            <div className="text-xs flex justify-center font-medium text-center ">
              Employee Name
            </div>
          ),
        },
        {
          accessorKey: "category",
          header: ({ column }) => (
            <div className="text-xs flex  justify-center font-medium text-center ">
              Category
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
          accessorKey: "bussiness_unit",
          header: ({ column }) => (
            <div className="text-xs flex  justify-center font-medium text-center ">
             Division
            </div>
          ),
        },
        {
          accessorKey: "plant",
          header: ({ column }) => (
            <div className="text-xs flex  justify-center font-medium text-center ">
              Plant
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
            accessorKey: "working_location",
            header: ({ column }) => (
              <div className="text-xs flex  justify-center font-medium text-center ">
                Work Location
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
         const role = getCookie('vrkjobs.role')
          return (
            <div className="flex justify-center space-x-2 pl-2">
              {role === 'admin' && <><EditTraining training={row.original} /><DeleteTraining id={row.original._id.$oid} /></>}
            </div>
          );
        },
      },
    ];
  };