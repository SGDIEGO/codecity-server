/*
  Warnings:

  - Added the required column `name` to the `UserRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserRole" ADD COLUMN     "name" TEXT NOT NULL;
