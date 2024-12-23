import { z } from "zod";

export const adSchema = z.object({
  title: z
    .string()
    .min(3, "Você deve informar o nome do anúncio."),
  description: z.string().min(12, "Você deve informar a descrição."),
  adModel: z.enum(['Normal', 'Dinamico']),
  type: z.enum(['Prata', 'Ouro', 'Diamante'], {
    message: "Você deve escolher o tipo do anúncio."
  }),
  price: z.string().optional(),
  category: z.string().refine((field) => field !== "select", {
    message: "Você precisa escolher uma categoria."
  }),
  agree: z.boolean().refine((field) => field === true, {
    message: "Você precisa concordar com os termos."
  })
});

export type adschema = z.infer<typeof adSchema>;
