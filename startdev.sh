#!/bin/zsh

# Check if docker daemon is running
docker version > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "Docker daemon is running"
else
  echo "Docker daemon is not running"
  # Start docker daemon by opening Docker Desktop app
  open -a Docker
fi

# After docker daemon is running, start the containers
docker start c44b98d3ed327db9bffa0f7b63e770ae8fab15c71630ff802eec081f087b21c0 ccebbca0fec31d3e4b507655d65b6a65697543cff28f930a677546d1f2c61167

# Wait for the containers to start
sleep 2

# Start the server, admin and client
concurrently "cd server && pnpm run dev" "cd admin && pnpm run dev" "cd client && pnpm run dev"







