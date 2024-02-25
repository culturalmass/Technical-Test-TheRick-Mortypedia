export const getAllCharacter = async () => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getAllCharacterByPage = async (page: number) => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getAllCharacterById = async (id: number) => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getResponseByUrl = async (url: string) => {
  try {
    const response = await fetch(`${url}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getChacterBySearch = async (search: string) => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${search}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
