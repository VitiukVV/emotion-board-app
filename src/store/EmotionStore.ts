'use client';

import { makeAutoObservable } from 'mobx';

import type { Emotion } from '@/types';

export class EmotionStore {
  emotions: Emotion[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addEmotion(emotion: Omit<Emotion, 'id' | 'createdAt'>) {
    const newEmotion: Emotion = {
      ...emotion,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    this.emotions.push(newEmotion);
    this.saveToStorage();
  }

  removeEmotion(id: string) {
    this.emotions = this.emotions.filter(e => e.id !== id);
    this.saveToStorage();
  }

  clearAll() {
    this.emotions = [];
    this.saveToStorage();
  }

  reorderEmotions(newOrder: Emotion[]) {
    this.emotions = newOrder;
    this.saveToStorage();
  }

  saveToStorage() {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('emotions', JSON.stringify(this.emotions));
  }

  loadFromStorage() {
    if (typeof localStorage === 'undefined') return;
    const data = localStorage.getItem('emotions');
    if (data) {
      try {
        this.emotions = JSON.parse(data);
      } catch {
        this.emotions = [];
      }
    }
  }
}
