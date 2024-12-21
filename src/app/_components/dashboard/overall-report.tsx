'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@/components/ui/loading';
import { DateRange } from 'react-day-picker';

const chartConfig = {
  count: {
    label: 'Opportunities',
  },
  opened: {
    label: 'Opened',
    color: 'hsl(var(--chart-1))',
  },
  completed: {
    label: 'Completed',
    color: 'hsl(var(--chart-2))',
  },
  waiting_for_closuer: {
    label: 'Waiting for Closuer',
    color: 'hsl(var(--destructive))',
  },
  ongoing: {
    label: 'Ongoing',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export const OverallReport = ({dateRange}: { dateRange?: DateRange }) => {
  const chartData: any = [
    {
      status: 'opened',
      count: 33,
      fill: 'var(--color-opened)',
    },
    {
      status: 'completed',
      count: 33,
      fill: 'var(--color-completed)',
    },
    {
      status: 'ongoing',
      count: 54,
      fill: 'var(--color-ongoing)',
    },
    {
      status: 'waiting_for_closuer',
      count: 22,
      fill: 'var(--color-waiting_for_closuer)',
    },
  ];

  const totalOpportunities = useQuery({
    queryKey: ['total-opportunities'],
    queryFn: async () => {
      return await api
        .post(`/opportunity/export`, {
          filter: [
            {
              $addFields: {
                formatted_date: {
                  $dateToString: {
                    format: '%Y-%m-%d',
                    date: "$created_at",
                  },
                },
              },
            },
            {
              $match: {
                formatted_date: {
                  $gte: dateRange && dateRange.from && new Date(dateRange.from),
                  $lte: dateRange && dateRange.to && new Date(dateRange.to),
                },
            }},
            {
              
              $facet: {
                totalOngoing: [
                  {
                    $match: {
                      status: {
                        $nin: [
                          'Open For Assign',
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
                      status: 'Open For Assign',
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
                totalOpenForAssign: { $arrayElemAt: ['$totalOpenForAssign.totalOpenForAssign', 0] },
                totalProjectClosure: {
                  $arrayElemAt: ['$totalProjectClosure.totalProjectClosure', 0],
                },
              },
            },
            {
              $addFields: {
                totalOngoing: { $ifNull: ['$totalOngoing', 0] },
                totalCompleted: { $ifNull: ['$totalCompleted', 0] },
                totalOpenForAssign: { $ifNull: ['$totalOpenForAssign', 0] },
                totalProjectClosure: { $ifNull: ['$totalProjectClosure', 0] },
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

  console.log(totalOpportunities.data);

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc: any, curr: { count: any }) => acc + curr.count, 0);
  }, []);
  return (
    <Card className="flex min-h-[420px] flex-col rounded-xl border-primary/50 shadow-none">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg">Opportunities Status Report</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 pt-10">
        {!totalOpportunities.isLoading ? (
          <ChartContainer config={chartConfig} className="aspect-square max-h-[290px] w-full">
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value, name) => (
                      <>
                        <div
                          className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                          style={
                            {
                              '--color-bg': `var(--color-${name})`,
                            } as React.CSSProperties
                          }
                        />
                        <div className="flex  text-xs text-muted-foreground w-[100px]">
                          {chartConfig[name as keyof typeof chartConfig]?.label || name}

                          <div className="ml-auto flex items-center gap-0.5 font-mono font-medium tabular-nums text-foreground">
                            {Number(value)}
                          </div>
                        </div>
                      </>
                    )}
                  />
                }
              />
              <Pie
                data={[
                  {
                    status: 'waiting_for_closuer',
                    count:
                      totalOpportunities.data && totalOpportunities.data.length > 0
                        ? totalOpportunities.data[0].totalProjectClosure
                        : 0,
                    fill: 'var(--color-waiting_for_closuer)',
                  },
                  {
                    status: 'ongoing',
                    count:
                      totalOpportunities.data && totalOpportunities.data.length > 0
                        ? totalOpportunities.data[0].totalOngoing
                        : 0,
                    fill: 'var(--color-ongoing)',
                  },
                  {
                    status: 'completed',
                    count:
                      totalOpportunities.data && totalOpportunities.data.length > 0
                        ? totalOpportunities.data[0].totalCompleted
                        : 0,
                    fill: 'var(--color-completed)',
                  },
                  {
                    status: 'opened',
                    count:
                      totalOpportunities.data && totalOpportunities.data.length > 0
                        ? totalOpportunities.data[0].totalOpenForAssign
                        : 0,
                    fill: 'var(--color-opened)',
                  },
                ]}
                dataKey="count"
                nameKey="status"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-2xl font-bold"
                          >
                            {totalOpportunities.data && totalOpportunities.data.length > 0
                              ? totalOpportunities.data[0].totalOngoing +
                                totalOpportunities.data[0].totalCompleted +
                                totalOpportunities.data[0].totalOpenForAssign
                              : 0}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Opportunities
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="status" />}
                className="-translate-y-2 flex-wrap gap-2"
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="max-h-[290px]">
            <Loading />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
