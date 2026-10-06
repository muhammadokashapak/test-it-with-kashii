#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

echo "=========================================================="
echo "  TEST IT WITH KASHII — LOCAL RUNNER (LINUX/MACOS)"
echo "=========================================================="

echo -e "\n1. Checking shared contracts and types..."
node packages/contracts/index.js

echo -e "\n2. Running Python tests across services..."
PYTHONPATH="services/kashii-engine/src" pytest services/kashii-engine/tests
PYTHONPATH="services/browser-worker/src" pytest services/browser-worker/tests
PYTHONPATH="services/ai-gateway/src" pytest services/ai-gateway/tests

echo -e "\n3. Running Laravel API tests..."
cd apps/api
php vendor/phpunit/phpunit/phpunit
cd ../..

echo -e "\n✅ All local service test suites passed successfully!"
echo -e "\nTo start all services in Docker containers, run:"
echo "   docker compose up --build"
