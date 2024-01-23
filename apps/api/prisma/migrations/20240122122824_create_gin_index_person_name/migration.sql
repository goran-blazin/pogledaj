-- CreateIndex
CREATE INDEX "Person_name_idx" ON "Person" USING GIN ("name" gin_trgm_ops);
