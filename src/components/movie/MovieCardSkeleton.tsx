import { Skeleton } from '@/components/ui/skeleton';

export function MovieCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card/50 shadow-sm">
      <Skeleton className="aspect-[2/3] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
