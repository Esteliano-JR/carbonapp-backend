-- CreateTable
CREATE TABLE "carbon_schema"."Auth" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carbon_schema"."Recompensa" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "custoPontos" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recompensa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carbon_schema"."Resgate" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "recompensaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resgate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carbon_schema"."LogAtividade" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "detalhes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogAtividade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_userId_key" ON "carbon_schema"."Auth"("userId");

-- AddForeignKey
ALTER TABLE "carbon_schema"."Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "carbon_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carbon_schema"."Resgate" ADD CONSTRAINT "Resgate_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "carbon_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carbon_schema"."Resgate" ADD CONSTRAINT "Resgate_recompensaId_fkey" FOREIGN KEY ("recompensaId") REFERENCES "carbon_schema"."Recompensa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carbon_schema"."LogAtividade" ADD CONSTRAINT "LogAtividade_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "carbon_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
