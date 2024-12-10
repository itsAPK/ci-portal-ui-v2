import { z } from 'zod';

export const loginSchema = z.object({
  employee_id: z.string({required_error: 'Employee ID is required'}),
  password: z.string({required_error : 'Password is Required'}).min(6, 'Password must be at least 6 characters long'),
});

export type LoginSchema = z.infer<typeof loginSchema>;


export const changePasswordSchema = z.object({
  old_password: z.string({required_error : 'Old Password is Required'}).min(6, 'Password must be at least 6 characters long'),
  new_password: z.string({required_error : 'New Password is Required'}).min(6, 'Password must be at least 6 characters long'),
  confirm_password: z.string({required_error : 'Confirm Password is Required'}).min(6, 'Password must be at least 6 characters long'),
}) .superRefine(({ confirm_password, new_password }, ctx) => {
  if (confirm_password !== new_password) {
    ctx.addIssue({
      code: "custom",
      path: ["confirmPassword"],
      message: "The passwords did not match",
    });
  }
});;

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;