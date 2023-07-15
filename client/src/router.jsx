import { createBrowserRouter } from "react-router-dom";
import { authRouter, dashboardRoutes, publicRouter } from "./routes";
import Layout from "./layouts/layout";
import AuthLayout from "./layouts/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      ...publicRouter,
      ...dashboardRoutes,
    ]
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      ...authRouter,
    ]
  }
]);

export default router;
