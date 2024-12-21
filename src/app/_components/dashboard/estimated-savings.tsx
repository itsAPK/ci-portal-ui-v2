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
      "<= 1 Lakh": { newId: "less_than_1_lakh", fill: "var(--color-less_than_1_lakh)" },
      ">1 and <=5 Lakh": { newId: "less_than_5_lakh", fill: "var(--color-less_than_5_lakh)" },
      ">10 and <=15 Lakh": { newId: "less_than_15_lakh", fill: "var(--color-less_than_15_lakh)" },
      ">15 Lakh": { newId: "greater_than_15_lakh", fill: "var(--color-greater_than_15_lakh)" }
  };

  const chartDataArray: ChartData[] = Object.entries(idMapping).map(([originalId, mapping]) => ({
      _id: mapping.newId,
      total_opportunities: 0,
      fill: mapping.fill
  }));

  originalData.forEach(item => {
      const mapping = idMapping[item._id];
      if (mapping) {
          const chartItem = chartDataArray.find(data => data._id === mapping.newId);
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
  'less_than_1_lakh': {
    label: '<= 1 Lakh',
    color: 'hsl(var(--chart-1))',
  },
  'less_than_5_lakh': {
    label: '>1 and <=5 Lakh',
    color: 'hsl(var(--chart-2))',
  },
  'less_than_10_lakh': {
    label: '>5 and <=10 Lakh	',
    color: 'hsl(var(--chart-3))',
  },
  'less_than_15_lakh': {
    label: '>10 and <=15 Lakh',
    color: 'hsl(var(--chart-4))',
  },
  'greater_than_15_lakh': {
    label: '>15 Lakh',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function EstimatedSavingsOpportunities({ dateRange }: { dateRange?: DateRange }) {
  const estimatedSavings = useQuery({
    queryKey: ['total-opportunities---estimated-savings'],
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
                  $gte: dateRange && dateRange.from && new Date(dateRange.from),
                  $lte: dateRange && dateRange.to && new Date(dateRange.to),
                },
              },
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
    <Card className="border-primary/50">
      <CardHeader className="pb-0">
        <CardTitle>Opprtunities By Estimated Savings</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {!estimatedSavings.isLoading ? <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[340px]">
          <RadialBarChart
            data={estimatedSavings.data ? transformData(estimatedSavings.data) : transformData([])}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="_id" />}
            />
            <RadialBar dataKey="total_opportunities" background />;
            <ChartLegend
              content={<ChartLegendContent nameKey="_id" />}
              className="w-full flex-wrap gap-2 [&>*]:basis-[40%] [&>*]:justify-center"
            />
          </RadialBarChart>
        </ChartContainer> : <Loading />}
      </CardContent>
    </Card>
  );
}
