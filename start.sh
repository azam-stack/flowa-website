#!/usr/bin/env bash
# Start the Flowa website locally. Installs dependencies the first time
# only, then starts the dev server and opens it in your browser.
set -e
cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  echo "Første gang — installerer dependencies..."
  npm install
fi

npm run dev
