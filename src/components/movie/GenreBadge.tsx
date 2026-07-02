import { Badge } from '@/components/ui/badge';

interface GenreBadgeProps {
  genre: { id: number; name: string } | string;
}

export function GenreBadge({ genre }: GenreBadgeProps) {
  const name = typeof genre === 'string' ? genre : genre.name;
  
  return (
    <Badge variant="secondary" className="bg-secondary/50 text-secondary-foreground hover:bg-secondary/80 backdrop-blur-sm">
      {name}
    </Badge>
  );
}
