-- CreateTable
CREATE TABLE `Reserva` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_usuario` VARCHAR(191) NOT NULL,
    `cantidad_boletos` INTEGER NOT NULL,
    `evento_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_eventoID_fkey` FOREIGN KEY (`evento_id`) REFERENCES `Evento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
