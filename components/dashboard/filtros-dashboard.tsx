'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface FiltrosDashboardProps {
  consultores: Array<{ id: string; nome: string; email: string }>
}

export function FiltrosDashboard({ consultores }: FiltrosDashboardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleConsultorChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === '') {
      params.delete('consultor')
    } else {
      params.set('consultor', value)
    }
    router.push(`/dashboard?${params.toString()}`)
  }

  const handleEmailChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === '') {
      params.delete('email')
    } else {
      params.set('email', value)
    }
    router.push(`/dashboard?${params.toString()}`)
  }

  return (
    <div className="w-full lg:w-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6 border border-[#222729] rounded-lg bg-[var(--background)] shadow-[0px_1px_4px_0px_#00000029]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 min-w-0">
        <label className="text-[var(--text-secondary)] text-sm whitespace-nowrap">Nome do consultor</label>
        <select 
          className="w-full sm:min-w-[120px] px-4 py-2.5 bg-[var(--input-bg)] rounded-lg text-white border-none outline-none"
          value={searchParams.get('consultor') || ''}
          onChange={(e) => handleConsultorChange(e.target.value)}
        >
          <option value="">Todos os consultores</option>
          {consultores.map((c: any) => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 min-w-0">
        <label className="text-[var(--text-secondary)] text-sm whitespace-nowrap">Email do consultor</label>
        <select 
          className="w-full sm:min-w-[120px] px-4 py-2.5 bg-[var(--input-bg)] rounded-lg text-white border-none outline-none"
          value={searchParams.get('email') || ''}
          onChange={(e) => handleEmailChange(e.target.value)}
        >
          <option value="">Todos os emails</option>
          {consultores.map((c: any) => (
            <option key={c.id} value={c.email}>{c.email}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 min-w-0">
        <label className="text-[var(--text-secondary)] text-sm whitespace-nowrap">Período</label>
        <input 
          type="text"
          placeholder="21/10/2025 até 21/12/2025"
          className="w-full sm:min-w-[140px] px-4 py-2.5 bg-[var(--input-bg)] rounded-lg text-white border-none outline-none placeholder:text-gray-500"
        />
      </div>
    </div>
  )
}

