import { z } from "zod";

export const tableViewSchema = z.object({
  company: z.string({required_error :"Company is required"}),

  savingType: z.string({required_error :"Saving Type is required"}),
  projectCategory: z.string({required_error :"Project Category is required"}),
  startDate: z.string({required_error :"Start Date is required"}),
  endDate: z.string({required_error :"End Date is required"}),
});

export type TableViewSchema = z.infer<typeof tableViewSchema>;
