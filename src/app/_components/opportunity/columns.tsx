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
import { DeleteOpportunity } from './delete';
import { getCookie } from 'cookies-next';
import { EditOpportunity } from './edit';
import { SelfAssignOpportunity } from './self-assign';
import { AssignProjectLeader } from './assign-project-leader';
import { ActionPlan } from './action-plan/action-plan';
import { UpdateProject } from './update-project';
import { AddTeamMembers } from './team-members/add-team-members';
import { AddDefinePhase } from './define-phase/add';
import { SSVTools } from './ssv-tools/ssv-tools';
import { MeasureAnalysis } from './measure-analysis/measure-analysis';
import { Improvement } from './improvement/improvement';
import { Control } from './control-phase/control-phase';
import { ProjectClosure } from './project-closure/project-closure';
import { ApproveOpportunity } from './approve-opportunity';
import { formatToIndianNumber } from '@/lib/utils';
import { MonthlySavings } from './monthly-savings/monthly-savings';

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
    // {
    //   accessorKey: 'category',
    //   header: ({ column }) => (
    //     <div className="flex w-[150px] justify-center text-center text-xs font-medium">
    //       Category
    //     </div>
    //   ),
    //   cell: ({ cell }) => ((cell.getValue() as any) ? cell.getValue() : '---'),
    // },
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
      cell: ({ cell }) =>
        (cell.getValue() as any) ? `Rs ${formatToIndianNumber(cell.getValue() as any)}` : '---',
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
                {role === 'admin' &&
                  ((row.original.category === 'Black Belt') && (
                    <DropdownMenuItem className="flex gap-2" asChild>
                      <EditOpportunity opportunity={row.original} />
                    </DropdownMenuItem>
                  ))}
                

                {role === 'admin' && (
                  <DropdownMenuItem className="flex gap-2" asChild>
                    <DeleteOpportunity id={row.original._id.$oid} />
                  </DropdownMenuItem>
                )}

              
                {(role === 'admin' ||
                  row.original.plant?.ci_head?._id?.$oid === userId ||
                  row.original.plant?.ci_team?._id?.$oid === userId) &&
                  row.original.status === 'Open for Assigning' && (
                    <DropdownMenuItem className="flex gap-2" asChild>
                      <SelfAssignOpportunity opportunityId={row.original._id.$oid} />
                    </DropdownMenuItem>
                  )}
                {(role === 'admin' ||
                  row.original.plant?.ci_head?._id?.$oid === userId ||
                  row.original.plant?.ci_team?._id?.$oid === userId) &&
                  row.original.status === 'Open for Assigning' && (
                    <DropdownMenuItem className="flex gap-2" asChild>
                      <AssignProjectLeader opportunity={row.original} />
                    </DropdownMenuItem>
                  )}
                {row.original.status === 'Project Assigned' &&
                  row.original.project_leader &&
                  userId === row.original.project_leader._id.$oid && (
                    <DropdownMenuItem className="flex gap-2" asChild>
                      <UpdateProject opportunity={row.original} />
                    </DropdownMenuItem>
                  )}
                {row.original.status === 'Details Updated' &&
                  row.original.project_leader &&
                  userId === row.original.project_leader._id.$oid && (
                    <DropdownMenuItem className="flex gap-2" asChild>
                      <AddTeamMembers opportunity={row.original} />
                    </DropdownMenuItem>
                  )}

                {row.original.category === 'Black Belt' &&
                  row.original.status === 'Teams Updated' &&
                  row.original.project_leader &&
                  userId === row.original.project_leader._id.$oid && (
                    <DropdownMenuItem className="flex gap-2" asChild>
                      <AddDefinePhase opportunityId={row.original._id.$oid} />
                    </DropdownMenuItem>
                  )}
                {row.original.category === 'Black Belt' &&
                  row.original.status === 'Define Phase Completed' &&
                  row.original.project_leader &&
                  userId === row.original.project_leader._id.$oid && (
                    <DropdownMenuItem className="flex gap-2" asChild>
                      <SSVTools opportunities={row.original} />
                    </DropdownMenuItem>
                  )}
                {row.original.category === 'Black Belt' &&
                  (row.original.status === "SSV's Tools Updated" ||
                    row.original.status === 'Measure & Analyze Phase Pending') &&
                  row.original.project_leader &&
                  userId === row.original.project_leader._id.$oid && (
                    <DropdownMenuItem className="flex gap-2" asChild>
                      <MeasureAnalysis opportunities={row.original} />
                    </DropdownMenuItem>
                  )}
                {row.original.category === 'Black Belt' &&
                  (row.original.status === 'Measure & Analyze Phase Completed' ||
                    row.original.status === 'Improvement Phase Pending') &&
                  row.original.project_leader &&
                  userId === row.original.project_leader._id.$oid && (
                    <DropdownMenuItem className="flex gap-2" asChild>
                      <Improvement opportunities={row.original} />
                    </DropdownMenuItem>
                  )}
                {row.original.category === 'Black Belt' &&
                  (row.original.status === 'Improvement Phase Completed' ||
                    row.original.status === 'Control Phase Pending') &&
                  row.original.project_leader &&
                  userId === row.original.project_leader._id.$oid && (
                    <DropdownMenuItem className="flex gap-2" asChild>
                      <Control opportunities={row.original} />
                    </DropdownMenuItem>
                  )}
                {row.original.category === 'Black Belt' &&
                  row.original.status === 'Control Phase Completed' &&
                  row.original.project_leader &&
                  userId === row.original.project_leader._id.$oid && (
                    <DropdownMenuItem className="flex gap-2" asChild>
                      <ProjectClosure opportunities={row.original} />
                    </DropdownMenuItem>
                  )}
                {row.original.category === 'Black Belt' &&
                  row.original.status === 'Project Closure Pending (CIHead)' &&
                  userId === row.original.plant.ci_head._id.$oid && (
                    <DropdownMenuItem className="flex gap-2" asChild>
                      <ApproveOpportunity opportunity={row.original} role="ci_head" />
                    </DropdownMenuItem>
                  )}
                {row.original.category === 'Black Belt' &&
                  row.original.status === 'Project Closure Pending (HOD)' &&
                  userId === row.original.plant.hod._id.$oid && (
                    <DropdownMenuItem className="flex gap-2" asChild>
                      <ApproveOpportunity opportunity={row.original} role="hod" />
                    </DropdownMenuItem>
                  )}
                {row.original.category === 'Black Belt' &&
                  row.original.status === 'Project Closure Pending (LOF)' &&
                  userId === row.original.plant.lof._id.$oid && (
                    <DropdownMenuItem className="flex gap-2" asChild>
                      <ApproveOpportunity opportunity={row.original} role="lof" />
                    </DropdownMenuItem>
                  )}
                {row.original.category === 'Black Belt' &&
                  row.original.status === 'Project Closure Pending (Costing Head)' &&
                  userId === row.original.plant.cs_head._id.$oid && (
                    <DropdownMenuItem className="flex gap-2" asChild>
                      <ApproveOpportunity opportunity={row.original} role="cs_head" />
                    </DropdownMenuItem>
                  )}

                <DropdownMenuItem className="flex gap-2" asChild>
                  <ActionPlan opportunities={row.original} />
                </DropdownMenuItem>

                {row.original.status === 'Opportunity Completed' && (
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
