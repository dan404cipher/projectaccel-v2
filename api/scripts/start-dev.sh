#!/bin/bash

# Kill any process running on port 3001
echo "🔍 Checking for processes on port 3001..."
lsof -ti:3001 | xargs kill -9 2>/dev/null || echo "✅ No processes found on port 3001"

# Wait a moment for the port to be released
sleep 2

# Start the development server
echo "🚀 Starting development server..."
PORT=3001 npx nodemon
