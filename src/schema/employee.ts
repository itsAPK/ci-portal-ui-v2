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