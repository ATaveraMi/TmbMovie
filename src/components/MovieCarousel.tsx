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
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-bold mb-6 px-4">Recommended Movies</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="px-2"
        centerMode={false}
        swipeable={true}
        draggable={true}
        showDots={true}
      >
        {recommendations.map((movie) => (
          <div key={movie.id}>
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
