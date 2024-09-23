"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSigninSchema = exports.userSignupSchema = exports.bookUpdateSchema = exports.bookSchema = exports.adminSigninSchema = exports.adminSignupSchema = void 0;
const zod_1 = require("zod");
exports.adminSignupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    fullName: zod_1.z.string(),
    password: zod_1.z.string().min(6)
});
exports.adminSigninSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
exports.bookSchema = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    description: zod_1.z.string(),
    category: zod_1.z.enum(['FICTIONAL', 'NON_FICTIONAL', 'BIOGRAPHY', 'MATH', 'HISTORY', 'SCIENCE', 'PHILOSOPHY', 'OTHER']),
    totalCopies: zod_1.z.coerce.number().min(1, "Total copies must be a positive number"),
    available: zod_1.z.coerce.number().min(0, "Available copies cannot be negative"),
    publication: zod_1.z.coerce.number(),
    image: zod_1.z.string()
});
exports.bookUpdateSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    author: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    category: zod_1.z.enum(['FICTIONAL', 'NON_FICTIONAL', 'BIOGRAPHY', 'MATH', 'HISTORY', 'SCIENCE', 'PHILOSOPHY', 'OTHER']).optional(),
    totalCopies: zod_1.z.coerce.number().optional(), // If present, z.coerce.number() ensures that the value is coerced into a number. This is useful for form data, which often comes as strings, so even if the input is a string like "10", it will be converted into a number (10).
    available: zod_1.z.coerce.number().optional(),
    publication: zod_1.z.coerce.number().optional(),
});
exports.userSignupSchema = zod_1.z.object({
    fullName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
exports.userSigninSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
