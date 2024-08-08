"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserInputSchema = exports.signUpUserInputSchema = void 0;
const zod_1 = require("zod");
exports.signUpUserInputSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        userType: (0, zod_1.union)([(0, zod_1.literal)("user"), (0, zod_1.literal)("admin"), (0, zod_1.literal)("superadmin")], {
            required_error: "User type is required",
        }),
        firstName: (0, zod_1.string)({
            required_error: "First name is required",
        }),
        lastName: (0, zod_1.string)({
            required_error: "Last name is required",
        }),
        password: (0, zod_1.string)({
            required_error: "Password is required",
        }).min(7, "Password too short - should be 7 chars minimum"),
        passwordConfirmation: (0, zod_1.string)({
            required_error: "Password confirmation is required",
        }),
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email({ message: "Not a valid email" }),
    }).refine((value) => value.password === value.passwordConfirmation, {
        message: "Passwords do not match",
    }),
});
exports.loginUserInputSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        password: (0, zod_1.string)({
            required_error: "Password is required",
        }).min(6, "Password too short - should be 6 chars minimum"),
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email("Not a valid email"),
    }),
});
