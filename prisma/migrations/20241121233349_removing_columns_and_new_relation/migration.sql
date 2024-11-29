/*
  Warnings:

  - You are about to drop the column `total_likes` on the `Forum` table. All the data in the column will be lost.
  - You are about to drop the column `total_messages` on the `Forum` table. All the data in the column will be lost.
  - You are about to drop the column `total_users` on the `Forum` table. All the data in the column will be lost.
  - You are about to drop the column `total_likes` on the `Thread` table. All the data in the column will be lost.
  - You are about to drop the column `total_messages` on the `Thread` table. All the data in the column will be lost.
  - You are about to drop the column `total_users` on the `Thread` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Forum" DROP COLUMN "total_likes",
DROP COLUMN "total_messages",
DROP COLUMN "total_users";

-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "total_likes",
DROP COLUMN "total_messages",
DROP COLUMN "total_users";

-- CreateTable
CREATE TABLE "MessageInteractions" (
    "id" TEXT NOT NULL,
    "interaction_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,

    CONSTRAINT "MessageInteractions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interaction" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Interaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MessageInteractions" ADD CONSTRAINT "MessageInteractions_interaction_id_fkey" FOREIGN KEY ("interaction_id") REFERENCES "Interaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageInteractions" ADD CONSTRAINT "MessageInteractions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageInteractions" ADD CONSTRAINT "MessageInteractions_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
