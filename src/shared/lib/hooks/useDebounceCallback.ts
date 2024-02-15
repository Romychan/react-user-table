import { useRef } from 'react';

/**
 * This hook is designed to apply debounce to a given callback
 *
 * @template T Type of args
 *
 * @param callback A callback that needs to be debounced
 * @param delay The delay time in milliseconds
 *
 * @returns Debounced callback
 */
export const useDebounceCallback = <T>(
  callback: (value: T) => void,
  delay = 250,
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>();

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (args: T) => {
    clearTimer();
    timeoutRef.current = setTimeout(() => callback(args), delay);
  };
};
