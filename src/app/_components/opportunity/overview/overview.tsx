import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ContentCard } from './content-card';
import {
  RiBox3Fill,
  RiBankFill,
  RiUser2Fill,
  RiMoneyRupeeCircleFill,
  RiFilePaper2Fill,
  RiPagesFill,
  RiBuildingFill,
  RiBaseStationFill,
  RiStarHalfFill,
  RiUser5Fill,
  RiUser6Fill,
  RiFileTextFill
} from '@remixicon/react';
import { BuildingIcon,PencilIcon } from 'lucide-react';
import {Button} from '@/components/ui/button'
import { ProjectSchedule } from './project-schedule';
import { TeamMemebrs } from './team-memebrs';
export const Overview = () => {
  return (
    <div className="py-4">
      <Card className="border-gray-500/20 bg-white">
        <div className="flex justify-between p-4">
          <div className="text-base font-semibold pt-2 ">Opportunity Overview</div>
          <Button variant="ghost-1" size={'sm'} className=" gap-1">
           <PencilIcon className='w-3 h-3'/>  Edit
          </Button>
        </div>
        <CardContent className=" overflow-y-auto p-4 pt-0">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <ContentCard
              title={'Oppurtunity ID'}
              value={'PCBA/BB/2023-2024/347'}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
            <ContentCard
              title={'Savings Type'}
              value={'Soft'}
              icon={<RiBankFill className="h-4 w-4" />}
            />
            <ContentCard
              title={'PL ID'}
              value={'7000088'}
              icon={<RiUser2Fill className="h-4 w-4" />}
            />
            <ContentCard
              title={'Estimated Savings'}
              value={'₹ 1000000'}
              icon={<RiMoneyRupeeCircleFill className="h-4 w-4" />}
            />
            <ContentCard
              title={'Nature of project'}
              value={'Process Optimization'}
              icon={<RiFilePaper2Fill className="h-4 w-4" />}
            />
            <ContentCard
              title={'Problem Type'}
              value={'Type-4'}
              icon={<RiPagesFill className="h-4 w-4" />}
            />
            <ContentCard
              title={'Division'}
              value={'PCBA'}
              icon={<RiBuildingFill className="h-4 w-4" />}
            />
            <ContentCard
              title={'Department'}
              value={'Materials & FEM'}
              icon={<BuildingIcon className="h-4 w-4" />}
            />
            <ContentCard
              title={'Problem Impact'}
              value={'Medium Impact'}
              icon={<RiBaseStationFill className="h-4 w-4" />}
            />

            <ContentCard
              title={'Impact Rating Score'}
              value={'25'}
              icon={<RiStarHalfFill className="h-4 w-4" />}
            />
            <ContentCard
              title={'Impact on Internal customer'}
              value={'Medium'}
              icon={<RiUser5Fill className="h-4 w-4" />}
            />

            <ContentCard
              title={'Impact on External customer'}
              value={'Medium'}
              icon={<RiUser6Fill className="h-4 w-4" />}
            />

            <ContentCard
              title={'Data Oriented Analysis'}
              value={'Medium data'}
              icon={<RiBuildingFill className="h-4 w-4" />}
            />
            <div className="col-span-2">
              <ContentCard
                title={'Problem Statement'}
                value={'More power consumption in Air compressor'}
                icon={<RiFileTextFill className="h-4 w-4" />}
              />

            </div>
          </div>{' '}
        </CardContent>
      </Card>
      <ProjectSchedule />
      <TeamMemebrs />
    </div>
  );
};
