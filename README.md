College Bazar

Когда появится API — файл src/api/adsApi.ts нада переписать на axios-вызовы
остальной код (HomePage, AdDetailPage, CreateAdPage) НЕ ТРОГАТЬТ
они работают только через объект adsApi

Авторизация реализована как заглушка, при входе в src/pages/LoginPage.tsx
email сохраняется в localStorage под ключом user

Стек

React 19 + TypeScript
Vite
React Router
Tailwind CSS




Запуск проекта

Перейти в папку фронтенда:
cd ads-frontend

Установить зависимости:
bash   npm install


Запустить dev-сервер:
bash   npm run dev

Открыть в браузере адрес (обычно http://localhost:5173)



# College Bazar — Полная инструкция по запуску

Студенческий маркетплейс. Проект состоит из двух частей:

- `ads-frontend` — React + TypeScript + Vite (фронтенд)
- `college-bazar-backend` — Python + Django REST Framework (бэкенд)

---

## Требования

- **Node.js** 18+ (скачать: https://nodejs.org)
- **Python** 3.10+ (скачать: https://python.org/downloads)


```bash
node --version
python --version   # или python3 --version
```


---

## Структура папок

```
College bazar/
├── ads-frontend/           ← фронтенд (React)
└── college-bazar-backend/  ← бэкенд (Django)
```

---

## Часть 1 — Запуск бэкенда (Django)

откройте терминал и перейди в папку бэкенда:

```bash
cd "College bazar/college-bazar-backend"
```

### Шаг 1. Создать виртуальное окружение

```bash
python -m venv venv
```

### 2. активировать виртуальное окружение

**Windows (PowerShell):**
```powershell
venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```cmd
venv\Scripts\activate.bat
```

**Mac / Linux:**
```bash
source venv/bin/activate
```


> если PowerShell выдаёт ошибку про политику выполнения скриптов —
> выполните сначала:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```

### 3. установить зависимости

```bash
pip install -r requirements.txt
```

### 4. создать и применить миграции

```bash
python manage.py makemigrations
python manage.py migrate
```

аосле этого в папке появится файл `db.sqlite3` 

### 5. заполнить тестовыми объявлениями

```bash
python manage.py seed_ads
```

### 6. запустить сервер

```bash
python manage.py runserver
```

```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

проверьте в браузере: http://localhost:8000/api/ads/ — должен вернуться JSON
со списком объявлений

---

## 2 — запуск фронта (React)

**откройте новый терминал** (не закрывая тот, где работает Django)

перейдите в папку фронтенда:

```bash
cd "College bazar/ads-frontend"
```

### 1. Установить зависимости

```bash
npm install
```

### 2. Запустить dev-сервер

```bash
npm run dev
```

откройте в http://localhost:5173

---

## 3 — подключение фронтенда к бэкенду

по умолчанию фронтенд работает на mock-данных (файл `src/mock/mockAds.ts`)
и хранит всё в `localStorage`. чтобы подключить его к API Django,
нужно изменить файл `src/api/adsApi.ts`.

### 1. гоздайте файл `.env` в папке `ads-frontend`

```
VITE_API_URL=http://localhost:8000/api
```

### 2. замените содержимое `src/api/adsApi.ts`

```typescript
import type { IAdvertisement } from "../types/ad";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

function getUserId(): string | null {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw).id : null;
  } catch {
    return null;
  }
}

export type CreateAdInput = Omit<IAdvertisement, "id" | "createdAt">;

export const adsApi = {
  getAll: async (): Promise<IAdvertisement[]> => {
    const res = await fetch(`${BASE_URL}/ads/`);
    return res.json();
  },

  getById: async (id: string): Promise<IAdvertisement | undefined> => {
    const res = await fetch(`${BASE_URL}/ads/${id}/`);
    if (!res.ok) return undefined;
    return res.json();
  },

  getByCategory: async (category: string): Promise<IAdvertisement[]> => {
    const res = await fetch(`${BASE_URL}/ads/?category=${category}`);
    return res.json();
  },

  create: async (data: CreateAdInput): Promise<IAdvertisement> => {
    const userId = getUserId();
    const res = await fetch(`${BASE_URL}/ads/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, userId }),
    });
    return res.json();
  },

  getMyAds: async (): Promise<IAdvertisement[]> => {
    const userId = getUserId();
    if (!userId) return [];
    const res = await fetch(`${BASE_URL}/ads/mine/?userId=${userId}`);
    return res.json();
  },

  getByIds: async (ids: string[]): Promise<IAdvertisement[]> => {
    if (!ids.length) return [];
    const results = await Promise.all(
      ids.map((id) =>
        fetch(`${BASE_URL}/ads/${id}/`).then((r) => (r.ok ? r.json() : null))
      )
    );
    return results.filter(Boolean) as IAdvertisement[];
  },
};
```

### Шаг 3. Замени содержимое `src/api/favoritesApi.ts`

```typescript
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

function getUserId(): string | null {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw).id : null;
  } catch {
    return null;
  }
}

export const favoritesApi = {
  getAll: (): string[] => {
    return [];
  },

  isFavorite: (id: string): boolean => {
    try {
      const raw = localStorage.getItem("college_bazar_favorites");
      const ids: string[] = raw ? JSON.parse(raw) : [];
      return ids.includes(id);
    } catch {
      return false;
    }
  },

  toggle: async (id: string): Promise<boolean> => {
    const userId = getUserId();
    if (!userId) return false;

    const res = await fetch(`${BASE_URL}/favorites/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, adId: id }),
    });

    const data = await res.json();

    try {
      const raw = localStorage.getItem("college_bazar_favorites");
      const ids: string[] = raw ? JSON.parse(raw) : [];
      const updated = data.isFavorite
        ? [...ids, id]
        : ids.filter((favId) => favId !== id);
      localStorage.setItem("college_bazar_favorites", JSON.stringify(updated));
    } catch {}

    return data.isFavorite;
  },
};
```

### Шаг 4. Обнови `LoginPage.tsx` и `RegisterPage.tsx`

они сохраняют только `{ email }` в localStorage. После подключения API
бэк будет возвращать `{ id, name, email }` — и `id` нужен для запросов
замените `handleLogin`/`handleRegister` в обоих файлах:

**LoginPage.tsx:**
```typescript
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email.trim() || !password.trim()) return;

  const res = await fetch(
    `${import.meta.env.VITE_API_URL ?? "http://localhost:8000/api"}/auth/login/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!res.ok) {
    setError("Неверный email или пароль");
    return;
  }

  const user = await res.json();
  localStorage.setItem("user", JSON.stringify(user)); // теперь содержит id
  navigate("/");
};
```

**RegisterPage.tsx — так жк**, только эндпоинт `/auth/register/`
и тело запроса дополнительно содержит поле `name`

---

## Итог: что запускать

| Что               | Команда                        | Адрес                     |
|-------------------|--------------------------------|---------------------------|
| Бэкенд (Django)   | `python manage.py runserver`   | http://localhost:8000/api |
| Фронтенд (Vite)   | `npm run dev`                  | http://localhost:5173     |

оба сервера нужно держать запущенными одновременно в двух отдельных
окнах терминала

---

## На всякий

**`python` не найден на Windows**
→ Попробуй `py manage.py runserver` или `python3 manage.py runserver`.
убедитесь, что Python установлен через python.org
и добавлен в PATH.

**Ошибка `ModuleNotFoundError: No module named 'django'`**
→ виртуальное окружение не активировано - `venv\Scripts\activate`
(Windows) или `source venv/bin/activate` (Mac/Linux) и повтори команду

**Фронтенд не получает данные от API (ошибка CORS)**
→ бэкенд должен быть запущен на `localhost:8000` и в `config/settings.py`
есть `CORS_ALLOW_ALL_ORIGINS = True`.

**Ошибка `ENOENT: no such file or directory, open '...package.json'`**
→ команда запущена не из папки `ads-frontend`.
`cd "College bazar/ads-frontend"` 

