'use client'
import { ContentLayout } from '@/components/content-layout';
import { DataTableSkeleton } from '@/components/data-table/skeleton';
import { opportunities } from '@/lib/data';
import React from 'react';
import  Opportunities  from '../_components/opportunity/opportunity';
import UILayout from '@/components/ui-layout';
import { withAuth } from '@/hooks/use-auth';

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
              cellWidths={["10rem", "20rem", "12rem", "12rem", "8rem"]}
              shrinkZero
            />
          }
        >
         <Opportunities/>
        </React.Suspense>
    </ContentLayout></UILayout>
  );
}

export default withAuth(Opportunity);