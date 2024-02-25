import { useState } from "react";
import Modal from "react-modal";
import { toast } from "sonner";
import { getResponseByUrl } from "../../actions/getCharacter";
import { setFavorites } from "../../actions/setFavorites";
import { getFavorites } from "../../actions/getFavorites";
import {
  customStylesForModal,
  initialStateEpisodeDetails,
} from "../../lib/constant";
import { DataCardProps, Status } from "../../pages/home";
import { IoIosCloseCircle } from "react-icons/io";
import { FaHeart } from "react-icons/fa";

type ModalCardProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  data: DataCardProps;
};

type episodeProps = {
  name: string;
  air_date: string;
  episode: string;
};

const ModalCard = ({ isOpen, onRequestClose, data }: ModalCardProps) => {
  //Set the Episode data from the API to use
  const [episode, setEpisode] = useState<episodeProps>(
    initialStateEpisodeDetails
  );
  //Set the Favorite list to use
  const [favoritesList, setFavoritesList] = useState(getFavorites());

  //Handle the click on an episode and set the details from the API
  const handleClickEpisode = async (value: string) => {
    const episodeData = await getResponseByUrl(value);
    setEpisode(episodeData);
  };

  //Handle the favorite behaviour set the favorite in the local storage, and set a new FavoriteList
  const handleClickFavorite = (id: number) => {
    setFavorites(id);
    setFavoritesList(getFavorites());
    if (!favoritesList.find((idFav: number) => idFav === id)) {
      toast.success("Character added to favorites");
    } else {
      toast.info("Character remove from favorites");
    }
  };

  //Handle Closing the modal, and set the episode back to the initial state
  const onCloseModal = () => {
    setEpisode(initialStateEpisodeDetails);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStylesForModal}
      appElement={document.getElementById("root") as HTMLElement}
    >
      <div className="flex flex-col items-center gap-y-6 h-[570px] w-[520px] font-kodeMono text-white pl-8 ">
        <div className="flex justify-end w-full">
          <div className="w-full items-center flex gap-x-4">
            <h2 className="text-2xl font-bold ">{data?.name}</h2>
            <button
              onClick={() => handleClickFavorite(data?.id)}
              className="text-2xl"
            >
              <FaHeart
                className={`${
                  favoritesList &&
                  favoritesList.find((idFav: number) => idFav === data?.id)
                    ? "text-white"
                    : "text-gray-400"
                }`}
              />
            </button>
          </div>
          <button onClick={onCloseModal}>
            <IoIosCloseCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-row gap-x-4 w-full">
          <img
            src={data?.image}
            alt={data?.name}
            className="object-contain rounded-lg h-44 w-44 border-4 border-white"
          />
          <div className="flex flex-col gap-y-3 mt-2">
            <div>
              <span className="font-semibold">Species: </span>
              <span>{data?.species}</span>
            </div>
            <div>
              <span className="font-semibold">Gender: </span>
              <span>{data?.gender}</span>
            </div>
            <div>
              <span className="font-semibold">Location: </span>
              <span>{data?.location?.name}</span>
            </div>
            <div>
              <span className="font-semibold">Status: </span>
              <span
                className={`font-kodeMono text-muted-foreground ${
                  data?.status === Status.alive
                    ? "text-green-600"
                    : data?.status === Status.dead
                    ? "text-red-700"
                    : "text-gray-500"
                }`}
              >
                {data?.status}
              </span>
            </div>
          </div>
        </div>
        <div className="h-1 w-full bg-gray-800/45 rounded-lg" />
        <div className="w-full ">
          <h3 className="font-semibold">Episode Encounter:</h3>
          <div className="flex gap-x-2  h-12 overflow-x-auto">
            {data?.episode?.map((epidode, i) => (
              <button key={i} onClick={() => handleClickEpisode(epidode)}>
                <span>{epidode?.split("/")[5]}</span>
              </button>
            ))}
          </div>
          <div className="h-1 w-full bg-gray-800/45 rounded-lg mt-2" />
        </div>

        <div className="flex flex-col gap-y-3 mt-2 w-full">
          {episode.name !== "" ? (
            <>
              <h3 className="font-semibold">Episode Details:</h3>
              <div>
                <span className="font-semibold">Name: </span>
                <span>{episode?.name}</span>
              </div>
              <div>
                <span className="font-semibold">Air Date: </span>
                <span>{episode?.air_date}</span>
              </div>
              <div>
                <span className="font-semibold">Season: </span>
                <span>{episode?.episode?.slice(1, 3)}</span>
              </div>
              <div>
                <span className="font-semibold">Episode: </span>
                <span>{episode?.episode?.slice(-2)}</span>
              </div>
            </>
          ) : (
            <span className="text-muted-foreground">
              Select a episode to check the details
            </span>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalCard;
