sudo -i -u postgres
psql
CREATE DATABASE viajes_db;
\c viajes_db
CREATE TABLE rutas (
    id SERIAL PRIMARY KEY,
    nombre_ruta VARCHAR(100) NOT NULL,
    duracion INT NOT NULL CHECK (duracion > 0),
    descripcion TEXT,
);

CREATE TABLE promociones (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    descuento_porcentaje NUMERIC(5,2) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL
);

CREATE TABLE hoteles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(200),
    ciudad VARCHAR(100),
    estrellas INTEGER CHECK (estrellas >= 1 AND estrellas <= 5),
    descripcion TEXT
);

CREATE TABLE vehiculos (
    id SERIAL PRIMARY KEY,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    capacidad INTEGER,
    placa VARCHAR(20)
);

CREATE TABLE paquetes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio_total NUMERIC(12,2) NOT NULL,
    promocion_id INTEGER REFERENCES promociones(id),
    ruta_id INTEGER REFERENCES rutas(id) ON DELETE CASCADE NOT NULL,
    hotel_id INTEGER REFERENCES hoteles(id) ON DELETE CASCADE,
    vehiculo_id INTEGER REFERENCES vehiculos(id) ON DELETE CASCADE
);
\q