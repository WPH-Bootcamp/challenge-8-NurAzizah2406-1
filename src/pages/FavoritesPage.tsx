import { Link } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';
import { motion } from 'framer-motion';

import { useFavoriteStore } from '@/store/movieStore';
import { MovieGrid } from '@/components/movie/MovieGrid';
import { MovieCard } from '@/components/movie/MovieCard';
import { Button } from '@/components/ui/button';

export function FavoritesPage() {
  const { favorites } = useFavoriteStore();

  return (
    <div className="container mx-auto px-4 py-12 md:px-8">
      <div className="mb-10 flex items-center gap-3">
        <Heart className="h-8 w-8 text-destructive fill-destructive" />
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Your Favorites</h1>
      </div>

      {favorites.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <MovieGrid>
            {favorites.map((movie, idx) => (
              <MovieCard key={movie.id} movie={movie} index={idx} />
            ))}
          </MovieGrid>
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
          <Button asChild size="lg" className="rounded-full shadow-lg">
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
