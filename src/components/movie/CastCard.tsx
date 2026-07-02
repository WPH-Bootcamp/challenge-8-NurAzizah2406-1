import { getImageUrl } from '@/lib/utils';
import { Cast } from '@/types';

interface CastCardProps {
  cast: Cast;
}

export function CastCard({ cast }: CastCardProps) {
  return (
    <div className="scroll-item w-32 flex-none sm:w-36 md:w-40">
      <div className="overflow-hidden rounded-lg bg-card border border-border">
        <div className="aspect-[2/3] w-full overflow-hidden">
          {cast.profile_path ? (
            <img
              src={getImageUrl(cast.profile_path, 'w185')}
              alt={`Profile of ${cast.name}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-4xl text-muted-foreground">
              {cast.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="p-2 sm:p-3">
          <h4 className="line-clamp-1 text-sm font-semibold">{cast.name}</h4>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {cast.character}
          </p>
        </div>
      </div>
    </div>
  );
}
