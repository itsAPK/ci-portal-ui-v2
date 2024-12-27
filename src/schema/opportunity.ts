import { z } from 'zod';
import { Employee } from './employee';
export const opportunitySchema = z.object({
  company: z.string({ required_error: 'Company is required' }),
  bussiness_unit: z.string({ required_error: 'Bussiness Unit is required' }),
  plant: z.string({ required_error: 'Plant is required' }),
  department: z.string({ required_error: 'Department is required' }),
  category: z.string({ required_error: 'Category is required' }),
  statement: z.string({ required_error: 'Problem Statement is required' }),
  project_type: z.string({ required_error: 'Project Type is required' }).optional(),
  project_nature: z.string({ required_error: 'Nature of Project is required' }).optional(),
  internal_customer_impact: z
    .string({ required_error: 'Impact on Internal Customer is required' })
    .optional(),
  external_customer_impact: z
    .string({ required_error: 'Impact on External Customer is required' })
    .optional(),
  data_analysis: z.string({ required_error: 'Data Oriented Analysis is required' }).optional(),
  cross_ratio: z.string({ required_error: 'Cross Functional Rating is required' }).optional(),
  baseline: z.string({ required_error: 'Baseline is required' }).optional(),
  expected_savings: z.string({ required_error: 'Expected Savings is required' }),
  estimated_savings: z.string({ required_error: 'Estimated Savings is required' }).optional(),
  savings_type: z.string({ required_error: 'Savings Type is required' }).optional(),
  status: z.string({ required_error: 'Status is required' }).optional(),
});

export type OpportunitySchema = z.infer<typeof opportunitySchema>;

export const actionPlanSchema = z.object({
  action: z.string({ required_error: 'Action is required' }),
  status: z.string({ required_error: 'Status is required' }).optional(),
  target_date: z.any({ required_error: 'Target Date is required' }),
  findings: z.string({ required_error: 'Findings is required' }).optional(),
});

export type ActionPlanSchema = z.infer<typeof actionPlanSchema>;

export interface ActionPlan extends ActionPlanSchema {
  _id: { $oid: string };
  created_at: { $date: string };
}

export const teamMemberSchema = z.object({
  employee_id: z.string({ required_error: 'Employee ID is required' }),
  role: z.string({ required_error: 'Role is required' }).optional(),
});

export type TeamMemberSchema = z.infer<typeof teamMemberSchema>;

export interface TeamMember {
  _id: { $oid: string };
  employee: Employee;
  role: string;
}


export const definePhaseSchema = z.object({
  part_no: z.string(),
  baseline: z.string(),
  target: z.any(),
  part_having_problem: z.string(),
  part_not_having_problem: z.string(),
  suspected_phenomenon: z.string(),
  last_manufacturing: z.string(),
  no_machines : z.string(),
  no_streams : z.string(),
  response_type : z.string(),
  process_stage : z.string(),
  max_value_of_baseline : z.string(),
  min_value_of_baseline : z.string(),
  conculsion : z.string(),
  is_conecentration : z.any(),
  is_audited : z.any(),
  max_month : z.string(),
  min_month : z.string(),
  is_iso_plot : z.any(),
  is_p_chart_done : z.any(),
  abnormalities : z.any(),
  is_audited_tool_conditions : z.any(),

});

export type DefinePhaseSchema = z.infer<typeof definePhaseSchema>;

export const ssvToolsSchema = z.object({
  suspected_source : z.string({required_error : 'Suspected Source of Variation is required'}),
  tools : z.string(),
  type_of_ssv : z.string(),
});

export type SSVToolsSchema = z.infer<typeof ssvToolsSchema>;