'use client';

import React, { useState } from 'react';

import { EMOTION_TYPES } from '@/types';

interface EmotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (emotion: { type: string; comment: string }) => void;
}

export const EmotionModal: React.FC<EmotionModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [type, setType] = useState('joy');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleAddClick = () => {
    if (!comment.trim()) {
      setError('Please enter a comment.');
      return;
    }
    onSubmit({ type, comment });
    setComment('');
    setType('joy');
    setError('');
    onClose();
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    if (error) setError('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
    >
      <div
        className="relative mx-2 w-full max-w-xs rounded-lg bg-white p-6 shadow-lg sm:max-w-md md:max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          type="button"
        >
          &#10005;
        </button>

        <h2 className="mb-4 text-lg font-bold">Add emotion</h2>
        <div className="mb-4 flex flex-wrap gap-2">
          {EMOTION_TYPES.map(e => (
            <button
              key={e.type}
              className={`flex min-h-[72px] min-w-[64px] cursor-pointer flex-col items-center justify-center rounded border px-3 py-2 text-center ${
                type === e.type ? 'border-blue-400 bg-blue-100' : 'border-gray-300'
              }`}
              onClick={() => setType(e.type)}
              type="button"
            >
              <span className="text-2xl">{e.icon}</span>
              <span className="text-xs">{e.label}</span>
            </button>
          ))}
        </div>
        <textarea
          className={`mb-1 w-full rounded border p-2 text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
          rows={2}
          placeholder="Comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        {error && <p className="mb-4 text-xs text-red-600">{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            className="cursor-pointer rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="cursor-pointer rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 disabled:opacity-50"
            onClick={handleAddClick}
            type="button"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
