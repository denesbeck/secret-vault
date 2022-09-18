FROM node:slim as deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

FROM node:slim as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:latest as runner
WORKDIR /app

RUN apt-get update && apt-get upgrade -y

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]