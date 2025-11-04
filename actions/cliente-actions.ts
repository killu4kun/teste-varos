'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { clienteSchema, type ClienteInput } from '@/lib/validations'

export async function getClientes(consultorId?: string, status?: string) {
  try {
    const clientes = await prisma.cliente.findMany({
      where: {
        ...(consultorId && { consultorId }),
        ...(status && status !== 'Todos' && { status }),
      },
      include: {
        consultor: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { success: true, data: clientes }
  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
    return { success: false, error: 'Erro ao buscar clientes' }
  }
}

export async function getClienteById(id: string) {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id },
      include: {
        consultor: true,
      },
    })
    return { success: true, data: cliente }
  } catch (error) {
    console.error('Erro ao buscar cliente:', error)
    return { success: false, error: 'Erro ao buscar cliente' }
  }
}

export async function createCliente(data: ClienteInput) {
  try {
    const validated = clienteSchema.parse(data)
    
    const cliente = await prisma.cliente.create({
      data: validated,
    })
    
    revalidatePath('/clientes')
    revalidatePath('/dashboard')
    
    return { success: true, data: cliente }
  } catch (error) {
    console.error('Erro ao criar cliente:', error)
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Erro ao criar cliente' }
  }
}

export async function updateCliente(id: string, data: ClienteInput) {
  try {
    const validated = clienteSchema.parse(data)
    
    const cliente = await prisma.cliente.update({
      where: { id },
      data: validated,
    })
    
    revalidatePath('/clientes')
    revalidatePath('/dashboard')
    
    return { success: true, data: cliente }
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error)
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Erro ao atualizar cliente' }
  }
}

export async function deleteCliente(id: string) {
  try {
    await prisma.cliente.delete({
      where: { id },
    })
    
    revalidatePath('/clientes')
    revalidatePath('/dashboard')
    
    return { success: true }
  } catch (error) {
    console.error('Erro ao deletar cliente:', error)
    return { success: false, error: 'Erro ao deletar cliente' }
  }
}

export async function getMetricas() {
  try {
    const [totalClientes, clientesAtivos, totalValor, clientesPorConsultor] = await Promise.all([
      prisma.cliente.count(),
      prisma.cliente.count({ where: { status: 'Ativo' } }),
      prisma.cliente.aggregate({ _sum: { valor: true } }),
      prisma.cliente.groupBy({
        by: ['consultorId'],
        _count: true,
        _sum: { valor: true },
      }),
    ])

    return {
      success: true,
      data: {
        totalClientes,
        clientesAtivos,
        totalValor: totalValor._sum.valor || 0,
        clientesPorConsultor,
      },
    }
  } catch (error) {
    console.error('Erro ao buscar métricas:', error)
    return { success: false, error: 'Erro ao buscar métricas' }
  }
}

