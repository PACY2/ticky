import { Outlet } from "react-router-dom"
import useStore from "../store"
import { Navigate } from "react-router-dom";

const AuthLayout = () => {
  const user = useStore(state => state.user);

  if (user) {
    return <Navigate to="/dashboard/orders" />
  }

  return (
    <main className="bg-cyan-500 h-screen w-screen flex items-center justify-center px-4 lg:px-0">
      <Outlet />
    </main>
  )
}

export default AuthLayout
