import { Film, Heart, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 md:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <Film className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">Cineverse</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground md:max-w-sm">
              Your ultimate destination for discovering new movies, exploring popular titles, and keeping track of your favorites. Powered by TMDB API.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Navigation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-primary transition-colors">Favorites</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Social</h3>
            <div className="flex gap-4 text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col items-center justify-between border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Cineverse. All rights reserved.
          </p>
          <p className="mt-4 flex items-center gap-1 text-xs text-muted-foreground sm:mt-0">
            Made with <Heart className="h-3 w-3 fill-destructive text-destructive" /> by Developer
          </p>
        </div>
      </div>
    </footer>
  );
}
