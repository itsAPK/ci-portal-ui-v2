'use client';
import { ContentLayout } from '@/components/content-layout';

import UILayout from '@/components/ui-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChangePassword } from '../_components/account-management/change-password';
import Tools from '../_components/account-management/tools/tools';
import { AssignCIHead } from '../_components/account-management/assign-ci-head';
import RequestPlant from '../_components/account-management/request-plant/request-plant';
import { getCookie } from 'cookies-next';
import Employee from '../_components/account-management/employee-management/employee';

export default function AddItem() {
  const role = getCookie('ci-portal.role');
  return (
    <UILayout>
      <ContentLayout title={'Login'} tags={['authentication', 'login']}>
      <div className="min-h-[80vh]">
          <div className="p-4 font-bold">Account Management</div>
          <Tabs defaultValue="1" className="w-full px-4">
            <TabsList className="flex justify-start h-12  bg-primary/10 px-3 shadow">
              <TabsTrigger className="px-5" value="1">
                Change Password
              </TabsTrigger>
             {role === 'admin' && <TabsTrigger className="px-5" value="2">
                Tools Management
              </TabsTrigger>}
              {role === 'admin' && <TabsTrigger className="px-5" value="7">
                Assign CI Head User
              </TabsTrigger>}
              <TabsTrigger className="px-5" value="3">
                Request Plant/Divisions
              </TabsTrigger>
             {role === 'admin' && <TabsTrigger className="px-5" value="4">
                Employee Management
              </TabsTrigger>}
              
            </TabsList>
            <TabsContent value="1"><ChangePassword /></TabsContent>
            <TabsContent value="2"><Tools /></TabsContent>
            <TabsContent value="7"><AssignCIHead /></TabsContent>
            <TabsContent value="3"><RequestPlant /></TabsContent>
            <TabsContent value="4"><Employee/></TabsContent>
        
          </Tabs>
        </div>
      </ContentLayout>
    </UILayout>
  );
}
