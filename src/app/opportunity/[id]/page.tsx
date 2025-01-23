'use client';
import { ContentLayout } from '@/components/content-layout';
import UILayout from '@/components/ui-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Overview } from '@/app/_components/opportunity/overview/overview';
import { DefinePhase } from '@/app/_components/opportunity/define-phase/define-phase';
import { SSVTools } from '@/app/_components/opportunity/ssv-tools/ssv-tools-detail';
import { MeasureAnalysisPhase } from '@/app/_components/opportunity/measure-analysis/measure-analysis-phase';
import { ImprovementPhase } from '@/app/_components/opportunity/improvement/improvement-phase';
import { ControlPhase } from '@/app/_components/opportunity/control-phase/control-phase-detail';
import { ProjectClousre } from '@/app/_components/opportunity/project-closure/project-clousre-detail';
import AvatarCircles from '@/components/ui/avatar-circles';
import { IndexPageProps } from '@/types';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useParams, usePathname } from 'next/navigation';
import { Loading } from '@/components/ui/loading';
import { getRandomColor } from '@/lib/utils';
import { Report } from '@/app/_components/opportunity/report';
import { withAuth } from '@/hooks/use-auth';


function Opportunity({ searchParams }: IndexPageProps) {
  const { id } = useParams();

  const opportunity = useQuery({
    queryKey: ['get-opportunity'],
    queryFn: async (): Promise<any> => {
      return await api
        .get(`/opportunity/${id}`)
        .then((res) => {
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          return res.data.data;
        })
        .catch((err) => {
          throw err;
        });
    },
  });
  return (
    <UILayout>
      <ContentLayout title={'Opportunity'} tags={['opportunity']}>
        <div className="min-h-[80vh]">
          {!opportunity.isLoading ? (
            <>
              {opportunity.data && (
                <>
                  <div className="flex justify-between p-4 font-bold">
                    Opportunity - {opportunity.data.opportunity_id}{' '}
                   <div className='flex justify-end gap-3'>
                    {/* {opportunity.data.team_members.length > 0 && (
                      <AvatarCircles
                        avatarUrls={opportunity.data.team_members.map((i: any) => ({
      
                          profileUrl: '/',
                          name: i.employee.name,
                        }))}
                      />
                    )} */}
                    {opportunity.data.status === 'Opportunity Completed' &&	<Report opportunity={opportunity} />}</div> 
                  </div>
                  <Tabs defaultValue="1" className="w-full px-4">
                    <TabsList className="flex h-12 bg-primary/10 px-3 shadow">
                      <TabsTrigger className="px-5" value="1">
                        Overview
                      </TabsTrigger>
                      <TabsTrigger className="px-5" value="2" disabled={!opportunity.data.define_phase}>
                        Define Phase
                      </TabsTrigger>
                      <TabsTrigger className="px-5" value="7" disabled={!opportunity.data.ssv_tools}>
                        SSV's & Tools
                      </TabsTrigger>
                      <TabsTrigger className="px-5" value="3" disabled={!opportunity.data.measure_analysis_phase}>
                        Measure & Analysis Phase
                      </TabsTrigger>
                      <TabsTrigger className="px-5" value="4" disabled={!opportunity.data.improvement_phase}>
                        Improvement Phase
                      </TabsTrigger>
                      <TabsTrigger className="px-5" value="5" disabled={!opportunity.data.control_phase}>
                        Control Phase
                      </TabsTrigger>
                      <TabsTrigger className="px-5" value="6" disabled={!opportunity.data.project_closure}>
                        Project Closure
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="1">
                      <Overview opportunity={opportunity.data} />
                    </TabsContent>
                    <TabsContent value="2">
                      {opportunity.data.define_phase && <DefinePhase definePhase={opportunity.data.define_phase} />}
                    </TabsContent>
                    <TabsContent value="7">
                   {opportunity.data.ssv_tools && <SSVTools ssvTools={opportunity.data.ssv_tools} />}
                    </TabsContent>
                    <TabsContent value="3">
                      <MeasureAnalysisPhase ma={opportunity.data.measure_analysis_phase} />
                    </TabsContent>
                    <TabsContent value="4">
                    {opportunity.data.improvement_phase && <ImprovementPhase improvements={opportunity.data.improvement_phase} />}
                    </TabsContent>
                    <TabsContent value="5">
                     {opportunity.data.control_phase && <ControlPhase contol={opportunity.data.control_phase} />}
                    </TabsContent>
                    <TabsContent value="6">
                    {opportunity.data.project_closure && <ProjectClousre projectClosure={opportunity.data.project_closure} />}
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </>
          ) : (
            <Loading />
          )}
        </div>
      </ContentLayout>
    </UILayout>
  );
}

export default withAuth(Opportunity);