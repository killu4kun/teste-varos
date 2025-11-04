'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { consultorSchema, type ConsultorInput } from '@/lib/validations'

export async function getConsultores() {
  try {
    const consultores = await prisma.consultor.findMany({
      include: {
        _count: {
          select: { clientes: true },
        },
      },
      orderBy: {
        nome: 'asc',
      },
    })
    return { success: true, data: consultores }
  } catch (error) {
    console.error('Erro ao buscar consultores:', error)
    return { success: false, error: 'Erro ao buscar consultores' }
  }
}

export async function getConsultorById(id: string) {
  try {
    const consultor = await prisma.consultor.findUnique({
      where: { id },
      include: {
        clientes: true,
      },
    })
    return { success: true, data: consultor }
  } catch (error) {
    console.error('Erro ao buscar consultor:', error)
    return { success: false, error: 'Erro ao buscar consultor' }
  }
}

export async function createConsultor(data: ConsultorInput) {
  try {
    const validated = consultorSchema.parse(data)
    
    const consultor = await prisma.consultor.create({
      data: validated,
    })
    
    revalidatePath('/consultores')
    revalidatePath('/dashboard')
    
    return { success: true, data: consultor }
  } catch (error) {
    console.error('Erro ao criar consultor:', error)
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Erro ao criar consultor' }
  }
}

export async function updateConsultor(id: string, data: ConsultorInput) {
  try {
    const validated = consultorSchema.parse(data)
    
    const consultor = await prisma.consultor.update({
      where: { id },
      data: validated,
    })
    
    revalidatePath('/consultores')
    revalidatePath('/dashboard')
    
    return { success: true, data: consultor }
  } catch (error) {
    console.error('Erro ao atualizar consultor:', error)
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Erro ao atualizar consultor' }
  }
}

export async function deleteConsultor(id: string) {
  try {
    await prisma.consultor.delete({
      where: { id },
    })
    
    revalidatePath('/consultores')
    revalidatePath('/dashboard')
    
    return { success: true }
  } catch (error) {
    console.error('Erro ao deletar consultor:', error)
    return { success: false, error: 'Erro ao deletar consultor' }
  }
}

