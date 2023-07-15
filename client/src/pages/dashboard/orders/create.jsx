import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetServices from "../../../hooks/useGetServices";
import Button from "../../../components/Button";
import useStoreOrder from "../../../hooks/useStoreOrder";
import { z } from "zod";

const schema = z.object({
  serviceId: z.string().transform((v) => Number(v)),
});

export default function CreateOrder() {
  const { data: services, isLoading } = useGetServices();

  const {
    mutate: createOrder,
    isLoading: isCreatingOrderLoading,
    isSuccess: isOrderCreated,
  } = useStoreOrder();

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => createOrder(data);

  return !isLoading ? (
    <form
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div>
        <h1 className="text-2xl font-semibold">Créer une commande</h1>
        <p className="text-neutral-600">
          Vous pouvez créer une commande simplement en sélectionnant un service
        </p>
      </div>
      {isOrderCreated && (
        <div className="bg-green-500 text-white p-4 rounded-md">
          Commande créée avec succès
        </div>
      )}
      <select
        className="w-full p-2 rounded-md bg-white border border-gray-300"
        {...form.register("serviceId")}
      >
        {services.data.map((service) => (
          <option value={service.id} key={service.id}>
            {service.name}
          </option>
        ))}
      </select>
      <Button isLoading={isCreatingOrderLoading} className="w-fit">
        Créer une commande
      </Button>
    </form>
  ) : null;
}
