-- CreateTable
CREATE TABLE "Post" (
    "_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("_id")
);
