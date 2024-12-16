# Build the application
FROM node:22-alpine AS builder

WORKDIR /userapi

COPY package*.json ./

RUN npm install

COPY . .

# Run the application with Redis
FROM node:16-alpine

WORKDIR /userapi

COPY --from=builder /userapi ./

RUN apk add --no-cache redis

EXPOSE 3000

CMD [ "npm", "start" ]
