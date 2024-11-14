/*
  Warnings:

  - Added the required column `min_interactions` to the `UserRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "interactions" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "UserRole" ADD COLUMN     "min_interactions" INTEGER NOT NULL;
