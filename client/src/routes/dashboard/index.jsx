import DashboardLayout from "../../layouts/DashboardLayout";
import Complaints from "../../pages/dashboard/complaints";
import CreateComplain from "../../pages/dashboard/complaints/create";
import CustomersService from "../../pages/dashboard/customersService";
import CreateCustomersService from "../../pages/dashboard/customersService/create";
import Orders from "../../pages/dashboard/orders";
import CreateOrder from "../../pages/dashboard/orders/create";

export const dashboardRoutes = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/create",
        element: <CreateOrder />,
      },
      {
        path: "complaints",
        element: <Complaints />,
      },
      {
        path: "complaints/create",
        element: <CreateComplain />,
      },
      {
        path: "admin/customers_service",
        element: <CustomersService />,
      },
      {
        path: "admin/customers_service/create",
        element: <CreateCustomersService />,
      },
    ],
  },
];
