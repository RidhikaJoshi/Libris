import { z } from "zod";
export declare const adminSignupSchema: z.ZodObject<{
    email: z.ZodString;
    fullName: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    fullName: string;
    password: string;
}, {
    email: string;
    fullName: string;
    password: string;
}>;
export type adminSignupInfer = z.infer<typeof adminSignupSchema>;
export declare const adminSigninSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type adminSigninInfer = z.infer<typeof adminSigninSchema>;
export declare const bookSchema: z.ZodObject<{
    title: z.ZodString;
    author: z.ZodString;
    description: z.ZodString;
    category: z.ZodEnum<["FICTION", "NON_FICTION", "BIOGRAPHY", "MATH", "HISTORY", "SCIENCE", "PHILOSOPHY", "OTHER"]>;
    totalCopies: z.ZodNumber;
    available: z.ZodNumber;
    publication: z.ZodDate;
    image: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    author: string;
    description: string;
    category: "FICTION" | "NON_FICTION" | "BIOGRAPHY" | "MATH" | "HISTORY" | "SCIENCE" | "PHILOSOPHY" | "OTHER";
    totalCopies: number;
    available: number;
    publication: Date;
    image: string;
}, {
    title: string;
    author: string;
    description: string;
    category: "FICTION" | "NON_FICTION" | "BIOGRAPHY" | "MATH" | "HISTORY" | "SCIENCE" | "PHILOSOPHY" | "OTHER";
    totalCopies: number;
    available: number;
    publication: Date;
    image: string;
}>;
export type bookInfer = z.infer<typeof bookSchema>;
export declare const bookUpdateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    author: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodEnum<["FICTION", "NON_FICTION", "BIOGRAPHY", "MATH", "HISTORY", "SCIENCE", "PHILOSOPHY", "OTHER"]>>;
    totalCopies: z.ZodOptional<z.ZodNumber>;
    available: z.ZodOptional<z.ZodNumber>;
    publication: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    author?: string | undefined;
    description?: string | undefined;
    category?: "FICTION" | "NON_FICTION" | "BIOGRAPHY" | "MATH" | "HISTORY" | "SCIENCE" | "PHILOSOPHY" | "OTHER" | undefined;
    totalCopies?: number | undefined;
    available?: number | undefined;
    publication?: Date | undefined;
}, {
    title?: string | undefined;
    author?: string | undefined;
    description?: string | undefined;
    category?: "FICTION" | "NON_FICTION" | "BIOGRAPHY" | "MATH" | "HISTORY" | "SCIENCE" | "PHILOSOPHY" | "OTHER" | undefined;
    totalCopies?: number | undefined;
    available?: number | undefined;
    publication?: Date | undefined;
}>;
export type bookUpdateInfer = z.infer<typeof bookUpdateSchema>;
export declare const userSignupSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    fullName: string;
    password: string;
}, {
    email: string;
    fullName: string;
    password: string;
}>;
export type userSignupInfer = z.infer<typeof userSignupSchema>;
export declare const userSigninSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type userSigninInfer = z.infer<typeof userSigninSchema>;
