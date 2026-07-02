import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { movieService } from '@/services/movieService';
import { HeroSection } from '@/components/home/HeroSection';
import { MovieGrid } from '@/components/movie/MovieGrid';
import { MovieCard } from '@/components/movie/MovieCard';
import { MovieCardSkeleton } from '@/components/movie/MovieCardSkeleton';
import { SearchBar } from '@/components/search/SearchBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    Array.from({ length: 10 }).map((_, i) => (
      <MovieCardSkeleton key={i} />
    ))
  );

  if (query) {
    return (
      <div className="container mx-auto px-4 py-8 md:px-8">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
          <SearchBar initialQuery={query} />
        </div>

        {isLoadingSearch ? (
          <MovieGrid>
            {renderSkeletons()}
          </MovieGrid>
        ) : searchData?.results.length ? (
          <MovieGrid>
            {searchData.results.map((movie, idx) => (
              <MovieCard key={movie.id} movie={movie} index={idx} />
            ))}
          </MovieGrid>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-semibold">No movies found</h2>
            <p className="mt-2 text-muted-foreground">
              We couldn't find any movies matching "{query}"
            </p>
          </div>
        )}
      </div>
    );
  }

  const featuredMovie = popularData?.results[0];
  const popularMovies = popularData?.results.slice(1) || [];

  return (
    <div className="pb-16">
      <HeroSection movie={featuredMovie} isLoading={isLoadingPopular} />

      <div className="container mx-auto -mt-8 px-4 relative z-10 md:-mt-16 md:px-8">
        <div className="mb-10 flex justify-center">
          <div className="w-full max-w-2xl rounded-full bg-background/80 p-2 shadow-xl backdrop-blur-md border border-border/50">
            <SearchBar />
          </div>
        </div>

        <Tabs defaultValue="popular" className="w-full">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Explore Movies</h2>
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="popular" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Popular</TabsTrigger>
              <TabsTrigger value="nowPlaying" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Now Playing</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="popular" className="mt-0 outline-none">
            {isLoadingPopular ? (
              <MovieGrid>
                {renderSkeletons()}
              </MovieGrid>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <MovieGrid>
                  {popularMovies.map((movie, idx) => (
                    <MovieCard key={movie.id} movie={movie} index={idx} />
                  ))}
                </MovieGrid>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="nowPlaying" className="mt-0 outline-none">
            {isLoadingNowPlaying ? (
              <MovieGrid>
                {renderSkeletons()}
              </MovieGrid>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <MovieGrid>
                  {nowPlayingData?.results.map((movie, idx) => (
                    <MovieCard key={movie.id} movie={movie} index={idx} />
                  ))}
                </MovieGrid>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
