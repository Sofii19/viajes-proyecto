const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());


// Importar rutas
const reservaRoutes = require('./src/routes/reserva.route');
const pagoRoutes = require('./src/routes/pago.route');
const titularRoutes = require('./src/routes/titular_reserva.routes');

// Usar rutas
app.use('/api/reserva', reservaRoutes);
app.use('/api/pago', pagoRoutes);
app.use('/api/titular', titularRoutes);

// Iniciar servidor

app.listen(PORT, () => {
  console.log(`Microservicio de lógica de negocio corriendo en http://localhost:${PORT}`);
});
