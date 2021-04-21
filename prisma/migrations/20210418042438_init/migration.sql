-- CreateTable
CREATE TABLE "ShortenUrl" (
    "id" TEXT NOT NULL,
    "originalUrl" TEXT,
    "shortUrl" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortenUrl.originalUrl_unique" ON "ShortenUrl"("originalUrl");

-- CreateIndex
CREATE UNIQUE INDEX "ShortenUrl.shortUrl_unique" ON "ShortenUrl"("shortUrl");
