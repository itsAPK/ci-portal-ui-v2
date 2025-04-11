import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentCard } from '../overview/content-card';
import { RiBox3Fill } from '@remixicon/react';
import { DocumentCard } from '@/components/document-card';
import { cn } from '@/lib/utils';
import { EditDefinePhase } from './edit';
import { getCookie } from 'cookies-next';
export const DefinePhase = ({
  definePhase,
  isReport = false,
  opportunity,
}: {
  definePhase: any;
  isReport?: boolean;
  opportunity: any;
}) => {
  const userId = getCookie('ci-portal.user_id');

  return (
    <div className="py-4">
      <Card className={cn('bg-white', isReport ? 'border-none shadow-none' : 'border-gray-500/20')}>
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Define Phase</div>
          {!isReport &&
            opportunity.project_leader._id === userId &&
            opportunity.status !== 'Opportunity Completed' && (
              <EditDefinePhase opportunity={opportunity} />
            )}
        </div>
        <CardContent className="overflow-y-auto p-4 pt-0">
          <div className={cn('grid grid-cols-1 gap-4 md:grid-cols-4')}>
            <ContentCard
              isReport={isReport}
              className="col-span-4"
              title={'1. Part number/Machine/Customer/Supplier selected for study'}
              value={definePhase.part_no}
            />
            <ContentCard
              isReport={isReport}
              className="col-span-4"
              title={'2. Other Similar Part numbers/Machine/Customer/Supplier having problem'}
              value={definePhase.part_having_problem}
            />
            <ContentCard
              isReport={isReport}
              className="col-span-4"
              title={
                '3. Other similar Part numbers/Products/Customers/Suppliers not having the problem:'
              }
              value={definePhase.part_not_having_problem}
            />
            <ContentCard
              isReport={isReport}
              className="col-span-4"
              title={'4. Suspected Phenomenon(s) that is creating the problem'}
              value={definePhase.suspected_phenomenon}
            />
            <ContentCard
              isReport={isReport}
              className="col-span-4"
              title={'5. Suspected last manufacturing stage where the problem is generated'}
              value={definePhase.last_manufacturing}
            />
            <ContentCard
              isReport={isReport}
              className="col-span-4"
              title={'6. Process stages where the problem is inspected'}
              value={definePhase.suspected_phenomenon}
            />
            <ContentCard
              isReport={isReport}
              className="col-span-2"
              title={'7. Number of Machines used in the suspected last manufacturing stage'}
              value={definePhase.no_machines}
            />
            <ContentCard
              isReport={isReport}
              className="col-span-2"
              title={'8. Number of Streams within each Machine'}
              value={definePhase.no_streams}
            />
            <ContentCard
              className="col-span-2"
              isReport={isReport}
              title={'9. Baseline'}
              value={`${definePhase.baseline}  ${definePhase.baseline_uom ?? ''}`}
            />
            <ContentCard
              className="col-span-2"
              isReport={isReport}
              title={'10. Target'}
              value={`${definePhase.target} ${definePhase.target_uom ?? ''}`}
            />
            <ContentCard
              isReport={isReport}
              title={'11. Maximum Value of the Baseline in the last 6 months'}
              value={definePhase.max_value_of_baseline}
              className="col-span-2"
            />
            <ContentCard
              isReport={isReport}
              title={'12. In which month the Maximum Value has come'}
              value={definePhase.max_month}
              className="col-span-2"
            />
            <ContentCard
              isReport={isReport}
              title={'13. Minimum Value of the Baseline in the last 6 months'}
              value={definePhase.min_value_of_baseline}
              className="col-span-2"
            />
            <ContentCard
              isReport={isReport}
              title={'14. In which month the Minimum Value has come'}
              value={definePhase.min_month}
              className="col-span-2"
            />{' '}
            <ContentCard
              isReport={isReport}
              title={'15. Response type'}
              className="col-span-2"
              value={definePhase.response_type}
            />{' '}
            <ContentCard
              isReport={isReport}
              title={'16. Specification'}
              className="col-span-2"
              value={definePhase.specification ?? 'Not Applicable'}
            />{' '}
            <ContentCard
              isReport={isReport}
              title={'17. Have you done ISO plot / Attribute Agreement Analysis?'}
              value={definePhase.is_iso_plot ? 'Yes' : 'No'}
              className="col-span-2"
            />
            <ContentCard
              isReport={isReport}
              title={'18. Is Concentration chart applicable?'}
              className="col-span-2"
              value={definePhase.is_conecentration ? 'Yes' : 'No'}
            />
            <ContentCard
              isReport={isReport}
              title={'19. If Yes, what is the conclusion based on Concentration chart'}
              value={definePhase.conculsion}
              className="col-span-2"
            />
            <ContentCard
              isReport={isReport}
              title={'20.  Have you audited the process?'}
              value={definePhase.abnormalities ? 'Yes' : 'No'}
              className="col-span-2"
            />
            <ContentCard
              isReport={isReport}
              title={'21. Any abnormalities in the process audit?'}
              value={definePhase.abnormalities ? 'Yes' : 'No'}
              className="col-span-2"
            />
            <ContentCard
              isReport={isReport}
              title={'22. Have you audited the machine and tool condition?'}
              value={definePhase.is_audited_tool_conditions ? 'Yes' : 'No'}
              className="col-span-2"
            />
            <ContentCard
              isReport={isReport}
              title={'23. Any abnormalities  audited the machine and tool condition?'}
              value={definePhase.abnormalities_audited_tool_conditions ? 'Yes' : 'No'}
              className="col-span-2"
            />
            <ContentCard
              isReport={isReport}
              title={'24. Have you done p-chart?'}
              className="col-span-2"
              value={definePhase.p_chart_done ? 'Yes' : 'No'}
            />
          </div>
          {!isReport && (
            <Card className="my-2">
              <CardHeader>
                <CardTitle className="text-sm">Documents Uploaded</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-4 gap-4 text-sm">
                <DocumentCard
                  documentName="Department KPI"
                  onDelete={() => {}}
                  bucket={definePhase.department_kpi_path}
                />
                <DocumentCard
                  documentName="Last Six Months Trend"
                  onDelete={() => {}}
                  bucket={definePhase.last_six_months_trend}
                />
                <DocumentCard
                  documentName="Process Flow Diagram"
                  onDelete={() => {}}
                  bucket={definePhase.process_flow_diagram}
                />
                {definePhase.iso_plot && (
                  <DocumentCard
                    documentName="ISO Plot"
                    onDelete={() => {}}
                    bucket={definePhase.iso_plot}
                  />
                )}
                {definePhase.concentration_chart && (
                  <DocumentCard
                    documentName="Concentration Chart"
                    onDelete={() => {}}
                    bucket={definePhase.concentration_chart}
                  />
                )}
                {definePhase.p_chart && (
                  <DocumentCard
                    documentName="P Chart"
                    onDelete={() => {}}
                    bucket={definePhase.p_chart}
                  />
                )}
                {definePhase.quick_win_for_abnormalities && (
                  <DocumentCard
                    documentName="Quick Win of Abnormalities"
                    onDelete={() => {}}
                    bucket={definePhase.quick_win_for_abnormalities}
                  />
                )}
                {definePhase.quick_win_for_tool_conditions && (
                  <DocumentCard
                    documentName="Quick Win of Audited Machine & Tool Conditions"
                    onDelete={() => {}}
                    bucket={definePhase.quick_win_for_tool_conditions}
                  />
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
