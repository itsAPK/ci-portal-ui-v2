import {z} from "zod"
export const opportunitySchema = z.object({
    company : z.string({required_error :  "Company is required"}),
    bussiness_unit : z.string({required_error :  "Bussiness Unit is required"}),
    plant : z.string({required_error :  "Plant is required"}),
    department : z.string({required_error :  "Department is required"}),
    category : z.string({required_error :  "Category is required"}),
    statement : z.string({required_error :  "Problem Statement is required"}),
    project_type : z.string({required_error :  "Project Type is required"}).optional(),
    project_nature : z.string({required_error :  "Nature of Project is required"}).optional(),
    internal_customer_impact : z.string({required_error :  "Impact on Internal Customer is required"}).optional(),
    external_customer_impact : z.string({required_error :  "Impact on External Customer is required"}).optional(),
    data_analysis : z.string({required_error :  "Data Oriented Analysis is required"}).optional(),
    cross_ratio : z.string({required_error :  "Cross Functional Rating is required"}).optional(),
    baseline : z.string({required_error :  "Baseline is required"}).optional(),
    expected_savings : z.string({required_error :  "Expected Savings is required"}),
})

export type OpportunitySchema = z.infer<typeof opportunitySchema>