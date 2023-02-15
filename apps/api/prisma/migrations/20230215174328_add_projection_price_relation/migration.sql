-- AddForeignKey
ALTER TABLE "ProjectionPrice" ADD CONSTRAINT "ProjectionPrice_projectionId_fkey" FOREIGN KEY ("projectionId") REFERENCES "MovieProjection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
