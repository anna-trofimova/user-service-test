# User Service Test

Простой сервис для работы с пользователями с регистрацией, авторизацией и ролями (user/admin) на **Express + TypeScript + Prisma**.

---

##  Установка

```
git clone <репозиторий>
cd user-service-test
npm install 
```

### Создай файл .env:

```
DATABASE_URL="file:./dev.db"

JWT_SECRET="your_secret_key"
```

### Запуск сервера
`npm run dev`

Сервер будет доступен на http://localhost:3000.

##  Endpoints

| Метод | URL | Доступ | Описание |
|-------|-----|--------|---------|
| POST  | /api/register         | любой                  | Регистрация пользователя (role=user) |
| POST  | /api/login            | любой                  | Авторизация, возвращает JWT |
| GET   | /api/users/:id        | админ или сам пользователь | Получение пользователя по ID |
| GET   | /api/users            | только админ           | Получение списка всех пользователей |
| PATCH | /api/users/:id/block  | админ или сам пользователь | Блокировка пользователя (isActive=false) |


### Headers для защищённых маршрутов:
Authorization: Bearer <JWT токен>

## Seed админа

Для создания админа:

```
npx ts-node src/prisma/seed.ts 
```

- Email: `admin@test.com`
- Пароль: `admin123`
- Role: `admin`

---

## Технологии

- Node.js + Express
- TypeScript
- Prisma ORM + SQLite
- JWT для авторизации
- bcrypt для хеширования пароля

