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
        telefone: '(11) 3456-7890',
        empresa: 'Tech Solutions',
        valor: 15000,
        status: 'Ativo',
        consultorId: consultor1.id,
      },
      {
        nome: 'Inovação Digital',
        email: 'contato@inovacaodigital.com',
        telefone: '(11) 3456-7891',
        empresa: 'Inovação Digital',
        valor: 25000,
        status: 'Ativo',
        consultorId: consultor1.id,
      },
      {
        nome: 'Start Tech',
        email: 'contato@starttech.com',
        telefone: '(11) 3456-7892',
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
        telefone: '(11) 3456-7893',
        empresa: 'Cloud Systems',
        valor: 32000,
        status: 'Ativo',
        consultorId: consultor2.id,
      },
      {
        nome: 'Data Analytics Corp',
        email: 'contato@dataanalytics.com',
        telefone: '(11) 3456-7894',
        empresa: 'Data Analytics',
        valor: 18500,
        status: 'Ativo',
        consultorId: consultor2.id,
      },
      {
        nome: 'Fintech Pro',
        email: 'contato@fintechpro.com',
        telefone: '(11) 3456-7895',
        empresa: 'Fintech Pro',
        valor: 45000,
        status: 'Ativo',
        consultorId: consultor2.id,
      },
      {
        nome: 'Mobile First',
        email: 'contato@mobilefirst.com',
        telefone: '(11) 3456-7896',
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
        telefone: '(11) 3456-7897',
        empresa: 'E-commerce Plus',
        valor: 28000,
        status: 'Ativo',
        consultorId: consultor3.id,
      },
      {
        nome: 'Marketing Digital Pro',
        email: 'contato@marketingdigital.com',
        telefone: '(11) 3456-7898',
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

