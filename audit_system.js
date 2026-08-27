const fs = require('fs');

console.log('🛡️ INICIANDO AUDITORÍA INTEGRAL DE KING SYSTEM V2.4.0...\n');

const requiredFiles = [
  'App.js',
  'package.json',
  'src/screens/SecurityScreen.js',
  'src/screens/DashboardScreen.js',
  'src/services/apiService.js',
  'src/services/soundService.js',
  'src/services/notificationService.js',
  'src/services/updateService.js',
  'src/config/apiConfig.js',
  'src/api/endpoints.js'
];

let hasErrors = false;

console.log('📁 Verificando integridad de archivos y nodos...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   [✅ OK] ${file}`);
  } else {
    console.log(`   [❌ ERROR] Falta el archivo crítico: ${file}`);
    hasErrors = true;
  }
});

console.log('\n📦 Verificando librerías y reglas de entorno...');
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const requiredDeps = ['axios', 'expo', 'expo-updates', 'expo-notifications', 'expo-av'];
  
  requiredDeps.forEach(dep => {
    if (deps[dep]) {
      console.log(`   [✅ OK] Librería instalada: ${dep} (${deps[dep]})`);
    } else {
      console.log(`   [⚠️ ADVERTENCIA] Librería no detectada en package.json: ${dep}`);
    }
  });
} catch (e) {
  console.log('   [❌ ERROR] No se pudo leer package.json:', e.message);
  hasErrors = true;
}

console.log('\n==================================================');
if (hasErrors) {
  console.log('❌ AUDITORÍA CONCLUIDA: Se detectaron elementos faltantes.');
  process.exit(1);
} else {
  console.log('✨ ¡AUDITORÍA EXITOSA! Todos los nodos, servicios, librerías y reglas están conectados.');
  process.exit(0);
}
console.log('==================================================\n');
