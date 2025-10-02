-- CreateTable
CREATE TABLE "carbon_schema"."Parceiro" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Parceiro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carbon_schema"."Material" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carbon_schema"."Agendamento" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "parceiroId" INTEGER,
    "nomeCompleto" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "horario" TEXT NOT NULL,
    "observacoes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carbon_schema"."AgendamentoMaterial" (
    "id" SERIAL NOT NULL,
    "agendamentoId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,

    CONSTRAINT "AgendamentoMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Parceiro_email_key" ON "carbon_schema"."Parceiro"("email");

-- AddForeignKey
ALTER TABLE "carbon_schema"."Agendamento" ADD CONSTRAINT "Agendamento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "carbon_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carbon_schema"."Agendamento" ADD CONSTRAINT "Agendamento_parceiroId_fkey" FOREIGN KEY ("parceiroId") REFERENCES "carbon_schema"."Parceiro"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carbon_schema"."AgendamentoMaterial" ADD CONSTRAINT "AgendamentoMaterial_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "carbon_schema"."Agendamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carbon_schema"."AgendamentoMaterial" ADD CONSTRAINT "AgendamentoMaterial_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "carbon_schema"."Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
