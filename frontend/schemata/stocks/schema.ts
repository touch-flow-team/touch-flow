import { z } from "zod"
 
export const formSchema = z.object({
  productName: z.string().min(2).max(50),
  image: z.any(),
  purchaseAmount: z.number(),
  saleAmount: z.number(),
  categoryName: z.string().min(2).max(50),
  brandName: z.string().min(2).max(50),
  currentCount: z.number(),
  safeCount: z.number(),
})