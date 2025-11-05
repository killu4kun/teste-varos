-- Script SQL para criar as tabelas no Supabase
-- Execute este script no SQL Editor do Supabase

-- Criar tabela Consultor
CREATE TABLE IF NOT EXISTS "Consultor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "telefone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela Cliente
CREATE TABLE IF NOT EXISTS "Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "telefone" TEXT,
    "cpf" TEXT,
    "idade" INTEGER,
    "endereco" TEXT,
    "empresa" TEXT,
    "valor" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'Ativo',
    "consultorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Cliente_consultorId_fkey" FOREIGN KEY ("consultorId") REFERENCES "Consultor"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Criar índices
CREATE INDEX IF NOT EXISTS "Cliente_consultorId_idx" ON "Cliente"("consultorId");
CREATE INDEX IF NOT EXISTS "Cliente_status_idx" ON "Cliente"("status");

-- Função para atualizar updatedAt automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updatedAt
DROP TRIGGER IF EXISTS update_consultor_updated_at ON "Consultor";
CREATE TRIGGER update_consultor_updated_at BEFORE UPDATE ON "Consultor"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_cliente_updated_at ON "Cliente";
CREATE TRIGGER update_cliente_updated_at BEFORE UPDATE ON "Cliente"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para gerar CUID (similar ao Prisma)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE OR REPLACE FUNCTION generate_cuid() RETURNS text AS $$
DECLARE
    timestamp_part text;
    random_part text;
BEGIN
    timestamp_part := to_char(floor(EXTRACT(EPOCH FROM NOW()) * 1000)::bigint, 'FM0000000000000');
    random_part := encode(gen_random_bytes(12), 'base64');
    random_part := replace(replace(replace(random_part, '/', ''), '+', ''), '=', '');
    RETURN 'c' || substring(timestamp_part, 1, 8) || substring(random_part, 1, 16);
END;
$$ LANGUAGE plpgsql;

-- Inserir dados de exemplo (SEED)
-- Consultores
INSERT INTO "Consultor" ("id", "nome", "email", "telefone", "createdAt", "updatedAt")
VALUES 
    (generate_cuid(), 'João Silva', 'joao.silva@varos.com', '(11) 98765-4321', NOW(), NOW()),
    (generate_cuid(), 'Maria Santos', 'maria.santos@varos.com', '(11) 98765-1234', NOW(), NOW()),
    (generate_cuid(), 'Pedro Costa', 'pedro.costa@varos.com', '(11) 98765-5678', NOW(), NOW())
ON CONFLICT ("email") DO NOTHING;

-- Clientes (vamos usar subquery para pegar os IDs dos consultores)
INSERT INTO "Cliente" ("id", "nome", "email", "telefone", "cpf", "idade", "endereco", "empresa", "valor", "status", "consultorId", "createdAt", "updatedAt")
SELECT 
    generate_cuid(),
    'Tech Solutions Ltda',
    'contato@techsolutions.com',
    '(11) 98765-4321',
    '123.456.789-00',
    28,
    'Rua das Flores, 123 - São Paulo',
    'Tech Solutions',
    15000,
    'Ativo',
    (SELECT "id" FROM "Consultor" WHERE "email" = 'joao.silva@varos.com' LIMIT 1),
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Cliente" WHERE "email" = 'contato@techsolutions.com');

INSERT INTO "Cliente" ("id", "nome", "email", "telefone", "cpf", "idade", "endereco", "empresa", "valor", "status", "consultorId", "createdAt", "updatedAt")
SELECT 
    generate_cuid(),
    'Inovação Digital',
    'contato@inovacaodigital.com',
    '(21) 98765-1234',
    '234.567.890-11',
    35,
    'Av. Paulista, 1000 - São Paulo',
    'Inovação Digital',
    25000,
    'Ativo',
    (SELECT "id" FROM "Consultor" WHERE "email" = 'joao.silva@varos.com' LIMIT 1),
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Cliente" WHERE "email" = 'contato@inovacaodigital.com');

INSERT INTO "Cliente" ("id", "nome", "email", "telefone", "cpf", "idade", "endereco", "empresa", "valor", "status", "consultorId", "createdAt", "updatedAt")
SELECT 
    generate_cuid(),
    'Start Tech',
    'contato@starttech.com',
    '(31) 98765-5678',
    '345.678.901-22',
    42,
    'Rua da Consolação, 500 - Belo Horizonte',
    'Start Tech',
    8500,
    'Em Negociação',
    (SELECT "id" FROM "Consultor" WHERE "email" = 'joao.silva@varos.com' LIMIT 1),
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Cliente" WHERE "email" = 'contato@starttech.com');

