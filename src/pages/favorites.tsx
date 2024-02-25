import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavorites } from "../actions/getFavorites";
import { getAllCharacterById } from "../actions/getCharacter";
import { DataCardProps } from "./home";
import ModalCard from "../components/modal";
import { PageHOC } from "../components/page-hoc";
import { CharacterCard } from "../components/character-card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  InitialStateForDataCard,
  initialStatePagination,
} from "../lib/constant";

const FavoritesPage = () => {
  //Set Use navigate to use route in the Favorites app
  const navigate = useNavigate();
  //Set the favorite list on the FavoritesPage
  const [favoriteList, setFavoriteList] = useState(getFavorites());
  //Set the pagination on the FavoritesPage
  const [pagination, setPagination] = useState({
    ...initialStatePagination,
    pages: Math.ceil(favoriteList.length / 10),
  });

  //Set the Data from the API to use
  const [data, setData] = useState<DataCardProps[]>([InitialStateForDataCard]);
  //Set the state of the Modal
  const [modalIsOpen, setIsOpen] = useState(false);
  //Set the Data to use in the Modal
  const [dataForModal, setDataForModal] = useState(InitialStateForDataCard);

  //Get the data for every favorite character and set in the Data state
  const getData = async () => {
    const charactersData = [];
    for (let i = 0; i < favoriteList.length; i++) {
      const dataList = await getAllCharacterById(favoriteList[i]);
      charactersData.push(dataList);
    }
    setData(charactersData);
  };

  //Handle the Pagination to go to the next page, and retrieve new data is necessary
  const handlePaginationForward = async () => {
    setPagination({
      ...pagination,
      currentPage: pagination.currentPage + 1,
      currentIndex: pagination.currentIndex + 10,
    });
  };

  //Handle the Pagination to go to the previous page, and retrieve new data is necessary
  const handlePaginationBackward = async () => {
    setPagination({
      ...pagination,
      currentPage: pagination.currentPage - 1,
      currentIndex: pagination.currentIndex - 10,
    });
  };

  //Handle Opening the modal and set the data for the modal in the state
  const openModal = (data: DataCardProps) => {
    setDataForModal(data);
    setIsOpen(true);
  };

  //Handle Closing the modal, check if the favorite list decrease, and set the new favorite list
  const closeModal = () => {
    setIsOpen(false);
    const newFavoriteList = getFavorites();
    const newDataArray: DataCardProps[] = [InitialStateForDataCard];
    for (let i = 0; i < newFavoriteList.length; i++) {
      const dataArrray = data?.find(
        (character) => character?.id === newFavoriteList[i]
      );
      newDataArray.push(dataArrray!);
    }
    if (newFavoriteList.length === 0) {
      navigate("/");
    }
    setFavoriteList(newFavoriteList);
    setData(newDataArray);
  };

  //UseEffect to call the getData and set the data for the favorite list
  useEffect(() => {
    getData();
  }, []);

  //Check is favorite List have character to show
  if (favoriteList.length === 0) {
    return (
      <div className="text-2xl font-kodeMono text-white text-muted-foreground m-12">
        No favorites character found!
      </div>
    );
  }

  return (
    <>
      <ModalCard
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        data={dataForModal}
      />
      {data.length > 1 && (
        <div className="flex flex-col gap-y-4">
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 min-h-[41rem] gap-y-4 inset-0 ml-2">
            {data
              ?.slice(
                pagination.currentIndex,
                pagination.currentIndex + pagination.size
              )
              .map((cast) => (
                <CharacterCard
                  key={cast?.id}
                  cast={cast}
                  openModal={openModal}
                />
              ))}
          </div>
          <div className="flex justify-center text-white gap-x-24">
            <button
              type="button"
              disabled={pagination.currentPage <= 1}
              className={`flex items-center text-sm font-kodeMono  gap-x-2 ${
                pagination.currentPage <= 1 && "cursor-default text-gray-700"
              }`}
              onClick={() => handlePaginationBackward()}
            >
              <span>Previous Page</span>
              <FaChevronLeft />
            </button>
            <button
              type="button"
              disabled={pagination.currentPage >= pagination.pages}
              className={`flex items-center text-sm font-kodeMono  gap-x-2 ${
                pagination.currentPage >= pagination.pages &&
                "cursor-default text-gray-700"
              }`}
              onClick={() => handlePaginationForward()}
            >
              <FaChevronRight />
              <span>Next Page</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PageHOC(FavoritesPage);
