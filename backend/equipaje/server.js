const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws, req) => {
  console.log('🟢 Cliente conectado');

  ws.on('message', (data) => {
    let mensaje = null;

    try {
      // Intentamos parsear el mensaje en texto JSON
      mensaje = JSON.parse(data.toString());
      console.log('📦 Coordenada válida recibida:', mensaje);
    } catch (err) {
      console.error('❌ No se pudo parsear mensaje recibido:', err.message);
      return;
    }

    // Solo reenviamos si el mensaje es válido y contiene lat/lng
    if (mensaje?.lat && mensaje?.lng) {
      // Reenviar a todos los clientes navegador conectados
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client !== ws) {
          client.send(JSON.stringify(mensaje));
        }
      });
    }
  });

  ws.on('close', () => {
    console.log('🔴 Cliente desconectado');
  });
});

server.listen(3001, () => {
  console.log('🚀 Servidor WebSocket y HTTP en http://localhost:3001');
});
