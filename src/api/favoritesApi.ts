const FAVORITES_KEY = "college_bazar_favorites";

function readFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeFavorites(ids: string[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

export const favoritesApi = {
  getAll: (): string[] => readFavorites(),

  isFavorite: (id: string): boolean => readFavorites().includes(id),

  toggle: (id: string): boolean => {
    const current = readFavorites();
    const exists = current.includes(id);
    const updated = exists
      ? current.filter((favId) => favId !== id)
      : [...current, id];

    writeFavorites(updated);
    return !exists; // возвращает новое состояние (true — теперь в избранном)
  },
};