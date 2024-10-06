import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, registerschema } from "@schemas/registerSchema";

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerschema>({
    resolver: zodResolver(registerSchema),
  });

  return { register, handleSubmit, errors };
};
