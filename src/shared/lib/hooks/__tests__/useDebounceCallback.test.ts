import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { useDebounceCallback } from '../useDebounceCallback';

describe('useDebounceCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should the passed callback be called after the default time has elapsed', () => {
    vi.spyOn(global, 'setTimeout');
    const mockCallback = vi.fn((value) => value);

    const { result } = renderHook(() => useDebounceCallback(mockCallback));
    const debounceCallback = result.current;

    debounceCallback(null);
    debounceCallback(null);
    debounceCallback(null);

    vi.runAllTimers();

    expect(setTimeout).toHaveBeenCalledTimes(3);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 250);

    expect(mockCallback).toHaveBeenCalled();
  });

  it('should the passed callback be called only once', () => {
    const mockCallback = vi.fn();

    const { result } = renderHook(() => useDebounceCallback(mockCallback));
    const debounceCallback = result.current;

    debounceCallback(null);
    vi.advanceTimersByTime(100);
    expect(mockCallback).not.toHaveBeenCalled();

    debounceCallback(null);
    vi.advanceTimersByTime(100);
    expect(mockCallback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(250);

    expect(mockCallback).toHaveBeenCalled();
  });

  it('should call the clearTimeout when unmounting', () => {
    vi.spyOn(global, 'clearTimeout');
    const mockCallback = vi.fn((value) => value);

    const { result, unmount } = renderHook(() =>
      useDebounceCallback(mockCallback),
    );
    const debounceCallback = result.current;

    debounceCallback(null);
    debounceCallback(null);
    debounceCallback(null);

    vi.advanceTimersByTime(100);

    unmount();

    expect(clearTimeout).toHaveBeenCalled();
  });
});
