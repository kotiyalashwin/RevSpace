-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_spaceId_fkey";

-- AlterTable
ALTER TABLE "Testimonial" ALTER COLUMN "spaceId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("link") ON DELETE RESTRICT ON UPDATE CASCADE;
