import { Search, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { searchSchema, SearchFormValues } from '@/schemas/searchSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
  initialQuery?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ className, initialQuery = '', onSearch }: SearchBarProps) {
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: initialQuery,
    },
  });

  const currentQuery = watch('query');

  const onSubmit = (data: SearchFormValues) => {
    if (onSearch) {
      onSearch(data.query);
    } else {
      navigate(`/?search=${encodeURIComponent(data.query)}`);
    }
  };

  const handleClear = () => {
    reset({ query: '' });
    if (onSearch) {
      onSearch('');
    } else {
      navigate('/');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className={cn('relative w-full max-w-xl group', className)}
    >
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
        <Input
          {...register('query')}
          type="text"
          placeholder="Search for movies, TV shows, actors..."
          className={cn(
            'h-14 w-full rounded-full border-2 bg-background/50 pl-12 pr-12 text-base backdrop-blur-md transition-all',
            'focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20',
            errors.query ? 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20' : 'border-border'
          )}
        />
        {currentQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 h-10 w-10 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={handleClear}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
      {errors.query && (
        <p className="absolute -bottom-6 left-4 text-xs font-medium text-destructive">
          {errors.query.message}
        </p>
      )}
    </form>
  );
}
