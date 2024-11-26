'use client';
import { ContentLayout } from '@/components/content-layout';

import PageUnderDevelopment from '@/components/page-under-development';
import UILayout from '@/components/ui-layout';

export default function AddItem() {
  return (
    <UILayout>
      <ContentLayout title={'Login'} tags={['authentication', 'login']}>
        <div className="flex min-h-[80vh] items-center justify-center">
          <PageUnderDevelopment />
        </div>
      </ContentLayout>
    </UILayout>
  );
}
