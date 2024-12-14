/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Space" (
    "id" SERIAL NOT NULL,
    "spacename" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpaceMetadata" (
    "id" SERIAL NOT NULL,
    "spaceId" INTEGER NOT NULL,
    "formfields" JSONB NOT NULL,
    "Questions" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Space_link_key" ON "Space"("link");

-- CreateIndex
CREATE UNIQUE INDEX "SpaceMetadata_id_key" ON "SpaceMetadata"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SpaceMetadata_spaceId_key" ON "SpaceMetadata"("spaceId");

-- AddForeignKey
ALTER TABLE "SpaceMetadata" ADD CONSTRAINT "SpaceMetadata_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
