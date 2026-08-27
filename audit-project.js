const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

let screens = [];
let components = [];
let nodes = [];

// Escanear la carpeta src o la raíz del proyecto
const targetDir = fs.existsSync('src') ? 'src' : '.';

walkDir(targetDir, (filePath) => {
  const lower = filePath.toLowerCase();
  if (lower.endsWith('.js') || lower.endsWith('.tsx') || lower.endsWith('.jsx')) {
    if (lower.includes('screen') || lower.includes('pantalla')) {
      screens.push(filePath);
    } else if (lower.includes('node') || lower.includes('nodo')) {
      nodes.push(filePath);
    } else {
      components.push(filePath);
    }
  }
});

console.log('=========================================');
console.log('👑 KING SYSTEM - AUDITORÍA DE ARQUITECTURA');
console.log('=========================================');
console.log(`📱 Pantallas detectadas: ${screens.length}`);
screens.forEach(s => console.log(`   - ${s}`));

console.log(`\n⚙️ Nodos de seguridad/sistema detectados: ${nodes.length}`);
nodes.forEach(n => console.log(`   - ${n}`));

console.log(`\n🧩 Componentes y utilitarios: ${components.length}`);
console.log('=========================================');

// Opcional: Generar un archivo JSON con el mapa para que la app lo lea dinámicamente
const systemMap = {
  totalScreens: screens.length,
  totalNodes: nodes.length,
  screensList: screens,
  nodesList: nodes,
  lastUpdated: new Date().toISOString()
};

fs.writeFileSync('system-map.json', JSON.stringify(systemMap, null, 2));
console.log('📄 Archivo system-map.json generado con éxito.');
