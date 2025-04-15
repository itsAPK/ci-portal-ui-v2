import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Loading } from '@/components/ui/loading';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

import {
  CartesianGrid,
  XAxis,
  Bar,
  LabelList,
  BarChart,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';

const chartConfig = {
  count: {
    label: 'Total',
    color: '#070f0e',
  },
} satisfies ChartConfig;

interface CompanyData {
  _id: string;
  count: number;
}

export const OpportunityByStatus = () => {
  const beltsQuery = useQuery({
    queryKey: ['opportunity-by-status'],
    queryFn: async () => {
      return await api.get(`/opportunity/count/by_status`).then((res) => {
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
        return res.data.data as CompanyData[];
      });
    },
  });

  console.log(beltsQuery.data);

  return (
    <Card className="border-primary/50">
      <CardHeader>
        <CardTitle>BB Opportunities By Status</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {!beltsQuery.isLoading ? (
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <AreaChart
              accessibilityLayer
              data={
                beltsQuery.data
                  ? Object.entries(beltsQuery.data).map(([key, value]) => ({
                      _id: String(key.replace('_', ' ')).replace('_', ' '),
                      count: value,
                    }))
                  : []
              }
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <defs>
                <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-count)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-count)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 3" />
              <XAxis
                dataKey="_id"
                className="text-xs capitalize"
                tickLine={true}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.replace('_', ' ')}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent className="capitalize" />}
              />
              <Area
                dataKey="count"
                fill="url(#fillCount)"
                stroke="var(--color-count)"
                type="bump"
                stackId="a"
                dot={{
                  fill: `var(--color-cont)`,
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList position="top" className="fill-foreground" fontSize={12} />
              </Area>
            </AreaChart>
          </ChartContainer>
        ) : (
          <Loading />
        )}
      </CardContent>
    </Card>
  );
};
