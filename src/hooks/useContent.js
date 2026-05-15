import { useState, useEffect } from 'react';

const PREFIX = 'havesta_content_';

// Global cache for /content.json — loaded once, used everywhere
let _cache = null;
let _promise = null;

export function fetchContentJson() {
  if (_cache !== null) return Promise.resolve(_cache);
  if (_promise) return _promise;
  _promise = fetch('/content.json?_=' + Math.floor(Date.now() / 60000))
    .then(r => r.ok ? r.json() : {})
    .catch(() => ({}))
    .then(data => { _cache = data; return data; });
  return _promise;
}

function deepMerge(defaults, overrides) {
  if (!overrides || typeof overrides !== 'object') return defaults;
  const result = Array.isArray(defaults) ? [...defaults] : { ...defaults };
  for (const key of Object.keys(overrides)) {
    if (Array.isArray(overrides[key])) {
      result[key] = overrides[key];
    } else if (
      overrides[key] !== null &&
      typeof overrides[key] === 'object' &&
      !Array.isArray(defaults[key])
    ) {
      result[key] = deepMerge(defaults[key] ?? {}, overrides[key]);
    } else {
      result[key] = overrides[key];
    }
  }
  return result;
}

export function getStoredContent(key, defaults) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw) return deepMerge(defaults, JSON.parse(raw));
  } catch {}
  return defaults;
}

export function saveContent(key, data) {
  localStorage.setItem(PREFIX + key, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('havesta:content', { detail: { key, data } }));
}

export function resetContent(key) {
  localStorage.removeItem(PREFIX + key);
  window.dispatchEvent(new CustomEvent('havesta:content', { detail: { key, data: null } }));
}

export function useContent(key, defaults) {
  const [content, setContent] = useState(() => getStoredContent(key, defaults));

  useEffect(() => {
    // If no localStorage override, fall back to content.json
    if (!localStorage.getItem(PREFIX + key)) {
      fetchContentJson().then(json => {
        const raw = json[PREFIX + key];
        if (raw) {
          try {
            const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
            setContent(deepMerge(defaults, parsed));
          } catch {}
        }
      });
    }

    const handler = (e) => {
      if (e.detail.key === key) {
        setContent(e.detail.data ? deepMerge(defaults, e.detail.data) : { ...defaults });
      } else if (e.detail.key === '__reload__') {
        const stored = localStorage.getItem(PREFIX + key);
        if (stored) {
          try { setContent(deepMerge(defaults, JSON.parse(stored))); } catch {}
        }
      }
    };
    window.addEventListener('havesta:content', handler);
    return () => window.removeEventListener('havesta:content', handler);
  }, [key]);

  return content;
}
