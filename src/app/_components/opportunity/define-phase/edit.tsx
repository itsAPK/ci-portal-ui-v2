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
export const EditDefinePhase = ({ opportunity }: any) => {
  const [open, setOpen] = useState(false);
  const isoPlotFile = useState<File[] | null>([]);
  const pChartFile = useState<File[] | null>([]);
  const conentractionChartFile = useState<File[] | null>([]);
  const processFlowDiagram = useState<File[] | null>([]);
  const departmentKPI = useState<File[] | null>([]);
  const lastSixMonthsTrend = useState<File[] | null>([]);
  const quickWinForAbnormalities = useState<File[] | null>([]);
  const quickWinForToolConditions = useState<File[] | null>([]);

  const queryClient = useQueryClient();
  const addActionPlan = useMutation({
    mutationKey: ['add-define-phase'],
    mutationFn: async (data: DefinePhaseSchema) => {
        if (data.is_conecentration === 'Yes' && (!conentractionChartFile[0] || conentractionChartFile[0].length === 0)) {
            throw new Error('Please upload Conentraction Chart file');
          }
          
          if (data.is_iso_plot === 'Yes' && (!isoPlotFile[0] || isoPlotFile[0].length === 0)) {
            throw new Error('Please upload Isoplot file');
          }
          
          if (data.is_p_chart_done === 'Yes' && (!pChartFile[0] || pChartFile[0].length === 0)) {
            throw new Error('Please upload Pchart file');
          }
    
          if (data.abnormalities_audited_tool_conditions === 'Yes' && (!quickWinForToolConditions[0] || quickWinForToolConditions[0].length === 0)) {
            throw new Error('Please upload Quick Win of Audited Machine & Tool Conditions file');
          }
    
          if (data.abnormalities === 'Yes' && (!quickWinForAbnormalities[0] || quickWinForAbnormalities[0].length === 0)) {
            throw new Error('Please upload Quick Win of Abnormalities file');
          }
      const response = await api
        .patch(`/opportunity/define-phase/${opportunity._id}`, {
          ...data,
          baseline : String(data.baseline),
          target : String(data.target),
          abnormalities : data.abnormalities === 'Yes' ? true : false,
          is_audited_tool_conditions: data.is_audited_tool_conditions === 'Yes' ? true : false,
          is_audited: data.is_audited === 'Yes' ? true : false,
          is_iso_plot: data.is_iso_plot === 'Yes' ? true : false,
          is_p_chart_done: data.is_p_chart_done === 'Yes' ? true : false,
          is_conecentration: data.is_conecentration === 'Yes' ? true : false,
          abnormalities_audited_tool_conditions: data.abnormalities_audited_tool_conditions === 'Yes' ? true : false,
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data;
        });

        return response.data

    
      

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
      toast.success('Define Phase updated successfully', {
        icon: <CheckCircle className="h-4 w-4" />,
      });
      queryClient.refetchQueries({
        queryKey: [`get-opportunity-${opportunity._id}`],
      });
    },
  });

  const handleSubmit = async (data: DefinePhaseSchema) => {
    await addActionPlan.mutateAsync(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger asChild>
        <Button variant="ghost-1" size={'sm'} className="gap-1">
          <RiToolsFill className=" h-4 w-4" /> Edit Define Phase
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xxl h-[80vh] max-w-[1305px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Define Phase</DialogTitle>
        </DialogHeader>
      <div>
        <DefinePhaseForm
          onSubmit={handleSubmit}
          mode="edit"
          isoPlotFile={isoPlotFile}
          pChartFile={pChartFile}
          conentractionChartFile={conentractionChartFile}
          quickWinForAbnormalities={quickWinForAbnormalities}
          quickWinForToolConditions={quickWinForToolConditions}
          defaultValues={{
            ...opportunity.define_phase,
            max_value_of_baseline : String(opportunity.define_phase.max_value_of_baseline),
            min_value_of_baseline : String(opportunity.define_phase.min_value_of_baseline),
            no_machines: String(opportunity.define_phase.no_machines),
            no_streams: String(opportunity.define_phase.no_streams),
            abnormalities : opportunity.define_phase.abnormalities ? 'Yes' : 'No',
            is_audited_tool_conditions: opportunity.define_phase.is_audited_tool_conditions ? 'Yes' : 'No',
            is_audited: opportunity.define_phase.is_audited ? 'Yes' : 'No',
            is_iso_plot: opportunity.define_phase.is_iso_plot ? 'Yes' : 'No',
            is_p_chart_done: opportunity.define_phase.is_p_chart_done ? 'Yes' : 'No',
            is_conecentration: opportunity.define_phase.is_conecentration ? 'Yes' : 'No',
            abnormalities_audited_tool_conditions: opportunity.define_phase.abnormalities_audited_tool_conditions ? 'Yes' : 'No',
          }}
        /></div>
      </DialogContent>
    </Dialog>
  );
};
