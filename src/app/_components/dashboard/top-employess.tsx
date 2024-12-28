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

export const TopEmployees = ({
  dateRange,
  selectedCompany,
  selectedPlant,
}: {
  dateRange?: DateRange;
  selectedCompany?: string;
  selectedPlant?: string;
}) => {
  const topEmployees = useQuery({
    queryKey: ['top-employees', dateRange, selectedCompany, selectedPlant],
    queryFn: async () => {
      const match: any = {
        formatted_date: {
          ...(dateRange?.from && { $gte: new Date(dateRange.from) }),
          ...(dateRange?.to && { $lte: new Date(dateRange.to) }),
        },
        ...(selectedPlant && { 'plant.name': { $regex: selectedPlant, $options: 'i' } }), // Regex for plant.name
        ...(selectedCompany && { company: { $regex: selectedCompany, $options: 'i' } }),
        project_leader: { $ne: null },
      };

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
            {topEmployees.data &&
              topEmployees.data.map((i: any, index: number) => (
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
