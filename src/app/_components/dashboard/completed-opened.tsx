'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@/components/ui/loading';
interface MonthlyData {
  month: string;
  ongoing: number;
  completed: number;
}

function generateCompleteMonthlyData(inputData: MonthlyData[]): MonthlyData[] {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dataMap: Record<string, MonthlyData> = {};
  inputData.forEach((item) => {
    dataMap[item.month] = { month: item.month, ongoing: item.ongoing, completed: item.completed };
  });

  return months.map((month) => {
    const monthData = dataMap[month] || { month, ongoing: 0, completed: 0 };
    return monthData;
  });
}
const chartConfig = {
  ongoing: {
    label: 'Ongoing',
    color: 'hsl(var(--chart-1))',
  },
  completed: {
    label: 'Completed',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function CompletedVsOpened({
  selectedCompany,
  selectedPlant,
}: {
  selectedCompany?: string;
  selectedPlant?: string;
}) {
  const totalData = useQuery({
    queryKey: ['completed-vs-ongoing', selectedCompany, selectedPlant],
    queryFn: async () => {
      const match: any = {
        ...(selectedPlant && { 'plant.name': { $regex: selectedPlant, $options: 'i' } }), // Regex for plant.name
        ...(selectedCompany && { company: { $regex: selectedCompany, $options: 'i' } }),
      };
      return await api
        .post(`/opportunity/export`, {
          filter: [
            { $match: match },
            {
              $group: {
                _id: { $month: '$created_at' },
                ongoing: {
                  $sum: {
                    $cond: [{ $ne: ['$status', 'Opportunity Completed'] }, 1, 0],
                  },
                },
                completed: {
                  $sum: {
                    $cond: [{ $eq: ['$status', 'Opportunity Completed'] }, 1, 0],
                  },
                },
              },
            },
            {
              $addFields: {
                month: {
                  $let: {
                    vars: {
                      monthsInString: [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December',
                      ],
                    },
                    in: {
                      $arrayElemAt: ['$$monthsInString', { $subtract: ['$_id', 1] }],
                    },
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                month: 1,
                ongoing: 1,
                completed: 1,
              },
            },
            {
              $sort: { month: 1 },
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

  console.log(totalData.data);
  return (
    <Card className="h-[350px] overflow-y-auto rounded-xl border-primary/50 shadow-none">
      <CardHeader>
        <CardTitle>Total Project Completed vs Ongoing</CardTitle>
      </CardHeader>
      <CardContent>
        {!totalData.isLoading ? (
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={
                totalData.data
                  ? generateCompleteMonthlyData(totalData.data)
                  : generateCompleteMonthlyData([])
              }
              margin={{
                left: 12,
                right: 12,
              }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
                 <YAxis tickLine={false}
                              tickMargin={10}
                              type='number'
                              axisLine={false}
                              tickFormatter={(value) => value} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="ongoing"
                type="monotone"
                stroke="var(--color-ongoing)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="completed"
                type="monotone"
                stroke="var(--color-completed)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        ) : (
          <Loading />
        )}
      </CardContent>
    </Card>
  );
}
