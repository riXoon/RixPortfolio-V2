import { useEffect, useState } from 'react';
import apiClient from '../api/client';

const STORAGE_PREFIX = 'portfolio-cache:v1:';
const FRESH_MS = 60 * 1000; // don't refetch within a minute of the last success

const readStored = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null; // storage blocked, or corrupt JSON
  }
};

const writeStored = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // storage full or unavailable: the cache is only an optimisation
  }
};

// Builds a hook for a public API list, with stale-while-revalidate caching:
//  - the last good response is kept in localStorage, so returning visitors render
//    instantly instead of waiting on the network (or a sleeping server)
//  - every page load still refetches in the background and swaps in fresh data
//  - if the API is unreachable and nothing is cached, `getFallback()` is used
// All components using the same hook share one request.
export default function createApiHook(path, normalize, getFallback) {
  const storageKey = STORAGE_PREFIX + path;
  let items; // latest known normalized data (from cache or network)
  let request = null; // in-flight request, shared by every caller
  let fetchedAt = 0;

  const fromStorage = () => {
    if (items !== undefined) return;
    const stored = readStored(storageKey);
    if (!stored) return;
    try {
      items = normalize(stored);
    } catch {
      items = undefined; // cached shape is outdated: ignore it
    }
  };

  const revalidate = () => {
    if (request) return request;
    if (items !== undefined && Date.now() - fetchedAt < FRESH_MS) {
      return Promise.resolve({ items, loading: false, offline: false });
    }
    request = apiClient.get(path)
      .then(({ data }) => {
        items = normalize(data);
        fetchedAt = Date.now();
        writeStored(storageKey, data);
        return { items, loading: false, offline: false };
      })
      .catch(() => (items !== undefined
        ? { items, loading: false, offline: false } // keep showing the cached copy
        : { items: getFallback(), loading: false, offline: true }))
      .finally(() => { request = null; });
    return request;
  };

  return function useApiResource() {
    const [state, setState] = useState(() => {
      fromStorage();
      return items !== undefined
        ? { items, loading: false, offline: false }
        : { items: [], loading: true, offline: false };
    });

    useEffect(() => {
      let active = true;
      revalidate().then(next => active && setState(next));
      return () => { active = false; };
    }, []);

    return state;
  };
}
