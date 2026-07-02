import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

import { movieService } from '@/services/movieService';
import { HeroSection } from '@/components/home/HeroSection';
import { MovieGrid } from '@/components/movie/MovieGrid';
import { MovieCard } from '@/components/movie/MovieCard';
import { MovieListCard } from '@/components/movie/MovieListCard';
import { MovieCardSkeleton } from '@/components/movie/MovieCardSkeleton';
import { SearchBar } from '@/components/search/SearchBar';

export function HomePage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || '';

  const { data: popularData, isLoading: isLoadingPopular } = useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: () => movieService.getPopularMovies(),
    enabled: !query,
  });

  const { data: nowPlayingData, isLoading: isLoadingNowPlaying } = useQuery({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: () => movieService.getNowPlayingMovies(),
    enabled: !query,
  });

  const { data: searchData, isLoading: isLoadingSearch } = useQuery({
    queryKey: ['movies', 'search', query],
    queryFn: () => movieService.searchMovies(query),
    enabled: !!query,
  });

  const renderSkeletons = () => (
    Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="scroll-item w-36 flex-none sm:w-44 md:w-52 lg:w-60">
        <MovieCardSkeleton />
      </div>
    ))
  );

  if (query) {
    return (
      <div className="container mx-auto px-4 py-8 md:px-8">
        <div className="mb-8 hidden items-center justify-between gap-4 md:flex md:flex-row">
          <h1 className="text-3xl font-bold tracking-tight text-white">Search Results</h1>
          <SearchBar initialQuery={query} />
        </div>

        {isLoadingSearch ? (
          <MovieGrid>
            {Array.from({ length: 10 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </MovieGrid>
        ) : searchData?.results.length ? (
          <div className="flex flex-col mt-6">
            {searchData.results.map((movie, idx) => (
              <MovieListCard key={movie.id} movie={movie} index={idx} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 relative text-8xl select-none text-muted-foreground/50">
              🎬
              <Search className="absolute -bottom-2 -right-2 h-14 w-14 rounded-full bg-background p-2 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Data Not Found</h2>
            <p className="mt-2 text-sm text-gray-400">
              Try other keywords
            </p>
          </div>
        )}
      </div>
    );
  }

  const featuredMovie = popularData?.results[0];
  const popularMovies = popularData?.results.slice(1) || [];

  return (
    <div className="pb-16 bg-background">
      <HeroSection movie={featuredMovie} isLoading={isLoadingPopular} />

      <div className="container mx-auto mt-12 px-4 md:px-8">
        {/* Trending Now Section */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-white md:text-3xl">Trending Now</h2>
          <div className="scroll-container -mx-4 flex gap-4 px-4 pb-4 md:mx-0 md:px-0">
            {isLoadingPopular ? (
              renderSkeletons()
            ) : (
              popularMovies.map((movie, idx) => (
                <div key={movie.id} className="scroll-item w-36 flex-none sm:w-44 md:w-52 lg:w-60">
                  <MovieCard movie={movie} index={idx} rank={idx + 1} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* New Release Section */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-white md:text-3xl">New Release</h2>
          {isLoadingNowPlaying ? (
            <MovieGrid>
              {Array.from({ length: 8 }).map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))}
            </MovieGrid>
          ) : (
            <MovieGrid>
              {nowPlayingData?.results.map((movie, idx) => (
                <MovieCard key={movie.id} movie={movie} index={idx} />
              ))}
            </MovieGrid>
          )}
        </div>
      </div>
    </div>
  );
}
