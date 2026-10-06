#!/bin/bash

# CortexAI - Unified Dev Startup Script

echo "🚀 Starting CortexAI Services..."

# 1. Check Redis on port 6379
if ! nc -z localhost 6379 2>/dev/null; then
    echo "📦 Redis not detected on port 6379. Attempting docker compose..."
    (cd backend && docker compose up -d) 2>/dev/null || echo "⚠️ If Redis fails to start, run: brew services start redis (or redis-server)"
else
    echo "✅ Redis is already running on port 6379"
fi

# Cleanup all background child processes on exit/Ctrl+C
cleanup() {
    echo ""
    echo "🛑 Shutting down all CortexAI services..."
    kill $(jobs -p) 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM EXIT

# 2. Start Backend Services
echo "🔐 [1/5] Starting Auth Service (Port 8001)..."
(cd backend/services/auth && npm run dev) &

echo "💬 [2/5] Starting Chat Service (Port 8002)..."
(cd backend/services/CHAT && npm run dev) &

echo "🤖 [3/5] Starting Agent Service (Port 8003)..."
(cd backend/services/agent && npm run dev) &

sleep 2

echo "🚪 [4/5] Starting API Gateway (Port 8000)..."
(cd backend/gateway && npm run dev) &

sleep 1

# 3. Start Frontend
echo "💻 [5/5] Starting Frontend (Port 5173)..."
(cd frontend/vite-project && npm run dev) &

echo ""
echo "======================================================"
echo "🎉 All services are launching!"
echo "👉 Open your browser at: http://localhost:5173"
echo "👉 Gateway API running at: http://localhost:8000"
echo "👉 Press Ctrl+C in this terminal to stop all services."
echo "======================================================"
echo ""

# Wait for all background processes
wait
