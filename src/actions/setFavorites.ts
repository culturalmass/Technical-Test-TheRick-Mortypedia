import { getFavorites } from "./getFavorites";

export const setFavorites = async (favorites: number) => {
  let currentFavArray: number[] = [];
  let newFavArray = [];
  if (getFavorites()) {
    currentFavArray = getFavorites();
  }
  if (currentFavArray?.includes(favorites)) {
    newFavArray = currentFavArray.filter((favId) => favId !== favorites);
  } else {
    newFavArray = [...currentFavArray, favorites];
  }

  localStorage.setItem("favorites", JSON.stringify(newFavArray));
};
