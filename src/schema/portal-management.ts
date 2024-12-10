import { z } from "zod";

export const companySchema = z.object({
    company_code: z.string({required_error: 'Company code is required'}),
    name: z.string({required_error: 'Name is required'}),
  
});


export type CompanySchema = z.infer<typeof companySchema>;

export interface Company extends CompanySchema {
    _id: string;
  }

export const departmentSchema = z.object({
   name: z.string({required_error: 'Department name is required'}),
department_code: z.string({required_error: 'Department code is required'}),
  
});

export type DepartmentSchema = z.infer<typeof departmentSchema>;

  export interface Department extends DepartmentSchema {
    _id: string;
  }

  export const plantSchema = z.object({
    name: z.string({required_error: 'Plant name is required'}),
    plant_code: z.string({required_error: 'Plant code is required'}),
  
});

export type PlantSchema = z.infer<typeof plantSchema>;

  export interface Plant extends PlantSchema {
    _id: string;
  }

export const bussinessUnitSchema = z.object({
   name: z.string({required_error: 'Bussiness unit name is required'}),
  
});

export type BussinessUnitSchema = z.infer<typeof bussinessUnitSchema>;

  export interface BussinessUnit extends BussinessUnitSchema {
    _id: string;
  }