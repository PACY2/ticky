import moment from "moment";
import useGetMyComplaints from "../../../hooks/useGetMyComplaints";
import useStore from "../../../store";
import Button from "../../../components/Button";
import useCloseComplain from "../../../hooks/useCloseComplain";

export default function Complaints() {
  const {
    data: complaints,
    isLoading: isComplaintsLoading,
    isFetching: isComplaintsFetching,
    refetch,
  } = useGetMyComplaints();

  const user = useStore((state) => state.user);

  const { mutate: closeComplain } = useCloseComplain();

  const handleCloseComplain = (id) =>
    closeComplain(id, {
      onSuccess: () => {
        refetch();
      },
    });

  return !isComplaintsLoading && !isComplaintsFetching ? (
    <div>
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-3 text-start">#</th>
            <th className="border border-gray-300 p-3 text-start">Service</th>
            <th className="border border-gray-300 p-3 text-start">
              Numéro de ligne
            </th>
            <th className="border border-gray-300 p-3 text-start">
              La nature de problème
            </th>
            <th className="border border-gray-300 p-3 text-start">Finie</th>
            <th className="border border-gray-300 p-3 text-start">Créé à</th>
            {["customers service", "admin"].includes(user?.role.name) && (
              <th className="border border-gray-300 p-3 text-start">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {complaints.data.map((complain) => (
            <tr>
              <td className="border border-gray-300 p-3 text-start">
                {complain.id}
              </td>
              <td className="border border-gray-300 p-3 text-start">
                {complain.order.service.name}
              </td>
              <td className="border border-gray-300 p-3 text-start">
                {complain.order.id}
              </td>
              <td className="border border-gray-300 p-3 text-start">
                {complain.complainNature.name}
              </td>
              <td className="border border-gray-300 p-3 text-start">
                {complain.closed ? "Vraie" : "Faux"}
              </td>
              <td className="border border-gray-300 p-3 text-start">
                {moment(complain.createdAt).fromNow()}
              </td>
              {["customers service", "admin"].includes(user?.role.name) &&
                !complain.closed && (
                  <td className="border border-gray-300 p-3 text-start">
                    <Button onClick={() => handleCloseComplain(complain.id)}>
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
    <div>Loading...</div>
  );
}
