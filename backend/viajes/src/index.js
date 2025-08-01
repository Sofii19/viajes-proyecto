const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

const rutasRoutes = require('./src/routes/rutas.routes');
const promocionesRoutes = require('./src/routes/promociones.routes');
const hotelesRoutes = require('./src/routes/hoteles.routes');
const vehiculosRoutes = require('./src/routes/vehiculos.routes');
const paquetesRoutes = require('./src/routes/paquetes.routes');

app.use('/api/rutas', rutasRoutes);
app.use('/api/promociones', promocionesRoutes);
app.use('/api/hoteles', hotelesRoutes);
app.use('/api/vehiculos', vehiculosRoutes);
app.use('/api/paquetes', paquetesRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});