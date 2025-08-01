sudo -i -u postgres
psql
CREATE DATABASE notificaciones_db;
\c notificaciones_db
CREATE TABLE notificaciones (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(10) NOT NULL,
    destinatario VARCHAR(100) NOT NULL,
    asunto VARCHAR(200),
    mensaje TEXT NOT NULL,
    estado VARCHAR(20) NOT NULL,
    fecha_envio TIMESTAMP DEFAULT NOW(),
    error TEXT
);
\q