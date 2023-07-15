import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { z } from "zod";
import useResetPassword from "../../hooks/useResetPassword";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  })
  .refine(
    ({ password_confirmation, password }) => {
      return password_confirmation === password;
    },
    {
      message: "Password and password password confirmation does not match",
      path: ["password_confirmation"],
    }
  );

export default function ResetPassword() {
  const token = new URLSearchParams(useLocation().search).get("token");

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const { mutate: resetPassword, isLoading } = useResetPassword();

  const onSubmit = (data) =>
    resetPassword(
      { data, token },
      {
        onSuccess: () => {
          navigate("/");
        },
        onError: (error) => {
          if (error.response.data.content instanceof Array) {
            const issues = error.response.data.content;
            issues.formState((issue) => {
              form.setError(issue.path[0], {
                message: issue.message,
              });
            });
          }
        },
      }
    );

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-white p-4 rounded-md drop-shadow-md flex flex-col gap-4 w-full max-w-sm"
    >
      <Input
        {...form.register("password")}
        type="password"
        placeholder="Mot de passe"
      />
      <p className="text-red-700 text-sm">
        {form.formState.errors.password?.message}
      </p>
      <Input
        {...form.register("password_confirmation")}
        type="password"
        placeholder="Confirmation mot de passe"
      />
      <p className="text-red-700 text-sm">
        {form.formState.errors.password_confirmation?.message}
      </p>
      <Button isLoading={isLoading}>Réinitialiser le mot de passe</Button>
    </form>
  );
}
