# ETAP 1: Budowanie (Build)
# Używamy wersji 'slim', która jest oparta na Debianie - stabilna na ARM i AMD64
FROM node:20-slim AS builder
WORKDIR /app

# Instalujemy OpenSSL i certyfikaty - niezbędne dla silnika Prismy
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Kopiujemy pliki definicji pakietów
COPY package.json package-lock.json ./
COPY prisma ./prisma/ 

# Instalujemy zależności
RUN npm ci

# Kopiujemy resztę kodu
COPY . .

RUN npx prisma generate

# Budujemy aplikację Next.js
RUN npm run build

# ETAP 2: Uruchamianie (Production)
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

# Ponownie instalujemy biblioteki systemowe w obrazie wynikowym
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Kopiujemy tylko to, co niezbędne z etapu builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Kopiujemy skrypt startowy
COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

EXPOSE 3000

# To wywoła Twój skrypt, który zrobi 'npx prisma db push' używając adresu z .env
ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "start"]