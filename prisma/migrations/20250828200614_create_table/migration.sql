-- CreateTable
CREATE TABLE "carbon_schema"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carbon_schema"."Acao" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "pontos" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Acao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "carbon_schema"."User"("email");

-- AddForeignKey
ALTER TABLE "carbon_schema"."Acao" ADD CONSTRAINT "Acao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "carbon_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
