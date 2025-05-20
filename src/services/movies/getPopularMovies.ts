import api from "../api";

export const getPopularMovies = async (page: number = 1) => {
  try {
    const { data } = await api.get(
      `/movie/popular?language=en-US&page=${page}`
    );
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default getPopularMovies;
