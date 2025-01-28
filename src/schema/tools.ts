import { z } from "zod";

export const toolsSchema = z.object({
  name: z.string({required_error : 'Name is required'}),
  category: z.array(z.string({required_error : 'Category is required'})).min(1,'At least one category is required'),
  status: z.string().optional().default('Active'),
});

export type ToolsSchema = z.infer<typeof toolsSchema>;

export interface Tools extends ToolsSchema {
    _id: {$oid : string};
}