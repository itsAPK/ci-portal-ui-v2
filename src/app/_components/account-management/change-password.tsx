import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { FormWrapper } from '@/components/form-wrapper';
import { FormFieldInput } from '@/components/input-field';

export const ChangePassword = () => {
  const form = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  return (
    <div className="py-4">
      <Card className="border-gray-500/20 bg-white">
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Change Password</div>
        </div>
        <CardContent className="overflow-y-auto p-4 pt-0">
          <FormWrapper form={form} onSubmit={() => {}}>
            <div className="grid h-full grid-cols-1">
              <div className="col-span-4 px-2 py-1 md:px-7">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                <FormFieldInput
              control={form.control}
              name="oldPassword"
              label="Old Password"
              className="col-span-1"
            />
             <FormFieldInput
              control={form.control}
              name="newPassword"
              label="New Password"
              className="col-span-1"
            />
             <FormFieldInput
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              className="col-span-1"
            />
                </div>
              </div>
            </div>
          </FormWrapper>
        </CardContent>
        <CardFooter className="p-4 flex justify-end">
            <Button type="submit" size="lg" className='w-[200px]'>Submit</Button>
          </CardFooter>
      </Card>
             
        
    </div>
  );
};
