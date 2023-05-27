-- CreateTable
CREATE TABLE `Gebruiker` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `voorNaam` VARCHAR(191) NOT NULL,
    `achterNaam` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `wachtwoord` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Gebruiker_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypePand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `naam` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `TypePand_naam_key`(`naam`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Regio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `naam` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Regio_naam_key`(`naam`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PandRegio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `regioId` INTEGER NOT NULL,
    `pandId` INTEGER NOT NULL,

    UNIQUE INDEX `PandRegio_regioId_key`(`regioId`),
    UNIQUE INDEX `PandRegio_pandId_key`(`pandId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `straat` VARCHAR(191) NOT NULL,
    `huisNr` INTEGER NOT NULL,
    `bus` VARCHAR(191) NULL,
    `postCode` INTEGER NOT NULL,
    `gemeente` VARCHAR(191) NOT NULL,
    `prijs` INTEGER NOT NULL,
    `aantalKamers` INTEGER NOT NULL,
    `oppervlakte` DOUBLE NOT NULL,
    `beschrijving` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isVerkochtVerhuurd` BOOLEAN NOT NULL,
    `typePandId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Afbeelding` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `pandId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PandRegio` ADD CONSTRAINT `PandRegio_regioId_fkey` FOREIGN KEY (`regioId`) REFERENCES `Regio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PandRegio` ADD CONSTRAINT `PandRegio_pandId_fkey` FOREIGN KEY (`pandId`) REFERENCES `Pand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pand` ADD CONSTRAINT `Pand_typePandId_fkey` FOREIGN KEY (`typePandId`) REFERENCES `TypePand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Afbeelding` ADD CONSTRAINT `Afbeelding_pandId_fkey` FOREIGN KEY (`pandId`) REFERENCES `Pand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
