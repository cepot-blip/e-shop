/*
  Warnings:

  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Category` DROP COLUMN `description`,
    MODIFY `name` ENUM('Elektronik', 'Aksesoris', 'Kecantikan', 'Olahraga', 'Fashion', 'Pakaian', 'Otomotif', 'Perlengkapan', 'Peralatan') NOT NULL;
