import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes
  await prisma.cliente.deleteMany()
  await prisma.consultor.deleteMany()

  // Criar consultores
  const consultor1 = await prisma.consultor.create({
    data: {
      nome: 'João Silva',
      email: 'joao.silva@varos.com',
      telefone: '(11) 98765-4321',
    },
  })

  const consultor2 = await prisma.consultor.create({
    data: {
      nome: 'Maria Santos',
      email: 'maria.santos@varos.com',
      telefone: '(11) 98765-1234',
    },
  })

  const consultor3 = await prisma.consultor.create({
    data: {
      nome: 'Pedro Costa',
      email: 'pedro.costa@varos.com',
      telefone: '(11) 98765-5678',
    },
  })

  // Criar clientes para o consultor 1
  await prisma.cliente.createMany({
    data: [
      {
        nome: 'Tech Solutions Ltda',
        email: 'contato@techsolutions.com',
        telefone: '(11) 98765-4321',
        cpf: '123.456.789-00',
        idade: 28,
        endereco: 'Rua das Flores, 123 - São Paulo',
        empresa: 'Tech Solutions',
        valor: 15000,
        status: 'Ativo',
        consultorId: consultor1.id,
      },
      {
        nome: 'Inovação Digital',
        email: 'contato@inovacaodigital.com',
        telefone: '(21) 98765-1234',
        cpf: '234.567.890-11',
        idade: 35,
        endereco: 'Av. Paulista, 1000 - São Paulo',
        empresa: 'Inovação Digital',
        valor: 25000,
        status: 'Ativo',
        consultorId: consultor1.id,
      },
      {
        nome: 'Start Tech',
        email: 'contato@starttech.com',
        telefone: '(31) 98765-5678',
        cpf: '345.678.901-22',
        idade: 42,
        endereco: 'Rua da Consolação, 500 - Belo Horizonte',
        empresa: 'Start Tech',
        valor: 8500,
        status: 'Em Negociação',
        consultorId: consultor1.id,
      },
    ],
  })

  // Criar clientes para o consultor 2
  await prisma.cliente.createMany({
    data: [
      {
        nome: 'Cloud Systems',
        email: 'contato@cloudsystems.com',
        telefone: '(41) 98765-9012',
        cpf: '456.789.012-33',
        idade: 31,
        endereco: 'Av. das Nações, 200 - Curitiba',
        empresa: 'Cloud Systems',
        valor: 32000,
        status: 'Ativo',
        consultorId: consultor2.id,
      },
      {
        nome: 'Data Analytics Corp',
        email: 'contato@dataanalytics.com',
        telefone: '(51) 98765-3456',
        cpf: '567.890.123-44',
        idade: 29,
        endereco: 'Rua dos Andradas, 1500 - Porto Alegre',
        empresa: 'Data Analytics',
        valor: 18500,
        status: 'Ativo',
        consultorId: consultor2.id,
      },
      {
        nome: 'Fintech Pro',
        email: 'contato@fintechpro.com',
        telefone: '(61) 98765-7890',
        cpf: '678.901.234-55',
        idade: 38,
        endereco: 'SCS Quadra 9, Bloco C - Brasília',
        empresa: 'Fintech Pro',
        valor: 45000,
        status: 'Ativo',
        consultorId: consultor2.id,
      },
      {
        nome: 'Mobile First',
        email: 'contato@mobilefirst.com',
        telefone: '(71) 98765-2345',
        cpf: '789.012.345-66',
        idade: 26,
        endereco: 'Rua Chile, 300 - Salvador',
        empresa: 'Mobile First',
        valor: 12000,
        status: 'Inativo',
        consultorId: consultor2.id,
      },
    ],
  })

  // Criar clientes para o consultor 3
  await prisma.cliente.createMany({
    data: [
      {
        nome: 'E-commerce Plus',
        email: 'contato@ecommerceplus.com',
        telefone: '(85) 98765-6789',
        cpf: '890.123.456-77',
        idade: 33,
        endereco: 'Av. Beira Mar, 1200 - Fortaleza',
        empresa: 'E-commerce Plus',
        valor: 28000,
        status: 'Ativo',
        consultorId: consultor3.id,
      },
      {
        nome: 'Marketing Digital Pro',
        email: 'contato@marketingdigital.com',
        telefone: '(81) 98765-0123',
        cpf: '901.234.567-88',
        idade: 27,
        endereco: 'Rua da Aurora, 50 - Recife',
        empresa: 'Marketing Digital',
        valor: 15500,
        status: 'Em Negociação',
        consultorId: consultor3.id,
      },
    ],
  })

  console.log('✅ Seed concluído com sucesso!')
  console.log(`   - 3 consultores criados`)
  console.log(`   - 9 clientes criados`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

