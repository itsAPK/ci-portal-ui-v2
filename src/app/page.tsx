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
import UILayout from '@/components/ui-layout';
import PageUnderDevelopment from '@/components/page-under-development';

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
  <UILayout>
    <ContentLayout title={'Login'} tags={['authentication', 'login']}>
      <div className="min-h-[80vh] flex items-center justify-center">
         <PageUnderDevelopment  /></div>
    </ContentLayout></UILayout>
  );
}
