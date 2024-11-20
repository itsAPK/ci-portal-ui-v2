// Zod Schema and inteface

//example : 

// import { z } from "zod";

// export const createProductCodeSchema = z.object({
//   product_code: z.string({ required_error: "Product Code Required" }),
//   fg_code: z.string({ required_error: "FG Code Required" }),
//   description: z.string({ required_error: "Description Required" }),
//   status: z.string({ required_error: "Product Status Required" }),
//   product_type: z.string({ required_error: "Product Type Required" }),
// });

// export type CreateProductCodeSchema = z.infer<typeof createProductCodeSchema>;

// export const updateProductCodeSchema = z.object({
//   product_code: z.string().optional(),
//   fg_code: z.string().optional(),
//   description: z.string().optional(),
//   status: z.string().optional(),
//   product_type: z.string().optional(),
// });

// export type UpdateProductCodeSchema = z.infer<typeof updateProductCodeSchema>;