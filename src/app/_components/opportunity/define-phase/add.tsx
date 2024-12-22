'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RiToolsFill } from '@remixicon/react';
import { useState } from 'react';
import api from '@/lib/api';
import { DefinePhaseSchema } from '@/schema/opportunity';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { DefinePhaseForm } from './form';
import { Button } from '@/components/ui/button';
export const AddDefinePhase = ({ opportunityId }: any) => {
  const [open, setOpen] = useState(false);
  const isoPlotFile = useState<File[] | null>([]);
  const pChartFile = useState<File[] | null>([]);
  const conentractionChartFile = useState<File[] | null>([]);
  const processFlowDiagram = useState<File[] | null>([]);
  const departmentKPI = useState<File[] | null>([]);
  const lastSixMonthsTrend = useState<File[] | null>([]);

  const queryClient = useQueryClient();
  const addActionPlan = useMutation({
    mutationKey: ['add-define-phase'],
    mutationFn: async (data: DefinePhaseSchema) => {
      if ((!departmentKPI[0] || departmentKPI[0].length === 0)) {
        throw new Error('Please upload Department KPI file');
      }
      
      if ((!lastSixMonthsTrend[0] || lastSixMonthsTrend[0].length === 0)) {
        throw new Error('Please upload Last Six Months Trend file');
      }
      
      if ((!processFlowDiagram[0] || processFlowDiagram[0].length === 0)) {
        throw new Error('Please upload Process Flow Diagram file');
      }
      
      if (data.is_conecentration === 'Yes' && (!conentractionChartFile[0] || conentractionChartFile[0].length === 0)) {
        throw new Error('Please upload Conentraction Chart file');
      }
      
      if (data.is_iso_plot === 'Yes' && (!isoPlotFile[0] || isoPlotFile[0].length === 0)) {
        throw new Error('Please upload Isoplot file');
      }
      
      if (data.is_p_chart_done === 'Yes' && (!pChartFile[0] || pChartFile[0].length === 0)) {
        throw new Error('Please upload Pchart file');
      }
      const response = await api
        .post(`/opportunity/define-phase/${opportunityId}`, {
          ...data,
          is_audited: data.is_audited === 'Yes' ? true : false,
          is_iso_plot: data.is_iso_plot === 'Yes' ? true : false,
          is_p_chart_done: data.is_p_chart_done === 'Yes' ? true : false,
          is_conecentration: data.is_conecentration === 'Yes' ? true : false,
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data;
        });

      if (departmentKPI && departmentKPI[0] && departmentKPI[0].length > 0) {
        const departmentKPIFormData = new FormData();
        departmentKPIFormData.append('file', departmentKPI[0][0]);

        const departmentKpi = await api
          .post(
            `/opportunity/define-phase/upload/department-kpi/${opportunityId}`,
            departmentKPIFormData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.message);
            toast.success('Department KPI uploaded successfully', {
              icon: <CheckCircle className="h-4 w-4" />,
            });
            return res.data;
          });
      }

      if(lastSixMonthsTrend && lastSixMonthsTrend[0] && lastSixMonthsTrend[0].length > 0) {
        const lastSixMonthsTrendFormData = new FormData();
        lastSixMonthsTrendFormData.append('file', lastSixMonthsTrend[0][0]);
        const lastSixMonthsTrendResponse = await api
          .post(
            `/opportunity/define-phase/upload/last-six-months-trend/${opportunityId}`,
           lastSixMonthsTrendFormData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.message);
            toast.success('Last Six Months Trend uploaded successfully', {
              icon: <CheckCircle className="h-4 w-4" />,
            });
            return res.data;
          });
      }

      if (processFlowDiagram && processFlowDiagram[0] && processFlowDiagram[0].length > 0) {
        const processFlowDiagramFormData = new FormData();
        processFlowDiagramFormData.append('file', processFlowDiagram[0][0]);
        const processFlowDiagramResponse = await api
          .post(
            `/opportunity/define-phase/upload/process-flow-diagram/${opportunityId}`,
        processFlowDiagramFormData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.message);
            toast.success('Process Flow Diagram uploaded successfully', {
              icon: <CheckCircle className="h-4 w-4" />,
            });
            return res.data;
          });
      }

      if (isoPlotFile && isoPlotFile[0] && isoPlotFile[0].length > 0) {
        const isoPlotFormData = new FormData();
        isoPlotFormData.append('file', isoPlotFile[0][0]);
        const isoPlotResponse = await api
          .post(
            `/opportunity/define-phase/upload/iso-plot/${opportunityId}`,
         isoPlotFormData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.message);
            toast.success('Iso Plot uploaded successfully', {
              icon: <CheckCircle className="h-4 w-4" />,
            });
            return res.data;
          });
      }

      if (conentractionChartFile && conentractionChartFile[0] && conentractionChartFile[0].length > 0) {
        const conentractionChartFormData = new FormData();
        conentractionChartFormData.append('file', conentractionChartFile[0][0]);
        const conentractionChartResponse = await api
          .post(
            `/opportunity/define-phase/upload/concentration-chart/${opportunityId}`,
         conentractionChartFormData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.message);
            toast.success('Conentraction Chart uploaded successfully', {
              icon: <CheckCircle className="h-4 w-4" />,
            });
            return res.data;
          });
      }

      if (pChartFile && pChartFile[0] && pChartFile[0].length > 0) {
        const pChartFormData = new FormData();
        pChartFormData.append('file', pChartFile[0][0]);
        const pChartResponse = await api
          .post(
            `/opportunity/define-phase/upload/p-chart/${opportunityId}`,
            pChartFormData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.message);
            toast.success('Pchart uploaded successfully', {
              icon: <CheckCircle className="h-4 w-4" />,
            });
            return res.data;
          });
      }

    },
    onError: (error: any) => {
      if(error.message){
        toast.error(error.message, {
          icon: <AlertTriangle className="h-4 w-4" />,
        });
      }else{
      toast.error(error.response.data.detail.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      })};
    },
    onSuccess: () => {
      setOpen(false);
      toast.success('Define Phase added successfully', {
        icon: <CheckCircle className="h-4 w-4" />,
      });
      queryClient.refetchQueries({
        queryKey: ['get-opportunities'],
      });
    },
  });

  const handleSubmit = async (data: DefinePhaseSchema) => {
    await addActionPlan.mutateAsync(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger asChild>
        <Button variant="link" size={'sm'} className="gap-1">
          <RiToolsFill className=" h-4 w-4" /> Add Define Phase
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl h-[80vh] max-w-[1005px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Define Phase</DialogTitle>
        </DialogHeader>
      <div>
        <DefinePhaseForm
          onSubmit={handleSubmit}
          isoPlotFile={isoPlotFile}
          pChartFile={pChartFile}
          conentractionChartFile={conentractionChartFile}
          processFlowDiagram={processFlowDiagram}
          departmentKPI={departmentKPI}
          lastSixMonthsTrend={lastSixMonthsTrend}
        /></div>
      </DialogContent>
    </Dialog>
  );
};
