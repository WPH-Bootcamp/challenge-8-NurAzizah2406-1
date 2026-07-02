import { PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Movie } from '@/types';
import { getImageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex h-full flex-col justify-center px-4 md:px-8 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          {/* Title */}
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {movie.title}
          </h1>

          {/* Overview */}
          <p className="line-clamp-3 mb-8 max-w-xl text-base text-gray-300 sm:text-lg">
            {movie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="h-12 gap-2 rounded-full px-8 text-sm font-semibold shadow-lg bg-primary hover:bg-primary/90 text-white">
              Watch Trailer
              <PlayCircle className="h-5 w-5 fill-current" />
            </Button>
            <Button size="lg" variant="secondary" className="h-12 gap-2 rounded-full px-8 text-sm font-semibold bg-accent/80 hover:bg-accent text-white backdrop-blur-sm" asChild>
              <Link to={`/movie/${movie.id}`}>
                See Detail
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
