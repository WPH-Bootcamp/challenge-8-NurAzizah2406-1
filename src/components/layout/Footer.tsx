import { Tv } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-background py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8">
        <Link to="/" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
          <Tv className="h-6 w-6 text-white fill-white" />
          <span className="text-xl font-bold tracking-tight text-white">Movie</span>
        </Link>
        
        <p className="text-sm text-muted-foreground">
          Copyright &copy; {new Date().getFullYear()} Movie Explorer
        </p>
      </div>
    </footer>
  );
}
