'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Select } from '@/components/ui/select'

interface Consultor {
  id: string
  nome: string
}

interface FiltrosProps {
  consultores: Consultor[]
}

export function Filtros({ consultores }: FiltrosProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleConsultorChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'todos') {
      params.delete('consultor')
    } else {
      params.set('consultor', value)
    }
    router.push(`/dashboard?${params.toString()}`)
  }

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'Todos') {
      params.delete('status')
    } else {
      params.set('status', value)
    }
    router.push(`/dashboard?${params.toString()}`)
  }

  const consultorOptions = [
    { value: 'todos', label: 'Todos os Consultores' },
    ...consultores.map((c: any) => ({ value: c.id, label: c.nome })),
  ]

  const statusOptions = [
    { value: 'Todos', label: 'Todos os Status' },
    { value: 'Ativo', label: 'Ativo' },
    { value: 'Inativo', label: 'Inativo' },
    { value: 'Em Negociação', label: 'Em Negociação' },
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Select
          label="Filtrar por Consultor"
          options={consultorOptions}
          value={searchParams.get('consultor') || 'todos'}
          onChange={(e) => handleConsultorChange(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <Select
          label="Filtrar por Status"
          options={statusOptions}
          value={searchParams.get('status') || 'Todos'}
          onChange={(e) => handleStatusChange(e.target.value)}
        />
      </div>
    </div>
  )
}

