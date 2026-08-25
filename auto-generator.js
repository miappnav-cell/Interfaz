const fs = require('fs');
const path = require('path');

// Componentes y hooks nativos que se deben ignorar
const RN_BUILTINS = new Set([
  'React', 'useState', 'useEffect', 'useContext', 'useRef', 'useCallback', 'useMemo',
  'View', 'Text', 'StyleSheet', 'TouchableOpacity', 'ScrollView', 'TextInput', 'Modal',
  'SafeAreaView', 'StatusBar', 'Image', 'FlatList', 'ActivityIndicator', 'Switch',
  'Button', 'Pressable', 'Alert', 'Animated', 'KeyboardAvoidingView', 'TouchableWithoutFeedback',
  'RealtimeSocket', 'apiService', 'pushService'
]);

const srcDir = path.join(__dirname, 'src');

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

console.log('\n=================================================');
console.log('   GENERADOR E INYECTOR OMNIPRESENTE DE NODOS');
console.log('=================================================');

const allFiles = getAllFiles(srcDir);
const existingNodes = {};

// Indexar nodos existentes
allFiles.forEach(fp => {
  const name = path.basename(fp, path.extname(fp));
  existingNodes[name] = fp;
});

let createdCount = 0;
let injectedCount = 0;

// 1. Detección de imports rotos o componentes JSX huérfanos
allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // Buscar uso de JSX tipo <NombreComponente ... />
  const jsxRegex = /<([A-Z][a-zA-Z0-9_]*)/g;
  let match;

  while ((match = jsxRegex.exec(content)) !== null) {
    const nodeName = match[1];

    if (RN_BUILTINS.has(nodeName)) continue;

    const isImported = new RegExp(`import.*\\b${nodeName}\\b.*from`).test(content);
    const isDeclared = new RegExp(`(?:function|const|class)\\s+${nodeName}\\b`).test(content);

    if (!isImported && !isDeclared) {
      // Si el nodo no existe físicamente en el disco, se crea automáticamente
      if (!existingNodes[nodeName]) {
        const fileDir = path.dirname(file);
        const compDir = path.join(fileDir, 'components');
        if (!fs.existsSync(compDir)) fs.mkdirSync(compDir, { recursive: true });

        const targetFile = path.join(compDir, `${nodeName}.jsx`);
        const template = `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ${nodeName}() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>⚡ NODO GENERADO: ${nodeName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#121622', borderRadius: 8, marginVertical: 4, borderWidth: 1, borderColor: '#1c2333' },
  text: { color: '#00b0ff', fontSize: 11, fontWeight: 'bold' }
});
`;
        fs.writeFileSync(targetFile, template, 'utf8');
        existingNodes[nodeName] = targetFile;
        createdCount++;
        console.log(`✨ [CREADO] Nodo faltante -> src/.../components/${nodeName}.jsx`);
      }

      // Inyectar la cláusula import en el archivo de origen
      const targetPath = existingNodes[nodeName];
      let relPath = path.relative(path.dirname(file), targetPath).replace(/\\/g, '/');
      if (!relPath.startsWith('.')) relPath = './' + relPath;
      relPath = relPath.replace(/\.(js|jsx)$/, '');

      const importStmt = `import ${nodeName} from '${relPath}';\n`;
      content = importStmt + content;
      modified = true;
      injectedCount++;
      console.log(`🔗 [INYECTADO] Import de <${nodeName} /> en -> ${path.relative(__dirname, file)}`);
    }
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
  }
});

console.log('-------------------------------------------------');
console.log(`📊 Nodos creados automáticamente: ${createdCount}`);
console.log(`📊 Declaraciones import inyectadas: ${injectedCount}`);
console.log('=================================================\n');
