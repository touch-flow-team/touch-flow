import { z } from "zod"
 
export const formSchema = z.object({
  productName: z.string().min(2).max(50),
  imageUrl: z.string(),
  purchaseAmount: z.number(),
  buyAmount: z.number(),
  categoryName: z.string().min(2).max(50),
  brandName: z.string().min(2).max(50),
  initialCount: z.number(),
  safeCount: z.number(),
})