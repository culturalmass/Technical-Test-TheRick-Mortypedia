import { useNavigate } from "react-router-dom";
import { Search } from "./search";

export const NavBar = () => {
  //set Use navigate to use route in the app
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between rounded-b-lg h-12 w-screen bg-[#282828] z-10">
      <div
        className="flex justify-center items-center gap-x-4 cursor-pointer  hover:opacity-90 transition ml-4"
        onClick={() => navigate("/")}
      >
        <img
          src="/rickandmortyclopediaLogo.png"
          alt="logo"
          className="w-10 rounded-2xl"
        />

        <p className="font-kodeMono text-white text-2xl font-bold">
          TheRick&Mortypedia
        </p>
      </div>

      <Search />
      <button
        className="font-kodeMono text-xl font-semibold text-white mx-6"
        onClick={() => navigate("/favorites")}
      >
        Favorites
      </button>
    </nav>
  );
};
