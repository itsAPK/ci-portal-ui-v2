'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContentCard } from '../opportunity/overview/content-card';

export const CompanyWiseTrainingCount = () => {
  return (
    <Card className="h-[420px] overflow-y-auto rounded-xl border-primary/50 shadow-none">
      <CardHeader className="px-7">
        <CardTitle className="text-base">Company Wise Training Report</CardTitle>
      </CardHeader>
      <CardContent className="gap-4 text-sm">
        <div className="grid grid-cols-1 gap-4 overflow-y-auto md:grid-cols-3">
          <ContentCard title={'Company 1'} value={'10'} />
        </div>
      </CardContent>
    </Card>
  );
};
