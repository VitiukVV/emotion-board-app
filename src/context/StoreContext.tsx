'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';

import { EmotionStore } from '@/store/EmotionStore';

const StoreContext = createContext<{ emotionStore: EmotionStore } | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<EmotionStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = new EmotionStore();
  }

  // used here to fix the hydration error
  useEffect(() => {
    storeRef.current?.loadFromStorage();
  }, []);

  return (
    <StoreContext.Provider value={{ emotionStore: storeRef.current }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStores = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStores must be used within a StoreProvider');
  return context;
};
