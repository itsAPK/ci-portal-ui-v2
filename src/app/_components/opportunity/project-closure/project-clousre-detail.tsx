import { PencilIcon } from 'lucide-react';
import { RiAddCircleFill, RiDeleteBin2Fill, RiBox3Fill } from '@remixicon/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Documents } from '../documents';
import { ContentCard } from '@/app/_components/opportunity/overview/content-card';
import { useRouter } from 'next/navigation';
import { DocumentCard } from '@/components/document-card';
import { cn, formatToIndianNumber } from '@/lib/utils';

export const ProjectClousre = ({
  projectClosure,
  isReport = false,
}: {
  projectClosure: any;
  isReport?: boolean;
}) => {
  const router = useRouter();
  return (
    <div className="py-4">
      <Card className={cn('bg-white', isReport ? 'border-none shadow-none' : 'border-gray-500/20')}>
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Project Closure</div>
        </div>
        <CardContent className="flex flex-col gap-4 overflow-y-auto p-4 pt-0">
          <Card className={cn(isReport && 'border-none bg-white shadow-none')}>
            <CardContent className="flex flex-col p-4">
              <div className="flex gap-2">
                <RiBox3Fill className="h-4 w-4" />
                <div className="-mt-[2px] text-sm font-semibold text-gray-800">
                  Suspected Causes for Problem
                </div>
              </div>
              {projectClosure.suspected_cause.map((item: any, index: number) => (
                <div className="flex gap-2 pl-6 pt-1 text-sm">
                  {index + 1}. {item}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className={cn(isReport && 'border-none bg-white shadow-none')}>
            <CardContent className="flex flex-col p-4">
              <div className="flex gap-2">
                <RiBox3Fill className="h-4 w-4" />
                <div className="-mt-[2px] text-sm font-semibold text-gray-800">
                  Pin pointed Root Cause for the problem
                </div>
              </div>
              {projectClosure.pin_pointed_root_cause.map((item: any, index: number) => (
                <div className="flex gap-2 pl-6 pt-1 text-sm">
                  {index + 1}. {item}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className={cn(isReport && 'border-none bg-white shadow-none')}>
            <CardContent className="flex flex-col p-4">
              <div className="flex gap-2">
                <RiBox3Fill className="h-4 w-4" />
                <div className="-mt-[2px] text-sm font-semibold text-gray-800">
                  Actions implemented
                </div>
              </div>

              {projectClosure.actions_implemented.map((item: any, index: number) => (
                <div className="flex gap-2 pl-6 pt-1 text-sm">
                  {index + 1}. {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card
        className={cn('mt-5 bg-white', isReport ? 'border-none shadow-none' : 'border-gray-500/20')}
      >
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Results</div>
        </div>
        <CardContent className="flex flex-col gap-4 overflow-y-auto p-4 pt-0">
          <div className="grid grid-cols-2 gap-4">
            <ContentCard
              isReport={isReport}
              title="Project Success Rate"
              value="Successfully Completed"
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
            <ContentCard
              isReport={isReport}
              title={'Estimated Savings'}
              value={`₹ ${formatToIndianNumber(projectClosure.estimated_savings)}`}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
            <ContentCard
              isReport={isReport}
              title="Tangible benefits"
              value={projectClosure.tangible_benifits}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
            <ContentCard
              isReport={isReport}
              title="Intangible benefits"
              value={projectClosure.intangible_benifits}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
            <ContentCard
              isReport={isReport}
              title="Horizontal Deployment"
              value={projectClosure.horizantal_deployment}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
            <ContentCard
              isReport={isReport}
              title="Standardization"
              value={projectClosure.standardization}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
          </div>
        </CardContent>
      </Card>
      {!isReport && (
        <Card className="my-2">
          <CardHeader>
            <CardTitle className="text-sm">Documents Uploaded</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4 text-sm">
            <DocumentCard
              documentName="Closure Document"
              onDelete={() => {}}
              bucket={projectClosure.closure_document}
            />
            <DocumentCard
              documentName="Before & After Improvement"
              onDelete={() => {}}
              bucket={projectClosure.before_improvement}
            />
            {/* <DocumentCard
            documentName="After Improvement"
            onDelete={() => {}}
            bucket={projectClosure.after_improvement}
          /> */}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
