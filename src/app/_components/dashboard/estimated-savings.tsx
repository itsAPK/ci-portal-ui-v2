'use client';

import { TrendingUp } from 'lucide-react';
import { LabelList, PolarGrid, RadialBar, RadialBarChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
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
import { DateRange } from 'react-day-picker';
import { getCookie } from 'cookies-next';
interface OriginalData {
  _id: string;
  total_opportunities: number;
}

interface ChartData {
  _id: string;
  total_opportunities: number;
  fill: string;
}

function transformData(originalData: OriginalData[]): ChartData[] {
  const idMapping: { [key: string]: { newId: string; fill: string } } = {
    '<= 1 Lakh': { newId: 'less_than_1_lakh', fill: 'var(--color-less_than_1_lakh)' },
    '>1 and <=5 Lakh': { newId: 'less_than_5_lakh', fill: 'var(--color-less_than_5_lakh)' },
    '>5 and <=10 Lakh': { newId: 'less_than_10_lakh', fill: 'var(--color-less_than_10_lakh)' },
    '>10 Lakh': { newId: 'greater_than_10_lakh', fill: 'var(--color-greater_than_10_lakh)' },
  };

  const chartDataArray: ChartData[] = Object.entries(idMapping).map(([originalId, mapping]) => ({
    _id: mapping.newId,
    total_opportunities: 0,
    fill: mapping.fill,
  }));

  originalData.forEach((item) => {
    const mapping = idMapping[item._id];
    if (mapping) {
      const chartItem = chartDataArray.find((data) => data._id === mapping.newId);
      if (chartItem) {
        chartItem.total_opportunities = item.total_opportunities;
      }
    }
  });

  return chartDataArray;
}

const chartConfig = {
  total_opportunities: {
    label: 'Opportunities',
  },
  less_than_1_lakh: {
    label: '<= 1 Lakh',
    color: 'hsl(var(--chart-1))',
  },
  less_than_5_lakh: {
    label: '>1 and <=5 Lakh',
    color: 'hsl(var(--chart-2))',
  },
  less_than_10_lakh: {
    label: '>5 and <=10 Lakh	',
    color: 'hsl(var(--chart-3))',
  },
  greater_than_10_lakh: {
    label: '>10 lakh',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export function EstimatedSavingsOpportunities({
  dateRange,
  selectedCompany,
  selectedPlant,
  dashboard
}: {
  dateRange?: DateRange;
  selectedCompany?: string;
  selectedPlant?: string;
  dashboard: string
}) {
  const userId = getCookie('ci-portal.employee_id');
  const estimatedSavings = useQuery({
    queryKey: ['estimated-savings', dateRange, selectedCompany, selectedPlant,,dashboard],
    queryFn: async () => {
      const match: any = {
        formatted_date: {
          ...(dateRange?.from && { $gte: new Date(dateRange.from) }),
          ...(dateRange?.to && { $lte: new Date(dateRange.to) }),
        },
        ...(selectedPlant && { 'plant.name': { $regex: selectedPlant, $options: 'i' } }), // Regex for plant.name
        ...(selectedCompany && { company: { $regex: selectedCompany, $options: 'i' } }),
      };
      if (dashboard === 'my-dashboard') {
        match['project_leader.employee_id'] = { $eq : userId };
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
              $group: {
                _id: '$expected_savings',
                total_opportunities: { $sum: 1 },
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

  console.log(estimatedSavings.data);
  return (
    <Card className="border-primary/50 ">
      <CardHeader className="pb-0">
        <CardTitle>Opprtunities By Estimated Savings</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {!estimatedSavings.isLoading ? (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[340px]">
            <RadialBarChart
              data={
                estimatedSavings.data ? transformData(estimatedSavings.data) : transformData([])
              }
              startAngle={-90}
              endAngle={380}
              innerRadius={30}
              outerRadius={110}
            >
              
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent className="w-[180px]" hideLabel nameKey="_id" />}
              />
              <RadialBar dataKey="total_opportunities" background />;
              <ChartLegend
                content={<ChartLegendContent nameKey="_id" />}
                className="w-full flex-wrap gap-2 [&>*]:basis-[40%] [&>*]:justify-center"
              />
            </RadialBarChart>
          </ChartContainer>
        ) : (
          <Loading />
        )}
      </CardContent>
    </Card>
  );
}
