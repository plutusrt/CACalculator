import { useState, useEffect } from 'react';

/**
 * useLocalStorage: a useState replacement that persists to localStorage.
 * Falls back gracefully if storage isn't available.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) return JSON.parse(stored);
    } catch (e) {
      // ignore
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // ignore quota / privacy errors
    }
  }, [key, value]);

  return [value, setValue];
}
