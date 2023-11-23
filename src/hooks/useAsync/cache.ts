type Timer = ReturnType<typeof setTimeout>;
type CachedKey = string | null;
type CachedData = {
  data: any;
  params: any;
  timer: Timer | undefined;
  time: number;
  staleTime: number;
  loading: boolean | undefined;
};

type Listener = (data: any) => void;

const cache = new Map<CachedKey, CachedData>();

const listeners: Record<string, Listener[]> = {};

const setCache = (
  key: CachedKey,
  cacheTime: number,
  data: any,
  params: any,
  staleTime: number,
  loading?: boolean
) => {
  const currentCache = cache.get(key);

  if (currentCache?.timer) {
    clearTimeout(currentCache.timer);
  }

  let timer: Timer | undefined = undefined;

  if (cacheTime > -1) {
    timer = setTimeout(() => {
      cache.delete(key);
    }, cacheTime);
  }

  if (listeners[key as string]) {
    listeners[key as string].forEach((item) => item(data));
  }

  cache.set(key, {
    data,
    params,
    timer,
    time: new Date().getTime(),
    staleTime,
    loading,
  });
};

const getCache = (key: CachedKey) => {
  return cache.get(key);
};

const subscribe = (key: string, listener: Listener) => {
  if (!listeners[key]) {
    listeners[key] = [];
  }

  listeners[key].push(listener);

  return function unsubscribe() {
    const index = listeners[key].indexOf(listener);
    listeners[key].splice(index, 1);
  };
};

const clearCache = (key: string | string[]) => {
  if (key) {
    const cacheKeys = Array.isArray(key) ? key : [key];
    cacheKeys.forEach((cacheKey) => cache.delete(cacheKey));
  } else {
    cache.clear();
  }
};

export { getCache, setCache, subscribe, clearCache };
