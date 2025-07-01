'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { type TimeOfDay, getTimeOfDay } from '@/utils/getTimeOfDay';

const ThemeContext = createContext<TimeOfDay>('day');

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<TimeOfDay>('day');

  useEffect(() => {
    const timeOfDay = getTimeOfDay();
    setTheme(timeOfDay);

    // for testing the time of day
    // const mockedDate = new Date();
    // mockedDate.setHours(18);
    // const timeOfDay = getTimeOfDay(mockedDate);
    // setTheme(timeOfDay);

    document.body.classList.remove('theme-morning', 'theme-day', 'theme-evening');

    document.body.classList.add(`theme-${timeOfDay}`);
  }, []);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
