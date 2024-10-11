import { z } from "zod";

export const adSchema = z.object({
  title: z
    .string()
    .min(3, "Você deve informar o nome do anúncio."),
  // image: z.instanceof(File),
  price: z.string().min(2, "Você deve informar o valor."),
  // category: z.string().refine((field) => field !== "select", {
  //   message: "Você precisa escolher uma categoria."
  // }),
  description: z.string().min(12, "Você deve informar a descrição."),
  type: z.enum(['Prata', 'Ouro', 'Diamante']),
  // iWorkPro: z.boolean(),
  agree: z.boolean().refine((field) => field === true, {
    message: "Você precisa concordar com os termos."
  })
});

export type adschema = z.infer<typeof adSchema>;
