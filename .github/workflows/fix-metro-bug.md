---
name: "Fix React Native Metro Bug"
on:
  workflow_dispatch:
permissions:
  contents: write
  pull-requests: write
---

# Tarea: Corregir fallo de Metro Bundler en React Native 0.76

Analiza la raíz del repositorio y aplica de forma segura las siguientes correcciones estructurales sin alterar la lógica de negocio ni las 22 pantallas de la interfaz:

1. **metro.config.js**: Asegúrate de que extienda `@react-native/metro-config` usando `mergeConfig` y `getDefaultConfig`.
2. **package.json**: Añade un bloque de `overrides` para forzar la versión estable de `"connect": "3.7.0"`. Esto resolverá el error crítico `TypeError: Cannot read properties of undefined (reading 'handle')`.
3. **Validación**: Verifica que las dependencias instalen correctamente y que no existan conflictos de tipados en `tsconfig.json`.

Al finalizar, genera un Pull Request con los archivos editados.
