'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { AlertTriangle, Loader } from 'lucide-react';
import { ContentLayout } from '@/components/content-layout';
import api from '@/lib/api';
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { loginSchema, LoginSchema } from '@/schema/login';

export default function Login() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: LoginSchema) => {
      return await api
        .post(`/auth/login`, data)
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
    onError: (error) => {
      toast.error(error.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: (data) => {
      // Handle successful login, maybe redirect or store the token
      form.reset();
      toast.success('Login successful!');
    },
  });

  const onSubmit = form.handleSubmit(async (data: LoginSchema) => {
    await login.mutateAsync(data);
  });

  return (
    <ContentLayout title={'Login'} tags={['authentication', 'login']}>
      <div className="shadow-form container relative mb-7 min-h-[120px] bg-white pt-10 shadow dark:bg-background">
        <Form {...form}>
          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="flex grid-cols-1 flex-col gap-6 md:grid md:grid-cols-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="Enter your email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="Enter your password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center px-3 pb-10 lg:justify-end">
              <Button
                type="submit"
                variant={'default'}
                className="flex h-12 w-[250px] gap-2"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && <Loader className="h-4 w-4 animate-spin" />}
                <span>Login</span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ContentLayout>
  );
}
