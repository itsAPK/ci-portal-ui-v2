import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { DateRange } from 'react-day-picker';

export const TotalEstimatedSavings = ({
  data,
}: {
  data: {
    opportunity_id: string;
    total_savings: number;
    category : string;
  }[];
}) => {
  return (
    <Card className="rounded-xl shadow-none h-[350px] border-primary/50 overflow-y-auto">
      <CardHeader className="px-7">
        <CardTitle>Top Saving Opportunities </CardTitle>
        <CardDescription>
         
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Opportunity ID</TableHead>
              <TableHead>Total Estimated Savings</TableHead>
              <TableHead>Category</TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody className='w-full'>
            {data.map((i, index) => (
              <TableRow key={i.opportunity_id} className={index % 2 === 0 ? 'bg-accent' : ''}>
             <TableCell>
                  <div className="text-xs">{i.opportunity_id}</div>
                </TableCell>
                <TableCell>
                  <div className="text-xs">₹ {i.total_savings}</div>
                </TableCell>
                <TableCell>
                  <div className="text-xs">{i.category}</div>
                </TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};