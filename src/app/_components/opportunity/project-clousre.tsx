import { PencilIcon } from 'lucide-react';
import { RiAddCircleFill, RiDeleteBin2Fill, RiBox3Fill } from '@remixicon/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Documents } from './documents';
import { ContentCard } from '@/app/_components/opportunity/overview/content-card';

export const ProjectClousre = () => {
  return (
    <div className="py-4">
      <Card className="border-gray-500/20 bg-white">
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Project Closure</div>
        </div>
        <CardContent className="flex flex-col gap-4 overflow-y-auto p-4 pt-0">
          <Card>
            <CardContent className="flex flex-col p-4">
              <div className="flex gap-2">
                <RiBox3Fill className="h-4 w-4" />
                <div className="-mt-[2px] text-sm font-semibold text-gray-800">
                  Suspected Causes for Problem
                </div>
              </div>
              <div className="flex gap-2 pl-6 pt-1 text-sm">1. Mounting height</div>
              <div className="flex gap-2 pl-6 pt-1 text-sm">
                2. Container hole punching height from bottom container
              </div>
              <div className="flex gap-2 pl-6 pt-1 text-sm">3. Flange height</div>
              <div className="flex gap-2 pl-6 pt-1 text-sm">
                4 .Paper/PE shim peel off (Paper accumulated between the flange)
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col p-4">
              <div className="flex gap-2">
                <RiBox3Fill className="h-4 w-4" />
                <div className="-mt-[2px] text-sm font-semibold text-gray-800">
                  Pin pointed Root Cause for the problem
                </div>
              </div>

              <div className="flex gap-2 pl-6 pt-1 text-sm">1. Flange height</div>
              <div className="flex gap-2 pl-6 pt-1 text-sm">
                2 .Paper/PE shim peel off (Paper accumulated between the flange)
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col p-4">
              <div className="flex gap-2">
                <RiBox3Fill className="h-4 w-4" />
                <div className="-mt-[2px] text-sm font-semibold text-gray-800">
                  Actions implemented
                </div>
              </div>

              <div className="flex gap-2 pl-6 pt-1 text-sm">
                1. Flange height changed from 10.5-10.7 mm to 10.8-11.1 mm
              </div>
              <div className="flex gap-2 pl-6 pt-1 text-sm">
                2 .Jig box partition plate thickness changed from 3.5 mm to 4.0 mm
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card className="border-gray-500/20 bg-white mt-5">
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Results</div>
        </div>
        <CardContent className="flex flex-col gap-4 overflow-y-auto p-4 pt-0">
          <Card>
            <CardContent className="flex flex-col p-4">
              <div className="flex gap-2">
                <RiBox3Fill className="h-4 w-4" />
                <div className="-mt-[2px] text-sm font-semibold text-gray-800">
                  Project Success Rate
                </div>
              </div>
              <div className="flex gap-2 pl-6 pt-1 text-sm">Successfully Completed</div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-4 gap-4">
            <ContentCard
              title="Tangible benefits"
              value="Rejections % reduced from 5498 to 538 PPM"
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
             <ContentCard
              title="Intangible benefits"
              value="Improved presentation skills"
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
            <ContentCard
              title="Horizontal Deployment"
              value="Done for remaining 3 lines"
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
            <ContentCard
              title="Standardization"
              value="Updated in drawings "
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
