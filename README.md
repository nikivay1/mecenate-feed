# Mecenate Test Assignment

Тестовое задание: экран ленты публикаций для платформы Mecenate.

## Что реализовано

- Экран Feed
- Список публикаций
- Отображение автора, превью текста, обложки, лайков и комментариев
- Cursor pagination
- Pull-to-refresh
- Заглушка для платных постов (`tier: "paid"`)
- Состояние ошибки загрузки с кнопкой повтора

## Установка и запуск

### 1. Установить зависимости:
   ```bash
   npm install
   ```
### 2. Скопировать `.env`:
   ```bash
   cp .env.example .env
   ```
### 3. Запустить проект:
   ```bash
   npx expo start
   ```


## Структура

- `src/api` — работа с API
- `src/screens` — экран Feed
- `src/components` — UI-компоненты
- `src/types` — типы данных
- `src/tokens` — дизайн-токены
- `src/stores` — MobX store
