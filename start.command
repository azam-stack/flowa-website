#!/usr/bin/env bash
# Start the Flowa website locally. Pulls the latest changes, installs
# dependencies the first time (or whenever they've changed), then starts
# the dev server.
set -e
cd "$(dirname "$0")"

if [ -d .git ]; then
  echo "Henter seneste ændringer..."
  git pull --ff-only origin main || echo "Kunne ikke hente nyeste ændringer — fortsætter med den lokale version."
fi

if [ ! -d node_modules ] || [ "package-lock.json" -nt "node_modules" ]; then
  echo "Installerer dependencies..."
  npm install
fi

npm run dev
