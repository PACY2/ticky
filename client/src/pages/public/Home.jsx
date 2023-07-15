import { PiPhoneDisconnect } from "react-icons/pi";
import { FiBarChart2 } from "react-icons/fi";
import { BsRouter } from "react-icons/bs";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Logo from "../../components/Logo";

export default function Home() {
  return (
    <>
      <section className="h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p>ADSL - FIBRE - FIX</p>
          <h1 className="w-1/2 text-center text-2xl lg:text-6xl font-semibold tracking-wide">
            Votre Passerelle vers un Monde Connecté Maroc Telecom
          </h1>
          <div className="gap-4 items-center gap-4 flex">
            <Button asChild >
              <Link to="/dashboard/complaints" >Reclamations</Link>
            </Button>
            <Button color="secondary">
              <Link to="/dashboard/orders" >Commands</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="px-4 lg:px-0 container mx-auto grid lg:grid-cols-3 gap-4">
        <div className="flex flex-col gap-4 border border-gray-300 rounded-md p-4">
          <PiPhoneDisconnect className="text-4xl" />
          <h3 className="text-xl font-semibold">FIX</h3>
          <p>
            Choisissez le service Fixe de Maroc Telecom pour une communication
            vocale fiable et ininterrompue, offrant une qualité sonore
            cristalline et une large gamme de fonctionnalités répondant à vos
            besoins téléphoniques.
          </p>
        </div>
        <div className="flex flex-col gap-4 border border-gray-300 rounded-md p-4">
          <BsRouter className="text-4xl" />
          <h3 className="text-xl font-semibold">ADSL</h3>
          <p>
            Optez pour le service ADSL de Maroc Telecom pour profiter d'une
            connectivité Internet haut débit à un prix abordable, vous
            permettant de naviguer sur le web, de diffuser des vidéos et de
            rester connecté(e) avec vos amis et votre famille sans effort.
          </p>
        </div>
        <div className="flex flex-col gap-4 border border-gray-300 rounded-md p-4">
          <FiBarChart2 className="text-4xl" />
          <h3 className="text-xl font-semibold">Fiber optics</h3>
          <p>
            Rehaussez votre expérience en ligne avec le service Fibre de Maroc
            Telecom, offrant des vitesses Internet ultra-rapides et une
            fiabilité exceptionnelle, vous permettant de diffuser des contenus
            multimédias en continu, de jouer en ligne et de profiter d'une
            consommation fluide de contenu multimédia.
          </p>
        </div>
      </section>
      <footer className="h-16 flex items-stretch border-t border-gray-300">
        <div className="container mx-auto flex items-center justify-between px-4 lg:px-0">
          <Logo />
          <div className="hidden lg:flex">
            <Link to="/dashboard/complaints">Reclamations</Link>
            <Link to="/dashboard/orders">Commandes</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
