const fs = require('fs');
const path = require('path');

const fileIndex = {};

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      const name = path.basename(file, path.extname(file));
      fileIndex[name] = fullPath;
    }
  });
}

scanDirectory('src');

console.log('\n=================================');
console.log('   ESCÁNER Y AUTO-INYECTOR DE IMPORTS');
console.log('=================================');

let totalInjected = 0;

Object.keys(fileIndex).forEach(compName => {
  const compPath = fileIndex[compName];
  let content = fs.readFileSync(compPath, 'utf8');
  let modified = false;

  Object.keys(fileIndex).forEach(targetName => {
    if (targetName === compName) return;

    // Verificar si la entidad está en uso pero falta su importación
    const isUsed = new RegExp(`\\b${targetName}\\b`).test(content);
    const isImported = new RegExp(`import.*\\b${targetName}\\b.*from`).test(content);

    if (isUsed && !isImported) {
      let targetPath = fileIndex[targetName];
      let relativePath = path.relative(path.dirname(compPath), targetPath).replace(/\\/g, '/');
      if (!relativePath.startsWith('.')) {
        relativePath = './' + relativePath;
      }
      relativePath = relativePath.replace(/\.(js|jsx)$/, '');

      const importStatement = `import ${targetName} from '${relativePath}';\n`;
      content = importStatement + content;
      modified = true;
      totalInjected++;
      console.log(`✅ Inyectado [${targetName}] en -> ${path.relative('.', compPath)}`);
    }
  });

  if (modified) {
    fs.writeFileSync(compPath, content, 'utf8');
  }
});

if (totalInjected === 0) {
  console.log('✨ Todos los componentes y servicios cuentan con sus imports correctos.');
}

console.log('=================================\n');
