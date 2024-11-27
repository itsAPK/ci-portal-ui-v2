'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import {
  AlertTriangle,
  BoxesIcon,
  BoxIcon,
  FileBoxIcon,
  HandCoinsIcon,
  LandmarkIcon,
  Loader,
  UsersRound,
  WalletCardsIcon,
} from 'lucide-react';
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
import { CalendarDatePicker } from '@/components/calender-date-picker';
import { CountCard } from '@/components/count-card';
import { setDate } from 'date-fns';
import { date } from 'zod';
import { OverallReport } from './_components/dashboard/overall-report';
import { CompletedVsOpened } from './_components/dashboard/completed-opened';
import { TotalEstimatedSavings } from './_components/dashboard/top-saving-project';
import { opportunities } from '@/lib/data';
import { CategoryWiseOpportunity } from './_components/dashboard/category-wise-opportunity';
import { TotalEmployees } from './_components/dashboard/user-by-role';
import { EstimatedSavingsOpportunities } from './_components/dashboard/estimated-savings';
import { TopEmployees } from './_components/dashboard/top-employess';

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
      <div className="font-semibold  p-3 pb-0 text-xl text-gray-800 dark:text-white">
            Dashboard

          </div>
        <div className="flex min-h-[80vh] mt-4 items-center justify-center">
         
          <div className="grid grid-cols-1 gap-6  md:grid-cols-12 lg:px-0">
            <div className="col-span-12 flex justify-end pb-3 md:hidden"></div>
            <div className="col-span-12 md:col-span-8">
              <div className="flex w-full grid-cols-1 flex-col gap-5 px-4 md:grid md:grid-cols-2">
                <CountCard
                  icon={<FileBoxIcon className="h-7 w-7 text-purple-500" />}
                  name={' Projects Completed'}
                  color="bg-purple-500/10"
                  count={`${237}`}
                />
                <CountCard
                  icon={<BoxIcon className="h-7 w-7 text-blue-600" />}
                  name={'Projects Opened'}
                  color="bg-blue-600/10"
                  count={`100`}
                />
                <CountCard
                  icon={<BoxesIcon className="h-7 w-7 text-orange-600" />}
                  name={'Project Expired'}
                  color="bg-orange-600/10"
                  count={'122'}
                />
                 <CountCard
                  icon={<WalletCardsIcon className="h-7 w-7 text-amber-600" />}
                  name={'Ongoing Projects'}
                  color="bg-amber-600/10"
                  count={`210`}
                />
                <CountCard
                  icon={<LandmarkIcon className="h-7 w-7 text-red-600" />}
                  name={'Total Savings'}
                  color="bg-red-600/10"
                  count={`₹ ${1078790}`}
                />
                <CountCard
                  icon={<UsersRound className="h-7 w-7 text-indigo-600" />}
                  name={'Total Employees'}
                  color="bg-indigo-600/10"
                  count={`100
                         
                        `}
                />
               
              </div>
             
            </div>
            <div className="md:col-span-4">
              <OverallReport
                expired={237}
                opened={102}
                completed={100}
                ongoing={122}/>
              </div>
              <div className="md:col-span-6 pl-3">
                 <CompletedVsOpened />
              </div>
              <div className="md:col-span-6">
                   <TotalEstimatedSavings data={
                    opportunities.map(i => ({
                      opportunity_id : i.oppurtunity_id,
                      total_savings : i.pl_id,
                      category : i.category,
                    }))
                   } />
              </div>
              <div className="md:col-span-6">
                   <CategoryWiseOpportunity  />
              </div>
              <div className="md:col-span-6">
                   <TotalEmployees />
              </div>
              <div className="md:col-span-6">
                <EstimatedSavingsOpportunities/>
              </div>
              <div className='md:col-span-6'>
                <TopEmployees data={
                  opportunities.map(i => ({
                    employee_id : String(i.pl_id),
                    employee_name : i.pl_name,
                    total : String(i.impact_socre),
                  }))
                } />
              </div>
          </div>
        </div>
      </ContentLayout>
    </UILayout>
  );
}
