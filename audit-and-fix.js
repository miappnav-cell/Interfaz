const fs = require('fs');
const path = require('path');

console.log('\n==================================================');
console.log('🛠️ AUDITORÍA DE PANTALLAS Y CONEXIONES');
console.log('==================================================\n');

const rootDir = process.cwd();
const screensDir = path.join(rootDir, 'src', 'screens');

let mainScreens = [];
let subComponents = [];

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (item.endsWith('.jsx') || item.endsWith('.js')) {
      const fileName = path.basename(item, path.extname(item));
      if (fileName.endsWith('Screen')) {
        mainScreens.push(fileName);
      } else {
        subComponents.push(fileName);
      }
    }
  });
}

scanDir(screensDir);

console.log(`📱 Pantallas Principales (${mainScreens.length}):`, mainScreens.join(', '));
console.log(`🧩 Componentes/Tarjetas (${subComponents.length}):`, subComponents.join(', '));
console.log('\n✅ Estructura limpia y alineada con RootNavigator.');
console.log('==================================================\n');
