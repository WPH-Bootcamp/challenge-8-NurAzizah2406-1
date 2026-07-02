import { ReactNode } from 'react';

interface MovieGridProps {
  children: ReactNode;
  title?: string;
}

export function MovieGrid({ children, title }: MovieGridProps) {
  return (
    <div className="w-full">
      {title && (
        <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {children}
      </div>
    </div>
  );
}
