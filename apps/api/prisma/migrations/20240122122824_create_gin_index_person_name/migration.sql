-- CreateIndex
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX "Person_name_idx" ON "Person" USING GIN ("name" gin_trgm_ops);