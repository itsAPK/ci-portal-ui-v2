'use client';
import { ContentLayout } from '@/components/content-layout';

import UILayout from '@/components/ui-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Tools from '../_components/account-management/tools/tools';
import { getCookie } from 'cookies-next';
import { Company } from '../_components/portal-management/company/company';
import { Department } from '../_components/portal-management/department/department';
import { Plant } from '../_components/portal-management/plant/plant';
import { BussinessUnit } from '../_components/portal-management/bussiness-unit/bussiness-unit';
import { withAuth } from '@/hooks/use-auth';

function PortalManagement() {
  const role = getCookie('ci-portal.role');
  return (
    <UILayout>
      <ContentLayout title={'Login'} tags={['authentication', 'login']}>
      <div className="min-h-[80vh]">
          <div className="p-4 font-bold">Portal Management</div>
          <Tabs defaultValue="1" className="w-full px-4">
            <TabsList className="grid grid-cols-4 h-12 items-center  bg-primary/10 px-3 shadow">
              <TabsTrigger className="px-5 w-full" value="1">
                Company
              </TabsTrigger>
              <TabsTrigger className="px-5" value="2">
                Division
              </TabsTrigger>
              <TabsTrigger className="px-5" value="3">
                 Plant
              </TabsTrigger>
              <TabsTrigger className="px-5" value="4">
                Department
              </TabsTrigger>
            
              
            </TabsList>
            <TabsContent value="1"><Company /></TabsContent>
            <TabsContent value="2"><BussinessUnit /></TabsContent>
            <TabsContent value="3"><Plant /></TabsContent>
            <TabsContent value="4"><Department /></TabsContent>
        
          </Tabs>
        </div>
      </ContentLayout>
    </UILayout>
  );
}

export default withAuth(PortalManagement);