import { Link } from 'react-router-dom';
import { Heart, Search, Star, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import { useFavoriteStore } from '@/store/movieStore';
import { getImageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';

export function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavoriteStore();
  const { showToast } = useToast();

  const handleRemove = (id: number, title: string) => {
    removeFromFavorites(id);
    showToast(`Removed "${title}" from Favorites`);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-white md:text-4xl">
        Favorites
      </h1>

      {favorites.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col divide-y divide-border"
        >
          {favorites.map((movie, idx) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex flex-col gap-4 py-6 sm:flex-row sm:items-start"
            >
              {/* Poster */}
              <Link to={`/movie/${movie.id}`} className="shrink-0">
                <div className="h-44 w-32 overflow-hidden rounded-xl bg-card shadow-lg sm:h-48 sm:w-36">
                  <img
                    src={getImageUrl(movie.poster_path, 'w342')}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>

              {/* Info */}
              <div className="flex flex-1 flex-col gap-3">
                <Link to={`/movie/${movie.id}`}>
                  <h2 className="text-lg font-bold text-white hover:text-primary transition-colors sm:text-xl">
                    {movie.title}
                  </h2>
                </Link>

                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-gray-300">{movie.vote_average?.toFixed(1)}/10</span>
                </div>

                <p className="line-clamp-2 text-sm text-gray-400 md:line-clamp-3">
                  {movie.overview}
                </p>

                <div className="flex items-center gap-3 pt-1">
                  <Button
                    size="sm"
                    className="gap-2 rounded-full bg-primary hover:bg-primary/90 px-5 text-sm font-semibold text-white"
                  >
                    Watch Trailer
                    <PlayCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Heart button */}
              <button
                onClick={() => handleRemove(movie.id, movie.title)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary/20"
                aria-label={`Remove ${movie.title} from favorites`}
              >
                <Heart className="h-5 w-5 fill-primary text-primary" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/30 p-8 text-center"
        >
          <div className="mb-4 rounded-full bg-muted p-4">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mb-2 text-2xl font-semibold">No favorites yet</h2>
          <p className="mb-8 max-w-sm text-muted-foreground">
            You haven't added any movies to your favorites list. Explore movies and click the heart icon to save them here.
          </p>
          <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 shadow-lg">
            <Link to="/">
              <Search className="mr-2 h-4 w-4" />
              Discover Movies
            </Link>
          </Button>
        </motion.div>
      )}
    </div>
  );
}

