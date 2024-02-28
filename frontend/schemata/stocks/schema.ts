import { z } from "zod"
 
export const formSchema = z.object({
  productName: z.string().min(2).max(50),
  image: z.any(),
  purchaseAmount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }),
  saleAmount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }),
  categoryName: z.string().min(2).max(50),
  brandName: z.string().min(2).max(50),
  currentCount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }),
  safeCount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }),
})