-- Adiciona campos de data de início e término na tabela Turma
-- Esta migration é compatível com SQLite

ALTER TABLE "Turma" ADD COLUMN "dataInicio" TEXT;
ALTER TABLE "Turma" ADD COLUMN "dataTermino" TEXT;