# Stage 1: Build the application
FROM node:16-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /userapi

# Копируем package.json и package-lock.json из папки userapi
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы приложения из папки userapi
COPY . .

# Stage 2: Run the application with Redis
FROM node:16-alpine

# Устанавливаем рабочую директорию
WORKDIR /userapi

# Копируем собранное приложение из первой стадии
COPY --from=builder /userapi ./

# Устанавливаем Redis
RUN apk add --no-cache redis

# Открываем порты
EXPOSE 3000

# Запускаем Redis и ваше приложение
CMD ["sh", "-c", "redis-server --daemonize yes && npm start"]
