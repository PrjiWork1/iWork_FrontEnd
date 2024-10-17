import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Você deve informar seu nome."),
    surname: z.string().min(3, "Você deve informar seu sobrenome."),
    cpf: z.string().min(14, "Você deve informar seu CPF."),
    birthDate: z.string().min(10, "Você deve informar sua data de nascimento"),
    phone: z.string().min(15, "Você deve informar seu telefone."),
    email: z
      .string()
      .min(3, "Você deve informar seu email.")
      .email("Informe um email válido."),

    password: z.string().refine(
      (value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSymbol = /[!@#$%^&*(),?":{}|<>]/.test(value);
        const hasEnoughLetters = value.length == 12
        return hasUpperCase && hasNumber && hasSymbol && hasEnoughLetters;
      },
      {
        message:
          "Você deve informar sua senha.",
      }
    ),
    confirmpassword: z
      .string()
  })
  .refine((field) => field.password === field.confirmpassword, {
    message: "As senhas devem ser iguais.",
    path: ["confirmpassword"],
  });

export type registerschema = z.infer<typeof registerSchema>;
