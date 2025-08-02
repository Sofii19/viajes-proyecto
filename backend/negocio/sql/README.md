-- Crear base de datos (solo si no existe)
CREATE DATABASE reservas_db;

-- Conectarse a la base de datos
\c reservas_db

-- Tabla de reservas
CREATE TABLE reservas (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL,
  paquete_id INTEGER NOT NULL,
  fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cantidad_personas INTEGER NOT NULL CHECK (cantidad_personas > 0),
  estado VARCHAR(50) DEFAULT 'pendiente'  -- pendiente, confirmada, cancelada
);

-- Tabla de pagos
CREATE TABLE pagos (
  id SERIAL PRIMARY KEY,
  reserva_id INTEGER NOT NULL REFERENCES reservas(id) ON DELETE CASCADE,
  metodo_pago VARCHAR(50) NOT NULL,
  monto NUMERIC(10,2) NOT NULL,
  fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  telefono VARCHAR(20),
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  activo BOOLEAN DEFAULT true
);