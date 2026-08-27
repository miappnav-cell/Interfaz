const fs = require('fs');

console.log('==================================================');
console.log('🔍 AUDITORÍA DE CONFIGURACIÓN DEL REPOSITORIO');
console.log('==================================================');

const filesToCheck = [
  'server.js',
  'package.json',
  'src/config/apiConfig.js',
  'src/services/securityService.js',
  'App.js'
];

filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  [✅] Archivo detectado: ${file}`);
  } else {
    console.log(`  [❌] Archivo faltante: ${file}`);
  }
});

console.log('==================================================');
if (fs.existsSync('package.json')) {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log('📦 Dependencias en package.json:');
  console.log(pkg.dependencies || {});
}
console.log('==================================================');
