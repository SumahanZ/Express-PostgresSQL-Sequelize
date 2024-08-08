"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectInputSchema = exports.createProjectInputSchema = void 0;
const zod_1 = require("zod");
exports.createProjectInputSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: "Title is required",
        }),
        isFeatured: (0, zod_1.boolean)({
            required_error: "isFeatured must be true or false",
        }),
        description: (0, zod_1.string)({
            required_error: "Description cannot be null",
        }),
        price: (0, zod_1.number)({
            required_error: "Price amount is required",
        }).gt(0, { message: "Price amount must be greater than 0" }),
        shortDescription: (0, zod_1.string)({
            required_error: "Short description cannot be null",
        }),
        ownerId: (0, zod_1.string)({
            required_error: "Id of user is required",
        }),
        productUrl: (0, zod_1.string)({
            required_error: "Product url is required",
        }).url({ message: "Product url must be a valid url" }),
        category: (0, zod_1.string)({
            required_error: "Category is required",
        }).array(),
        tags: (0, zod_1.string)({ required_error: "Tags must be a string of array" }).array(),
    }),
});
exports.updateProjectInputSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "Project id is required",
        }),
    }),
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: "Title is required",
        }).optional(),
        isFeatured: (0, zod_1.boolean)({
            required_error: "isFeatured must be true or false",
        }).optional(),
        description: (0, zod_1.string)({
            required_error: "Description cannot be null",
        }).optional(),
        price: (0, zod_1.number)({
            required_error: "Price amount is required",
        })
            .gt(0, { message: "Price amount must be greater than 0" })
            .optional(),
        shortDescription: (0, zod_1.string)({
            required_error: "Short description cannot be null",
        }).optional(),
        productUrl: (0, zod_1.string)({
            required_error: "Product url is required",
        })
            .url({ message: "Product url must be a valid url" })
            .optional(),
        category: (0, zod_1.string)({
            required_error: "Category is required",
        })
            .array()
            .optional(),
        tags: (0, zod_1.string)({ required_error: "Tags must be a string of array" }).array().optional(),
    }),
});
