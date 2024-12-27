'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  AlertTriangle,
  BoxesIcon,
  BoxIcon,
  FileBoxIcon,
  LandmarkIcon,
  UsersRound,
  WalletCardsIcon,
} from 'lucide-react';
import { ContentLayout } from '@/components/content-layout';
import api from '@/lib/api';
import { toast } from 'sonner';
import { loginSchema, LoginSchema } from '@/schema/login';
import UILayout from '@/components/ui-layout';
import { CountCard } from '@/components/count-card';
import { OverallReport } from './_components/dashboard/overall-report';
import { CompletedVsOpened } from './_components/dashboard/completed-opened';
import { TotalEstimatedSavings } from './_components/dashboard/top-saving-project';
import { opportunities } from '@/lib/data';
import { CategoryWiseOpportunity } from './_components/dashboard/category-wise-opportunity';
import { TotalEmployees } from './_components/dashboard/user-by-role';
import { EstimatedSavingsOpportunities } from './_components/dashboard/estimated-savings';
import { TopEmployees } from './_components/dashboard/top-employess';
import React from 'react';
import { DateRange } from 'react-day-picker';
import { CalendarDatePicker } from '@/components/calender-date-picker';
import { withAuth } from '@/hooks/use-auth';
import { formatToIndianNumber } from '@/lib/utils';

