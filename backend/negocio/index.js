const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());


// Importar rutas
const reservaRoutes = require('./src/routes/reserva.route');
const pagoRoutes = require('./src/routes/pago.route');
const clienteRoutes = require('./src/routes/cliente.routes');

// Usar rutas
app.use('/api/reservas', reservaRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/clientes', clienteRoutes);

// Iniciar servidor

app.listen(PORT, () => {
  console.log(`Microservicio de lógica de negocio corriendo en http://localhost:${PORT}`);
});
