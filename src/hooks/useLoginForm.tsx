import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, loginschema } from "@schemas/loginSchema";

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginschema>({
    resolver: zodResolver(loginSchema),
  });

  return { register, handleSubmit, errors };
};
