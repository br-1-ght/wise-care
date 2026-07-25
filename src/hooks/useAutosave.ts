import { useEffect, useRef } from "react";

/**
 * Persists a serializable draft to localStorage as it changes, and returns
 * the previously saved draft (if any) for restoring on mount.
 */
export function useAutosave<T>(key: string, value: T, delayMs = 500) {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // storage unavailable — fail silently, autosave is a convenience only
      }
    }, delayMs);
    return () => clearTimeout(timer.current);
  }, [key, value, delayMs]);
}

export function readDraft<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function clearDraft(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
