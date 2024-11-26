import { ContentLayout } from '@/components/content-layout';
import { DataTableSkeleton } from '@/components/data-table/skeleton';
import UILayout from '@/components/ui-layout';
import { opportunities, tools , requestPlant} from '@/lib/data';
import React from 'react';
import { RequestPlantTable } from './table';
import { Card, CardContent } from '@/components/ui/card';

export default function RequestPlant() {
  return (
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
        <Card className="border-gray-500/20 bg-white">
          <div className="flex justify-between p-4">
            <div className="pt-2 text-base font-semibold">Request Plant/Division Change</div>
          </div>
          <CardContent className="overflow-y-auto p-4 pt-0">
            <div className="w-full">
              <RequestPlantTable data={requestPlant} pageCount={1} />
            </div>
          </CardContent>
        </Card>
      </div>
    </React.Suspense>
  );
}
