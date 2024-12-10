import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { FormWrapper } from '@/components/form-wrapper';
import { FormFieldInput } from '@/components/input-field';
import { changePasswordSchema, ChangePasswordSchema } from '@/schema/login';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const ChangePassword = () => {
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const changePassword = useMutation({
    mutationKey: ['changePassword'],
    mutationFn: async (data: ChangePasswordSchema) => {
      return await api
        .post(`/auth/change-password`, data)
        .then((res) => {
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          return res.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    onError: (error : any) => {
      toast.error(error.response.data.detail.message,  {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: (data) => {
      toast.success('Password updated successfully!');
    },
  });

  const onSubmit = async (data: ChangePasswordSchema) => {
    await changePassword.mutateAsync(data);
  };

  return (
    <div className="py-4">
      <Card className="border-gray-500/20 bg-background">
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Change Password</div>
        </div>
        <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="overflow-y-auto p-4 pt-0">
            <div className="grid h-full grid-cols-1">
              <div className="col-span-4 px-2 py-1 md:px-7">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                  <FormFieldInput
                    control={form.control}
                    name="old_password"
                    label="Old Password"
                    className="col-span-1"
                  />
                  <FormFieldInput
                    control={form.control}
                    name="new_password"
                    label="New Password"
                    className="col-span-1"
                  />
                  <FormFieldInput
                    control={form.control}
                    name="confirm_password"
                    label="Confirm Password"
                    className="col-span-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end p-4">
            <Button type="submit" size="lg" className="w-[200px] gap-2">
              {changePassword.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Submit
            </Button>
          </CardFooter>{' '}
        </FormWrapper>
      </Card>
    </div>
  );
};
