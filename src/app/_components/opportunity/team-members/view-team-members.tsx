'use client';
import { Table,TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getCookie } from "cookies-next";
import { DeleteTeamMembers } from "./delete-team-members";
export const ViewTeamMembers = ({opportunity} : {opportunity : any}) => {
  const userId = getCookie('ci-portal.user_id');
    return (
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="rounded-tl-xl bg-primary text-center text-xs">
           Employee ID
        </TableHead>
        <TableHead className="bg-primary text-center text-xs">Name </TableHead>
        <TableHead className="bg-primary text-center text-xs">Department</TableHead>
        <TableHead className="bg-primary text-center text-xs">Role</TableHead>
        <TableHead className="rounded-tr-xl bg-primary text-center text-xs"></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {opportunity.team_members.length > 0 ? (
        opportunity.team_members.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="text-center text-xs">
              {item.employee.employee_id}
            </TableCell>
            <TableCell className="text-center text-xs">{item.employee.name}</TableCell>
            <TableCell className="text-center text-xs">
              {item.employee.department}
            </TableCell>
            <TableCell className="text-center text-xs">
              <Badge
                variant={
                  item.role === 'Team Member'
                    ? 'ghost'
                    : item.role === 'Project Sponsor'
                      ? 'success'
                      : item.role === 'Project Mentor'
                        ? 'leaf'
                        : 'ghost'
                }
              >
                {item.role}
              </Badge>
            </TableCell>
            {userId === opportunity.project_leader._id.$oid && <TableCell className=" flex gap-1">
                <DeleteTeamMembers teamMemberId={item._id.$oid} />
            </TableCell>}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell className="flex items-center justify-center" colSpan={10}>
            No Record Found
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
  );
};