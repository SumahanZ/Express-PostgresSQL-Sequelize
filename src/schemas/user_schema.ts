import { z, object, string, union, literal } from "zod";

export const signUpUserInputSchema = object({
  body: object({
    userType: union([literal("user"), literal("admin"), literal("superadmin")], {
      required_error: "User type is required",
    }),
    firstName: string({
      required_error: "First name is required",
    }),
    lastName: string({
      required_error: "Last name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(7, "Password too short - should be 7 chars minimum"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email({ message: "Not a valid email" }),
  }).refine((value) => value.password === value.passwordConfirmation, {
    message: "Passwords do not match",
  }),
});

export const loginUserInputSchema = object({
  body: object({
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

export type SignUpUserInput = z.infer<typeof signUpUserInputSchema>;
export type LoginUserInput = z.infer<typeof loginUserInputSchema>;