function Page() {
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    to: new Date(),
  });

  const totalData = useQuery({
    queryKey: ['total-opportunities-dashboard'],
    queryFn: async () => {
      return await api
        .post(`/opportunity/export`, {
          filter: [
            {
              $addFields: {
                formatted_date: {
                  $dateToString: {
                    format: '%Y-%m-%d',
                    date: '$created_at',
                  },
                },
              },
            },
            {
              $match: {
                formatted_date: {
                  $gte: date && date.from && new Date(date.from),
                  $lte: date && date.to && new Date(date.to),
                },
              },
            },

            {
              $facet: {
                totalEstimatedSavings: [
                  {
                    $group: {
                      _id: null,
                      total_estimated: { $sum: '$estimated_savings' },
                    },
                  },
                ],
                totalOngoing: [
                  {
                    $match: {
                      status: {
                        $nin: [
                          'Open for Assigning',
                          'Project Closure Pending (CIHead)',
                          'Project Closure Pending (HOD)',
                          'Project Closure Pending (Costing Head)',
                          'Project Closure Pending (LOF)',
                          'Opportunity Completed',
                        ],
                      },
                    },
                  },
                  {
                    $count: 'totalOngoing',
                  },
                ],
                totalCompleted: [
                  {
                    $match: {
                      status: 'Opportunity Completed',
                    },
                  },
                  {
                    $count: 'totalCompleted',
                  },
                ],
                totalOpenForAssign: [
                  {
                    $match: {
                      status: 'Open for Assigning',
                    },
                  },
                  {
                    $count: 'totalOpenForAssign',
                  },
                ],

                totalProjectClosure: [
                  {
                    $match: {
                      status: {
                        $in: [
                          'Project Closure Pending (CIHead)',
                          'Project Closure Pending (HOD)',
                          'Project Closure Pending (Costing Head)',
                          'Project Closure Pending (LOF)',
                        ],
                      },
                    },
                  },
                  {
                    $count: 'totalProjectClosure',
                  },
                ],
              },
            },

            {
              $project: {
                totalOngoing: { $arrayElemAt: ['$totalOngoing.totalOngoing', 0] },
                totalCompleted: { $arrayElemAt: ['$totalCompleted.totalCompleted', 0] },
                totalOpenForAssign: {
                  $arrayElemAt: ['$totalOpenForAssign.totalOpenForAssign', 0],
                },
                totalProjectClosure: {
                  $arrayElemAt: ['$totalProjectClosure.totalProjectClosure', 0],
                },
                totalEstimatedSavings: {
                  $arrayElemAt: ['$totalEstimatedSavings.total_estimated', 0],
                },
              },
            },

            {
              $addFields: {
                totalOngoing: { $ifNull: ['$totalOngoing', 0] },
                totalCompleted: { $ifNull: ['$totalCompleted', 0] },
                totalOpenForAssign: { $ifNull: ['$totalOpenForAssign', 0] },
                totalProjectClosure: { $ifNull: ['$totalProjectClosure', 0] },
                totalEstimatedSavings: { $ifNull: ['$totalEstimatedSavings', 0] },
              },
            },
          ],
        })
        .then((res) => {
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          return res.data.data.data;
        });
    },
  });

  const totalEmployee = useQuery({
    queryKey: ['total-employees'],
    queryFn: async () => {
      return await api.get(`/employee/count/`, {}).then((res) => {
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
        return res.data.data;
      });
    },
  });

  const queryClient = useQueryClient();

  return (
    <UILayout>
      <ContentLayout title={'Login'} tags={['authentication', 'login']}>
        <div className="flex justify-between p-3 pb-0 text-xl font-semibold text-gray-800 dark:text-white">
          <div>Dashboard</div>
          <div className="flex gap-2">
            <div className="flex gap-2 px-4">
              <CalendarDatePicker
                date={date}
                onDateSelect={({ from, to }) => {
                  setDate({ from, to });
                  setTimeout(() => {
                    totalData.refetch();
                    totalEmployee.refetch();
                    queryClient.refetchQueries({
                      queryKey: [
                        'total-opportunities', date, 
                        'top-estimated-savings', date,
                        'category-wise-opportunity', date,
                        'estimated-savings', date,
                        'top-employees', date
                      ],
                    });
                  }, 1000);
                }}
                className="h-8 w-[320px]"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex min-h-[80vh] items-center justify-center">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 lg:px-0">
            <div className="col-span-12 flex justify-end pb-3 md:hidden"></div>
            <div className="col-span-12 md:col-span-8">
              <div className="flex w-full grid-cols-1 flex-col gap-5 px-4 md:grid md:grid-cols-2">
                <CountCard
                  icon={<FileBoxIcon className="h-7 w-7 text-purple-500" />}
                  name={' Projects Completed'}
                  color="bg-purple-500/10"
                  count={
                    totalData.data && totalData.data.length > 0
                      ? formatToIndianNumber(totalData.data[0].totalCompleted)
                      : 0
                  }
                />
                <CountCard
                  icon={<BoxIcon className="h-7 w-7 text-blue-600" />}
                  name={'Projects Opened'}
                  color="bg-blue-600/10"
                  count={
                    totalData.data && totalData.data.length > 0
                      ? formatToIndianNumber(totalData.data[0].totalOpenForAssign)
                      : 0
                  }
                />
                <CountCard
                  icon={<BoxesIcon className="h-7 w-7 text-orange-600" />}
                  name={'Projects Waiting for Closure.'}
                  color="bg-orange-600/10"
                  count={
                    totalData.data && totalData.data.length > 0
                      ? formatToIndianNumber(totalData.data[0].totalProjectClosure)
                      : 0
                  }
                />
                <CountCard
                  icon={<WalletCardsIcon className="h-7 w-7 text-amber-600" />}
                  name={'Ongoing Projects'}
                  color="bg-amber-600/10"
                  count={
                    totalData.data && totalData.data.length > 0 ? formatToIndianNumber(totalData.data[0].totalOngoing) : 0
                  }
                />
                <CountCard
                  icon={<LandmarkIcon className="h-7 w-7 text-red-600" />}
                  name={'Total Savings'}
                  color="bg-red-600/10"
                  count={`₹ ${totalData.data && totalData.data.length > 0 ? formatToIndianNumber(totalData.data[0].totalEstimatedSavings) : 0}`}
                />
                <CountCard
                  icon={<UsersRound className="h-7 w-7 text-indigo-600" />}
                  name={'Total Employees'}
                  color="bg-indigo-600/10"
                  count={totalEmployee.data ? formatToIndianNumber(totalEmployee.data.employee) : 0}
                />
              </div>
            </div>
            <div className="md:col-span-4">
              <OverallReport dateRange={date} />
            </div>
            <div className="pl-3 md:col-span-6">
              <CompletedVsOpened />
            </div>
            <div className="md:col-span-6">
              <TotalEstimatedSavings dateRange={date} />
            </div>
            <div className="md:col-span-6">
              <CategoryWiseOpportunity dateRange={date} />
            </div>
            <div className="md:col-span-6">
              <TotalEmployees />
            </div>
            <div className="md:col-span-6">
              <EstimatedSavingsOpportunities dateRange={date} />
            </div>
            <div className="md:col-span-6">
              <TopEmployees dateRange={date} />
            </div>
          </div>
        </div>
      </ContentLayout>
    </UILayout>
  );
}

export default withAuth(Page);