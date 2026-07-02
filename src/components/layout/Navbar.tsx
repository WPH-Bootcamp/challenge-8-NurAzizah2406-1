import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Tv, Search, Menu, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/utils';
import { SearchBar } from '@/components/search/SearchBar';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Favorites', path: '/favorites' },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  };

  const closeMobileSearch = () => {
    setMobileSearchOpen(false);
    navigate('/');
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-8">
          {/* Mobile Search Active State */}
          {mobileSearchOpen ? (
            <div className="flex h-16 w-full items-center gap-3 md:hidden">
              <button
                onClick={closeMobileSearch}
                className="flex h-10 w-10 shrink-0 items-center justify-center text-white transition-colors hover:bg-white/10 rounded-full"
                aria-label="Back"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div className="flex-1">
                <SearchBar
                  variant="compact"
                  onSearch={() => { /* don't close, user might want to see results and search again */ }}
                />
              </div>
            </div>
          ) : (
            <div className="flex h-16 items-center justify-between md:h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80" onClick={closeMobileMenu}>
                <Tv className="h-7 w-7 text-white fill-white md:h-8 md:w-8" />
                <span className="text-xl font-bold tracking-tight text-white md:text-2xl">
                  Movie
                </span>
              </Link>

              {/* Desktop Navigation Links */}
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

              {/* Desktop Search Bar */}
              <div className="hidden w-full max-w-sm items-center justify-end md:flex">
                <SearchBar className="max-w-[280px]" variant="compact" />
              </div>

              {/* Mobile Right Icons */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => { setMobileSearchOpen(true); setMobileMenuOpen(false); }}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setMobileSearchOpen(false); }}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                  aria-label="Menu"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Fullscreen Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] flex flex-col bg-background px-4 py-4 md:hidden"
            >
              {/* Menu Header */}
              <div className="flex h-12 items-center justify-between mb-8">
                <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
                  <Tv className="h-7 w-7 text-white fill-white" />
                  <span className="text-xl font-bold tracking-tight text-white">Movie</span>
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Menu Links */}
              <nav className="flex flex-col gap-6 px-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={closeMobileMenu}
                      className={cn(
                        'text-lg font-medium transition-colors',
                        isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
