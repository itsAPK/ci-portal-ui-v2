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

type CategoryData = {
  category: string;
  count: number;
  fill: string;
};

type ResponseData = {
  categories: Record<string, number>;
};

const transformCategoryData = (responseData: ResponseData): CategoryData[] => {
  // Define all categories with their default values
  const allCategories: CategoryData[] = [
    { category: 'black-belt', count: 0, fill: 'var(--color-black-belt)' },
    { category: 'green-belt', count: 0, fill: 'var(--color-green-belt)' },
    { category: 'sitg', count: 0, fill: 'var(--color-sitg)' },
    { category: '3m', count: 0, fill: 'var(--color-3m)' },
    { category: 'kaizen', count: 0, fill: 'var(--color-kaizen)' },
    { category: 'poka-yoke', count: 0, fill: 'var(--color-poka-yoke)' },
  ];

  // Category mapping for response keys to desired format keys
  const categoryMapping: Record<string, string> = {
    'Black Belt': 'black-belt',
    'Green Belt': 'green-belt',
    SITG: 'sitg',
    '3M': '3m',
    Kaizen: 'kaizen',
    'Poka-Yoke': 'poka-yoke',
  };

  // Convert response categories to the desired structure
  return allCategories.map((defaultCategory) => {
    const matchingCategoryKey = Object.keys(categoryMapping).find(
      (key) => categoryMapping[key] === defaultCategory.category,
    );

    const count = matchingCategoryKey ?  responseData  ? responseData.categories[matchingCategoryKey] : 0 || 0 : 0;
    return {
      ...defaultCategory,
      count,
    };
  });
};

const calculateCategorySum = (categories: { [key: string]: number }): number => {
  return Object.values(categories).reduce((total, count) => total + count, 0);
};

const chartConfig = {
  count: {
    label: 'Opportunities',
  },
  'black-belt': {
    label: 'Black Belt',
    color: '#000000',
  },
  'green-belt': {
    label: 'Green Belt',
    color: '#119b1d',
  },
 
} satisfies ChartConfig;

const getTotalCount = (categoryData: CategoryData[]): number => {
  return categoryData.reduce((total, category) => total + category.count, 0);
};

export const CategoryWiseTrainingGraph = () => {
  const chartData: any = [
    {
      category: 'black-belt',
      count: 10,
      fill: 'var(--color-black-belt)',
    },
    {
      category: 'green-belt',
      count: 20,
      fill: 'var(--color-green-belt)',
    },
    {
      category: 'sitg',
      count: 30,
      fill: 'var(--color-sitg)',
    },
    {
      category: '3m',
      count: 40,
      fill: 'var(--color-3m)',
    },
    {
      category: 'kaizen',
      count: 50,
      fill: 'var(--color-kaizen)',
    },
    {
      category: 'poka-yoke',
      count: 60,
      fill: 'var(--color-poka-yoke)',
    },
  ];

  const totalOpportunities = useQuery({
    queryKey: ['total-training'],
    queryFn: async () => {
      return await api
        .post(`/training/export`, {
          filter: [
            {
              $group: {
                _id: '$category',
                count: { $sum: 1 },
              },
            },
            {
              $group: {
                _id: null,
                categories: {
                  $push: {
                    category: '$_id',
                    count: '$count',
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                categories: {
                  $arrayToObject: {
                    $map: {
                      input: '$categories',
                      as: 'item',
                      in: {
                        k: '$$item.category',
                        v: '$$item.count',
                      },
                    },
                  },
                },
              },
            },
          ],
        })
        .then((res) => {
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          if(res.data){
          return res.data.data.data;
          }
        });
    },
  });

  console.log(totalOpportunities.data);

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc: any, curr: { count: any }) => acc + curr.count, 0);
  }, []);
  return (
    <Card className="flex min-h-[420px] flex-col rounded-xl border-primary/50">
     <CardHeader>
        <CardTitle>Category wise Certified Belts</CardTitle>
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
                        <div className="flex w-[100px] text-xs text-muted-foreground">
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
                data={
                  totalOpportunities.data
                    ? transformCategoryData(totalOpportunities.data[0])
                    : transformCategoryData({ categories: {} })
                }
                dataKey="count"
                nameKey="category"
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
                              ? calculateCategorySum(totalOpportunities.data[0] ? totalOpportunities.data[0].categories : {})
                              : 0}
                          </tspan>

                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Certified Belts
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="category" />}
                className="-translate-y-2 flex-wrap gap-2 justify-center items-center px- text-xs"
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
