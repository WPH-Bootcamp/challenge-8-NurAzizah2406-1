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
  variant?: 'default' | 'compact';
}

export function SearchBar({ className, initialQuery = '', onSearch, variant = 'default' }: SearchBarProps) {
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

  const isCompact = variant === 'compact';

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className={cn('relative w-full group', isCompact ? '' : 'max-w-xl', className)}
    >
      <div className="relative flex items-center">
        <Search className={cn('absolute text-muted-foreground transition-colors group-focus-within:text-white', isCompact ? 'left-3 h-4 w-4' : 'left-4 h-5 w-5')} />
        <Input
          {...register('query')}
          type="text"
          placeholder="Search Movie"
          className={cn(
            'w-full rounded-full border border-border bg-card/80 backdrop-blur-md transition-all text-white',
            'focus-visible:border-white focus-visible:ring-1 focus-visible:ring-white',
            isCompact ? 'h-10 pl-9 pr-9 text-sm' : 'h-14 pl-12 pr-12 text-base border-2',
            errors.query ? 'border-destructive focus-visible:border-destructive' : ''
          )}
        />
        {currentQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn('absolute right-1 rounded-full text-muted-foreground hover:bg-muted hover:text-white', isCompact ? 'h-8 w-8' : 'h-10 w-10 right-2')}
            onClick={handleClear}
          >
            <X className={isCompact ? 'h-4 w-4' : 'h-5 w-5'} />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
      {errors.query && (
        <p className={cn('absolute text-xs font-medium text-destructive', isCompact ? '-bottom-5 left-3' : '-bottom-6 left-4')}>
          {errors.query.message}
        </p>
      )}
    </form>
  );
}
