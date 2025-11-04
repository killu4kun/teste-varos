import { z } from 'zod'

export const consultorSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().optional(),
})

export const clienteSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().optional(),
  cpf: z.string().optional(),
  idade: z.number().optional(),
  endereco: z.string().optional(),
  empresa: z.string().optional(),
  valor: z.number().min(0, 'Valor deve ser positivo'),
  status: z.enum(['Ativo', 'Inativo', 'Em Negociação']),
  consultorId: z.string().min(1, 'Consultor é obrigatório'),
})

export type ConsultorInput = z.infer<typeof consultorSchema>
export type ClienteInput = z.infer<typeof clienteSchema>

