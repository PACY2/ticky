import { useEffect } from "react";
import useStore from "../store";
import Navigation from "../components/Navigation";
import useGetProfile from "../hooks/useGetProfile";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const setUser = useStore((state) => state.setUser);
  const storeUser = useStore((state) => state.user);
  const {
    data: user,
    isError,
    isSuccess,
  } = useGetProfile();

  useEffect(() => {
    if (isSuccess) {
      setUser(user.data)
    }
  }, [isSuccess])

  if (isError) {
    return (
      <main className="flex flex-col gap-6">
        <Navigation />
        <Outlet />
      </main>
    );
  }

  if (isSuccess && storeUser) {
    return (
      <main className="flex flex-col gap-6">
        <Navigation />
        <Outlet />
      </main>
    );
  }

  return (
    <main className="w-screen h-screen bg-cyan-500 flex items-center justify-center">
      <div>LOADING...</div>
    </main>
  );
}
