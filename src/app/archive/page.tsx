import { ContentLayout } from '@/components/content-layout';
import { DataTableSkeleton } from '@/components/data-table/skeleton';
import { archive, opportunities } from '@/lib/data';
import React from 'react';
import { OpportunityTable } from '../_components/opportunity/table';
import UILayout from '@/components/ui-layout';
import { ArchiveTable } from '../_components/archive/table';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { parseFilterInput, buildFilter, parseSort } from '@/lib/filter-parser';
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