/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `notes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "notes_slug_key" ON "notes"("slug");
