import { z } from "zod";

export const ZUserSchema = z.object({
  first_name: z.string().min(1, "Name is required"),
  last_name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const ZRegisterSchema = ZUserSchema.pick({
  first_name: true,
  last_name: true,
  email: true,
  password: true,
});
export const ZLoginSchema = ZUserSchema.pick({ email: true, password: true });

export type IUser = z.infer<typeof ZUserSchema>;
export type ILogin = z.infer<typeof ZLoginSchema>;
