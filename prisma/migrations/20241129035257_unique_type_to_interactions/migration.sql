/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `Interaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Interaction_type_key" ON "Interaction"("type");
