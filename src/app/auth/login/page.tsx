'use client';
import WordPullUp from '@/components/ui/word-pull-up';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import 'animate.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '@/schema/login';
import api from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { setCookie } from 'cookies-next';

export default function Login() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: LoginSchema) => {
      return await api
        .post(`/auth/login`, data)
        .then((res) => {
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          console.log(res.data);
          return res.data.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    onError: (error : any) => {
      toast.error(error.response.data.detail.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      setCookie('ci-portal.access_token', data.access_token);
      setCookie('ci-portal.role', data.user.role);
      setCookie('ci-portal.name', data.user.name);
      setCookie('ci-portal.employee_id', data.user.employee_id);
      setCookie('ci-portal.email', data.user.email);
      setCookie('ci-portal.plant', data.user.plant);
      setCookie('ci-portal.company', data.user.company);
      setCookie('ci-portal.department', data.user.department);
      setCookie('ci-portal.bussiness_unit', data.user.bussiness_unit);
      setCookie('ci-portal.user_id', data.user.id);
      form.reset();
      toast.success('Login successful!');
      router.push('/');
    },
  });

  const onSubmit = form.handleSubmit(async (data: LoginSchema) => {
    await login.mutateAsync(data);
  });

  useEffect(() => {
    form.formState.errors.employee_id && toast.error(form.formState.errors.employee_id.message);
    form.formState.errors.password && toast.error(form.formState.errors.password.message);
  }, []);

  return (
    <div className="">
      <form onSubmit={onSubmit} className="slider-thumb ">
        <img
          src="https://i.ibb.co/Qrc2tps/Screenshot-2024-11-06-at-1-50-22-AM-removebg-preview.png"
          width="170px"
          className="login-img"
          style={{ zIndex: 99999 }}
        />
        <label
          htmlFor="username"
          style={{
            color: '#b3d33a',
            fontSize: '14px',
            position: 'absolute',
            left: '280px',
            top: '232px',
          }}
        >
          Employee ID
        </label>
        <input
          type="text"
          id="username"
          {...form.register('employee_id')}
          style={{
            width: '280px',
            padding: '10px',
            borderBottom: '1px solid #b3d33a',
            backgroundColor: 'transparent',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
            position: 'absolute',
            left: '280px',
            color: 'white',
            top: '254px',
            outline: 'none',
          }}
        />

        <label
          style={{
            color: '#b3d33a',
            fontSize: '14px',
            position: 'absolute',
            left: '280px',
            top: '330px',
            outline: 'none',
          }}
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          {...form.register('password')}
          style={{
            width: '280px',
            padding: '10px',
            borderBottom: '1px solid #b3d33a',
            color: 'white',
            backgroundColor: 'transparent',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
            position: 'absolute',
            left: '280px',
            top: '350px',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          className='gap-2 justify-center items-center'
          style={{
            backgroundColor: 'transparent',
            color: 'white',
            padding: '10px 20px',
            border: '2px solid orange',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            position: 'absolute',
            width: '150px',
            left: '320px',
            top: '450px',
            display: 'flex'
          }}
        >
      {login.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Login
        </button>
      </form>
      <div
        className="absolute left-[700px] top-[180px] flex flex-col text-center text-6xl uppercase tracking-widest text-gray-100"
        style={{ fontFamily: '"Monoton", sans-serif' }}
      >
        CIRTS
      </div>
      <div
        className="absolute left-[700px] top-[260px] flex h-[1px] w-[263px] flex-col bg-gray-200 text-center text-7xl font-extrabold uppercase text-green-300"
        style={{ fontFamily: '"Montserrat", sans-serif' }}
      ></div>
      <div
        className="absolute left-[700px] top-[300px] flex flex-col text-4xl font-extrabold uppercase text-gray-100"
        style={{ fontFamily: '"Montserrat", sans-serif' }}
      >
        <div className="animate__animated animate__backInUp">Continuous </div>
        <div className="flex gap-2">
          <div className="animate__animated animate__backInLeft">Improvement </div>
          <div className="animate__animated animate__backInRight"> Robust</div>

        </div>
        <div className="animate__animated animate__backInDown">Tracking System</div>
      </div>
    </div>
  );
}
