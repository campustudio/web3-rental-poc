const memoryStore = new Map<string, string>();

function lsAvailable(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    const k = '__t__';
    window.localStorage.setItem(k, '1');
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

const hasLS = lsAvailable();

export function getItem(key: string): string | null {
  try {
    if (hasLS) return window.localStorage.getItem(key);
    return memoryStore.get(key) ?? null;
  } catch {
    return memoryStore.get(key) ?? null;
  }
}

export function setItem(key: string, value: string): void {
  try {
    if (hasLS) {
      window.localStorage.setItem(key, value);
    } else {
      memoryStore.set(key, value);
    }
  } catch {
    memoryStore.set(key, value);
  }
}

export function removeItem(key: string): void {
  try {
    if (hasLS) {
      window.localStorage.removeItem(key);
    }
  } catch {}
  memoryStore.delete(key);
}

// Simple debounce helper
export function debouncedSet(key: string, toJSONValue: any, delay = 150) {
  let timer: any;
  return (value?: any) => {
    const v = value === undefined ? toJSONValue : value;
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        setItem(key, JSON.stringify(v));
      } catch {
        // ignore
      }
    }, delay);
  };
}
