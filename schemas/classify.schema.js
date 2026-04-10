import { z } from "zod";

export const classifyQuerySchema = z.object({
  name: z.string({ invalid_type_error: "name must be a string" }).min(1, "Missing or empty name parameter"),
});
