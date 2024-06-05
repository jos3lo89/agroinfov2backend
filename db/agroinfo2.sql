CREATE DATABASE agroinfo4;
USE agroinfo4;

-- *************** USUARIOS START ***************
CREATE TABLE usuarios (
    id CHAR(36) NOT NULL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    clave VARCHAR(255) NOT NULL,
    foto_url VARCHAR(255) NULL,
    foto_id VARCHAR(255) NULL,
    rol ENUM('publico', 'admin_asociaciones', 'admin_general') NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE telefonos_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    usuario_id CHAR(36) NOT NULL,
    tipo ENUM('movil', 'fijo') NOT NULL,
    numero VARCHAR(20) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
-- *************** USUARIOS END ***************

-- *************** ASOCIACIONES START ***************
CREATE TABLE asociaciones (
    id CHAR(36) PRIMARY KEY NOT NULL,
    admin_id CHAR(36) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    portada_url VARCHAR(255) NOT NULL,
    foto_id VARCHAR(255) NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE telefonos_asociacion (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    asociacion_id CHAR(36) NOT NULL,
    tipo ENUM('movil', 'fijo') NOT NULL,
    numero VARCHAR(20) NOT NULL,
    FOREIGN KEY (asociacion_id) REFERENCES asociaciones(id) ON DELETE CASCADE
);

CREATE TABLE miembros_asociacion (
    id CHAR(36) PRIMARY KEY NOT NULL,
    asociacion_id CHAR(36) NOT NULL,
    usuario_id CHAR(36) NULL,
    rol ENUM('miembro', 'administrador') NOT NULL,
    FOREIGN KEY (asociacion_id) REFERENCES asociaciones(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE publicaciones (
    id CHAR(36) PRIMARY KEY NOT NULL,
    asociacion_id CHAR(36) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    contenido1 TEXT NOT NULL,
    contenido2 TEXT NULL,
    foto1_url VARCHAR(255) NULL,
    foto1_id VARCHAR(255) NULL,
    foto2_url VARCHAR(255) NULL,
    foto2_id VARCHAR(255) NULL,
    fecha_publicacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    autor_id CHAR(36) NOT NULL,
    FOREIGN KEY (asociacion_id) REFERENCES asociaciones(id) ON DELETE CASCADE,
    FOREIGN KEY (autor_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE reacciones (
    id CHAR(36) PRIMARY KEY NOT NULL,
    publicacion_id CHAR(36) NOT NULL,
    usuario_id CHAR(36) NOT NULL,
    tipo ENUM('like', 'dislike') NOT NULL,
    fecha_reaccion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE anuncios (
    id CHAR(36) PRIMARY KEY NOT NULL,
    asociacion_id CHAR(36) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    foto_url VARCHAR(255) NULL,
    foto_id VARCHAR(255) NULL,
    fecha_publicacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (asociacion_id) REFERENCES asociaciones(id) ON DELETE CASCADE
);

CREATE TABLE reuniones (
    id CHAR(36) PRIMARY KEY NOT NULL,
    asociacion_id CHAR(36) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha DATETIME NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    FOREIGN KEY (asociacion_id) REFERENCES asociaciones(id) ON DELETE CASCADE
);

CREATE TABLE asistencias (
    id CHAR(36) PRIMARY KEY NOT NULL,
    reunion_id CHAR(36) NOT NULL,
    usuario_id CHAR(36) NOT NULL,
    asistencia ENUM('presente', 'ausente') NOT NULL,
    FOREIGN KEY (reunion_id) REFERENCES reuniones(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE comentarios(
    id CHAR(36) PRIMARY KEY NOT NULL,
    publicacion_id CHAR(36) NOT NULL,
    usuario_id CHAR(36) NOT NULL,
    comentario TEXT NOT NULL,
    nivel INT NOT NULL,
    padre CHAR(36) NULL,
    fecha_comentario DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id) ON DELETE CASCADE,
    FOREIGN KEY (padre) REFERENCES comentarios(id) ON DELETE CASCADE,
    INDEX idx_padre_nivel (padre, nivel)
);
-- *************** ASOCIACIONES END ***************



-- ********* consultas ***********

select * from usuarios;