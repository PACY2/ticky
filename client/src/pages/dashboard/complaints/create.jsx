import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import useGetComplaintsNature from "../../../hooks/useGetComplaintsNature";
import useGetOrdersHistory from "../../../hooks/useGetOrdersHistory";
import useStoreComplain from "../../../hooks/useStoreComplain";

const schema = z.object({
  complainNatureId: z.string().transform((v) => Number(v)),
  orderId: z.string().transform((v) => Number(v)),
  goal: z.string().min(3),
  description: z.string().min(3),
});

export default function CreateComplain() {
  const { data: natures, isLoading: isNaturesLoading } =
    useGetComplaintsNature();

  const { data: orders, isLoading: isOrdersLoading } = useGetOrdersHistory();

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const {
    mutate: storeComplain,
    isLoading: isComplainLoading,
    isSuccess: isComplainCreated,
  } = useStoreComplain();

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

  const onSubmit = (data) =>
    storeComplain(data, {
      onError: handleError,
    });

  return !isNaturesLoading && !isOrdersLoading ? (
    <form
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div>
        <h1 className="text-2xl font-semibold">Créer une plainte</h1>
        <p className="text-neutral-600">
          Vous pouvez créer une nouvelle plainte à partir d'ici.
        </p>
      </div>
      {isComplainCreated && (
        <div className="bg-green-500 text-white p-4 rounded-md">
          Plainte créée avec succès
        </div>
      )}
      <div className="flex flex-col gap-4">
        <select
          {...form.register("complainNatureId")}
          className="w-full p-2 rounded-md bg-white border border-gray-300"
        >
          {natures.data.map((nature) => (
            <option key={nature.id} value={nature.id}>
              {nature.name}
            </option>
          ))}
        </select>
        <p className="text-red-700 text-sm">
          {form.formState.errors.complainNatureId?.message}
        </p>
        <select
          {...form.register("orderId")}
          className="w-full p-2 rounded-md bg-white border border-gray-300"
        >
          {orders.data.map((order) => (
            <option key={order.id} value={order.id}>
              {order.id}
            </option>
          ))}
        </select>
        <p className="text-red-700 text-sm">
          {form.formState.errors.orderid?.message}
        </p>
        <Input {...form.register("goal")} placeholder="Objectif" />
        <p className="text-red-700 text-sm">
          {form.formState.errors.goal?.message}
        </p>
        <textarea
          {...form.register("description")}
          placeholder="Description"
          className="w-full border border-gray-300 p-2 rounded-md"
        />
        <p className="text-red-700 text-sm">
          {form.formState.errors.description?.message}
        </p>
      </div>
      <Button className="w-fit" isLoading={isComplainLoading}>
        Créer une plainte
      </Button>
    </form>
  ) : (
    <div>Loading</div>
  );
}
