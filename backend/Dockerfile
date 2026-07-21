FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

FROM node:20-slim AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app .

EXPOSE 5000

CMD ["npm", "run", "dev"]