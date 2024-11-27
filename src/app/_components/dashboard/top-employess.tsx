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

export const TopEmployees = ({
  data,
}: {
  data: {
    employee_id: string;
    employee_name: string;
    total : string;
  }[];
}) => {
  return (
    <Card className="rounded-xl shadow-none h-[380px] border-primary/50 overflow-y-auto">
      <CardHeader className="px-7">
        <CardTitle>Top Opportunities Completed By Employee </CardTitle>
        <CardDescription>
         
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>Employee ID</TableHead>
              <TableHead className='text-center'>Employee Name</TableHead>
              <TableHead className='text-center'> Completed</TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody className='w-full'>
            {data.map((i, index) => (
              <TableRow key={i.employee_id} className={index % 2 === 0 ? 'bg-accent' : ''}>
             <TableCell>
                  <div className="text-xs text-center">{i.employee_id}</div>
                </TableCell>
                <TableCell>
                  <div className="text-xs text-center">{i.employee_name}</div>
                </TableCell>
                <TableCell>
                  <div className="text-xs text-center">{i.total}</div>
                </TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};