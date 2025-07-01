import React from 'react';

import { motion } from 'framer-motion';

import { EMOTION_TYPES, type Emotion } from '@/types';

interface EmotionCardProps {
  emotion: Emotion;
  onDelete: (id: string) => void;
}

const emotionColors: Record<string, string> = {
  joy: 'bg-yellow-200',
  sadness: 'bg-blue-200',
  anger: 'bg-red-200',
  surprise: 'bg-purple-200',
  calm: 'bg-green-200',
  fear: 'bg-gray-300',
  love: 'bg-pink-200',
  confusion: 'bg-indigo-200',
  boredom: 'bg-zinc-200',
  excitement: 'bg-orange-200',
  tiredness: 'bg-lime-200',
  nervousness: 'bg-amber-200',
};

const emotionIcons: Record<string, string> = EMOTION_TYPES.reduce(
  (acc, item) => {
    acc[item.type] = item.icon;
    return acc;
  },
  {} as Record<string, string>,
);

export const EmotionCard: React.FC<EmotionCardProps> = ({ emotion, onDelete }) => {
  const color = emotionColors[emotion.type] || 'bg-gray-200';
  const icon = emotionIcons[emotion.type] || '🙂';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col gap-2 rounded-lg p-4 shadow ${color} transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        <span className="font-bold capitalize">{emotion.type}</span>
      </div>
      <div className="text-sm text-gray-700">{emotion.comment}</div>
      <button
        className="mt-2 cursor-pointer self-end rounded border border-red-600 px-2 py-1 text-xs text-red-600 transition-colors duration-200 hover:bg-red-600 hover:text-white focus:ring-2 focus:ring-red-400 focus:outline-none"
        onClick={() => onDelete(emotion.id)}
      >
        Delete
      </button>
    </motion.div>
  );
};
