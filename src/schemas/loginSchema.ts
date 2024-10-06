import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(3, "Você deve informar seu email.")
    .email("Informe um email válido."),
  password: z.string().min(12, "Você deve informar sua senha."),
});

export type loginschema = z.infer<typeof loginSchema>;
