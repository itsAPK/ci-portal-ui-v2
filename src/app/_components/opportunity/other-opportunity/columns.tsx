import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ArrowDown, EyeIcon, PencilIcon, Settings2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DeleteOpportunity } from '../delete';
import { getCookie } from 'cookies-next';
import { EditOpportunity } from './edit';
import { ActionPlan } from '../action-plan/action-plan';
import { formatToIndianNumber } from '@/lib/utils';
import { MonthlySavings } from '../monthly-savings/monthly-savings';
import { AddTeamMembers } from '../team-members/add-team-members';

export const opportunityColumns = (): ColumnDef<any>[] => {
  return [
    {
      accessorKey: 'opportunity_id',
      header: ({ column }) => (
        <div className="flex w-[200px] justify-center text-center text-xs font-medium">
          Project ID
        </div>
      ),
      cell: ({ row }) => {
        return (
          <Link
            href={`/opportunity/${row.original._id.$oid}`}
            className="text-center text-xs font-bold text-gray-500 underline"
          >
            {row.original.opportunity_id}
          </Link>
        );
      },
    },
    {
      accessorKey: 'company',
      header: ({ column }) => (
        <div className="flex w-[150px] justify-center text-center text-xs font-medium">Company</div>
      ),
      cell: ({ cell }) => ((cell.getValue() as any) ? cell.getValue() : '---'),
    },
    {
      accessorKey: 'bussiness_unit',
      header: ({ column }) => (
        <div className="flex w-[150px] justify-center text-center text-xs font-medium">
          Division
        </div>
      ),
      cell: ({ cell }) => ((cell.getValue() as any) ? cell.getValue() : '---'),
    },
    {
      accessorKey: 'plant.name',
      header: ({ column }) => (
        <div className="flex w-[150px] justify-center text-center text-xs font-medium">Plant</div>
      ),
      cell: ({ cell }) => ((cell.getValue() as any) ? cell.getValue() : '---'),
    },
    {
      accessorKey: 'department',
      header: ({ column }) => (
        <div className="flex w-[150px] justify-center text-center text-xs font-medium">
          Department
        </div>
      ),
      cell: ({ cell }) => ((cell.getValue() as any) ? cell.getValue() : '---'),
    },
    {
      accessorKey: 'statement',
      header: ({ column }) => (
        <div className="flex w-[300px] justify-center text-center text-xs font-medium">
          Problem Statement
        </div>
      ),
      cell: ({ cell }) => ((cell.getValue() as any) ? cell.getValue() : '---'),
    },
    {
      accessorKey: 'category',
      header: ({ column }) => (
        <div className="flex w-[150px] justify-center text-center text-xs font-medium">
          Category
        </div>
      ),
      cell: ({ cell }) => ((cell.getValue() as any) ? cell.getValue() : '---'),
    },
    {
      accessorKey: 'sub_category',
      header: ({ column }) => (
        <div className="flex w-[150px] justify-center text-center text-xs font-medium">
          Sub Category
        </div>
      ),
      cell: ({ cell }) => ((cell.getValue() as any) ? cell.getValue() : '---'),
    },

    {
      accessorKey: 'start_date',
      header: ({ column }) => (
        <div className="flex w-[150px] justify-center text-center text-xs font-medium">
          Start Date
        </div>
      ),
      cell: ({ cell, row }) =>
        (cell.getValue() as any) ? new Date(row.original.start_date.$date).toDateString() : '---',
    },
    {
        accessorKey: 'end_date',
        header: ({ column }) => (
          <div className="flex w-[150px] justify-center text-center text-xs font-medium">
            Completed
          </div>
        ),
        cell: ({ cell, row }) =>
          (cell.getValue() as any) ? new Date(row.original.end_date.$date).toDateString() : '---',
    },
    {
      accessorKey: 'project_leader.employee_id',
      header: ({ column }) => (
        <div className="flex w-[150px] justify-center text-center text-xs font-medium">PL ID</div>
      ),
      cell: ({ cell }) => {
        return (cell.getValue() as any) ? cell.getValue() : '---';
      },
    },
    {
      accessorKey: 'project_leader.name',
      header: ({ column }) => (
        <div className="flex w-[150px] justify-center text-center text-xs font-medium">PL Name</div>
      ),
      cell: ({ cell }) => ((cell.getValue() as any) ? cell.getValue() : '---'),
    },
    {
      accessorKey: 'estimated_savings',
      header: ({ column }) => (
        <div className="flex w-[150px] justify-center text-center text-xs font-medium">
          Estimated Savings
        </div>
      ),
      cell: ({ cell }) =>
        (cell.getValue() as any) ? `Rs ${formatToIndianNumber(cell.getValue() as any)}` : '---',
    },

    {
      id: 'actions',
      cell: function Cell({ row }) {
        const router = useRouter();
        const role = getCookie('ci-portal.role');
        const plant = getCookie('ci-portal.plant');
        const userId = getCookie('ci-portal.user_id');
    
        return (
          <div className="flex justify-end space-x-2 pl-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="rounded-[4px] text-xs" variant="ghost-1" size={'sm'}>
                  <div className="px-2 text-start text-xs">More</div>
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col items-start">
                <DropdownMenuItem className="flex gap-2" asChild>
                  <Button
                    variant="link"
                    size={'sm'}
                    className="gap-2 text-xs"
                    onClick={() => router.push(`/opportunity/${row.original._id.$oid}`)}
                  >
                    <EyeIcon className="h-4 w-4" /> View
                  </Button>
                </DropdownMenuItem>
              
                {role === 'admin' && (
                  <DropdownMenuItem className="flex gap-2" asChild>
                    <DeleteOpportunity id={row.original._id.$oid} />
                  </DropdownMenuItem>
                )}
                {role === 'admin' && (
                  <DropdownMenuItem className="flex gap-2" asChild>
                    <AddTeamMembers opportunity={row.original} />
                  </DropdownMenuItem>
                )}
                {
                  role === 'admin' && (
                    <DropdownMenuItem className="flex gap-2" asChild>
                      <EditOpportunity opportunity={row.original} />
                    </DropdownMenuItem>
                  )
                }

                <DropdownMenuItem className="flex gap-2" asChild>
                  <ActionPlan opportunities={row.original} />
                </DropdownMenuItem>

                {role === 'admin' && row.original.status === 'Opportunity Completed' && (
                  <DropdownMenuItem className="flex gap-2" asChild>
                    <MonthlySavings opportunities={row.original} />
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};
