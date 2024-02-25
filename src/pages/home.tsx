import { useEffect, useState } from "react";
import {
  getAllCharacter,
  getAllCharacterByPage,
} from "../actions/getCharacter";
import { PageHOC } from "../components/page-hoc";
import ModalCard from "../components/modal";
import { CharacterCard } from "../components/character-card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  InitialStateForDataCard,
  initialStatePagination,
  inititalStateData,
} from "../lib/constant";

export enum Status {
  alive = "Alive",
  dead = "Dead",
  unknown = "unknown",
}

export type DataProps = {
  info: {
    page: number;
    next: string | null;
    prev: string | null;
  };
  results: DataCardProps[];
  error?: string;
};

export type DataCardProps = {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  episode: string[];
  gender: string;
  location: { name: string };
};

const HomePage = () => {
  //Set the Data from the API to use
  const [data, setData] = useState<DataProps>(inititalStateData);
  //Set the pagination on the HomePage
  const [pagination, setPagination] = useState(initialStatePagination);
  //Set the state of the Modal
  const [modalIsOpen, setIsOpen] = useState(false);
  //Set the Data to use in the Modal
  const [dataForModal, setDataForModal] = useState(InitialStateForDataCard);

  //Handle the Pagination to go to the next page, and retrieve new data is necessary
  const handlePaginationForward = async () => {
    if (pagination.currentIndex >= pagination.size) {
      const newPage = await getAllCharacterByPage(pagination.apiCallPage + 1);
      setData(newPage);
      setPagination({
        ...pagination,
        apiCallPage: pagination.apiCallPage + 1,
        currentPage: pagination.currentPage + 1,
        currentIndex: 0,
      });
    }
    if (pagination.currentIndex < pagination.size) {
      setPagination({
        ...pagination,
        currentPage: pagination.currentPage + 1,
        currentIndex: 10,
      });
    }
  };

  //Handle the Pagination to go to the previous page, and retrieve new data is necessary
  const handlePaginationBackward = async () => {
    if (pagination.currentIndex < pagination.size) {
      const newPage = await getAllCharacterByPage(pagination.apiCallPage - 1);
      setData(newPage);
      setPagination({
        ...pagination,
        apiCallPage: pagination.apiCallPage - 1,
        currentPage: pagination.currentPage - 1,
        currentIndex: 10,
      });
    }
    if (pagination.currentIndex >= pagination.size) {
      setPagination({
        ...pagination,
        currentPage: pagination.currentPage - 1,
        currentIndex: 0,
      });
    }
  };

  //Handle Opening the modal and set the data for the modal in the state
  const openModal = (data: DataCardProps) => {
    setDataForModal(data);
    setIsOpen(true);
  };

  //Handle Closing the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  //UseEffect to call the action getAllCharacter and set the data and the pagination in the state
  useEffect(() => {
    getAllCharacter().then((data) => {
      setData(data);
      setPagination({ ...pagination, pages: data?.info?.pages });
    });
  }, []);

  //Check is not data retrieve from the API
  if (data?.info?.page === 0) {
    return;
  }

  return (
    <>
      <ModalCard
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        data={dataForModal}
      />
      <div className="flex flex-col gap-y-4">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 min-h-[41rem] gap-y-4 inset-0 ml-2">
          {data?.results
            ?.slice(
              pagination.currentIndex,
              pagination.currentIndex + pagination.size
            )
            .map((cast) => (
              <CharacterCard key={cast?.id} cast={cast} openModal={openModal} />
            ))}
        </div>
        <div className="flex justify-center text-white gap-x-24">
          <button
            type="button"
            disabled={pagination.currentPage <= 1}
            className={`flex items-center text-sm font-kodeMono gap-x-2 ${
              pagination.currentPage <= 1 && "cursor-default text-gray-700"
            }`}
            onClick={() => handlePaginationBackward()}
          >
            <span>Previous Page</span>
            <FaChevronLeft />
          </button>
          <button
            type="button"
            disabled={pagination.apiCallPage >= pagination.pages}
            className={`flex items-center text-sm font-kodeMono gap-x-2 ${
              pagination.apiCallPage >= pagination.pages &&
              "cursor-default text-gray-700"
            }`}
            onClick={() => handlePaginationForward()}
          >
            <FaChevronRight />
            <span>Next Page</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default PageHOC(HomePage);
