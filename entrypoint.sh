#!/bin/sh
set -e

echo "[entrypoint] Uruchamiam kontener aplikacji..."

# Inicjalizacja/Aktualizacja bazy danych Prisma
echo "[entrypoint] Wykonuję Prisma db push..."
npx prisma db push --skip-generate

echo "[entrypoint] Gotowe! Startuję serwer Next.js: $@"
exec "$@"