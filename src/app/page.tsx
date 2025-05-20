"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import { getUpcomingMovies } from "@/services/movies/getUpcomingMovies";
import MovieCard from "@/components/MovieCard/MovieCard";
import { IMovieDetail } from "@/types/IMovieDetail";

interface MovieSectionProps {
  title: string;
  movies: IMovieDetail[];
  loading: boolean;
  viewAllLink?: string;
}

const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  movies,
  loading,
  viewAllLink,
}) => {
  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="rounded-xl shadow-lg animate-pulse">
                <div className="w-full h-96 bg-gray-300 rounded-t-xl"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{title}</h2>
          <p>No movies to display in this section.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              View All
            </Link>
          )}
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-6">
            {movies.slice(0, 10).map(
              (
                movie // Display up to 10 movies in a scrollable row
              ) => (
                <div key={movie.id} className="flex-shrink-0 w-64">
                  {" "}
                  {/* Adjust width as needed */}
                  <Link href={`/movie/${movie.id}`}>
                    <MovieCard
                      title={movie.title}
                      voteAverage={movie.vote_average}
                      posterPath={movie.poster_path}
                      releaseYear={new Date(movie.release_date).getFullYear()}
                      description={movie.overview}
                    />
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<IMovieDetail[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<IMovieDetail[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<IMovieDetail[]>([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingNowPlaying, setLoadingNowPlaying] = useState(true);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoadingPopular(true);
        const popularData = await getPopularMovies();
        setPopularMovies(popularData.results);
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
      } finally {
        setLoadingPopular(false);
      }

      try {
        setLoadingNowPlaying(true);
        const nowPlayingData = await getNowPlayingMovies();
        setNowPlayingMovies(nowPlayingData.results);
      } catch (error) {
        console.error("Failed to fetch now playing movies:", error);
      } finally {
        setLoadingNowPlaying(false);
      }

      try {
        setLoadingUpcoming(true);
        const upcomingData = await getUpcomingMovies();
        setUpcomingMovies(upcomingData.results);
      } catch (error) {
        console.error("Failed to fetch upcoming movies:", error);
      } finally {
        setLoadingUpcoming(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to My Movies App
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover, track, and organize your favorite movies in one place.
          </p>
          <Link
            href="/popular"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
          >
            Explore Movies
          </Link>
        </div>
      </section>

      <MovieSection
        title="Popular Movies"
        movies={popularMovies}
        loading={loadingPopular}
        viewAllLink="/popular"
      />

      <MovieSection
        title="Now Playing"
        movies={nowPlayingMovies}
        loading={loadingNowPlaying}
        viewAllLink="/now-playing"
      />

      <MovieSection
        title="Upcoming Movies"
        movies={upcomingMovies}
        loading={loadingUpcoming}
        viewAllLink="/upcoming"
      />

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-blue-600 text-5xl mb-4">🎬</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-700">
                Vast Movie Library
              </h3>
              <p className="text-gray-600">
                Access a wide range of movies, from timeless classics to the
                latest blockbusters.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-blue-600 text-5xl mb-4">📝</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-700">
                Personalized Watchlists
              </h3>
              <p className="text-gray-600">
                Curate your own lists of movies you want to watch or have
                already seen.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-blue-600 text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-700">
                Ratings & Community
              </h3>
              <p className="text-gray-600">
                Share your opinions, read reviews, and connect with fellow movie
                lovers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Dive In?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of movie enthusiasts and start organizing your movie
            collection today. Your next favorite film awaits!
          </p>
          <Link href="/signup" legacyBehavior>
            <a className="bg-white text-blue-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300">
              Sign Up Now
            </a>
          </Link>
        </div>
      </section>
    </main>
  );
}
