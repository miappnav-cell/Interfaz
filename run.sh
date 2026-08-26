#!/bin/bash
echo "👑 Iniciando King System Interfaz v2.4.0..."
npm run lint -- --fix
node server.js &
npx expo start -c
