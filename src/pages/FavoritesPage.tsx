import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useFavoriteStore } from '@/store/movieStore';
import { Button } from '@/components/ui/button';
import { MovieListCard } from '@/components/movie/MovieListCard';

export function FavoritesPage() {
  const { favorites } = useFavoriteStore();

  return (
    <div className="container mx-auto px-4 py-8 md:px-8 md:py-12">
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-white md:mb-8 md:text-4xl">
        Favorites
      </h1>

      {favorites.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          {favorites.map((movie, idx) => (
            <MovieListCard key={movie.id} movie={movie} index={idx} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-[70vh] flex-col items-center justify-center"
        >
          {/* Clapperboard icon */}
          <div className="mb-6 text-8xl select-none">🎬</div>
          <h2 className="mb-2 text-xl font-bold text-white">Data Empty</h2>
          <p className="mb-8 text-sm text-gray-400">
            You don't have a favorite movie yet
          </p>
          <Button asChild className="rounded-full bg-primary hover:bg-primary/90 px-10 py-5 text-sm font-semibold text-white shadow-lg">
            <Link to="/">
              Explore Movie
            </Link>
          </Button>
        </motion.div>
      )}
    </div>
  );
}

