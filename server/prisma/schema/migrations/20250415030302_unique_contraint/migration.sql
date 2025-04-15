/*
  Warnings:

  - A unique constraint covering the columns `[slug,authorId]` on the table `notes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "notes_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "notes_slug_authorId_key" ON "notes"("slug", "authorId");
