import { z } from 'zod';
import { BaseDocument } from '@/schema';

export const trainingSchema = z.object({
  employee_id: z.string(),
  name: z.string(),
  department: z.string(),
  grade: z.string(),
  working_location: z.string(),
  bussiness_unit: z.string(),
  plant: z.string(),
  company: z.string(),
  batch: z.string(),
  year: z.string(),
  trainer: z.string(),
  category: z.string(),
});

export type TrainingSchema = z.infer<typeof trainingSchema>;

export interface Training extends TrainingSchema, BaseDocument {}


export const cumulativeTrainingSchema = z.object({
  year: z.string(),
  total_black_belt: z.number(),
  total_green_belt: z.number(),
})

export type CumulativeTrainingSchema = z.infer<typeof cumulativeTrainingSchema>;
export interface CumulativeTraining extends CumulativeTrainingSchema, BaseDocument {}