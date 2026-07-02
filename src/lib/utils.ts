import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string | null | undefined, size: string = 'original'): string {
  if (!path) return '/images/no-poster.svg';
  const baseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';
  return `${baseUrl}/${size}${path}`;
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'Unknown Date';
  try {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  } catch (e) {
    return dateString;
  }
}

export function formatRuntime(minutes: number | null | undefined): string {
  if (!minutes) return 'Unknown Runtime';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  return `${hours}h ${mins}m`;
}
