CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    activo BOOLEAN DEFAULT FALSE,
    google_id VARCHAR(100),
    twofa_secret VARCHAR(200),
    rol VARCHAR(20) DEFAULT 'cliente' CHECK (rol IN ('cliente', 'administrador')),
    fecha_registro TIMESTAMP DEFAULT NOW()
);

CREATE TABLE activaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    token VARCHAR(200) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT NOW(),
    usado BOOLEAN DEFAULT FALSE
);