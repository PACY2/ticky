import moment from "moment";
import useGetCustomersService from "../../../hooks/useGetCustomersService";
import useStore from "../../../store";
import Button from "../../../components/Button";
import useDeleteCustomersService from "../../../hooks/useDeleteCustomersService";

export default function CustomersService() {
  const user = useStore((state) => state.user);

  const {
    data: customersService,
    refetch,
    isLoading,
    isFetching,
  } = useGetCustomersService();

  const { mutate: deleteCustomersService } = useDeleteCustomersService();

  const handleDelete = (id) =>
    deleteCustomersService(id, {
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
            <th className="border border-gray-300 p-3 text-start">Nom</th>
            <th className="border border-gray-300 p-3 text-start">
              Adresse e-mail
            </th>
            <th className="border border-gray-300 p-3 text-start">Téléphone</th>
            <th className="border border-gray-300 p-3 text-start">Créé à</th>
            {user?.role.name === "admin" && (
              <th className="border border-gray-300 p-3 text-start">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {customersService.data.map((cs) => (
            <tr key={cs.id}>
              <td className="border border-gray-300 p-3 text-start">{cs.id}</td>
              <td className="border border-gray-300 p-3 text-start">
                {cs.name}
              </td>
              <td className="border border-gray-300 p-3 text-start">
                {cs.email}
              </td>
              <td className="border border-gray-300 p-3 text-start">
                {cs.phone}
              </td>
              <td className="border border-gray-300 p-3 text-start">
                {moment(cs.createdAt).fromNow()}
              </td>
              {user?.role.name === "admin" && (
                <td className="border border-gray-300 p-3 text-start">
                  <Button onClick={() => handleDelete(cs.id)}>Supprimer</Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
