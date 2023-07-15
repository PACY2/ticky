import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../../components/Input";
import Button from "../../components/Button";
import useForgotPassword from "../../hooks/useForgotPassword";

const schema = z.object({
  email: z.string().email(),
});

export default function ForgotPasssword() {
  const { mutate: forgotPassword, isLoading } = useForgotPassword();

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) =>
    forgotPassword(data, {
      onSuccess: () => {
        form.reset();
      },
      onError: (error) => {
        if (error.response.data.content instanceof Array) {
          const issues = error.response.data.content;
          issues.forEach((issue) => {
            form.setError(issue.path[0], {
              message: issue.message,
            });
          });
        }
      },
    });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-white p-4 rounded-md drop-shadow-md flex flex-col gap-4 w-full max-w-sm"
    >
      <Input
        {...form.register("email")}
        type="email"
        placeholder="Adresse e-mail ..."
      />
      <p className="text-sm text-red-700">
        {form.formState.errors.email?.message}
      </p>
      <Button isLoading={isLoading}>Réinitialiser le mot de passe</Button>
    </form>
  );
}
