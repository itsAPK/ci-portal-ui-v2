import { ContentLayout } from '@/components/content-layout';
import React from 'react';
import UILayout from '@/components/ui-layout';
import { Loading } from '@/components/ui/loading';
import { Document } from '../_components/documents/document';
export default function Templates() {
  return (
    <UILayout>
    <ContentLayout>
      <React.Suspense
          fallback={
            <Loading/>
          }
        >
          
         <Document/>
        </React.Suspense>
    </ContentLayout></UILayout>
  );
}
