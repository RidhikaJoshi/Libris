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
    category: z.ZodEnum<["FICTIONAL", "NON_FICTIONAL", "BIOGRAPHY", "MATH", "HISTORY", "SCIENCE", "PHILOSOPHY", "OTHER"]>;
    totalCopies: z.ZodNumber;
    available: z.ZodNumber;
    publication: z.ZodNumber;
    image: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    author: string;
    description: string;
    category: "FICTIONAL" | "NON_FICTIONAL" | "BIOGRAPHY" | "MATH" | "HISTORY" | "SCIENCE" | "PHILOSOPHY" | "OTHER";
    totalCopies: number;
    available: number;
    publication: number;
    image: string;
}, {
    title: string;
    author: string;
    description: string;
    category: "FICTIONAL" | "NON_FICTIONAL" | "BIOGRAPHY" | "MATH" | "HISTORY" | "SCIENCE" | "PHILOSOPHY" | "OTHER";
    totalCopies: number;
    available: number;
    publication: number;
    image: string;
}>;
export type bookInfer = z.infer<typeof bookSchema>;
export declare const bookUpdateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    author: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodEnum<["FICTIONAL", "NON_FICTIONAL", "BIOGRAPHY", "MATH", "HISTORY", "SCIENCE", "PHILOSOPHY", "OTHER"]>>;
    totalCopies: z.ZodOptional<z.ZodNumber>;
    available: z.ZodOptional<z.ZodNumber>;
    publication: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    author?: string | undefined;
    description?: string | undefined;
    category?: "FICTIONAL" | "NON_FICTIONAL" | "BIOGRAPHY" | "MATH" | "HISTORY" | "SCIENCE" | "PHILOSOPHY" | "OTHER" | undefined;
    totalCopies?: number | undefined;
    available?: number | undefined;
    publication?: number | undefined;
}, {
    title?: string | undefined;
    author?: string | undefined;
    description?: string | undefined;
    category?: "FICTIONAL" | "NON_FICTIONAL" | "BIOGRAPHY" | "MATH" | "HISTORY" | "SCIENCE" | "PHILOSOPHY" | "OTHER" | undefined;
    totalCopies?: number | undefined;
    available?: number | undefined;
    publication?: number | undefined;
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
export declare const transactionSchema: z.ZodObject<{
    id: z.ZodString;
    bookId: z.ZodString;
    userId: z.ZodString;
    issueDate: z.ZodEffects<z.ZodString, Date, string>;
    returnDate: z.ZodEffects<z.ZodString, Date, string>;
    Fine: z.ZodNumber;
    status: z.ZodEnum<["ISSUED", "RETURNED", "LOST", "TAKEN"]>;
}, "strip", z.ZodTypeAny, {
    status: "ISSUED" | "RETURNED" | "LOST" | "TAKEN";
    id: string;
    bookId: string;
    userId: string;
    issueDate: Date;
    returnDate: Date;
    Fine: number;
}, {
    status: "ISSUED" | "RETURNED" | "LOST" | "TAKEN";
    id: string;
    bookId: string;
    userId: string;
    issueDate: string;
    returnDate: string;
    Fine: number;
}>;
export type transactionInfer = z.infer<typeof transactionSchema>;
