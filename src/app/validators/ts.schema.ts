import { z } from "zod";

export const sendTxSchema = z.object({
  body: z.object({
    privateKey: z.string().startsWith("0x"),
    to: z.string().startsWith("0x"),
    amount: z.string(),
  }),
});
