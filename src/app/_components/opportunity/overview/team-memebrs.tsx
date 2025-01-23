import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartAreaIcon, PencilIcon, TrendingUpIcon } from 'lucide-react';
import { RiLockFill, RiAddCircleFill, RiEyeFill, RiDeleteBin2Fill } from '@remixicon/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const data = [
  {
    id: 7000004,
    name: 'Doraswamy Naidu. G.	',
    department: 'Facility & Equipment Maintenance	',
    role: 'Team Member',
  },
  {
    id: 7000477,
    name: 'Rukmangadha Naidu. K	',
    department: 'Facility & Equipment Maintenance	',
    role: 'Mentor',
  },
  {
    id: 7000004,
    name: 'Doraswamy Naidu. G.	',
    department: 'Facility & Equipment Maintenance	',
    role: 'Team Member',
  },
  {
    id: 7000477,
    name: 'Rukmangadha Naidu. K	',
    department: 'Facility & Equipment Maintenance	',
    role: 'Mentor',
  },
];

export const TeamMemebrs = ({teamMember,isReport = false} : {teamMember: any,isReport?: boolean}) => {
  return (
    <Card className={cn('mt-3 bg-white',isReport ? 'border-none shadow-none' : 'border-gray-500/20')}>
      <div className="flex justify-between p-4">
        <div className="pt-2 text-base font-semibold">Team Members</div>
      
      </div>
      <CardContent className="overflow-y-auto p-4 pt-0">
        <Table className="w-full ">
          <TableHeader>
            <TableRow>
              <TableHead className='text-center text-xs'>Employee Id</TableHead>
              <TableHead className='text-center text-xs'>Employee Name</TableHead>
              <TableHead className='text-center text-xs'>Department</TableHead>
              <TableHead className='text-center text-xs'>Designation</TableHead>
              <TableHead className='text-center text-xs'>Role</TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {
                teamMember.map((item : any) => (
                  <TableRow key={item.id}>
                    <TableCell className='text-center text-xs'>{item.employee.employee_id}</TableCell>
                    <TableCell className='text-center text-xs'>{item.employee.name}</TableCell>
                    <TableCell className='text-center text-xs'>{item.employee.department}</TableCell>
                    <TableCell className='text-center text-xs'>{item.employee.designation}</TableCell>
                    <TableCell className='text-center text-xs'>{item.role}</TableCell>
                    
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
