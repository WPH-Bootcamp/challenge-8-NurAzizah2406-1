import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Clock, Calendar, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

import { movieService } from '@/services/movieService';
import { getImageUrl, formatRuntime, formatDate } from '@/lib/utils';
import { useFavoriteStore } from '@/store/movieStore';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { GenreBadge } from '@/components/movie/GenreBadge';
import { CastCard } from '@/components/movie/CastCard';
import { MovieCard } from '@/components/movie/MovieCard';
import { MovieGrid } from '@/components/movie/MovieGrid';

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = parseInt(id as string, 10);

  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoriteStore();
  const favorite = isFavorite(movieId);

  const { data: movie, isLoading: isLoadingMovie } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => movieService.getMovieDetails(movieId),
    enabled: !!movieId,
  });

  const { data: credits, isLoading: isLoadingCredits } = useQuery({
    queryKey: ['movie', movieId, 'credits'],
    queryFn: () => movieService.getMovieCredits(movieId),
    enabled: !!movieId,
  });

  const { data: similarData, isLoading: isLoadingSimilar } = useQuery({
    queryKey: ['movie', movieId, 'similar'],
    queryFn: () => movieService.getSimilarMovies(movieId),
    enabled: !!movieId,
  });

  const handleToggleFavorite = () => {
    if (!movie) return;
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  if (isLoadingMovie || !movie) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
  const posterUrl = getImageUrl(movie.poster_path, 'w500');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-16"
    >
      {/* Backdrop Section */}
      <div className="relative h-[40vh] w-full overflow-hidden md:h-[50vh] lg:h-[60vh]">
        <div className="absolute inset-0">
          <img
            src={backdropUrl}
            alt={movie.title}
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px]" />
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 z-10 h-10 w-10 rounded-full bg-background/50 backdrop-blur-md hover:bg-background/80 md:left-8 md:top-8"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="container relative mx-auto -mt-32 px-4 md:-mt-48 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start lg:gap-12">
          {/* Poster */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full shrink-0 md:w-1/3 lg:w-1/4"
          >
            <div className="overflow-hidden rounded-xl border border-border/50 shadow-2xl">
              <img
                src={posterUrl}
                alt={`Poster for ${movie.title}`}
                className="w-full object-cover"
              />
            </div>
            
            <Button
              className="mt-4 w-full gap-2 rounded-lg py-6 shadow-lg"
              variant={favorite ? 'destructive' : 'default'}
              onClick={handleToggleFavorite}
            >
              <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
              {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </motion.div>

          {/* Details */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-1 pt-4 md:pt-32 lg:pt-40"
          >
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {movie.title}
            </h1>
            
            {movie.tagline && (
              <p className="mt-2 text-lg italic text-muted-foreground">
                "{movie.tagline}"
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-foreground/80">
              <div className="flex items-center gap-1.5 font-medium text-gold">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-base">{movie.vote_average?.toFixed(1)}</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{formatDate(movie.release_date)}</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{formatRuntime(movie.runtime)}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {movie.genres?.map((genre) => (
                <GenreBadge key={genre.id} genre={genre} />
              ))}
            </div>

            <Separator className="my-8" />

            <div>
              <h3 className="text-xl font-semibold">Overview</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {movie.overview}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Top Cast */}
        {!isLoadingCredits && credits?.cast && credits.cast.length > 0 && (
          <div className="mt-16">
            <h3 className="mb-6 text-2xl font-bold tracking-tight">Top Cast</h3>
            <div className="scroll-container -mx-4 flex gap-4 px-4 pb-4 md:mx-0 md:px-0">
              {credits.cast.slice(0, 10).map((actor) => (
                <CastCard key={actor.id} cast={actor} />
              ))}
            </div>
          </div>
        )}

        {/* Similar Movies */}
        {!isLoadingSimilar && similarData?.results && similarData.results.length > 0 && (
          <div className="mt-16">
            <h3 className="mb-6 text-2xl font-bold tracking-tight">Similar Movies</h3>
            <div className="scroll-container -mx-4 flex gap-4 px-4 pb-4 md:mx-0 md:px-0 lg:hidden">
               {similarData.results.map((movie, idx) => (
                  <div key={movie.id} className="scroll-item w-40 flex-none sm:w-48">
                    <MovieCard movie={movie} index={idx} />
                  </div>
               ))}
            </div>
            <div className="hidden lg:block">
              <MovieGrid>
                {similarData.results.slice(0, 6).map((movie, idx) => (
                  <MovieCard key={movie.id} movie={movie} index={idx} />
                ))}
              </MovieGrid>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
