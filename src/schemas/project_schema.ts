import { z, object, string, boolean, number, array } from "zod";

export const createProjectInputSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    isFeatured: boolean({
      required_error: "isFeatured must be true or false",
    }),
    description: string({
      required_error: "Description cannot be null",
    }),
    price: number({
      required_error: "Price amount is required",
    }).gt(0, { message: "Price amount must be greater than 0" }),
    shortDescription: string({
      required_error: "Short description cannot be null",
    }),
    productUrl: string({
      required_error: "Product url is required",
    }).url({ message: "Product url must be a valid url" }),
    category: string({
      required_error: "Category is required",
    }).array(),
    tags: string({ required_error: "Tags must be a string of array" }).array(),
  }),
});

export type CreateProjectInput = z.infer<typeof createProjectInputSchema>;
