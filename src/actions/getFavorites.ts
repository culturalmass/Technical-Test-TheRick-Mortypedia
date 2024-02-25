export const getFavorites = () => {
  try {
    const response = localStorage.getItem("favorites");
    if (!response) {
      return null;
    }
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
