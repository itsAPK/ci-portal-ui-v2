'use client';

import { TrendingUp } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';
import { Loading } from '@/components/ui/loading';
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
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { cn } from '@/lib/utils';
const chartData = [
  { role: 'Project Leader', total: 186 },
  { role: 'CI Head', total: 285 },
  { role: 'CS Head', total: 237 },
  { role: 'LOF', total: 203 },
  { role: 'HOD', total: 209 },
  { role: 'Admin', total: 24 },
  { role: 'CI Team', total: 24 },
  { role: 'Employee', total: 24 },
];

const chartConfig = {
  total: {
    label: 'Employees',
    color: 'hsl(var(--destructive))',
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
        ...(selectedPlant && { plant: { $regex: selectedPlant, $options: 'i' } }), // Regex for plant.name
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
  return (
    <Card className={cn("h-[350px]", isDashboard ? "overflow-y-auto rounded-xl border-primary/50 shadow-none" : "border-none shadow-none")}>
      <CardHeader className="pb-4">
        {isDashboard && <CardTitle>Total Employees</CardTitle>}
      </CardHeader>
      <CardContent className="pb-0">
        {!getEmployeesByRole.isLoading ? (
          <ChartContainer config={chartConfig} className="mx-auto max-h-[280px]">
            <RadarChart
              data={
                getEmployeesByRole.data &&
                getEmployeesByRole.data.data.data
                  .filter((i: any) => i._id !== 'employee')
                  .map((item: any) => {
                    return {
                      //@ts-ignore
                      role: roleMapping[item._id], // Map ID to full role name
                      total: item.count, // Use the count as total
                    };
                  })
              }
            >
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarGrid className="fill-[--color-total] opacity-20" gridType="circle" />
              <PolarAngleAxis dataKey="role" />
              <Radar dataKey="total" fill="var(--color-total)" fillOpacity={0.5} />
            </RadarChart>
          </ChartContainer>
        ) : (
          <Loading />
        )}
      </CardContent>
    </Card>
  );
}
