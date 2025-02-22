import { z } from "zod";
import { Employee } from "./employee";

export const archiveSchema = z.object({
  company: z.string({required_error: 'Company is required'}),
  department: z.string({required_error: 'Department is required'}),
  category: z.string({required_error: 'Category is required'}),
  year: z.string({required_error: 'Year is required'}),
  project_title: z.string({required_error: 'Project title is required'}),
  baseline: z.string({required_error: 'Baseline is required'}),
  target: z.string({required_error: 'Target is required'}),
  result: z.string({required_error: 'Result is required'}),
  plant : z.string({required_error: 'Plant is required'}),
  project_leader : z.any({required_error : "Project Leader is required"})
 
});

export type ArchiveSchema = z.infer<typeof archiveSchema>;

export interface Archive extends ArchiveSchema {
  _id: {$oid: string};
  file_path     : string;
  uploaded_by   : Employee;



}


export const cumulativeArchiveSchema = z.object({
  year: z.string({required_error: 'Year is required'}),
  cumulative: z.number({required_error: 'Cumulative is required'}),
  projects: z.number({required_error: 'Projects is required'}),
});

export type CumulativeArchiveSchema = z.infer<typeof cumulativeArchiveSchema>;

export interface CumulativeArchive extends CumulativeArchiveSchema {
  _id: {$oid: string};

}