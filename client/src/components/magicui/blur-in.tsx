'use client';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface BlurIntProps {
  word: string;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
}
const BlurIn = ({ word, className, variant, duration = 1 }: BlurIntProps) => {
  const defaultVariants = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: { filter: 'blur(0px)', opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      transition={{ duration }}
      variants={combinedVariants}
      className={cn(
        'font-display text-center font-bold tracking-[-0.02em] drop-shadow-sm md:leading-[5rem]',
        'text-2xl md:text-7xl lg:w-4/5 mx-auto w-full text-center font-bold bg-gradient-to-br from-neutral-500 to-neutral-700 dark:from-white dark:to-neutral-600 bg-clip-text text-neutral-800/50 dark:text-neutral-400/80',
        className
      )}
    >
      {word}
    </motion.h1>
  );
};

export default BlurIn;
