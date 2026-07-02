import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Movie } from '@/types';
import { getImageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroSectionProps {
  movie?: Movie;
  isLoading?: boolean;
}

export function HeroSection({ movie, isLoading }: HeroSectionProps) {
  if (isLoading || !movie) {
    return (
      <div className="relative h-[60vh] min-h-[400px] w-full max-w-[100vw] overflow-hidden bg-muted lg:h-[80vh]">
        <div className="shimmer absolute inset-0" />
      </div>
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');

  return (
    <div className="relative h-[60vh] min-h-[400px] w-full max-w-[100vw] overflow-hidden lg:h-[80vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="h-full w-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex h-full flex-col justify-end px-4 pb-12 md:px-8 md:pb-24 lg:justify-center lg:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          {/* Rating & Release Year */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/20">
              Featured
            </Badge>
            <div className="flex items-center gap-1 text-sm font-medium text-gold">
              <span className="text-xl">★</span>
              <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'}</span>
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {movie.title}
          </h1>

          {/* Overview */}
          <p className="line-clamp-3 mb-8 max-w-xl text-base text-foreground/80 sm:text-lg md:text-xl">
            {movie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="h-12 gap-2 rounded-full px-8 text-base shadow-lg shadow-primary/25">
              <Play className="h-5 w-5 fill-current" />
              Play Trailer
            </Button>
            <Button size="lg" variant="outline" className="h-12 gap-2 rounded-full px-8 text-base backdrop-blur-md bg-background/20" asChild>
              <Link to={`/movie/${movie.id}`}>
                <Info className="h-5 w-5" />
                More Info
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
