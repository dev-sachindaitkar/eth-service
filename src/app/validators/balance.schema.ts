import { z } from "zod";

export const balanceParamSchema = z.object({
  params: z.object({
    address: z.string().startsWith("0x").length(42),
  }),
});
