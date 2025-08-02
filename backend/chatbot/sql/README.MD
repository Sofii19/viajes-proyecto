CREATE TABLE conversaciones (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER,
  mensaje_usuario TEXT,
  respuesta_bot TEXT,
  fecha TIMESTAMP DEFAULT NOW()
);