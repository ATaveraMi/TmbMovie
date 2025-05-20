import { IMovieDetail } from "@/types/IMovieDetail";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "./MovieCard/MovieCard";
import Link from "next/link";

interface MovieCarouselProps {
  recommendations: IMovieDetail[];
}

const MovieCarousel = ({ recommendations }: MovieCarouselProps) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1536 },
      items: 5,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1536, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Recommended Movies</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="transform 300ms ease-in-out"
        transitionDuration={300}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {recommendations.map((movie) => (
          <div key={movie.id} className="px-2">
            <Link
              href={{
                pathname: `/movie/${movie.id}`,
                query: { from: "recommendations" },
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
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MovieCarousel;
