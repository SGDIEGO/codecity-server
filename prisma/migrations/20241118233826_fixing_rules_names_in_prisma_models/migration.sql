/*
  Warnings:

  - You are about to drop the column `id_parent_message` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `id_thread` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `id_thread` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `Payments` table. All the data in the column will be lost.
  - Added the required column `thread_id` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thread_id` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_id_parent_message_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_id_thread_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_id_user_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_id_thread_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_id_user_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "id_parent_message",
DROP COLUMN "id_thread",
DROP COLUMN "id_user",
ADD COLUMN     "parent_message_id" TEXT,
ADD COLUMN     "thread_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "id_thread",
DROP COLUMN "id_user",
ADD COLUMN     "thread_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_parent_message_id_fkey" FOREIGN KEY ("parent_message_id") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
