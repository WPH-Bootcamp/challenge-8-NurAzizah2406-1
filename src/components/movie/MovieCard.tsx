import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

import type { Movie } from '@/types';
import { getImageUrl } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
  index?: number;
  rank?: number;
}

export function MovieCard({ movie, index = 0, rank }: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group relative flex h-full flex-col overflow-hidden transition-transform"
    >
      <Link to={`/movie/${movie.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View details for {movie.title}</span>
      </Link>

      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-card border border-border/50">
        <img
          src={getImageUrl(movie.poster_path, 'w500')}
          alt={`Poster for ${movie.title}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {rank && (
          <div className="absolute left-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-sm font-semibold text-white backdrop-blur-md">
            {rank}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <h3 className="line-clamp-1 text-base font-semibold leading-tight tracking-tight text-white group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-1.5 text-sm font-medium">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span className="text-gray-300">{movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'}/10</span>
        </div>
      </div>
    </motion.div>
  );
}
