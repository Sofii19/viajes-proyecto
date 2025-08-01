const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

const notificacionesRoutes = require('./src/routes/notificaciones.routes');
app.use('/api/notificaciones', notificacionesRoutes);

app.listen(PORT, () => {
  console.log(`Microservicio de notificaciones corriendo en http://localhost:${PORT}`);
});