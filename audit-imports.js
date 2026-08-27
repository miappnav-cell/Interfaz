const fs = require('fs');
const path = require('path');

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.expo' && file !== 'backend') {
        walkDir(filePath, fileList);
      }
    } else if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
const files = walkDir('./');

console.log('==================================================');
console.log('📦 AUDITORÍA DE IMPORTACIONES Y DEPENDENCIAS');
console.log('==================================================');

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    if (line.trim().startsWith('import ')) {
      const match = line.match(/from\s+['"]([^'"]+)['"]/);
      if (match) {
        const lib = match[1];
        // Si es una librería externa (no un archivo local que empieza con . o /)
        if (!lib.startsWith('.') && !lib.startsWith('/')) {
          // Extraer el nombre base de la librería (ej: 'expo-local-authentication' de '@expo/...')
          const libName = lib.startsWith('@') ? lib.split('/').slice(0, 2).join('/') : lib.split('/')[0];
          if (!allDeps[libName]) {
            console.log(`[❌ FALTANTE EN PACKAGE.JSON] Archivo: ${file}:${index + 1} -> Importa "${lib}"`);
          }
        }
      }
    }
  });
});
console.log('==================================================');
console.log(' Auditoría de importaciones finalizada.');
