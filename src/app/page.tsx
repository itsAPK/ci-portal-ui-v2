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
import { RiMoneyRupeeCircleFill, RiFileMarkedFill, RiDownload2Fill } from '@remixicon/react';
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
import React, { useRef } from 'react';
import { DateRange } from 'react-day-picker';
import { CalendarDatePicker } from '@/components/calender-date-picker';
import { withAuth } from '@/hooks/use-auth';
import { formatToIndianNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RiCloseCircleFill } from '@remixicon/react';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { getCookie } from 'cookies-next';
function Page() {
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    to: new Date(),
  });
  const userId = getCookie('ci-portal.employee_id');
  const [selectedPlant, setSelectedPlant] = React.useState<string>();
  const [selectedCompany, setSelectedCompany] = React.useState<string>();
  const [dashboard, setDashboard] = React.useState<string>('my-dashboard');

  const totalData = useQuery({
    queryKey: ['total-opportunities-dashboard'],
    queryFn: async () => {
      const match: any = {
        formatted_date: {
          ...(date?.from && { $gte: new Date(date.from) }),
          ...(date?.to && { $lte: new Date(date.to) }),
        },
        ...(selectedPlant && { 'plant.name': { $regex: selectedPlant, $options: 'i' } }), // Regex for plant.name
        ...(selectedCompany && { company: { $regex: selectedCompany, $options: 'i' } }),
      };

      if (dashboard === 'my-dashboard') {
        match['project_leader.employee_id'] = { $eq: userId };
      }

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
              $match: match,
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
                totalOpportunites: [
                  {
                    $count: 'total_opportunities',
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
                totalOpportunites: {
                  $arrayElemAt: ['$totalOpportunites.total_opportunities', 0],
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
                totalOpportunites: { $ifNull: ['$totalOpportunites', 0] },
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

  const totalMonthlySavings = useQuery({
    queryKey: ['total-monthly-savings-dashboard'],
    queryFn: async () => {
      const match: any = {
        formatted_date: {
          ...(date?.from && { $gte: new Date(date.from) }),
          ...(date?.to && { $lte: new Date(date.to) }),
        },
        ...(selectedPlant && { 'plant.name': { $regex: selectedPlant, $options: 'i' } }), // Regex for plant.name
        ...(selectedCompany && { company: { $regex: selectedCompany, $options: 'i' } }),
      };

      if (dashboard === 'my-dashboard') {
        match['project_leader.employee_id'] = { $eq: userId };
      }

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
              $unwind: '$monthly_savings',
            },
            {
              $match: { ...match, 'monthly_savings.is_approved': true },
            },

            {
              $project: {
                savings_int: {
                  $toInt: {
                    $replaceAll: {
                      input: '$monthly_savings.actual',
                      find: ',',
                      replacement: '',
                    },
                  },
                },
              },
            },
            {
              $group: {
                _id: null,
                total_approved_savings: {
                  $sum: '$savings_int',
                },
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

  const totalEstimatedSavings = useQuery({
    queryKey: ['total-monthly-estimated-dashboard'],
    queryFn: async () => {
      const match: any = {
        formatted_date: {
          ...(date?.from && { $gte: new Date(date.from) }),
          ...(date?.to && { $lte: new Date(date.to) }),
        },
        ...(selectedPlant && { 'plant.name': { $regex: selectedPlant, $options: 'i' } }), // Regex for plant.name
        ...(selectedCompany && { company: { $regex: selectedCompany, $options: 'i' } }),
      };

      if (dashboard === 'my-dashboard') {
        match['project_leader.employee_id'] = { $eq: userId };
      }

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
              $unwind: '$monthly_savings',
            },
            {
              $match: { ...match },
            },
            {
              $project: {
                savings_int: {
                  $toInt: {
                    $replaceAll: {
                      input: '$monthly_savings.savings',
                      find: ',',
                      replacement: '',
                    },
                  },
                },
              },
            },
            {
              $group: {
                _id: null,
                total_approved_savings: {
                  $sum: '$savings_int',
                },
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
      const match: any = {
        ...(selectedPlant && { plant: { $regex: selectedPlant, $options: 'i' } }), // Regex for plant.name
        ...(selectedCompany && { company: { $regex: selectedCompany, $options: 'i' } }),
      };
      return await api
        .post(`/employee/export/`, {
          filter: [
            {
              $match: match,
            },
            {
              $group: {
                _id: null, // Use null to group everything together
                total: { $sum: 1 },
              },
            },
          ],
        })
        .then((res) => {
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          return res.data.data;
        });
    },
  });

  const company = useQuery({
    queryKey: ['get-company'],
    queryFn: async (): Promise<any> => {
      return await api
        .get('/company')
        .then((res) => {
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          return res.data.data;
        })
        .catch((err) => {
          throw err;
        });
    },
  });

  const plant = useQuery({
    queryKey: ['get-plant'],
    queryFn: async (): Promise<any> => {
      return await api
        .get('/plant')
        .then((res) => {
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          return res.data.data;
        })
        .catch((err) => {
          throw err;
        });
    },
  });

  const container = useRef<HTMLDivElement>(null);
  const pdfExportComponent = useRef<PDFExport>(null);
  const exportPDFWithMethod = () => {
    let element = container.current || document.body;
    savePDF(element, {
      paperSize: 'auto',
      margin: 40,
      fileName: `CI-Portal-Report-${new Date().toISOString().slice(0, 10)}`,
    });
  };

  const queryClient = useQueryClient();
  console.log(totalEmployee.data);
  return (
    <UILayout>
      <ContentLayout title={'Login'} tags={['authentication', 'login']}>
        <div className="flex justify-between p-3 pb-0 text-xl font-semibold text-gray-800 dark:text-white">
          <div>Dashboard</div>
          <div className="flex gap-2">
            <Select
              onValueChange={(e) => {
                setDashboard(e);
                setTimeout(() => {
                  totalData.refetch();
                  totalEmployee.refetch();
                  totalMonthlySavings.refetch();
                  totalEstimatedSavings.refetch();
                  queryClient.refetchQueries({
                    queryKey: [
                      'total-opportunities',
                      date,
                      selectedPlant,
                      selectedCompany,
                      dashboard,
                      'top-estimated-savings',
                      date,
                      selectedPlant,
                      selectedCompany,
                      'category-wise-opportunity',
                      date,
                      selectedPlant,
                      selectedCompany,
                      dashboard,
                      'estimated-savings',
                      date,
                      selectedPlant,
                      selectedCompany,
                      dashboard,
                      'top-employees',
                      date,
                      selectedPlant,
                      selectedCompany,
                      'completed-vs-ongoing',
                      selectedCompany,
                      selectedPlant,
                      dashboard,
                      'employees-count-by-role',
                      selectedPlant,
                      selectedCompany,
                      'total-employees',
                      selectedPlant,
                      selectedCompany,
                    ],
                  });
                }, 1000);
              }}
              value={dashboard}
            >
              <SelectTrigger className="h-8 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                <SelectValue placeholder="Select Dashboard" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="my-dashboard">My Dashboard</SelectItem>
                  <SelectItem value="all-dashboard">Overall Dashboard</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {dashboard !== 'my-dashboard' && (
              <Select
              onValueChange={(e) => {
                setSelectedCompany(e);

                setTimeout(() => {
                  totalData.refetch();
                  totalEmployee.refetch();
                  totalMonthlySavings.refetch();
                  totalEstimatedSavings.refetch();
                  queryClient.refetchQueries({
                    queryKey: [
                      'total-opportunities',
                      date,
                      selectedPlant,
                      selectedCompany,
                      dashboard,
                      'top-estimated-savings',
                      date,
                      selectedPlant,
                      selectedCompany,
                      'category-wise-opportunity',
                      date,
                      selectedPlant,
                      selectedCompany,
                      dashboard,
                      'estimated-savings',
                      date,
                      selectedPlant,
                      selectedCompany,
                      dashboard,
                      'top-employees',
                      date,
                      selectedPlant,
                      selectedCompany,
                      'completed-vs-ongoing',
                      selectedCompany,
                      selectedPlant,
                      dashboard,
                      'employees-count-by-role',
                      selectedPlant,
                      selectedCompany,
                      'total-employees',
                      selectedPlant,
                      selectedCompany,
                    ],
                  });
                }, 1000);
              }}
              value={selectedCompany}
            >
              <SelectTrigger className="h-8 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                <SelectValue placeholder="Select Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {company.data &&
                    company.data.map((i: any) => (
                      <SelectItem key={i._id} value={i.name}>
                        {i.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>)}
            {dashboard !== 'my-dashboard' && (
              <Select
              onValueChange={(e) => {
                setSelectedPlant(e);
                setTimeout(() => {
                  totalData.refetch();
                  totalEmployee.refetch();
                  totalMonthlySavings.refetch();
                  totalEstimatedSavings.refetch();

                  queryClient.refetchQueries({
                    queryKey: [
                      'total-opportunities',
                      date,
                      selectedPlant,
                      selectedCompany,
                      dashboard,
                      'top-estimated-savings',
                      date,
                      selectedPlant,
                      selectedCompany,
                      'category-wise-opportunity',
                      date,
                      selectedPlant,
                      selectedCompany,
                      dashboard,
                      'estimated-savings',
                      date,
                      selectedPlant,
                      selectedCompany,
                      dashboard,
                      'top-employees',
                      date,
                      selectedPlant,
                      selectedCompany,
                      'completed-vs-ongoing',
                      selectedCompany,
                      selectedPlant,
                      dashboard,
                      'employees-count-by-role',
                      selectedPlant,
                      selectedCompany,
                      'total-employees',
                      selectedPlant,
                      selectedCompany,
                    ],
                  });
                }, 1000);
              }}
              value={selectedPlant}
            >
              <SelectTrigger className="h-8 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                <SelectValue placeholder="Select Plant" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {plant.data &&
                    plant.data.map((i: any) => (
                      <SelectItem key={i._id} value={i.name}>
                        {i.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>)}
            <div className="flex gap-2 px-4">
              <CalendarDatePicker
                date={date}
                onDateSelect={({ from, to }) => {
                  setDate({ from, to });
                  setTimeout(() => {
                    totalData.refetch();
                    totalEmployee.refetch();
                    totalMonthlySavings.refetch();
                    totalEstimatedSavings.refetch();
                    queryClient.refetchQueries({
                      queryKey: [
                        'total-opportunities',
                        date,
                        selectedPlant,
                        selectedCompany,
                        dashboard,
                        'top-estimated-savings',
                        date,
                        selectedPlant,
                        selectedCompany,
                        'category-wise-opportunity',
                        date,
                        selectedPlant,
                        selectedCompany,
                        dashboard,
                        'estimated-savings',
                        date,
                        selectedPlant,
                        selectedCompany,
                        dashboard,
                        'top-employees',
                        date,
                        selectedPlant,
                        selectedCompany,
                        'completed-vs-ongoing',
                        selectedCompany,
                        selectedPlant,
                        dashboard,
                        'employees-count-by-role',
                        selectedPlant,
                        selectedCompany,
                        'total-employees',
                        selectedPlant,
                        selectedCompany,
                      ],
                    });
                  }, 1000);
                }}
                className="h-8 w-[320px]"
              />
            </div>
            <div>
              {(selectedPlant || selectedCompany) && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="gap-2"
                  onClick={() => {
                    setSelectedCompany('');
                    setSelectedPlant('');
                    setTimeout(() => {
                      totalData.refetch();
                      totalEmployee.refetch();
                      queryClient.refetchQueries({
                        queryKey: [
                          'total-opportunities',
                          date,
                          selectedPlant,
                          selectedCompany,
                          dashboard,
                          'top-estimated-savings',
                          date,
                          selectedPlant,
                          selectedCompany,
                          'category-wise-opportunity',
                          date,
                          selectedPlant,
                          selectedCompany,
                          dashboard,
                          'estimated-savings',
                          date,
                          selectedPlant,
                          selectedCompany,
                          dashboard,
                          'top-employees',
                          date,
                          selectedPlant,
                          selectedCompany,
                          'completed-vs-ongoing',
                          selectedCompany,
                          selectedPlant,
                          dashboard,
                          'employees-count-by-role',
                          selectedPlant,
                          selectedCompany,
                          'total-employees',
                          selectedPlant,
                          selectedCompany,
                        ],
                      });
                    }, 1000);
                  }}
                >
                  <RiCloseCircleFill className="h-4 w-4" /> Clear
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex min-h-[80vh] items-center justify-center">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 lg:px-0">
            <div className="col-span-12 flex justify-end pb-3 md:hidden"></div>
            <div className="col-span-12 md:col-span-8">
              <div className="flex w-full grid-cols-1 flex-col gap-4 px-4 md:grid md:grid-cols-2">
                <CountCard
                  icon={<RiFileMarkedFill className="h-7 w-7 text-fuchsia-600" />}
                  name={'Total Projects '}
                  color="bg-fuchsia-600/10"
                  count={
                    totalData.data && totalData.data.length > 0
                      ? formatToIndianNumber(totalData.data[0].totalOpportunites)
                      : 0
                  }
                />
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
                  name={'Projects Waiting for Closure'}
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
                    totalData.data && totalData.data.length > 0
                      ? formatToIndianNumber(totalData.data[0].totalOngoing)
                      : 0
                  }
                />

                <CountCard
                  icon={<UsersRound className="h-7 w-7 text-indigo-600" />}
                  name={'Total Employees'}
                  color="bg-indigo-600/10"
                  count={
                    totalEmployee.data && totalEmployee.data.data.length > 0
                      ? formatToIndianNumber(totalEmployee.data.data[0].total)
                      : 0
                  }
                />
              </div>
            </div>
            <div className="md:col-span-4">
              <OverallReport
                dateRange={date}
                selectedCompany={selectedCompany}
                selectedPlant={selectedPlant}
                dashboard={dashboard}
              />
            </div>
            <div className="col-span-6 px-4">
              <CountCard
                icon={<LandmarkIcon className="h-7 w-7 text-red-600" />}
                name={'Total Black Belt Estimated Savings'}
                color="bg-red-600/10"
                count={`Rs ${
                  totalEstimatedSavings.data && totalEstimatedSavings.data.length > 0
                    ? formatToIndianNumber(
                        totalEstimatedSavings.data[0].total_approved_savings ?? 0,
                      )
                    : 0
                }`}
              />
            </div>
            <div className="col-span-6">
              <CountCard
                icon={<RiMoneyRupeeCircleFill className="h-7 w-7 text-green-600" />}
                name={'Total Black Belt Approved Savings'}
                color="bg-green-600/10"
                count={`Rs ${
                  totalMonthlySavings.data && totalMonthlySavings.data.length > 0
                    ? formatToIndianNumber(totalMonthlySavings.data[0].total_approved_savings ?? 0)
                    : 0
                }`}
              />
            </div>
            <div className="pl-3 md:col-span-6">
              <CompletedVsOpened
                selectedCompany={selectedCompany}
                selectedPlant={selectedPlant}
                dashboard={dashboard}
              />
            </div>

            <div className="px-4 md:col-span-6">
              <EstimatedSavingsOpportunities
                dateRange={date}
                selectedCompany={selectedCompany}
                selectedPlant={selectedPlant}
                dashboard={dashboard}
              />
            </div>
            <div className="px-4 md:col-span-12">
              <CategoryWiseOpportunity
                dateRange={date}
                selectedPlant={selectedPlant}
                selectedCompany={selectedCompany}
                dashboard={dashboard}
              />
            </div>
            {/* <div className="md:col-span-6">
              <TotalEmployees selectedCompany={selectedCompany} selectedPlant={selectedPlant} />
            </div> */}
            {dashboard !== 'my-dashboard' && (
              <>
                <div className="md:col-span-6">
                  <TotalEstimatedSavings
                    dateRange={date}
                    selectedCompany={selectedCompany}
                    selectedPlant={selectedPlant}
                  />
                </div>
                <div className="md:col-span-6">
                  <TopEmployees
                    dateRange={date}
                    selectedCompany={selectedCompany}
                    selectedPlant={selectedPlant}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </ContentLayout>
    </UILayout>
  );
}

export default withAuth(Page);
