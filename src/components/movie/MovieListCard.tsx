import { Link } from 'react-router-dom';
import { Heart, Star, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import type { Movie } from '@/types';
import { getImageUrl } from '@/lib/utils';
import { useFavoriteStore } from '@/store/movieStore';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';

interface MovieListCardProps {
  movie: Movie;
  index: number;
}

export function MovieListCard({ movie, index }: MovieListCardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoriteStore();
  const favorite = isFavorite(movie.id);
  const { showToast } = useToast();

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(movie.id);
      showToast(`Removed "${movie.title}" from Favorites`);
    } else {
      addToFavorites(movie);
      showToast(`Success Add to Favorites`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="py-5 border-b border-border/50 last:border-0"
    >
      {/* Top row: Poster + Info */}
      <div className="flex gap-3 sm:gap-4">
        {/* Poster */}
        <Link to={`/movie/${movie.id}`} className="shrink-0">
          <div className="h-36 w-24 overflow-hidden rounded-xl bg-card shadow-lg sm:h-44 sm:w-32">
            <img
              src={getImageUrl(movie.poster_path, 'w342')}
              alt={movie.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>

        {/* Info */}
        <div className="flex flex-1 flex-col gap-1.5">
          <Link to={`/movie/${movie.id}`}>
            <h2 className="text-base font-bold leading-tight text-white hover:text-primary transition-colors sm:text-xl">
              {movie.title}
            </h2>
          </Link>

          <div className="flex items-center gap-1.5 text-sm font-semibold">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-gray-300">{movie.vote_average?.toFixed(1)}/10</span>
          </div>

          <p className="line-clamp-2 text-sm text-gray-400">
            {movie.overview}
          </p>
        </div>
      </div>

      {/* Bottom row: Watch Trailer (flex-1) + Heart button */}
      <div className="mt-3 flex items-center gap-3">
        <Button
          className="flex-1 gap-2 rounded-full bg-primary hover:bg-primary/90 text-sm font-semibold text-white"
        >
          Watch Trailer
          <PlayCircle className="h-4 w-4" />
        </Button>
        <button
          onClick={handleToggleFavorite}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3a1010] transition-colors hover:bg-primary/30"
          aria-label={favorite ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
        >
          <Heart className={`h-5 w-5 ${favorite ? 'fill-primary text-primary' : 'text-primary'}`} />
        </button>
      </div>
    </motion.div>
  );
}
