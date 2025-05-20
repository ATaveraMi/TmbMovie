"use client";

import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import Link from "next/link";
import MovieCard from "@/components/MovieCard/MovieCard";
import Pagination from "@/components/Pagination";
import { IMovieDetail } from "@/types/IMovieDetail";

const TopRatedClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      try {
        const data = await getTopRatedMovies(currentPage);
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 20));
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchTopRatedMovies();
  }, [currentPage]);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Top Rated Movies</h3>
      {/* Loading indicator */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="rounded-xl shadow-lg animate-pulse">
              <div className="w-full h-96 bg-gray-300 rounded-t-xl"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Grid Layout */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies?.map((movie) => (
            <Link
              key={movie.id}
              href={{
                pathname: `/movie/${movie.id}`,
                query: { from: "top-rated" },
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
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TopRatedClientPage;
