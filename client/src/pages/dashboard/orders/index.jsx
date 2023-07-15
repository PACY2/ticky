import moment from "moment";
import useGetOrdersHistory from "../../../hooks/useGetOrdersHistory";
import Button from "../../../components/Button";
import useStore from "../../../store";
import useCloseOrder from "../../../hooks/useCloseOrder";

export default function Orders() {
  const {
    data: orders,
    isLoading,
    refetch,
    isFetching,
  } = useGetOrdersHistory();

  const user = useStore((state) => state.user);

  const { mutate: closeOrder } = useCloseOrder();

  const handleCLose = (id) =>
    closeOrder(id, {
      onSuccess: () => {
        refetch();
      },
    });

  return !isLoading && !isFetching ? (
    <div>
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-3 text-start">#</th>
            <th className="border border-gray-300 p-3 text-start">Service</th>
            <th className="border border-gray-300 p-3 text-start">finie</th>
            <th className="border border-gray-300 p-3 text-start">Créé à</th>
            {["customers service", "admin"].includes(user?.role.name) && (
              <th className="border border-gray-300 p-3 text-start">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {orders.data.map((order) => (
            <tr key={order.id}>
              <td className="border border-gray-300 p-3 text-start">
                {order.id}
              </td>
              <td className="border border-gray-300 p-3 text-start">
                {order.service.name}
              </td>
              <td className="border border-gray-300 p-3 text-start">
                {order.closed ? "True" : "False"}
              </td>
              <td className="border border-gray-300 p-3 text-start">
                {moment(order.createdAt).fromNow()}
              </td>
              {["customers service", "admin"].includes(user?.role.name) &&
                !order.closed && (
                  <td className="border border-gray-300 p-3 text-start">
                    <Button onClick={() => handleCLose(order.id)}>
                      Fermer
                    </Button>
                  </td>
                )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div>Loading</div>
  );
}
