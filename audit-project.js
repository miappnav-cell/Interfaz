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

let inventory = {
  screens: [],
  nodes: [],
  animations: [],
  sounds: [],
  security: [],
  apis: [],
  components: []
};

const targetDir = fs.existsSync('src') ? 'src' : '.';

walkDir(targetDir, (filePath) => {
  const lower = filePath.toLowerCase();
  
  // Clasificación inteligente por tipo de recurso
  if (lower.endsWith('.js') || lower.endsWith('.jsx') || lower.endsWith('.tsx')) {
    if (lower.includes('screen') || lower.includes('pantalla')) {
      inventory.screens.push(filePath);
    } else if (lower.includes('node') || lower.includes('nodo')) {
      inventory.nodes.push(filePath);
    } else if (lower.includes('security') || lower.includes('auth') || lower.includes('seguridad')) {
      inventory.security.push(filePath);
    } else if (lower.includes('api') || lower.includes('endpoint')) {
      inventory.apis.push(filePath);
    } else {
      inventory.components.push(filePath);
    }
  } else if (lower.endsWith('.json') || lower.endsWith('.gif') || lower.endsWith('.lottie')) {
    inventory.animations.push(filePath);
  } else if (lower.endsWith('.mp3') || lower.endsWith('.wav') || lower.endsWith('.aac')) {
    inventory.sounds.push(filePath);
  }
});

console.log('==================================================');
console.log('👑 KING SYSTEM - AUDITORÍA Y MAPEO TOTAL DE RECURSOS');
console.log('==================================================');
console.log(`📱 Pantallas detectadas: ${inventory.screens.length}`);
inventory.screens.forEach(s => console.log(`   - ${s}`));

console.log(`\n⚙️ Nodos de sistema detectados: ${inventory.nodes.length}`);
inventory.nodes.forEach(n => console.log(`   - ${n}`));

console.log(`\n🔒 Módulos de seguridad: ${inventory.security.length}`);
inventory.security.forEach(sec => console.log(`   - ${sec}`));

console.log(`\n🌐 APIs y Endpoints: ${inventory.apis.length}`);
inventory.apis.forEach(a => console.log(`   - ${a}`));

console.log(`\n🎬 Animaciones y gráficos: ${inventory.animations.length}`);
inventory.animations.forEach(an => console.log(`   - ${an}`));

console.log(`\n🎵 Archivos de sonido: ${inventory.sounds.length}`);
inventory.sounds.forEach(so => console.log(`   - ${so}`));
console.log('==================================================');

// Guardar el manifiesto total para que la app y el APK lo reconozcan
fs.writeFileSync('system-manifest.json', JSON.stringify(inventory, null, 2));
console.log('✅ Manifiesto total generado en system-manifest.json');
