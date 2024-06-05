-- CreateTable
CREATE TABLE `Usuario` (
    `id` CHAR(36) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `correo` VARCHAR(100) NOT NULL,
    `clave` VARCHAR(255) NOT NULL,
    `foto_url` VARCHAR(255) NULL,
    `foto_id` VARCHAR(255) NULL,
    `rol` ENUM('publico', 'admin_asociaciones', 'admin_general') NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TelefonoUsuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` CHAR(36) NOT NULL,
    `tipo` ENUM('movil', 'fijo') NOT NULL,
    `numero` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TelefonoUsuario` ADD CONSTRAINT `TelefonoUsuario_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
