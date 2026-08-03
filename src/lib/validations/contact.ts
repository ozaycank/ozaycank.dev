import { z } from "zod";

export const contactFormSchema = z.object({
    fullName: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(60, "Name cannot exceed 60 characters")
        .trim(),
    email: z
        .string()
        .email("Please enter a valid email address")
        .toLowerCase()
        .trim(),
    company: z
        .string()
        .max(50, "Company name cannot exceed 50 characters")
        .trim()
        .optional(),
    subject: z
        .string()
        .min(3, "Subject must be at least 3 characters")
        .max(100, "Subject cannot exceed 100 characters")
        .trim(),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters long")
        .max(1000, "Message cannot exceed 1000 characters")
        .trim(),
    botcheck: z.boolean().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;