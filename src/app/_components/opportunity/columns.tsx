import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ArrowDown, EyeIcon, PencilIcon, Settings2Icon, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DeleteOpportunity } from './delete';
import { getCookie } from 'cookies-next';
import { EditOpportunity } from './edit';
import { SelfAssignOpportunity } from './self-assign';
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
          Business Unit
        </div>
      ),
      cell: ({ cell }) => ((cell.getValue() as any) ? cell.getValue() : '---'),
    },
    {
      accessorKey: 'plant',
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
      accessorKey: 'project_score',
      header: ({ column }) => (
        <div className="flex w-[150px] justify-center text-center text-xs font-medium">
          Impact Score
        </div>
      ),
      cell: ({ cell }) => ((cell.getValue() as any) ? cell.getValue() : '---'),
    },
    {
      accessorKey: 'project_impact',
      header: ({ column }) => (
        <div className="flex w-[150px] justify-center text-center text-xs font-medium">
          Problem Impact
        </div>
      ),
      cell: ({ cell }) => ((cell.getValue() as any) ? cell.getValue() : '---'),
    },
    {
      accessorKey: 'project_type',
      header: ({ column }) => (
        <div className="flex w-[150px] justify-center text-center text-xs font-medium">
          Project Type
        </div>
      ),
      cell: ({ cell }) => ((cell.getValue() as any) ? cell.getValue() : '---'),
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
      accessorKey: 'savings_type',
      header: ({ column }) => (
        <div className="flex w-[150px] justify-center text-center text-xs font-medium">
          Savings Type
        </div>
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
      cell: ({ cell }) => ((cell.getValue() as any) ? cell.getValue() : '---'),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <div className="flex w-[200px] justify-center text-center text-xs font-medium">Status</div>
      ),
    },

    {
      id: 'actions',
      cell: function Cell({ row }) {
        const router = useRouter();
        const role = getCookie('ci-portal.role');
        const plant = getCookie('ci-portal.plant');
        return (
          <div className="flex justify-end space-x-2 pl-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="rounded-[4px] text-xs" variant="outline" size={'sm'}>
                  <div className="px-2 text-start text-xs">More</div>
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="flex gap-2"
                  onSelect={(e) => e.preventDefault()}
                  onClick={() => router.push(`/opportunity/${row.original._id.$oid}`)}
                >
                  <EyeIcon className="h-4 w-4" /> View
                </DropdownMenuItem>
                {role === 'admin' && (
                  <DropdownMenuItem className="flex gap-2" onSelect={(e) => e.preventDefault()}>
                    <EditOpportunity opportunity={row.original} />
                  </DropdownMenuItem>
                )}

                {role === 'admin' && row.original.status === 'Open for Assigning' && (
                  <DropdownMenuItem className="flex gap-2" onSelect={(e) => e.preventDefault()}>
                    <DeleteOpportunity id={row.original._id.$oid} />
                  </DropdownMenuItem>
                )}
                {role !== 'admin' &&
                  role !== 'employee' &&
                  plant === row.original.plant &&
                  row.original.status === 'Open for Assigning' && (
                    <DropdownMenuItem className="flex gap-2" onSelect={(e) => e.preventDefault()}>
                      <SelfAssignOpportunity opportunityId={row.original._id.$oid} />
                    </DropdownMenuItem>
                  )}
                <DropdownMenuItem className="flex gap-2" onSelect={(e) => e.preventDefault()}>
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
