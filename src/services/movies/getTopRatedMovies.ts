import api from "../api";

export const getTopRatedMovies = async (page: number = 1) => {
  try {
    const { data } = await api.get(
      `/movie/top_rated?language=en-US&page=${page}`
    );
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default getTopRatedMovies;
