'use client';

import React, { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import MovieList from "@/components/MovieList/MovieList";

const PopularClientPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2s delay
      try {
        const data = await getPopularMovies();
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
      
      <MovieList movies={movies}/> 
        
    </div>
  );
};

export default PopularClientPage;