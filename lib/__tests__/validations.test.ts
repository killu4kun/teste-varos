import { consultorSchema, clienteSchema } from '../validations'

describe('Validações - Consultor', () => {
  it('deve validar um consultor válido', () => {
    const data = {
      nome: 'João Silva',
      email: 'joao@example.com',
      telefone: '(11) 98765-4321',
    }

    const result = consultorSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('deve rejeitar nome muito curto', () => {
    const data = {
      nome: 'Jo',
      email: 'joao@example.com',
    }

    const result = consultorSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('deve rejeitar email inválido', () => {
    const data = {
      nome: 'João Silva',
      email: 'email-invalido',
    }

    const result = consultorSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('deve aceitar telefone opcional', () => {
    const data = {
      nome: 'João Silva',
      email: 'joao@example.com',
    }

    const result = consultorSchema.safeParse(data)
    expect(result.success).toBe(true)
  })
})

describe('Validações - Cliente', () => {
  it('deve validar um cliente válido', () => {
    const data = {
      nome: 'Maria Santos',
      email: 'maria@example.com',
      telefone: '(11) 98765-1234',
      cpf: '123.456.789-00',
      idade: 28,
      endereco: 'Rua das Flores, 123',
      valor: 15000,
      status: 'Ativo',
      consultorId: 'abc123',
    }

    const result = clienteSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('deve rejeitar valor negativo', () => {
    const data = {
      nome: 'Maria Santos',
      email: 'maria@example.com',
      valor: -100,
      status: 'Ativo',
      consultorId: 'abc123',
    }

    const result = clienteSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('deve rejeitar status inválido', () => {
    const data = {
      nome: 'Maria Santos',
      email: 'maria@example.com',
      valor: 1000,
      status: 'Status Inválido',
      consultorId: 'abc123',
    }

    const result = clienteSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('deve aceitar campos opcionais vazios', () => {
    const data = {
      nome: 'Maria Santos',
      email: 'maria@example.com',
      valor: 1000,
      status: 'Ativo',
      consultorId: 'abc123',
    }

    const result = clienteSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('deve validar os três status permitidos', () => {
    const statuses = ['Ativo', 'Inativo', 'Em Negociação']
    
    statuses.forEach(status => {
      const data = {
        nome: 'Maria Santos',
        email: 'maria@example.com',
        valor: 1000,
        status,
        consultorId: 'abc123',
      }

      const result = clienteSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })
})

