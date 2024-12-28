'use client';
import { ContentLayout } from '@/components/content-layout';
import React from 'react';
import UILayout from '@/components/ui-layout';
import { Training } from '../_components/training/training';
import {Loading} from '@/components/ui/loading';
import { withAuth } from '@/hooks/use-auth';
import { CategoryWiseTrainingGraph } from '../_components/training/category-wise-graph';
import { CompanyWiseTrainingCount } from '../_components/training/company-wise-grpah';
function Page() {
  return (
    <UILayout>
    <ContentLayout>
      <React.Suspense
          fallback={
            <Loading/>
          
          }
        >
           <div className="flex justify-between p-4">
            <div className="pt-2 text-base font-semibold">Certified Belts Details</div>
          </div>
          <div className="grid  p-5 grid-cols-1 gap-4 md:grid-cols-1">
            <CategoryWiseTrainingGraph />
           
          </div>
           <Training />
        </React.Suspense>
     
    </ContentLayout></UILayout>
  );
}

export default withAuth(Page);