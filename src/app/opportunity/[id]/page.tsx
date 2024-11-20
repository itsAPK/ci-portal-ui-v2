import { ContentLayout } from '@/components/content-layout';
import UILayout from '@/components/ui-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Overview } from '@/app/_components/opportunity/overview/overview';

export default function Opportunity() {
  return (
    <UILayout>
      <ContentLayout title={'Opportunity'} tags={['opportunity']}>
        <div className="min-h-[80vh]">
          <div className="p-4 font-bold">Opportunity - {'PCBA/BB/2023-2024/347'}</div>
          <Tabs defaultValue="1" className="w-full px-4">
            <TabsList className="flex h-12  bg-primary/10 px-3 shadow">
              <TabsTrigger className="px-5" value="1">
                Overview
              </TabsTrigger>
              <TabsTrigger className="px-5" value="2">
                Define Phase
              </TabsTrigger>
              <TabsTrigger className="px-5" value="7">
                SSV's & Tools
              </TabsTrigger>
              <TabsTrigger className="px-5" value="3">
                Measure & Analysis Phase
              </TabsTrigger>
              <TabsTrigger className="px-5" value="4">
                Improvement Phase
              </TabsTrigger>
              <TabsTrigger className="px-5" value="5">
                Control Phase
              </TabsTrigger>
              <TabsTrigger className="px-5" value="6">
                Project Closure
              </TabsTrigger>
            </TabsList>
            <TabsContent value="1"><Overview /></TabsContent>
          </Tabs>
        </div>
      </ContentLayout>
    </UILayout>
  );
}
