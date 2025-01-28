'use client';
import { DialogHeader } from '@/components/ui/dialog';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useRef, useState } from 'react';
import { ControlPhase } from './control-phase/control-phase-detail';
import { DefinePhase } from './define-phase/define-phase';
import { ImprovementPhase } from './improvement/improvement-phase';
import { MeasureAnalysisPhase } from './measure-analysis/measure-analysis-phase';
import { Overview } from './overview/overview';
import { ProjectClousre } from './project-closure/project-clousre-detail';
import { SSVTools } from './ssv-tools/ssv-tools-detail';
import { Button } from '@/components/ui/button';
import { RiDownload2Fill, RiFolderUploadFill } from '@remixicon/react';
import PDFLetterhead from '@/components/pdf-letter-head';
import { Department } from '../portal-management/department/department';
import { ManageView } from '@/components/manage-view';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';

const items = [
  'Opportunity Overview',
  'Define Phase',
  'SSV Tools',
  'Measure Analysis Phase',
  'Improvement Phase',
  'Control Phase',
  'Project Closure',
];

export const Report = ({ opportunity }: { opportunity: any }) => {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(items);

  const handleItemToggle = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const container = useRef<HTMLDivElement>(null);
  const pdfExportComponent = useRef<PDFExport>(null);
  const exportPDFWithMethod = () => {
    let element = container.current || document.body;
    savePDF(element, {
      paperSize: 'auto',
      margin: 40,
      fileName: `Opportunity-Report-${opportunity.data.opportunity_id}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost-1" size={'sm'} className="gap-1">
          <RiFolderUploadFill className="h-4 w-4" /> Generate Report
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl h-[80vh] max-w-[1000px] overflow-y-auto bg-white">
        <DialogHeader className="flex justify-between">
          <DialogTitle>Report</DialogTitle>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          {opportunity.data.category === 'Black Belt' && (
            <ManageView
              items={items}
              selectedItems={selectedItems}
              onItemToggle={handleItemToggle}
              label="Toggle Views"
            />
          )}
          <Button variant="ghost-1" size={'sm'} className="gap-1" onClick={exportPDFWithMethod}>
            <RiDownload2Fill className="h-4 w-4" /> Download
          </Button>
        </div>
        <PDFExport
          ref={pdfExportComponent}
          paperSize="auto"
          margin={40}
          fileName={`Report for ${new Date().getFullYear()}`}
          author="KendoReact Team"
        >
          <div
            ref={container}
            className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-2"
          >
            <div>
              <PDFLetterhead.Root>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <PDFLetterhead.Logo
                      src="https://i.ibb.co/RgcG6Cy/logo-2-removebg-preview.png"
                      alt="Company Logo"
                      width={140}
                      height={140}
                    />
                    <PDFLetterhead.Content>
                      <PDFLetterhead.Title>CIRTS Portal Opportunity Report</PDFLetterhead.Title>
                      <PDFLetterhead.Description>
                        {' '}
                        {opportunity.data.opportunity_id}
                      </PDFLetterhead.Description>
                    </PDFLetterhead.Content>
                  </div>
                  <PDFLetterhead.RightData>
                    <p className="text-sm font-semibold">
                      Division: {opportunity.data.plant ? opportunity.data.plant.name : '---'}
                    </p>
                    <p className="text-sm font-semibold">
                      Department: {opportunity.data.department}
                    </p>
                    <p className="text-sm font-semibold">
                      Project Leader:{' '}
                      {opportunity.data.project_leader
                        ? opportunity.data.project_leader.name
                        : '---'}
                    </p>
                  </PDFLetterhead.RightData>
                </div>
              </PDFLetterhead.Root>
            </div>
            {opportunity.data.category === 'Black Belt' ? (
              <>
                {' '}
                {selectedItems.includes('Opportunity Overview') && (
                  <Overview opportunity={opportunity.data} isReport />
                )}
                {selectedItems.includes('Define Phase') && opportunity.data.define_phase && (
                  <DefinePhase definePhase={opportunity.data.define_phase} isReport />
                )}
                {selectedItems.includes('SSV Tools') && opportunity.data.ssv_tools && (
                  <SSVTools ssvTools={opportunity.data.ssv_tools} isReport />
                )}
                {selectedItems.includes('Measure Analysis Phase') &&
                  opportunity.data.measure_analysis_phase && (
                    <MeasureAnalysisPhase ma={opportunity.data.measure_analysis_phase} isReport />
                  )}
                {selectedItems.includes('Improvement Phase') &&
                  opportunity.data.improvement_phase && (
                    <ImprovementPhase improvements={opportunity.data.improvement_phase} isReport />
                  )}
                {selectedItems.includes('Control Phase') && opportunity.data.control_phase && (
                  <ControlPhase contol={opportunity.data.control_phase} isReport />
                )}
                {selectedItems.includes('Project Closure') && opportunity.data.project_closure && (
                  <ProjectClousre projectClosure={opportunity.data.project_closure} isReport />
                )}{' '}
              </>
            ) : (
              <Overview opportunity={opportunity.data} isReport />
            )}
            <div className="flex flex-wrap justify-between gap-5 border-t border-gray-200 px-3 pb-5 pt-2">
              <div className="text-xs font-semibold">
                <div className="text-gray-600">CI HEAD</div>
                <div className="flex items-center gap-2 text-xs">
                  {opportunity.data.category === 'Black Belt' && opportunity.data.is_approved_by_ci_head
                    ? opportunity.data.plant.ci_head
                      ? opportunity.data.plant.ci_head.name
              
                      : '-----'
                    : opportunity.data.plant.ci_head
                      ? opportunity.data.plant.ci_head.name
                      : '-----'}
                </div>
              </div>
              <div className="text-xs font-semibold">
                <div className="text-gray-600">HOD</div>
                <div className="flex items-center gap-2 text-xs">
                  {opportunity.data.category === 'Black Belt' && opportunity.data.is_approved_by_hod
                    ? opportunity.data.plant.hod
                      ? opportunity.data.plant.hod.name
                      : '-----'
                    : opportunity.data.plant.hod
                      ? opportunity.data.plant.hod.name
                      : '-----'}
                </div>
              </div>
              <div className="text-xs font-semibold">
                <div className="text-gray-600">LOF</div>
                <div className="flex items-center gap-2 text-xs">
                  {opportunity.data.category === 'Black Belt' && opportunity.data.is_approved_by_lof
                    ? opportunity.data.plant.lof
                      ? opportunity.data.plant.lof.name
                      : '-----'
                    : opportunity.data.plant.lof
                      ? opportunity.data.plant.lof.name
                      : '-----'}
                </div>
              </div>
              <div className="text-xs font-semibold">
                <div className="text-gray-600">CS HEAD</div>
                <div className="flex items-center gap-2 text-xs">
                  {opportunity.data.category === 'Black Belt' && opportunity.data.is_approved_by_cs_head
                    ? opportunity.data.plant.cs_head
                      ? opportunity.data.plant.cs_head.name
                      : '-----'
                    : opportunity.data.plant.cs_head
                      ? opportunity.data.plant.cs_head.name
                      : '-----'}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 text-xs font-semibold italic text-red-600">
              This is a digitally generated and electronically signed opportunity report.
            </div>
          </div>
        </PDFExport>
      </DialogContent>
    </Dialog>
  );
};
