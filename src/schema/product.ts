import { z } from 'zod';

export const productCategorySchema = z.object({
  name: z.string({ required_error: 'Required' }),
});

export type ProductCategorySchema = z.infer<typeof productCategorySchema>;

export const productTypesSchema = z.object({
  name: z.string(),
  category_id: z.string(),
});

export type ProductTypeSchema = z.infer<typeof productTypesSchema>;

export const productSchema = z.object({
  project_id: z.string({ required_error: ' Project id is required' }),
  pl_id: z.string().optional(),
  problem_statement: z.string({ required_error: 'Problem statement is required' }),
  division: z.string({ required_error: ' Division is required' }),
  saving_type: z.string({ required_error: ' Saving type is required' }),
  dipartment: z.string({ required_error: ' Department is required' }),
  problem_type: z.string({ required_error: ' Problem Type is required' }),
  estimated_savings: z.string().optional(),
  nature_of_project: z.string().optional(),
  impact_rating_score: z.string({ required_error: 'Impact Rating Score is required' }),
  rate_of_gst: z.string({ required_error: 'Rate of GST is required' }),
  godown: z.string({ required_error: 'Godown is required' }),
  batch: z.string({ required_error: ' batch is required' }),
  quantity: z.string({ required_error: 'Billed quantity is required' }),
  rate: z.string({ required_error: 'Rate is required' }),
  purchase_rate: z.string({ required_error: 'Purchase rate is required' }),
  unit: z.string({ required_error: 'Unit is required' }),
  discount: z.string(),
  total_amount: z.string({ required_error: 'Amount is required' }),
  international_customer: z.string({ required_error: 'International customer is required' }),
});

export type ProductSchema = z.infer<typeof productSchema>;
