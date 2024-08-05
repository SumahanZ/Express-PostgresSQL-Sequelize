import { z, object, string, union, literal } from "zod";

z.union([z.string(), z.number()]);

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
    }).min(6, "Password too short -  should be 6 chars minimum"),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

export type SignUpUserInput = z.infer<typeof signUpUserInputSchema>;
