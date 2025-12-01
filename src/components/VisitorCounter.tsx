'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Get or initialize visitor count
    const storedCount = localStorage.getItem('visitorCount');
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      // This is a new session, increment the count
      const newCount = storedCount ? parseInt(storedCount, 10) + 1 : 1;
      localStorage.setItem('visitorCount', newCount.toString());
      sessionStorage.setItem('hasVisited', 'true');
      setCount(newCount);
    } else {
      // Already visited in this session, just display the count
      setCount(storedCount ? parseInt(storedCount, 10) : 1);
    }
  }, []);

  if (count === null) {
    return null; // Don't render until count is loaded
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed bottom-4 left-4 z-40 flex items-center gap-2 px-3 py-2 bg-void-deep/80 backdrop-blur-md border border-white/10 rounded-lg"
    >
      <Users className="w-4 h-4 text-white/60" />
      <span className="font-body text-xs text-white/70">
        <span className="font-semibold text-white">{count.toLocaleString()}</span> visitors
      </span>
    </motion.div>
  );
}

