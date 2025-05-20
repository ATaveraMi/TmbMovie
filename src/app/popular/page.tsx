"use client";

import React, { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import MovieList from "@/components/MovieList/MovieList";
import { IMovieDetail } from "@/types/IMovieDetail";
import Pagination from "@/components/Pagination";

const PopularClientPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);

      try {
        const data = await getPopularMovies(currentPage);
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 20));
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchPopularMovies();
  }, [currentPage]);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Popular Movies</h3>
      {/* Loading indicator */}
      {loading && <h5 className="text-lg text-gray-500">Cargando...</h5>}

      <MovieList movies={movies} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PopularClientPage;
