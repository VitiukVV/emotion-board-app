import React, { useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import type { Emotion } from '@/types';

import { EmotionCard } from './EmotionCard';

interface EmotionListProps {
  emotions: Emotion[];
  onDelete: (id: string) => void;
  onReorder: (newOrder: Emotion[]) => void;
}

export const EmotionList: React.FC<EmotionListProps> = ({ emotions, onDelete, onReorder }) => {
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [swipeX, setSwipeX] = useState<{ [id: string]: number }>({});

  const touchStartX = useRef(0);

  const handleDragStart = (idx: number) => setDraggedIdx(idx);
  const handleDragEnter = (idx: number) => setDragOverIdx(idx);
  const handleDragEnd = () => {
    if (draggedIdx !== null && dragOverIdx !== null && draggedIdx !== dragOverIdx) {
      const newOrder = [...emotions];
      const [removed] = newOrder.splice(draggedIdx, 1);
      newOrder.splice(dragOverIdx, 0, removed);
      onReorder(newOrder);
    }
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent, id: string) => {
    const currentX = e.touches[0].clientX;
    const diffX = currentX - touchStartX.current;
    const limitedDiffX = Math.min(100, Math.max(-100, diffX));
    setSwipeX(prev => ({ ...prev, [id]: limitedDiffX }));
  };

  const handleTouchEnd = (e: React.TouchEvent, id: string) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 60) {
      onDelete(id);
    } else {
      setSwipeX(prev => ({ ...prev, [id]: 0 }));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <AnimatePresence>
        {emotions.map((emotion, idx) => (
          <motion.div
            key={emotion.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragEnter={() => handleDragEnter(idx)}
            onDragEnd={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={e => handleTouchMove(e, emotion.id)}
            onTouchEnd={e => handleTouchEnd(e, emotion.id)}
            style={{ transform: `translateX(${swipeX[emotion.id] ?? 0}px)` }}
            className={
              'transition-transform ' +
              (dragOverIdx === idx && draggedIdx !== null ? 'scale-95 opacity-80' : '')
            }
          >
            <EmotionCard emotion={emotion} onDelete={onDelete} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
