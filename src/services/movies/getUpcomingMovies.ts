import api from "../api";

export const getUpcomingMovies = async (page: number = 1) => {
  try {
    const { data } = await api.get(
      `/movie/upcoming?language=en-US&page=${page}`
    );
    return data;
  } catch (err) {
    console.error("Error fetching upcoming movies:", err);
    throw err;
  }
};

export default getUpcomingMovies;
