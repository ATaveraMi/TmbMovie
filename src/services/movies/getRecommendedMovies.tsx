import api from "../api";

const getRecommendedMovies = async (movieId: number) => {
  try {
    const { data } = await api.get(
      `movie/${movieId}/recommendations?language=en-US&page=1`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export default getRecommendedMovies;
