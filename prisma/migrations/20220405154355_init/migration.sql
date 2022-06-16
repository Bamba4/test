/*
  Warnings:

  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");
