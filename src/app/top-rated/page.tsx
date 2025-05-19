'use client';

import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import Link from "next/link";
import MovieCard from "@/components/MovieCard/MovieCard";

const TopRatedClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2s delay
      try {
        const data = await getTopRatedMovies();
        setMovies(data.results);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Popular Movies</h3>
      {/* Loading indicator */}
      {loading && <h5 className="text-lg text-gray-500">Cargando...</h5>}
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies?.map((movie) => (
          <Link
            key={movie.id}
            href={{
              pathname: `/movie/${movie.id}`,
              query: { from: "popular" },
            }}
            >
              <MovieCard title={movie.title} voteAverage={movie.vote_average} posterPath={movie.poster_path} releaseYear={new Date(movie.release_date).getFullYear()} description={movie.overview} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopRatedClientPage;