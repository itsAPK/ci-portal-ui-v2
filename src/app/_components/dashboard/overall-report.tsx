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
  expired: {
    label: 'Expired',
    color: 'hsl(var(--destructive))',
  },
  ongoing: {
    label: 'Ongoing',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export const OverallReport = ({
  expired,
  opened,
  completed,
  ongoing,
}: {
  expired: number;
  opened: number;
  completed: number;
  ongoing: number;
}) => {
  const chartData: any = [
    {
      status: 'opened',
      count: opened,
      fill: 'var(--color-opened)',
    },
    {
      status: 'completed',
      count: completed,
      fill: 'var(--color-completed)',
    },
    {
      status: 'ongoing',
      count: ongoing,
      fill: 'var(--color-ongoing)',
    },
    {
      status: 'expired',
      count: expired,
      fill: 'var(--color-expired)',
    },
  ];

  console.log(chartData);

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc: any, curr: { count: any }) => acc + curr.count, 0);
  }, []);
  return (
    <Card className="flex min-h-[420px] flex-col rounded-xl shadow-none border-primary/50">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg">Opportunities Status Report</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 pt-10">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[290px] w-full">
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
                      <div className="flex flex-col text-xs text-muted-foreground">
                        {chartConfig[name as keyof typeof chartConfig]?.label || name}

                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          {Number(value)}
                        </div>
                      </div>
                    </>
                  )}
                />
              }
            />
            <Pie
              data={chartData}
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
                           {completed + (ongoing + expired + opened)}
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
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
