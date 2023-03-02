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
docker start serverdb-postgres serverdb-redis

# Wait for the containers to start
sleep 2

# Start the server, admin and client
concurrently "cd server && pnpm run dev" "cd admin && pnpm run dev" "cd client && pnpm run dev"







