import React from 'react';

import { AnimatePresence } from 'framer-motion';

import type { Emotion } from '@/types';

import { EmotionCard } from './EmotionCard';

interface EmotionGridProps {
  emotions: Emotion[];
  onDelete: (id: string) => void;
}

export const EmotionGrid: React.FC<EmotionGridProps> = ({ emotions, onDelete }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <AnimatePresence>
        {emotions.map(emotion => (
          <div key={emotion.id} className="transition-all duration-300 ease-in-out">
            <EmotionCard emotion={emotion} onDelete={onDelete} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
