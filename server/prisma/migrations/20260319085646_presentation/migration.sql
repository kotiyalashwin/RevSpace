-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_userId_fkey";

-- DropForeignKey
ALTER TABLE "SpaceMetadata" DROP CONSTRAINT "SpaceMetadata_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_spaceId_fkey";

-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "analyzed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "keywords" JSONB,
ADD COLUMN     "score" INTEGER,
ADD COLUMN     "sentiment" TEXT,
ADD COLUMN     "text_content" TEXT,
ADD COLUMN     "transcript" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'video',
ALTER COLUMN "v_url" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Space_userId_idx" ON "Space"("userId");

-- CreateIndex
CREATE INDEX "Testimonial_spaceId_idx" ON "Testimonial"("spaceId");

-- CreateIndex
CREATE INDEX "Testimonial_spaceId_analyzed_idx" ON "Testimonial"("spaceId", "analyzed");

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceMetadata" ADD CONSTRAINT "SpaceMetadata_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("link") ON DELETE CASCADE ON UPDATE CASCADE;
