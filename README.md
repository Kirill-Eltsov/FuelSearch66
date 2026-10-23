# FuelSearch66

Клиентское веб-приложение для поиска АЗС и отметок о наличии топлива в Свердловской области.

## Возможности MVP

- Карта и список АЗС (OpenStreetMap / Overpass API)
- Фильтр по марке топлива (АИ-92 / АИ-95 / АИ-100 / ДТ) по локальным отметкам «есть»
- Карточка АЗС с адресом и координатами
- Отметки есть / нет / мало / очередь с датой и временем (localStorage)
- Избранное (localStorage)
- Состояния загрузки, ошибки и пустого результата
- Адаптивная вёрстка

Не входит: регистрация, серверная синхронизация, оплата, построение маршрута.

## Стек

- React + Vite
- React Router
- Leaflet + OpenStreetMap
- Overpass API
- localStorage

## Запуск

```bash
npm install
npm run dev
```

Откройте адрес из терминала (обычно `http://localhost:5173`).

Сборка:

```bash
npm run build
npm run preview
```

## Структура

```
src/
  components/   # Header, карта, карточки, фильтры, форма отметки
  context/      # загрузка станций и локальные данные
  models/       # типы Station / Mark / Favorite
  pages/        # Home, Details, Favorites, About
  services/     # overpass.js, storage.js
  styles/       # global.css
tempPage/       # HTML/CSS макет (ЛР №4–5)
prototype/      # кликабельный прототип (ЛР №3)
```

## Ограничения

- Качество и полнота точек OSM зависят от OpenStreetMap.
- Отметки и избранное хранятся только в текущем браузере.
- На карте маркеры ограничиваются видимой областью (до 250), чтобы не перегружать интерфейс.

## Проверка сценария

См. файл `docs/MVP_CHECKLIST.md`.
