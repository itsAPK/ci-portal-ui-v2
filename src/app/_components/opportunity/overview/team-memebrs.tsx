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

export const TeamMemebrs = () => {
  return (
    <Card className="mt-3 border-gray-500/20 bg-white">
      <div className="flex justify-between p-4">
        <div className="pt-2 text-base font-semibold">Team Members</div>
        <Button variant="ghost-1" size={'sm'} className="gap-1">
          <RiAddCircleFill className="h-3 w-3" /> Add Team Member
        </Button>
      </div>
      <CardContent className="overflow-y-auto p-4 pt-0">
        <Table className="w-full ">
          <TableHeader>
            <TableRow>
              <TableHead className='text-center text-xs'>Employee Id</TableHead>
              <TableHead className='text-center text-xs'>Employee Name</TableHead>
              <TableHead className='text-center text-xs'>Department</TableHead>
              <TableHead className='text-center text-xs'>Role</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className='text-center text-xs'>{item.id}</TableCell>
                    <TableCell className='text-center text-xs'>{item.name}</TableCell>
                    <TableCell className='text-center text-xs'>{item.department}</TableCell>
                    <TableCell className='text-center text-xs'>{item.role}</TableCell>
                    <TableCell className='flex gap-2 mt-1  justify-end'>
                      <Button variant="ghost-1" className="h-6 flex gap-2" size={'sm'}>
                        <PencilIcon className="h-3 w-3" /> Edit
                      </Button>
                      
                      <Button variant="ghost-1" size={'sm'} className='h-6 flex gap-2 bg-green-500/40 border-green-500 hover:bg-green-500/60'>
                        <RiEyeFill className="h-3 w-3" /> View
                      </Button>
                      <Button variant="ghost-1" size={'sm'} className="h-6 flex gap-2 bg-red-500/40 border-red-500 hover:bg-red-500/60">
                        <RiDeleteBin2Fill className="h-3 w-3" /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
