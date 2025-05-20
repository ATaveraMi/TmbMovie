import api from "../api";

export const markAsFavorite = async (
  movieId: number,
  favorite: boolean,
  guestSessionId: string
) => {
  try {
    const response = await api.post(`/account/${guestSessionId}/favorite`, {
      media_type: "movie",
      media_id: movieId,
      favorite: favorite,
    });
    return response.data;
  } catch (_error) {
    throw _error;
  }
};
