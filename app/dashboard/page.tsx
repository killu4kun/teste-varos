import { Suspense } from 'react'
import Image from 'next/image'
import { getClientes, getMetricas } from '@/actions/cliente-actions'
import { getConsultores } from '@/actions/consultor-actions'
import { TabelaClientes } from '@/components/dashboard/tabela-clientes'
import { CriarUsuarioButton } from '@/components/dashboard/criar-usuario-button'
import { FiltrosDashboard } from '@/components/dashboard/filtros-dashboard'

interface PageProps {
  searchParams: Promise<{ consultor?: string; email?: string; dataInicio?: string; dataFim?: string }>
}

async function DashboardContent({ searchParams }: PageProps) {
  const params = await searchParams
  const [clientesResult, metricasResult, consultoresResult] = await Promise.all([
    getClientes(params.consultor),
    getMetricas(),
    getConsultores(),
  ])

  const clientes = clientesResult.success && clientesResult.data ? clientesResult.data : []
  const metricas = metricasResult.success ? metricasResult.data : null
  const consultores = consultoresResult.success && consultoresResult.data ? consultoresResult.data : []

  // Aplicar filtros adicionais do lado do cliente
  let clientesFiltrados = clientes
  
  // Filtrar por email se fornecido (já vem filtrado do servidor por consultor)
  if (params.email) {
    clientesFiltrados = clientesFiltrados.filter(c => c.consultor.email === params.email)
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header com Logo */}
      <header className="w-full h-[66px] border-b border-[var(--border-header)] px-4 md:px-8 py-6 flex items-center gap-2.5">
        <Image 
          src="/varos-logo.svg" 
          alt="Varos" 
          width={120} 
          height={40}
          priority
        />
      </header>

      <div className="px-4 md:px-8 pb-8 max-w-[1920px] mx-auto">
        {/* Título Dashboard */}
        <div className="w-full h-[42px] flex items-center gap-10 mb-6 md:mb-8 mt-6">
          <h2 className="text-white opacity-100 text-2xl md:text-[32px]" style={{ fontFamily: 'var(--font-red-hat-display)', fontWeight: 700, lineHeight: '100%', letterSpacing: '0%' }}>
            Dashboard
          </h2>
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-between gap-6 mb-8 opacity-100">
          {/* Card de Métricas - Total de clientes */}
          <div className="flex-shrink-0 flex flex-col rounded-lg border opacity-100 w-full lg:w-[212px] h-[137px]" style={{ gap: '8px', padding: '16px', borderColor: '#222729' }}>
            <p className="text-[var(--text-secondary)]" style={{ fontFamily: 'var(--font-red-hat-display)', fontWeight: 400, fontSize: '14px', lineHeight: '135%', letterSpacing: '2%' }}>
              Total de clientes
            </p>
            <div className="flex items-center gap-2">
              <span className="text-white" style={{ fontFamily: 'var(--font-red-hat-display)', fontWeight: 500, fontSize: '38px', lineHeight: '135%', letterSpacing: '2%' }}>
                {metricas?.totalClientes || 0}
              </span>
              <Image 
                src="/Arrow--up-right.svg" 
                alt="Arrow up right" 
                width={16} 
                height={16}
              />
            </div>
            <p className="text-gray-500" style={{ fontFamily: 'var(--font-red-hat-display)', fontWeight: 400, fontSize: '14px', lineHeight: '135%', letterSpacing: '2%' }}>
              nos últimos 7 dias
            </p>
          </div>

          {/* Área de Filtros e Botão */}
          <div className="flex flex-col gap-4 w-full lg:w-auto lg:ml-auto">
            {/* Botão Criar usuário */}
            <div className="flex justify-end">
              <CriarUsuarioButton consultores={consultores} />
            </div>

            {/* Filtros */}
            <FiltrosDashboard consultores={consultores} />
          </div>
        </div>

        {/* Tabela de Clientes */}
        <div className="w-full border border-[#222729] opacity-100 overflow-hidden rounded-lg">
          <TabelaClientes clientes={clientesFiltrados} consultores={consultores} />
        </div>
      </div>
    </div>
  )
}

export default async function DashboardPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[var(--button-primary)] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400">Carregando...</p>
          </div>
        </div>
      }
    >
      <DashboardContent searchParams={props.searchParams} />
    </Suspense>
  )
}
