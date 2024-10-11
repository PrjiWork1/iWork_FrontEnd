import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Você deve informar seu nome."),
    surname: z.string().min(3, "Você deve informar seu sobrenome."),
    cpf: z.string().min(14, "Você deve informar seu CPF."),
    birthDate: z.string().min(10, "Você deve informar sua Data de Nascimento"),
    phone: z.string().min(15, "Você deve informar seu Telefone."),
    email: z
      .string()
      .min(3, "Você deve informar seu email.")
      .email("Informe um email válido."),

    password: z.string().refine(
      (value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSymbol = /[!@#$%^&*(),?":{}|<>]/.test(value);
        return hasUpperCase && hasNumber && hasSymbol;
      },
      {
        message:
          "A senha deve conter pelo menos um caractere maiúsculo, um número e um símbolo.",
      }
    ),
    confirmpassword: z
      .string()
      .min(12, "A confirmação de senha deve ter no mínimo 12 caracteres"),
  })
  .refine((field) => field.password === field.confirmpassword, {
    message: "As senhas devem ser iguais.",
    path: ["confirmpassword"],
  });

export type registerschema = z.infer<typeof registerSchema>;
