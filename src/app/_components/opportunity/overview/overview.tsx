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
  RiFileTextFill,
  RiBriefcase4Fill,
  RiStackFill,
  RiHonourFill,
  RiIdCardFill,
  RiUserFill,
  RiCalendarTodoFill,
  RiCalendarEventFill,
} from '@remixicon/react';
import { BuildingIcon, PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectSchedule } from './project-schedule';
import { TeamMemebrs } from './team-memebrs';
import { cn, formatToIndianNumber } from '@/lib/utils';
import { DocumentCard } from '@/components/document-card';

export const Overview = ({
  opportunity,
  isReport = false,
}: {
  opportunity: any;
  isReport?: boolean;
}) => {
  return (
    <div className="py-4">
      <Card className={cn('bg-white', isReport ? 'border-none shadow-none' : 'border-gray-500/20')}>
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Opportunity Overview</div>
        </div>
        <CardContent className="overflow-y-auto p-4 pt-0">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="col-span-3">
              <ContentCard
                isReport={isReport}
                title={'Problem Statement'}
                value={opportunity.statement}
                icon={<RiFileTextFill className="h-4 w-4" />}
              />
            </div>
            <ContentCard
              isReport={isReport}
              title={'Oppurtunity ID'}
              value={opportunity.opportunity_id}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
            <ContentCard
              isReport={isReport}
              title={'Category'}
              value={opportunity.category}
              icon={<RiIdCardFill className="h-4 w-4" />}
            />
            <ContentCard
              isReport={isReport}
              title={'Division'}
              value={opportunity.plant.name}
              icon={<RiBuildingFill className="h-4 w-4" />}
            />
            <ContentCard
              isReport={isReport}
              title={'Department'}
              value={opportunity.department}
              icon={<BuildingIcon className="h-4 w-4" />}
            />
            {opportunity.category !== 'Black Belt' && (
              <ContentCard
                isReport={isReport}
                title={'Start Date'}
                value={new Date(opportunity.start_date).toDateString()}
                icon={<RiCalendarEventFill className="h-4 w-4" />}
              />
            )}
            {opportunity.category !== 'Black Belt' && (
              <ContentCard
                isReport={isReport}
                title={'Completed'}
                value={new Date(opportunity.end_date).toDateString()}
                icon={<RiCalendarTodoFill className="h-4 w-4" />}
              />
            )}
            {opportunity.category !== 'Black Belt' &&
              ['Green Belt', 'Kaizen', 'Poka-Yoke', '3M'].includes(opportunity.category) && (
                <ContentCard
                  isReport={isReport}
                  title={
                    opportunity.category === 'Green Belt'
                      ? 'Green Belt Category'
                      : opportunity.category === 'Kaizen'
                        ? 'Kaizen Category'
                        : opportunity.category === 'Poka-Yoke'
                          ? 'Poka-Yoke Type'
                          : opportunity.category === '3M'
                            ? '3M Category'
                            : 'Sub Category'
                  }
                  value={opportunity.sub_category}
                  icon={<RiFilePaper2Fill className="h-4 w-4" />}
                />
              )}

            <ContentCard
              isReport={isReport}
              title="Expected Savings in Lakhs Rs"
              value={opportunity.expected_savings}
              icon={<RiBriefcase4Fill className="h-4 w-4" />}
            />
            <ContentCard
              isReport={isReport}
              title={'Estimated Savings'}
              value={`₹ ${formatToIndianNumber(opportunity.estimated_savings)}`}
              icon={<RiMoneyRupeeCircleFill className="h-4 w-4" />}
            />
            {opportunity.project_leader && (
              <>
                <ContentCard
                  isReport={isReport}
                  title={'PL ID'}
                  value={opportunity.project_leader.employee_id}
                  icon={<RiUser2Fill className="h-4 w-4" />}
                />
                <ContentCard
                  isReport={isReport}
                  title={'PL Name'}
                  value={opportunity.project_leader.name}
                  icon={<RiUserFill className="h-4 w-4" />}
                />
              </>
            )}
            {opportunity.category === 'Black Belt' && (
              <>
                <ContentCard
                  isReport={isReport}
                  title={'Savings Type'}
                  value={opportunity.savings_type}
                  icon={<RiBankFill className="h-4 w-4" />}
                />

                <ContentCard
                  isReport={isReport}
                  title={'Problem Impact'}
                  value={opportunity.project_impact}
                  icon={<RiBaseStationFill className="h-4 w-4" />}
                />

                <ContentCard
                  isReport={isReport}
                  title={'Impact Rating Score'}
                  value={opportunity.project_impact}
                  icon={<RiStarHalfFill className="h-4 w-4" />}
                />
                <ContentCard
                  isReport={isReport}
                  title={'Nature of project'}
                  value={opportunity.project_nature}
                  icon={<RiFilePaper2Fill className="h-4 w-4" />}
                />
                <ContentCard
                  isReport={isReport}
                  title={'Problem Type'}
                  value={opportunity.project_type}
                  icon={<RiPagesFill className="h-4 w-4" />}
                />

                <ContentCard
                  isReport={isReport}
                  title={'Impact on Internal customer'}
                  value={opportunity.internal_customer_impact}
                  icon={<RiUser5Fill className="h-4 w-4" />}
                />

                <ContentCard
                  isReport={isReport}
                  title={'Impact on External customer'}
                  value={opportunity.external_customer_impact}
                  icon={<RiUser6Fill className="h-4 w-4" />}
                />

                <ContentCard
                  isReport={isReport}
                  title={'Data Oriented Analysis'}
                  value={opportunity.data_analysis}
                  icon={<RiBuildingFill className="h-4 w-4" />}
                />
                <ContentCard
                  isReport={isReport}
                  title={'Cross Function Rating'}
                  value={opportunity.cross_ratio}
                  icon={<RiHonourFill className="h-4 w-4" />}
                />
                <ContentCard
                  isReport={isReport}
                  title={'Baseline'}
                  value={opportunity.baseline}
                  icon={<RiStackFill className="h-4 w-4" />}
                />
              </>
            )}
          </div>{' '}
        </CardContent>
      </Card>
      {opportunity.team_members.length > 0 && (
        <TeamMemebrs
          isReport={isReport}
          teamMember={opportunity.team_members.length > 0 ? opportunity.team_members : []}
        />
      )}
      {opportunity.category !== 'Black Belt' && !isReport && (
        <div className="py-4">
          {' '}
          <DocumentCard
            documentName="Uploaded Document"
            onDelete={() => {}}
            bucket={opportunity.file}
          />{' '}
        </div>
      )}
      {/* <ProjectSchedule isReport={isReport} /> */}
     
    </div>
  );
};
