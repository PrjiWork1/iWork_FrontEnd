import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  purchasemodalSchema,
  purchasemodalschema,
} from "@schemas/purchasemodalSchema";

export const usePurchaseModalForm = () => {
  const { register, handleSubmit } = useForm<purchasemodalschema>({
    resolver: zodResolver(purchasemodalSchema),
  });

  return { register, handleSubmit };
};
