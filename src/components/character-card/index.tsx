import { DataCardProps, Status } from "../../pages/home";

type CharacterCardProps = {
  cast: DataCardProps;
  openModal: (value: DataCardProps) => void;
};

export const CharacterCard = ({ cast, openModal }: CharacterCardProps) => {
  return (
    <div
      className={
        "cursor-pointer flex flex-col justify-center items-center w-56 h-80 rounded-2xl gap-y-4 border-2 border-[#282828] transition-transform hover:translate-x-2 hover:-translate-y-2 hover:border-l-[10px] hover:border-b-[10px] bg-[#0C0032]"
      }
      onClick={() => openModal(cast)}
    >
      <div className="flex flex-col justify-center items-center gap-4 ml-2">
        <h2 className="flex font-bold font-kodeMono text-white truncate text-lg text-wrap">
          {cast?.name}
        </h2>
        <span className="font-kodeMono text-white text-muted-foreground">
          {cast?.species}
        </span>
      </div>
      <div className="flex items-center justify-center">
        <img
          src={cast?.image}
          alt={cast?.name}
          width={148}
          height={148}
          className="object-contain rounded-lg border-2 border-[#282828]"
        />
      </div>
      <div className="flex flex-row justify-center items-center gap-2">
        <span className="font-kodeMono text-white text-muted-foreground">
          Status:
        </span>
        <span
          className={`font-kodeMono text-muted-foreground ${
            cast?.status === Status.alive
              ? "text-green-600"
              : cast?.status === Status.dead
              ? "text-red-700"
              : "text-gray-500"
          }`}
        >
          {cast?.status}
        </span>
      </div>
    </div>
  );
};
