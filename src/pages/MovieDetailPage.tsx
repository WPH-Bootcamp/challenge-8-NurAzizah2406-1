import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, PlayCircle, Star, Video, Heart, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

import { movieService } from '@/services/movieService';
import { getImageUrl } from '@/lib/utils';
import { useFavoriteStore } from '@/store/movieStore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = parseInt(id as string, 10);

  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoriteStore();
  const favorite = isFavorite(movieId);
  const { showToast } = useToast();

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

  const handleToggleFavorite = () => {
    if (!movie) return;
    if (favorite) {
      removeFromFavorites(movie.id);
      showToast('Removed from Favorites', 'success');
    } else {
      addToFavorites(movie);
      showToast('Success Add to Favorites', 'success');
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
  const releaseDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Unknown';
  const primaryGenre = movie.genres?.[0]?.name || 'Movie';
  
  // Note: Age limit is not directly provided by standard TMDB without release_dates append, so we mock it based on adult flag or use a placeholder
  const ageLimit = movie.adult ? '18+' : '13';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background pb-16"
    >
      {/* Hero Backdrop Section */}
      <div className="relative h-[50vh] w-full overflow-hidden md:h-[60vh] lg:h-[80vh]">
        <div className="absolute inset-0">
          <img
            src={backdropUrl}
            alt={movie.title}
            className="h-full w-full object-cover object-top opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 z-10 h-10 w-10 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80 md:left-8 md:top-8"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Floating Content over backdrop */}
        <div className="container absolute bottom-0 left-0 right-0 mx-auto px-4 pb-12 md:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end">
            {/* Poster & Actions */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-48 shrink-0 md:w-56 lg:w-64"
            >
              <div className="overflow-hidden rounded-xl border-4 border-white/10 shadow-2xl">
                <img
                  src={posterUrl}
                  alt={`Poster for ${movie.title}`}
                  className="w-full object-cover"
                />
              </div>
            </motion.div>

            {/* Title & Stats */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex-1 pb-4"
            >
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {movie.title}
              </h1>
              
              <div className="mb-6 flex items-center gap-2 text-sm text-gray-300">
                <CheckCircle2 className="h-4 w-4" />
                <span>{releaseDate}</span>
              </div>

              {/* Action Buttons */}
              <div className="mb-8 flex flex-wrap items-center gap-4">
                <Button className="h-12 gap-2 rounded-full bg-primary hover:bg-primary/90 px-6 text-sm font-semibold text-white shadow-lg">
                  Watch Trailer
                  <PlayCircle className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-accent/80 hover:bg-accent text-white backdrop-blur-sm"
                  onClick={handleToggleFavorite}
                >
                  <Heart className={`h-5 w-5 ${favorite ? 'fill-primary text-primary' : ''}`} />
                </Button>
              </div>

              {/* Stat Boxes */}
              <div className="grid grid-cols-3 gap-4 max-w-xl">
                <div className="flex flex-col items-center justify-center rounded-xl bg-card border border-border p-4">
                  <Star className="mb-2 h-6 w-6 fill-gold text-gold" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Rating</span>
                  <span className="text-lg font-bold text-white mt-1">{movie.vote_average?.toFixed(1)}/10</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl bg-card border border-border p-4">
                  <Video className="mb-2 h-6 w-6 text-white" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Genre</span>
                  <span className="text-lg font-bold text-white mt-1 line-clamp-1 text-center">{primaryGenre}</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl bg-card border border-border p-4">
                  <div className="mb-2 h-6 w-6 flex items-center justify-center font-bold text-white border-2 border-white rounded-md">
                    {ageLimit}
                  </div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Age Limit</span>
                  <span className="text-lg font-bold text-white mt-1">{ageLimit}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="max-w-4xl">
          {/* Overview Section */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">Overview</h2>
            <p className="leading-relaxed text-gray-400 md:text-lg">
              {movie.overview}
            </p>
          </div>

          {/* Cast & Crew Section */}
          {!isLoadingCredits && credits?.cast && credits.cast.length > 0 && (
            <div>
              <h2 className="mb-6 text-2xl font-bold text-white">Cast & Crew</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {credits.cast.slice(0, 6).map((actor) => (
                  <div key={actor.id} className="flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-lg bg-card">
                      {actor.profile_path ? (
                        <img
                          src={getImageUrl(actor.profile_path, 'w185')}
                          alt={actor.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted text-2xl text-muted-foreground">
                          {actor.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{actor.name}</h4>
                      <p className="text-sm text-muted-foreground">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
