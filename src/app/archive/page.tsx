import { ContentLayout } from '@/components/content-layout';
import PageUnderDevelopment from '@/components/page-under-development';
import UILayout from '@/components/ui-layout';
import React from 'react';

export default function Archive() {
  return (
    <UILayout>
      <ContentLayout title={'Login'} tags={['authentication', 'login']}>
        <div className="min-h-[80vh] flex items-center justify-center">
           <PageUnderDevelopment  /></div>
      </ContentLayout></UILayout>)
}
