-- AlterTable
ALTER TABLE "Clubs" ADD COLUMN     "discussionCount" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "memberCount" INTEGER NOT NULL DEFAULT 1;