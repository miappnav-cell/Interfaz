const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

console.log('🔍 Escaneando pantallas y componentes para enlace automático...');
const screenFiles = getFiles('src/screens');

let importsCode = '';
let registryCode = '';
let tabsArray = [];

screenFiles.forEach((file, index) => {
  const fileName = path.basename(file, path.extname(file));
  // Evitar duplicados de nombres de componentes si hay componentes internos
  const safeName = fileName.replace(/[^a-zA-Z0-9]/g, '') + index;
  const relativePath = './' + file.replace(/\\/g, '/');

  importsCode += `import ${safeName} from '${relativePath}';\n`;
  tabsArray.push(`{ id: '${safeName}', label: '${fileName}', component: <${safeName} /> }`);
});

const appJsContent = `import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { securityService } from './src/services/securityService';
import { apiClient, endpoints } from './src/api/endpoints';

// === IMPORTS AUTOMÁTICOS GENERADOS POR EL SISTEMA ===
${importsCode}

const SCREENS = [
  ${tabsArray.join(',\n  ')}
];

export default function App() {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  const currentScreen = SCREENS[activeScreenIndex] || SCREENS[0];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Cabecera del King System */}
      <View style={styles.header}>
        <Text style={styles.title}>👑 KING SYSTEM - CORE</Text>
        <Text style={styles.subtitle}>Módulos Activos Enlazados: {SCREENS.length}</Text>
      </View>

      {/* Selector Dinámico de Pantallas */}
      <View style={styles.navContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navScroll}>
          {SCREENS.map((scr, idx) => (
            <TouchableOpacity 
              key={scr.id}
              style={[styles.navTab, activeScreenIndex === idx && styles.navTabActive]}
              onPress={() => setActiveScreenIndex(idx)}
            >
              <Text style={[styles.navText, activeScreenIndex === idx && styles.navTextActive]} numberOfLines={1}>
                {scr.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Renderizado de la Pantalla Activa */}
      <ScrollView contentContainerStyle={styles.screenContainer}>
        <View style={styles.wrapper}>
          {currentScreen ? currentScreen.component : (
            <Text style={styles.errorText}>Cargando módulo de sistema...</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  header: { padding: 14, backgroundColor: '#0f172a', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#38bdf8', letterSpacing: 0.5 },
  subtitle: { fontSize: 11, color: '#94a3b8', marginTop: 2 },
  navContainer: { backgroundColor: '#0f172a', borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  navScroll: { paddingHorizontal: 10, paddingVertical: 8 },
  navTab: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#1e293b', borderRadius: 6, marginRight: 8, justifyContent: 'center' },
  navTabActive: { backgroundColor: '#0284c7' },
  navText: { color: '#94a3b8', fontSize: 11, fontWeight: '600' },
  navTextActive: { color: '#ffffff' },
  screenContainer: { padding: 16, flexGrow: 1 },
  wrapper: { backgroundColor: '#0f172a', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#1e293b', minHeight: 400 },
  errorText: { color: '#ef4444', textAlign: 'center', marginTop: 20 }
});
`;

fs.writeFileSync('App.js', appJsContent);
console.log(`✅ App.js generado con éxito. Se enlazaron ${screenFiles.length} pantallas automáticamente.`);
