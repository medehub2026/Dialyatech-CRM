const prefix = "dialyatech_crm_";

export function loadState(key, fallback) {
  try {
    const raw = localStorage.getItem(`${prefix}${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveState(key, value) {
  localStorage.setItem(`${prefix}${key}`, JSON.stringify(value));
}

export function resetCRMStorage() {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(prefix))
    .forEach((key) => localStorage.removeItem(key));
}
