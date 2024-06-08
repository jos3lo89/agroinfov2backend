-- CreateTable
CREATE TABLE `Asociaciones` (
    `id` CHAR(36) NOT NULL,
    `admin_id` CHAR(36) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `portada_url` VARCHAR(255) NOT NULL,
    `portada_id` VARCHAR(255) NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TelefonosAsociacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('movil', 'fijo') NOT NULL,
    `numero` VARCHAR(20) NOT NULL,
    `asociacion_id` CHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MiembrosAsociacion` (
    `id` CHAR(36) NOT NULL,
    `asociacion_id` CHAR(36) NOT NULL,
    `usuario_id` CHAR(36) NOT NULL,
    `rol` ENUM('miembro', 'administrador') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Publicaciones` (
    `id` CHAR(36) NOT NULL,
    `asociacion_id` CHAR(36) NOT NULL,
    `titulo` VARCHAR(255) NOT NULL,
    `contenido1` TEXT NOT NULL,
    `contenido2` TEXT NULL,
    `foto1_url` VARCHAR(255) NULL,
    `foto1_id` VARCHAR(255) NULL,
    `foto2_url` VARCHAR(255) NULL,
    `foto2_id` VARCHAR(255) NULL,
    `fecha_publicacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,
    `usuarioId` CHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reacciones` (
    `id` CHAR(36) NOT NULL,
    `publicacion_id` CHAR(36) NOT NULL,
    `usuario_id` CHAR(36) NOT NULL,
    `tipo` ENUM('like', 'dislike') NOT NULL,
    `fecha_reaccion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Anuncios` (
    `id` CHAR(36) NOT NULL,
    `asociacion_id` CHAR(36) NOT NULL,
    `titulo` VARCHAR(255) NOT NULL,
    `contenido` TEXT NOT NULL,
    `foto_url` VARCHAR(255) NULL,
    `foto_id` VARCHAR(255) NULL,
    `fecha_publicacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TelefonosAsociacion` ADD CONSTRAINT `TelefonosAsociacion_asociacion_id_fkey` FOREIGN KEY (`asociacion_id`) REFERENCES `Asociaciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MiembrosAsociacion` ADD CONSTRAINT `MiembrosAsociacion_asociacion_id_fkey` FOREIGN KEY (`asociacion_id`) REFERENCES `Asociaciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publicaciones` ADD CONSTRAINT `Publicaciones_asociacion_id_fkey` FOREIGN KEY (`asociacion_id`) REFERENCES `Asociaciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publicaciones` ADD CONSTRAINT `Publicaciones_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reacciones` ADD CONSTRAINT `Reacciones_publicacion_id_fkey` FOREIGN KEY (`publicacion_id`) REFERENCES `Publicaciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reacciones` ADD CONSTRAINT `Reacciones_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Anuncios` ADD CONSTRAINT `Anuncios_asociacion_id_fkey` FOREIGN KEY (`asociacion_id`) REFERENCES `Asociaciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
