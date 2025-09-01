/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `Acao` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cep` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rua` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "carbon_schema"."Acao" DROP CONSTRAINT "Acao_usuarioId_fkey";

-- AlterTable
ALTER TABLE "carbon_schema"."Acao" DROP COLUMN "usuarioId";

-- AlterTable
ALTER TABLE "carbon_schema"."User" ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "complemento" TEXT,
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "rua" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "carbon_schema"."UsuarioAcao" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "acaoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsuarioAcao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "carbon_schema"."User"("cpf");

-- AddForeignKey
ALTER TABLE "carbon_schema"."UsuarioAcao" ADD CONSTRAINT "UsuarioAcao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "carbon_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carbon_schema"."UsuarioAcao" ADD CONSTRAINT "UsuarioAcao_acaoId_fkey" FOREIGN KEY ("acaoId") REFERENCES "carbon_schema"."Acao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
