import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

import { Movie } from '@/types';
import { getImageUrl, formatDate } from '@/lib/utils';
import { useFavoriteStore } from '@/store/movieStore';
import { Button } from '@/components/ui/button';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoriteStore();
  const favorite = isFavorite(movie.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card/50 shadow-sm transition-all hover:shadow-lg hover:shadow-primary/10"
    >
      <Link to={`/movie/${movie.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View details for {movie.title}</span>
      </Link>

      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <img
          src={getImageUrl(movie.poster_path, 'w500')}
          alt={`Poster for ${movie.title}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-20 h-8 w-8 rounded-full bg-background/50 backdrop-blur-md hover:bg-background/80"
          onClick={toggleFavorite}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              favorite ? 'fill-destructive text-destructive' : 'text-foreground'
            }`}
          />
        </Button>

        <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1 rounded-md bg-background/70 px-2 py-1 text-xs font-semibold backdrop-blur-md">
          <Star className="h-3 w-3 fill-gold text-gold" />
          <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 text-base font-semibold leading-tight tracking-tight group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatDate(movie.release_date)}
        </p>
      </div>
    </motion.div>
  );
}
