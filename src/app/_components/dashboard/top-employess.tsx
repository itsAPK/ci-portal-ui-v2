import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { DateRange } from 'react-day-picker';

export const TopEmployees = ({ dateRange }: { dateRange?: DateRange }) => {
  const topEmployees = useQuery({
    queryKey: ['top-employees', dateRange],
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
                project_leader: { $ne: null },
              },
            },
            {
              $group: {
                _id: 'project_leader',
                total_opportunities: { $sum: 1 },
                employee_id: { $first: '$project_leader.employee_id' },
                employee_name: { $first: '$project_leader.name' },
                plant_name: { $first: '$plant.name' },
              },
            },
            {
              $sort: { total_opportunities: -1 },
            },
            {
              $limit: 10,
            },
            {
              $project: {
                _id: 0,
                employee_id: 1,
                employee_name: 1,
                plant_name: 1,
                total_opportunities: 1,
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
  return (
    <Card className="h-[380px] overflow-y-auto rounded-xl border-primary/50 shadow-none">
      <CardHeader className="px-7">
        <CardTitle>Employees with the Most Completed Opportunities</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Employee ID</TableHead>
              <TableHead className="text-center">Employee Name</TableHead>
              <TableHead className="text-center">Plant</TableHead>
              <TableHead className="text-center"> Completed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {topEmployees.data && topEmployees.data.map((i : any, index : number) => (
              <TableRow key={i.employee_id} className={index % 2 === 0 ? 'bg-accent' : ''}>
                <TableCell>
                  <div className="text-center text-xs">{i.employee_id}</div>
                </TableCell>
                <TableCell>
                  <div className="text-center text-xs">{i.employee_name}</div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="text-center text-xs">{i.plant_name}</div>
                </TableCell>
                <TableCell>
                  <div className="text-center text-xs">{i.total_opportunities}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
