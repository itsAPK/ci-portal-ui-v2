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
import { formatToIndianNumber } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { DateRange } from 'react-day-picker';

export const TotalEstimatedSavings = ({
  dateRange,
  selectedCompany,
  selectedPlant,
}: {
  dateRange?: DateRange;
  selectedCompany?: string;
  selectedPlant?: string;
}) => {
  const topEstimatedSavings = useQuery({
    queryKey: ['top-estimated-savings', dateRange, selectedCompany, selectedPlant],
    queryFn: async () => {
      const match: any = {
        formatted_date: {
          ...(dateRange?.from && { $gte: new Date(dateRange.from) }),
          ...(dateRange?.to && { $lte: new Date(dateRange.to) }),
        },
        ...(selectedPlant && { 'plant.name': { $regex: selectedPlant, $options: 'i' } }), // Regex for plant.name
        ...(selectedCompany && { company: { $regex: selectedCompany, $options: 'i' } }),
        estimated_savings: { $ne: null },
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
                _id: 'estimated_savings',
                estimated_savings: { $first: '$estimated_savings' },
                opportunity_id: { $first: '$opportunity_id' },
                plant_name: { $first: '$plant.name' },
                project_leader: { $first: '$project_leader.name' },
              },
            },
            {
              $sort: { estimated_savings: -1 },
            },
            {
              $limit: 10,
            },
            {
              $project: {
                _id: 0,
                estimated_savings: 1,
                opportunity_id: 1,
                plant_name: 1,
                project_leader: 1,
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
    <Card className="h-[350px] overflow-y-auto rounded-xl border-primary/50 shadow-none">
      <CardHeader className="px-7">
        <CardTitle>Top Saving Opportunities </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Opportunity ID</TableHead>
              <TableHead> Estimated Savings</TableHead>
              <TableHead>Plant</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {topEstimatedSavings.data &&
              topEstimatedSavings.data.map((i: any, index: number) => (
                <TableRow key={i.opportunity_id} className={index % 2 === 0 ? 'bg-accent' : ''}>
                  <TableCell>
                    <div className="text-center text-xs">{i.opportunity_id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center text-xs">
                      ₹ {formatToIndianNumber(i.estimated_savings)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center text-xs">{i.plant_name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center text-xs">{i.project_leader}</div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
