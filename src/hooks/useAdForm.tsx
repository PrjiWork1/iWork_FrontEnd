import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { adSchema, adschema } from "@schemas/adSchema";

export const useAdForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<adschema>({
    resolver: zodResolver(adSchema),
  });

  return { register, handleSubmit, errors };
};
