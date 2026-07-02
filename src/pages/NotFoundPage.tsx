import { Link } from 'react-router-dom';
import { Film, Home } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="mb-8 flex items-center justify-center"
      >
        <div className="relative">
          <Film className="h-32 w-32 text-primary/20" />
          <div className="absolute inset-0 flex items-center justify-center font-bold text-6xl text-primary text-shadow">
            404
          </div>
        </div>
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl"
      >
        Page Not Found
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8 max-w-md text-lg text-muted-foreground"
      >
        The page you're looking for doesn't exist or has been moved to another universe.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/25 gap-2">
          <Link to="/">
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
