import { ContentLayout } from '@/components/content-layout';
import { DataTableSkeleton } from '@/components/data-table/skeleton';
import { opportunities, trainingData } from '@/lib/data';
import React from 'react';
import { OpportunityTable } from '../_components/opportunity/table';
import UILayout from '@/components/ui-layout';
import { TrainingTable } from '../_components/training/table';

export default function Training() {
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
          <div className="font-semibold  p-3 text-xl text-gray-800 dark:text-white">
            Certified Belts Details

          </div>
          <TrainingTable data={trainingData} pageCount={1} />
        </React.Suspense>
    </ContentLayout></UILayout>
  );
}
