import api from '@/lib/api';
import { TeamMember, teamMemberSchema, TeamMemberSchema } from '@/schema/opportunity';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { RiGroup2Fill } from '@remixicon/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormWrapper } from '@/components/form-wrapper';
import { FormFieldInput } from '@/components/input-field';
import { SelectField } from '@/components/select-field-wrapper';
import { AutoComplete, Option } from '@/components/ui/autocomplete';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ViewTeamMembers } from './view-team-members';
export const AddTeamMembers = ({
  opportunity,
  mode,
}: {
  opportunity: any;
  mode?: 'page' | 'dialog';
}) => {
  const form = useForm<TeamMemberSchema>({
    resolver: zodResolver(teamMemberSchema),
  });
  console.log(opportunity)
  const [employeeId, setEmployeeId] = useState<Option>();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [teamMember,setTeamMember] = useState<TeamMemberSchema[]>([]);
  const addTeamMember = useMutation({
    mutationKey: ['add-team-member'],
    mutationFn: async (data: TeamMemberSchema) => {
      return await api
        .post(`/opportunity/team-member/${opportunity._id.$oid}`, { ...data })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data;
        });
    },
    onError: (error: any) => {
      toast.error(error.response.data.detail.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: () => {
      toast.success('Team Member added successfully', {
        icon: <CheckCircle className="h-4 w-4" />,
      });
      queryClient.refetchQueries({
        queryKey: ['get-opportunities'],
      });
    },
  });

  const employee = useMutation({
    mutationKey: ['get-employee'],
    mutationFn: async (search: string) => {
      return await api
        .post(`/employee/export`, {
          filter: [
            {
              $match: {
                plant: { $eq: opportunity.plant.name },
                employee_id: { $regex: search, $options: 'i' },
              },
            },
          ],
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data.data.data;
        });
    },
    onError: (error) => {
      toast.error(error.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: () => {},
  });

  const updateOpportunity = useMutation({
    mutationKey: ['update-opportunity'],
    mutationFn: async () => {
      return await api
        .patch(`/opportunity/${opportunity._id.$oid}`, {
       
          status: 'Teams Updated'
            })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data;
        });
    },
    onError: (error) => {
      toast.error(error.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: () => {
      setOpen(false);
      toast.success('Opportunity Updated successfully', {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
      setOpen(false);
      queryClient.refetchQueries({
        queryKey: ['get-opportunities'],
      });
    },
  });

  const handleSubmit = async (data: TeamMemberSchema) => {
    await addTeamMember.mutateAsync(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex gap-2">
          <RiGroup2Fill className="mr-2 h-4 w-4" /> Add Team Members
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-xl max-w-[925px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Team Members</DialogTitle>
        </DialogHeader>
        <FormWrapper form={form} onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid h-full grid-cols-1 md:grid-cols-4">
            <div className="col-span-4 px-2 py-1 md:px-7">
              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-4">
                <FormField
                  control={form.control}
                  name={'employee_id'}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Select Employee</FormLabel>
                      <Popover modal>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <button
                              type="button"
                              role="combobox"
                              className={cn(
                                'flex h-12 w-full items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-[#099bab] focus-visible:ring-1 focus-visible:ring-[#099bab] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                              )}
                            >
                              {employeeId ? employeeId.label : 'Select Employee'}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="h-full w-full bg-white">
                          <AutoComplete
                            options={
                              employee.data
                                ? employee.data.map((i: any) => ({
                                    value: String(i._id.$oid),
                                    label: `${i.employee_id} - ${i.name}`,
                                  }))
                                : []
                            }
                            onSearch={async (e) => await employee.mutateAsync(e)}
                            value={employeeId}
                            emptyMessage="No Employee Found."
                            isLoading={employee.isPending}
                            onValueChange={(e) => {
                              setEmployeeId(e);
                              field.onChange(e.value);
                            }}
                          />
                        </PopoverContent>
                      </Popover>{' '}
                    </FormItem>
                  )}
                />
                <SelectField
                  control={form.control}
                  name="role"
                  label="Role"
                  placeholder="Select Role"
                  options={['Project Mentor', 'Team Member', 'Project Sponsor'].map((i: any) => ({
                    value: i,
                    label: i,
                  }))}
                />
                <div className="mt-7">
                  <Button type="submit" size="lg" className="w-[200px] gap-2">
                    {addTeamMember.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </FormWrapper>
        {mode === 'dialog' ||
          (opportunity.team_members.length > 0 && <ViewTeamMembers opportunity={opportunity} />)}

          <div className="flex justify-end pt-5">
            <Button onClick={async() => updateOpportunity.mutateAsync()} size="lg" className="w-[200px] gap-3">
              {updateOpportunity.isPending && <Loader2 className="h-4 w-3" />} Submit
            </Button>

          </div>
      </DialogContent>
    </Dialog>
  );
};
