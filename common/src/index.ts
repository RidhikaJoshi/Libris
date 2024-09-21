import {z} from "zod";

export const adminSignupSchema=z.object({
    email:z.string().email(),
    fullName:z.string(),
    password:z.string().min(6)
});

export type adminSignupInfer=z.infer<typeof adminSignupSchema>;


export const adminSigninSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6)
});

export type adminSigninInfer=z.infer<typeof adminSigninSchema>;


export const bookSchema = z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    category: z.enum(['FICTION', 'NON_FICTION', 'BIOGRAPHY', 'MATH', 'HISTORY', 'SCIENCE', 'PHILOSOPHY', 'OTHER']),
    totalCopies: z.coerce.number().min(1, "Total copies must be a positive number"),
    available: z.coerce.number().min(0, "Available copies cannot be negative"),
    publication: z.coerce.date(),
    image: z.string()
});

export type bookInfer=z.infer<typeof bookSchema>;


export const bookUpdateSchema=z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    description: z.string().optional(),
    category: z.enum(['FICTION', 'NON_FICTION', 'BIOGRAPHY', 'MATH', 'HISTORY', 'SCIENCE', 'PHILOSOPHY', 'OTHER']).optional(),
    totalCopies: z.coerce.number().optional(), // If present, z.coerce.number() ensures that the value is coerced into a number. This is useful for form data, which often comes as strings, so even if the input is a string like "10", it will be converted into a number (10).
    available: z.coerce.number().optional(),
    publication: z.coerce.date().optional(),
});

export type bookUpdateInfer=z.infer<typeof bookUpdateSchema>;

export const userSignupSchema=z.object({
    fullName:z.string(),
    email:z.string().email(),
    password:z.string().min(6)
});

export type userSignupInfer=z.infer<typeof userSignupSchema>;

export const userSigninSchema=z.object({

    email:z.string().email(),
    password:z.string().min(6)
});

export type userSigninInfer=z.infer<typeof userSigninSchema>;

