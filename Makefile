dev:
	./startdev.sh
start:
	concurrently "cd server && pnpm run dev" "cd admin && pnpm run dev" "cd client && pnpm run dev"