import api from "../api";

export const getNowPlayingMovies = async (page: number = 1) => {
  try {
    const { data } = await api.get(
      `/movie/now_playing?language=en-US&page=${page}`
    );
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default getNowPlayingMovies;
