'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@/components/ui/loading';

const chartConfig = {
  count: {
    label: 'Total',
    color: '#121111',
  },
} satisfies ChartConfig;

interface CompanyData {
  _id: string;
  count: number;
}

export function CompanyWiseBBGraph() {
  const beltsQuery = useQuery({
    queryKey: ['company-wise-bb'],
    queryFn: async () => {
      return await api
        .post(`/training/export`, {
          filter: [
            {
              $match: { category: 'Black Belt' },
            },
            {
              $group: {
                _id: '$company',
                count: {
                  $sum: 1,
                },
              },
            },
          ],
        })
        .then((res) => {
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          return res.data.data.data as CompanyData[];
        });
    },
  });

  return (
    <Card className="border-primary/50">
      <CardHeader>
        <CardTitle>Company Wise Black Belt Certified Belts</CardTitle>
      </CardHeader>
      <CardContent>
        {!beltsQuery.isLoading ? (
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart
              accessibilityLayer
              data={beltsQuery.data || []}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar
                dataKey="count"
                fill="var(--color-count)"
                radius={4}
                barSize={30}
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <Loading />
        )}
      </CardContent>
    </Card>
  );
}
