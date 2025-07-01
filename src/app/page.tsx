'use client';

import { useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';

import { EmotionGrid } from '@/components/EmotionGrid';
import { EmotionList } from '@/components/EmotionList';
import { EmotionModal } from '@/components/EmotionModal';

import { useStores } from '@/context/StoreContext';
import { useTheme } from '@/context/ThemeContext';

import type { Emotion } from '@/types';

const greetingsMap: Record<string, string> = {
  morning: 'Good morning',
  day: 'Good day',
  evening: 'Good evening',
  night: 'Good night',
};

const Home = observer(() => {
  const { emotionStore } = useStores();
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    emotionStore.loadFromStorage();
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const greeting = greetingsMap[theme] || 'Hello';

  const titleTextColorClass = theme === 'night' ? 'text-white' : 'text-gray-900';

  return (
    <main className="mx-auto max-w-3xl p-4">
      <h1 className={`mb-4 text-2xl font-bold ${titleTextColorClass}`}>
        {greeting}! Emotions ({emotionStore.emotions.length})
      </h1>

      <div className="mb-4 flex items-center gap-4">
        <button
          className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={() => setModalOpen(true)}
        >
          Add emotion
        </button>
        {emotionStore.emotions.length > 0 && (
          <button
            className="cursor-pointer rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            onClick={() => emotionStore.clearAll()}
          >
            Clear all emotions
          </button>
        )}
      </div>

      {isMobile ? (
        <EmotionList
          emotions={emotionStore.emotions}
          onDelete={id => emotionStore.removeEmotion(id)}
          onReorder={newOrder => emotionStore.reorderEmotions(newOrder)}
        />
      ) : (
        <EmotionGrid
          emotions={emotionStore.emotions}
          onDelete={id => emotionStore.removeEmotion(id)}
        />
      )}

      <EmotionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={({ type, comment }) => {
          emotionStore.addEmotion({ type: type as Emotion['type'], comment });
          setModalOpen(false);
        }}
      />
    </main>
  );
});

export default Home;
