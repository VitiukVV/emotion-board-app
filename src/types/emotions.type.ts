export const EMOTION_KEYS = [
  'joy',
  'sadness',
  'anger',
  'surprise',
  'calm',
  'fear',
  'love',
  'confusion',
  'boredom',
  'excitement',
  'tiredness',
  'nervousness',
] as const;

export type EmotionType = (typeof EMOTION_KEYS)[number];

export interface Emotion {
  id: string;
  type: EmotionType;
  comment: string;
  createdAt: number;
}

export const EMOTION_TYPES: { type: EmotionType; label: string; icon: string }[] = [
  { type: 'joy', label: 'Joy', icon: '😊' },
  { type: 'sadness', label: 'Sadness', icon: '😢' },
  { type: 'anger', label: 'Anger', icon: '😡' },
  { type: 'surprise', label: 'Surprise', icon: '😲' },
  { type: 'calm', label: 'Calm', icon: '😌' },
  { type: 'fear', label: 'Fear', icon: '😨' },
  { type: 'love', label: 'Love', icon: '❤️' },
  { type: 'confusion', label: 'Confusion', icon: '😕' },
  { type: 'boredom', label: 'Boredom', icon: '🥱' },
  { type: 'excitement', label: 'Excitement', icon: '🤩' },
  { type: 'tiredness', label: 'Tiredness', icon: '😴' },
  { type: 'nervousness', label: 'Nervousness', icon: '😬' },
];
