import { z } from "zod"

export const waitSettingsSchema = z.object({
    waiting_enabled: z.boolean().default(false).optional(),
    estimated_waiting_time: z.number().default(0).optional(),
    rules_enabled: z.boolean().default(false).optional(),
    rules_content: z.string().default("")

})

export const waitSettingsNumberSchema = z.object({
    number: z.coerce.number(),
})

export const phoneSchema = z.string().refine((value) => /^\d{3}-\d{4}-\d{4}$/g.test(value), {
    message: "Invalid phone number. Please enter a valid format (e.g., 010-1234-5678).",
});
