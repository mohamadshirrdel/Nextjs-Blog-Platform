import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { error: "نام باید حداقل 3 کاراکتر داشته باشد" }),

    email: z.email().trim().toLowerCase(),

    password: z
      .string()
      .min(8, { error: "گذرواژه باید حداقل 8 کاراکتر داشته باشد" }),

    confirmPassword: z.string(),

    // role: z.enum(["user", "admin"]).default("user"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "تکرار رمز عبور با رمز عبور یکسان نیست",
    path: ["confirmPassword"],
  });
