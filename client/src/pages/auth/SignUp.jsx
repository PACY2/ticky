import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../../components/Button";
import useSignUp from "../../hooks/useSignUp";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    name: z.string().min(3),
    phone: z.string().min(10).max(10),
    address: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  })
  .refine(
    ({ password, password_confirmation }) => password === password_confirmation,
    {
      message: "Password confirmation must match password",
      path: "password_confirmation",
    }
  );

export default function SignUp() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const handleError = (error) => {
    if (error.response.data.content instanceof Array) {
      const issues = error.response.data.content;
      issues.forEach((issue) => {
        form.setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const { mutate: signUp } = useSignUp();

  const onsubmit = (data) =>
    signUp(data, {
      onError: handleError,
      onSuccess: () => navigate("/"),
    });

  return (
    <form
      onSubmit={form.handleSubmit(onsubmit)}
      className="bg-white p-4 rounded-md drop-shadow-md w-full max-w-sm flex flex-col gap-4"
    >
      <Input
        error={form.formState.errors.name?.message}
        placeholder="Nom..."
        {...form.register("name")}
      />
      <Input
        error={form.formState.errors.phone?.message}
        placeholder="Téléphone..."
        {...form.register("phone")}
      />
      <Input
        error={form.formState.errors.address?.message}
        placeholder="Adresse..."
        {...form.register("address")}
      />
      <Input
        error={form.formState.errors.email?.message}
        placeholder="Adresse e-mail..."
        {...form.register("email")}
      />
      <Input
        error={form.formState.errors.password?.message}
        placeholder="Mot de passe..."
        {...form.register("password")}
      />
      <Input
        error={form.formState.errors.password_confirmation?.message}
        placeholder="Confirmation..."
        {...form.register("password_confirmation")}
      />
      <Button>S'inscrire</Button>
    </form>
  );
}
