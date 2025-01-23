'use client';
import { ContentLayout } from '@/components/content-layout';
import { DataTableSkeleton } from '@/components/data-table/skeleton';
import { opportunities } from '@/lib/data';
import React from 'react';
import Opportunities from '../_components/opportunity/opportunity';
import UILayout from '@/components/ui-layout';
import { withAuth } from '@/hooks/use-auth';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import OtherOpportunities from '../_components/opportunity/other-opportunity/opportunity';
function Opportunity() {
  return (
    <UILayout>
      <ContentLayout>
        <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={['10rem', '20rem', '12rem', '12rem', '8rem']}
              shrinkZero
            />
          }
        >
          <div className="py-4">
            <Card className="border-gray-500/20 bg-background">
              <div className="flex justify-between p-4">
                <div className="pt-2 text-base font-semibold">Opportunities</div>
              </div>
              <CardContent className="overflow-y-auto p-4 pt-0">
                <div className="w-full">
                  <Tabs defaultValue="1" className="w-full px-4">
                    <TabsList className="grid h-12 grid-cols-2 items-center bg-primary/10 px-3 shadow">
                      <TabsTrigger className="w-full px-5" value="1">
                        Black Belt Opportunities
                      </TabsTrigger>
                      <TabsTrigger className="px-5" value="2">
                        Other Opportunities
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="1">
                      <Opportunities />
                    </TabsContent>
                    <TabsContent value="2">
                      <OtherOpportunities />
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>
        </React.Suspense>
      </ContentLayout>
    </UILayout>
  );
}

export default withAuth(Opportunity);
