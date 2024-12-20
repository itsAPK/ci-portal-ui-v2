import { z } from "zod";

export const employeeSchema = z.object({
  employee_id: z.string(),
  name: z.string(),
  email: z.string(),
  date_of_birth: z.string(),
  date_of_joining: z.string(),
  grade: z.string(),
  role: z.string(),
  designation: z.string(),
  bussiness_unit: z.string(),
  working_location: z.string(),
  plant: z.string(),
  company: z.string(),
  department: z.string(),
});

export type EmployeeSchema = z.infer<typeof employeeSchema>;


export interface Employee extends EmployeeSchema {
  _id: {$oid: string};
}


export const requestPlantSchema = z.object({
  employee_id: z.string(),
  requested_plant_id: z.string(),
  current_plant_id: z.string(),
});

export type RequestPlantSchema = z.infer<typeof requestPlantSchema>;


export const assignCIHeadSchema = z.object({
  plant_id: z.string(),
  ci_head: z.string(),
  hod: z.string(),
  lof: z.string(),
  cs_head: z.string(),
  ci_team: z.string(),
});

export type AssignCIHeadSchema = z.infer<typeof assignCIHeadSchema>;