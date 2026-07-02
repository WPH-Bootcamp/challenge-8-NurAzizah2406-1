import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Movie } from '@/types';

interface FavoriteStore {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addToFavorites: (movie) =>
        set((state) => {
          if (!state.favorites.find((m) => m.id === movie.id)) {
            return { favorites: [...state.favorites, movie] };
          }
          return state;
        }),
      removeFromFavorites: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== movieId),
        })),
      isFavorite: (movieId) => {
        return !!get().favorites.find((m) => m.id === movieId);
      },
    }),
    {
      name: 'movie-favorites-storage', // name of the item in the storage
    }
  )
);
