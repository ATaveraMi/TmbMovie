"use client";

import React, { useEffect, useState } from "react";
import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import Link from "next/link";
import MovieCard from "@/components/MovieCard/MovieCard";
import Pagination from "@/components/Pagination";

const NowPlayingClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2s delay
      try {
        const data = await getNowPlayingMovies(currentPage);
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
      <h3 className="text-3xl font-bold mb-6">Now Playing Movies</h3>
      {/* Loading indicator */}
      {loading && <h5 className="text-lg text-gray-500">Cargando...</h5>}
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies?.map((movie) => (
          <Link
            key={movie.id}
            href={{
              pathname: `/movie/${movie.id}`,
              query: { from: "now-playing" },
            }}
          >
            <MovieCard
              title={movie.title}
              voteAverage={movie.vote_average}
              posterPath={movie.poster_path}
              releaseYear={new Date(movie.release_date).getFullYear()}
              description={movie.overview}
            />
          </Link>
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default NowPlayingClientPage;
