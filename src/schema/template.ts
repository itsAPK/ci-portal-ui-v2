import { z } from "zod";

export const templateSchema = z.object({
  name: z.string(),
});

export type TemplateSchema = z.infer<typeof templateSchema>;

export interface Template extends TemplateSchema {
  _id: string;
  created_at: string;
  updated_at: string;
  author : string;
  author_id : string;
  path : string;
}