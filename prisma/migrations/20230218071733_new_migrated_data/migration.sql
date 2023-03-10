-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_belogsToId_fkey";

-- AlterTable
ALTER TABLE "Package" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "timePeriod" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "belogsToId" DROP NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "expiresAt" DROP NOT NULL,
ALTER COLUMN "subscribedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_belogsToId_fkey" FOREIGN KEY ("belogsToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
