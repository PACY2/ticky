import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import useStoreCustomersService from "../../../hooks/useStoreCustomersService";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string(),
  address: z.string().min(3),
});

export default function CreateCustomersService() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const { mutate: createCustomersService, isLoading } =
    useStoreCustomersService();

  const onSubmit = (data) =>
    createCustomersService(data, {
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
    <div>
      <h1 className="text-2xl font-semibold">Créer un service clients</h1>
      <p className="text-neutral-600">
        Vous pouvez créer votre service client à partir d'ici.
      </p>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
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
        <Button isLoading={isLoading} className="w-fit">
          Créer
        </Button>
      </form>
    </div>
  );
}
