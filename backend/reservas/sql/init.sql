CREATE DATABASE reservas_db;

CREATE TABLE reservas (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL,
  paquete_id INTEGER NOT NULL,
  fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cantidad_personas INTEGER NOT NULL CHECK (cantidad_personas > 0),
  estado VARCHAR(50) DEFAULT 'pendiente'  -- pendiente, confirmada, cancelada
);

CREATE TABLE pagos (
  id SERIAL PRIMARY KEY,
  reserva_id INTEGER NOT NULL REFERENCES reservas(id) ON DELETE CASCADE,
  metodo_pago VARCHAR(50) NOT NULL,
  monto NUMERIC(10,2) NOT NULL,
  fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);