import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../../components/Input";
import useSignIn from "../../hooks/useSignIn";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function SignIn() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const { mutate: signIn } = useSignIn();

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

  const onSubmit = async (data) =>
    signIn(data, {
      onError: handleError,
      onSuccess: () => navigate("/dashboard/orders"),
    });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-white p-4 rounded-md drop-shadow-md flex flex-col gap-4 w-full max-w-sm"
    >
      <Input
        {...form.register("email")}
        error={form.formState.errors.email?.message}
        placeholder="example@example.com..."
      />
      <Input
        type="password"
        error={form.formState.errors.email?.password}
        {...form.register("password")}
        placeholder="********"
      />
      <Button>S'identifier</Button>
      <Link to="/sign-up">S'inscrire</Link>
      <Link to="/forgot-password">Mot de passe oublié</Link>
    </form>
  );
}
