'use client';
import { ContentLayout } from '@/components/content-layout';
import React from 'react';
import UILayout from '@/components/ui-layout';
import { Training } from '../_components/training/training';
import {Loading} from '@/components/ui/loading';
import { withAuth } from '@/hooks/use-auth';

function Page() {
  return (
    <UILayout>
    <ContentLayout>
      <React.Suspense
          fallback={
            <Loading/>
          
          }
        >
           <Training />
        </React.Suspense>
     
    </ContentLayout></UILayout>
  );
}

export default withAuth(Page);