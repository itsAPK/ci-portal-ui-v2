'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer ,LabelList} from 'recharts';
import { Loading } from '@/components/ui/loading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { cn } from '@/lib/utils';

const chartConfig = {
  total: {
    label: 'Employees',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const roleMapping = {
  hod: 'HOD',
  project_leader: 'Project Leader',
  admin: 'Admin',
  cs_head: 'CS Head',
  ci_head: 'CI Head',
  lof: 'LOF',
  ci_team: 'CI Team',
};

export function TotalEmployees({
  selectedCompany,
  selectedPlant,
  isDashboard = true,
}: {
  selectedCompany?: string;
  selectedPlant?: string;
  isDashboard?: boolean;
}) {
  const getEmployeesByRole = useQuery({
    queryKey: ['employees-count-by-role', selectedPlant, selectedCompany],
    queryFn: async () => {
      const match: any = {
        ...(selectedPlant && { plant: { $regex: selectedPlant, $options: 'i' } }),
        ...(selectedCompany && { company: { $regex: selectedCompany, $options: 'i' } }),
      };
      return await api
        .post(`/employee/export`, {
          filter: [
            {
              $match: match,
            },
            {
              $group: {
                _id: '$role',
                count: { $sum: 1 },
              },
            },
            {
              "$sort": { "count": -1 }
            }
          ],
        })
        .then((res) => {
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          return res.data;
        });
    },
  });

  const chartData =
    getEmployeesByRole.data?.data.data
      .filter((i: any) => i._id !== 'employee')
      .map((item: any) => ({
        role: roleMapping[item._id as keyof typeof roleMapping] || item._id,
        total: item.count,
      }))
      .sort((a: any, b: any) => b.total - a.total) || [];

  return (
    <Card className={cn('border-primary/50')}>
      <CardHeader className="">{isDashboard && <CardTitle>Role Wise Employees</CardTitle>}</CardHeader>
      <CardContent>
        {!getEmployeesByRole.isLoading ? (
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <ResponsiveContainer  height="100%" width={'100%'}>
              <BarChart data={chartData} margin={{
              top: 20,
            }} >
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis
                  dataKey="role"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
            
            
                />
               
                <ChartTooltip cursor={true} content={<ChartTooltipContent indicator="dashed" />} />
                <Bar dataKey="total" fill="var(--color-total)" barSize={30} radius={4}  ><LabelList
                position="top"
               
                className="fill-foreground"
                fontSize={12}
              /></Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <Loading />
        )}
      </CardContent>
    </Card>
  );
}
