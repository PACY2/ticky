import Logo from "./Logo";
import { MdOutlineMenu } from "react-icons/md";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import useStore from "../store";
import useSignOut from "../hooks/useSignOut";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const user = useStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const { mutate: signOut } = useSignOut();

  const handleSignOut = () =>
    signOut(
      {},
      {
        onSuccess: () => {
          setUser(null);
          navigate("/");
        },
      }
    );

  return (
    <nav className="bg-cyan-500 h-16 text-white flex items-stretch">
      <div className="px-4 lg:px-0 container mx-auto flex items-center justify-between">
        <Logo />
        <Button className="lg:hidden" onClick={() => setOpen(!open)}>
          <MdOutlineMenu />
        </Button>
        <div
          className={`flex items-center gap-4 fixed lg:static top-0 left-0 w-full lg:w-auto bg-cyan-500 mt-16 lg:mt-0 p-4 lg:p-0 flex-col lg:flex-row ${
            open ? "" : "hidden lg:flex"
          }`}
        >
          <Link to="/dashboard/orders">Tableau de bord</Link>
          {user ? (
            <Button color="secondary" onClick={handleSignOut}>
              Se déconnecter
            </Button>
          ) : (
            <Button color="secondary">
              <Link to="/sign-in">S'identifier</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