INSERT INTO "Cliente" ("id", "nome", "email", "telefone", "cpf", "idade", "endereco", "empresa", "valor", "status", "consultorId", "createdAt", "updatedAt")
SELECT 
    generate_cuid(),
    'Cloud Systems',
    'contato@cloudsystems.com',
    '(41) 98765-9012',
    '456.789.012-33',
    31,
    'Av. das Nações, 200 - Curitiba',
    'Cloud Systems',
    32000,
    'Ativo',
    (SELECT "id" FROM "Consultor" WHERE "email" = 'maria.santos@varos.com' LIMIT 1),
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Cliente" WHERE "email" = 'contato@cloudsystems.com');

INSERT INTO "Cliente" ("id", "nome", "email", "telefone", "cpf", "idade", "endereco", "empresa", "valor", "status", "consultorId", "createdAt", "updatedAt")
SELECT 
    generate_cuid(),
    'Data Analytics Corp',
    'contato@dataanalytics.com',
    '(51) 98765-3456',
    '567.890.123-44',
    29,
    'Rua dos Andradas, 1500 - Porto Alegre',
    'Data Analytics',
    18500,
    'Ativo',
    (SELECT "id" FROM "Consultor" WHERE "email" = 'maria.santos@varos.com' LIMIT 1),
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Cliente" WHERE "email" = 'contato@dataanalytics.com');

INSERT INTO "Cliente" ("id", "nome", "email", "telefone", "cpf", "idade", "endereco", "empresa", "valor", "status", "consultorId", "createdAt", "updatedAt")
SELECT 
    generate_cuid(),
    'Fintech Pro',
    'contato@fintechpro.com',
    '(61) 98765-7890',
    '678.901.234-55',
    38,
    'SCS Quadra 9, Bloco C - Brasília',
    'Fintech Pro',
    45000,
    'Ativo',
    (SELECT "id" FROM "Consultor" WHERE "email" = 'maria.santos@varos.com' LIMIT 1),
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Cliente" WHERE "email" = 'contato@fintechpro.com');

INSERT INTO "Cliente" ("id", "nome", "email", "telefone", "cpf", "idade", "endereco", "empresa", "valor", "status", "consultorId", "createdAt", "updatedAt")
SELECT 
    generate_cuid(),
    'Mobile First',
    'contato@mobilefirst.com',
    '(71) 98765-2345',
    '789.012.345-66',
    26,
    'Rua Chile, 300 - Salvador',
    'Mobile First',
    12000,
    'Inativo',
    (SELECT "id" FROM "Consultor" WHERE "email" = 'maria.santos@varos.com' LIMIT 1),
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Cliente" WHERE "email" = 'contato@mobilefirst.com');

INSERT INTO "Cliente" ("id", "nome", "email", "telefone", "cpf", "idade", "endereco", "empresa", "valor", "status", "consultorId", "createdAt", "updatedAt")
SELECT 
    generate_cuid(),
    'E-commerce Plus',
    'contato@ecommerceplus.com',
    '(85) 98765-6789',
    '890.123.456-77',
    33,
    'Av. Beira Mar, 1200 - Fortaleza',
    'E-commerce Plus',
    28000,
    'Ativo',
    (SELECT "id" FROM "Consultor" WHERE "email" = 'pedro.costa@varos.com' LIMIT 1),
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Cliente" WHERE "email" = 'contato@ecommerceplus.com');

INSERT INTO "Cliente" ("id", "nome", "email", "telefone", "cpf", "idade", "endereco", "empresa", "valor", "status", "consultorId", "createdAt", "updatedAt")
SELECT 
    generate_cuid(),
    'Marketing Digital Pro',
    'contato@marketingdigital.com',
    '(81) 98765-0123',
    '901.234.567-88',
    27,
    'Rua da Aurora, 50 - Recife',
    'Marketing Digital',
    15500,
    'Em Negociação',
    (SELECT "id" FROM "Consultor" WHERE "email" = 'pedro.costa@varos.com' LIMIT 1),
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Cliente" WHERE "email" = 'contato@marketingdigital.com');

-- Verificar dados inseridos
SELECT 'Consultores criados:' as info, COUNT(*) as total FROM "Consultor";
SELECT 'Clientes criados:' as info, COUNT(*) as total FROM "Cliente";

