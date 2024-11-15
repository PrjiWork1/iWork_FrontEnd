import { z } from "zod";

export const purchasemodalSchema = z.object({
    description: z
        .string()
        .min(5, "Você deve informar uma descrição."),
    selectedItems: z
        .array(z.string())
        .optional()

});

export type purchasemodalschema = z.infer<typeof purchasemodalSchema>;
