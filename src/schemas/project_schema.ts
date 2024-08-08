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
    ownerId: string({
      required_error: "Id of user is required",
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

export const updateProjectInputSchema = object({
  params: object({
    id: number({
      required_error: "Project id is required",
    }),
  }),
  body: object({
    title: string({
      required_error: "Title is required",
    }).optional(),
    isFeatured: boolean({
      required_error: "isFeatured must be true or false",
    }).optional(),
    description: string({
      required_error: "Description cannot be null",
    }).optional(),
    price: number({
      required_error: "Price amount is required",
    })
      .gt(0, { message: "Price amount must be greater than 0" })
      .optional(),
    shortDescription: string({
      required_error: "Short description cannot be null",
    }).optional(),
    productUrl: string({
      required_error: "Product url is required",
    })
      .url({ message: "Product url must be a valid url" })
      .optional(),
    category: string({
      required_error: "Category is required",
    })
      .array()
      .optional(),
    tags: string({ required_error: "Tags must be a string of array" }).array().optional(),
  }),
});

export type CreateProjectInput = z.infer<typeof createProjectInputSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectInputSchema>;
