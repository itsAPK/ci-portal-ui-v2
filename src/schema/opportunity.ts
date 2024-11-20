import {z} from "zod"
export const opportunitySchema = z.object({
    company : z.string({required_error :  "Company is required"}),
    bussiness_unit : z.string({required_error :  "Bussiness Unit is required"}),
    plant : z.string({required_error :  "Plant is required"}),
    department : z.string({required_error :  "Department is required"}),
    category : z.string({required_error :  "Category is required"}),
    problem_statement : z.string({required_error :  "Problem Statement is required"}),
    project_type : z.string({required_error :  "Project Type is required"}),
    nature_of_work : z.string({required_error :  "Nature of Project is required"}),
    impact_on_internal : z.string({required_error :  "Impact on Internal Customer is required"}),
    impact_on_external : z.string({required_error :  "Impact on External Customer is required"}),
    data_oriented_analysis : z.string({required_error :  "Data Oriented Analysis is required"}),
    cross_functional_rating : z.string({required_error :  "Cross Functional Rating is required"}),
    baseline : z.string({required_error :  "Baseline is required"}),
})

export type OpportunitySchema = z.infer<typeof opportunitySchema>