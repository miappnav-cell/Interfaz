const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Encabezados para permitir conexiones de cualquier origen
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/version') {
    res.writeHead(200);
    res.end(JSON.stringify({
      version: "1.0.0",
      notes: "Actualización disponible para King System",
      downloadUrl: "https://interfaz-iml8.onrender.com"
    }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ status: "Error", message: "Ruta no encontrada en King System Server" }));
  }
});

server.listen(PORT, () => {
  console.log(`Servidor de King System corriendo en el puerto ${PORT}`);
});
