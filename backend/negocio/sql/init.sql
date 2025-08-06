-- Crear base de datos
CREATE DATABASE negocio_db;

-- Tabla de estados de reserva
CREATE TABLE estado_reserva (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE -- Ej: pendiente, confirmada, cancelada
);

-- Tabla de titulares de la reserva
CREATE TABLE titular_reserva (
     SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  cedula VARCHAR(20) NOT NULL UNIQUE,
  correo VARCHAR(100) NOT NULL UNIQUE,
  telefono VARCHAR(20) NOT NULL,
  usuario_id INTEGER NOT NULL
);

-- Tabla de reservas con referencia a estado_reserva
CREATE TABLE reservas (
  id SERIAL PRIMARY KEY,
  titular_id INTEGER NOT NULL REFERENCES titular_reserva(id) ON DELETE CASCADE,
  paquete_id INTEGER NOT NULL,
  fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_viaje DATE NOT NULL,
  cantidad_personas INTEGER NOT NULL CHECK (cantidad_personas > 0),
  estado_id INTEGER NOT NULL REFERENCES estado_reserva(id)
);

-- Tabla de pagos
CREATE TABLE pagos (
  id SERIAL PRIMARY KEY,
  reserva_id INTEGER NOT NULL REFERENCES reservas(id) ON DELETE CASCADE,
  metodo_pago VARCHAR(50) NOT NULL,
  monto NUMERIC(10,2) NOT NULL,
  fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar valores iniciales en estado_reserva
INSERT INTO estado_reserva (nombre) VALUES 
  ('pendiente'), 
  ('confirmada'), 
  ('cancelada');
