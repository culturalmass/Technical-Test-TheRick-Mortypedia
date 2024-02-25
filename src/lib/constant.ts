//Initial State for consuming the API Data
export const inititalStateData = {
  info: {
    page: 0,
    next: "",
    prev: "",
  },
  results: [
    {
      id: 0,
      name: "",
      image: "",
      species: "",
      status: "",
      episode: [""],
      gender: "",
      location: {
        name: "",
      },
    },
  ],
};

//Initial State for using  the  Data in the card
export const InitialStateForDataCard = {
  id: 0,
  name: "",
  image: "",
  species: "",
  status: "",
  episode: [""],
  gender: "",
  location: {
    name: "",
  },
};

//Initial State for the Episode Data in the Modal
export const initialStateEpisodeDetails = {
  name: "",
  air_date: "",
  episode: "",
};

//Initial State for setting the Pagination
export const initialStatePagination = {
  pages: 0,
  currentIndex: 0,
  currentPage: 1,
  apiCallPage: 1,
  size: 10,
};

//Custom Style for the Modal
export const customStylesForModal = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#0C0032",
    borderStyle: "solid",
    borderWidth: "5px",
    borderColor: "#282828",
  },
  overlay: {
    background: "rgba(60, 62, 66, 0.85)",
  },
};
