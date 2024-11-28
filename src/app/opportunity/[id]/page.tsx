'use client'
import { ContentLayout } from '@/components/content-layout';
import UILayout from '@/components/ui-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Overview } from '@/app/_components/opportunity/overview/overview';
import { DefinePhase } from '@/app/_components/opportunity/define-phase/define-phase';
import { SSVTools } from '@/app/_components/opportunity/ssv-tools';
import { MeasureAnalysisPhase } from '@/app/_components/opportunity/measure-analysis-phase';
import { ImprovementPhase } from '@/app/_components/opportunity/improvement-phase';
import { ControlPhase } from '@/app/_components/opportunity/control-phase';
import { ProjectClousre } from '@/app/_components/opportunity/project-clousre';
import AvatarCircles  from '@/components/ui/avatar-circles';
const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma",
    name : "Dillion Verma"
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
    name : "Tomo Narifeh"
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
    name : "Rajan Jain"
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
    name : "Bharath Kumar"
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali",
    name : "Sanjay Mali"
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
    profileUrl: "https://github.com/itsarghyadas",
    name : "Arun Kumar"
  },
];


export default function Opportunity() {
  return (
    <UILayout>
      <ContentLayout title={'Opportunity'} tags={['opportunity']}>
        <div className="min-h-[80vh]">
          <div className="p-4 font-bold flex justify-between">Opportunity - {'PCBA/BB/2023-2024/347'} <AvatarCircles numPeople={2} avatarUrls={avatars} /></div>
          <Tabs defaultValue="1" className="w-full px-4">
            <TabsList className="flex h-12  bg-primary/10 px-3 shadow">
              <TabsTrigger className="px-5" value="1">
                Overview
              </TabsTrigger>
              <TabsTrigger className="px-5" value="2">
                Define Phase
              </TabsTrigger>
              <TabsTrigger className="px-5" value="7">
                SSV's & Tools
              </TabsTrigger>
              <TabsTrigger className="px-5" value="3">
                Measure & Analysis Phase
              </TabsTrigger>
              <TabsTrigger className="px-5" value="4">
                Improvement Phase
              </TabsTrigger>
              <TabsTrigger className="px-5" value="5">
                Control Phase
              </TabsTrigger>
              <TabsTrigger className="px-5" value="6">
                Project Closure
              </TabsTrigger>
            </TabsList>
            <TabsContent value="1"><Overview /></TabsContent>
            <TabsContent value="2"><DefinePhase /></TabsContent>
            <TabsContent value="7"><SSVTools /></TabsContent>
            <TabsContent value="3"><MeasureAnalysisPhase /></TabsContent>
            <TabsContent value="4"><ImprovementPhase /></TabsContent>
            <TabsContent value="5"><ControlPhase /></TabsContent>
            <TabsContent value="6"><ProjectClousre /></TabsContent>
          </Tabs>
        </div>
      </ContentLayout>
    </UILayout>
  );
}
