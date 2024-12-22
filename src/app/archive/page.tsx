'use client'
import { ContentLayout } from '@/components/content-layout';
import React from 'react';
import UILayout from '@/components/ui-layout';
import { Loading } from '@/components/ui/loading';
import { Archive } from '../_components/archive/archive';
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
    <Archive/>
          
        </React.Suspense>
    </ContentLayout></UILayout>
  );
}

export default withAuth(Page);