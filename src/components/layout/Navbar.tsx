import { Link, useLocation } from 'react-router-dom';
import { Tv } from 'lucide-react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import { SearchBar } from '@/components/search/SearchBar';

export function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Favorites', path: '/favorites' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-8 md:gap-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Tv className="h-8 w-8 text-white fill-white" />
            <span className="text-2xl font-bold tracking-tight text-white">
              Movie
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    'relative text-sm font-medium transition-colors hover:text-white',
                    isActive ? 'text-white' : 'text-muted-foreground'
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-2 left-0 h-0.5 w-full bg-white"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Search Bar */}
        <div className="flex w-full max-w-sm items-center justify-end">
          <SearchBar className="max-w-[280px]" variant="compact" />
        </div>
      </div>
    </header>
  );
}
