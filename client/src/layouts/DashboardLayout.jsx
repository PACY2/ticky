import { Link, Outlet } from "react-router-dom";
import useStore from "../store";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function DashboardLayout() {
  const user = useStore((state) => state.user);
  const { pathname } = useLocation();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container px-4 lg:px-0 mx-auto grid gap-4 lg:grid-cols-6 ">
      <section>
        <ul className="flex flex-col gap-4">
          <Link
            to="/dashboard/orders"
            className={`p-4 rounded-md bg-gray-50 hover:bg-gray-100 ${
              pathname === "/dashboard/orders"
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : ""
            }`}
          >
            Les commandes
          </Link>

          {!["customers service", "admin"].includes(user?.role.name) && (
            <Link
              to="/dashboard/orders/create"
              className={`p-4 rounded-md bg-gray-50 hover:bg-gray-100 ${
                pathname === "/dashboard/orders/create"
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : ""
              }`}
            >
              Créer des commandes
            </Link>
          )}
          <Link
            to="/dashboard/complaints"
            className={`p-4 rounded-md bg-gray-50 hover:bg-gray-100 ${
              pathname === "/dashboard/complaints"
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : ""
            }`}
          >
            Les plaintes
          </Link>
          {!["customers service", "admin"].includes(user?.role.name) && (
            <Link
              to="/dashboard/complaints/create"
              className={`p-4 rounded-md bg-gray-50 hover:bg-gray-100 ${
                pathname === "/dashboard/complaints/create"
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : ""
              }`}
            >
              Créer des plaintes
            </Link>
          )}
          {user?.role.name === "admin" && (
            <>
              <Link
                to="/dashboard/admin/customers_service"
                className={`p-4 rounded-md bg-gray-50 hover:bg-gray-100 ${
                  pathname === "/dashboard/admin/customers_service"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : ""
                }`}
              >
                Service client
              </Link>
              <Link
                to="/dashboard/admin/customers_service/create"
                className={`p-4 rounded-md bg-gray-50 hover:bg-gray-100 ${
                  pathname === "/dashboard/admin/customers_service/create"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : ""
                }`}
              >
                créer un service client
              </Link>
            </>
          )}
        </ul>
      </section>
      <section className="col-start-2 col-end-7">
        <Outlet />
      </section>
    </div>
  );
}
