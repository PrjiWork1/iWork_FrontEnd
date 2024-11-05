import { z } from "zod";

export const purchasemodalSchema = z.object({
    optionalDescription: z
        .string()
        // .min(10, "Você deve informar uma descrição.")
        .optional(),
    selectedItems: z
        .array(z.string())
        .optional()

});

export type purchasemodalschema = z.infer<typeof purchasemodalSchema>;
