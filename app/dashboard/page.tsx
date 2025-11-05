import { Suspense } from 'react'
import Image from 'next/image'
import { getClientes, getMetricas } from '@/actions/cliente-actions'
import { getConsultores } from '@/actions/consultor-actions'

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

  // Filtrar por email se fornecido
  const clientesFiltrados = params.email
    ? clientes.filter(c => c.consultor.email.includes(params.email!))
    : clientes

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date)).replace(',', ' às') + 'h'
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header com Logo */}
      <header className="w-full h-[66px] border-b border-[var(--border-header)] px-8 py-6 flex items-center gap-2.5">
        <Image 
          src="/varos-logo.svg" 
          alt="Varos" 
          width={120} 
          height={40}
          priority
        />
      </header>

      <div className="px-8 pb-8">
        {/* Título Dashboard */}
        <div className="w-full max-w-[1515.5px] h-[42px] flex items-center gap-10 mb-8">
          <h2 className="text-white opacity-100" style={{ fontFamily: 'var(--font-red-hat-display)', fontWeight: 700, fontSize: '32px', lineHeight: '100%', letterSpacing: '0%' }}>
            Dashboard
          </h2>
        </div>

        <div className="w-full max-w-[1516px] h-[139px] flex justify-between gap-6 mb-8 opacity-100">
          {/* Card de Métricas - Total de clientes */}
          <div className="flex-shrink-0 flex flex-col rounded-lg border opacity-100" style={{ width: '212px', height: '137px', gap: '8px', padding: '16px', borderColor: '#222729' }}>
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
          <div className="flex-1 flex flex-col gap-4">
            {/* Botão Criar usuário */}
            <div className="flex justify-end">
              <button 
                className="flex items-center justify-center border opacity-100 transition-all duration-300 ease-out hover:opacity-90"
                style={{ 
                  width: '171px', 
                  height: '56px', 
                  gap: '16px',
                  borderRadius: '8px',
                  borderWidth: '1px',
                  borderColor: '#222729',
                  background: '#1B3F1B',
                  paddingLeft: '16px',
                  paddingRight: '16px'
                }}
              >
                <span 
                  style={{ 
                    width: '99px',
                    height: '22px',
                    fontFamily: 'var(--font-red-hat-display)',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '135%',
                    letterSpacing: '2%',
                    color: '#00F700',
                    opacity: 1
                  }}
                >
                  Criar usuário
                </span>
                <Image 
                  src="/Add--large.svg" 
                  alt="Add icon" 
                  width={16} 
                  height={16}
                />
              </button>
            </div>

            {/* Filtros */}
            <div className="max-w-[875px] px-6 py-4 flex items-center gap-6 border border-[#222729] rounded-lg bg-[var(--background)] shadow-[0px_1px_4px_0px_#00000029]">
              <div className="flex items-center gap-2 min-w-0">
                <label className="text-[var(--text-secondary)] text-sm whitespace-nowrap">Nome do consultor</label>
                <select className="min-w-[120px] px-4 py-2.5 bg-[var(--input-bg)] rounded-lg text-white border-none outline-none">
                  <option>John Doe</option>
                  {consultores.map(c => (
                    <option key={c.id} value={c.id}>{c.nome}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 min-w-0">
                <label className="text-[var(--text-secondary)] text-sm whitespace-nowrap">Email do consultor</label>
                <select className="min-w-[120px] px-4 py-2.5 bg-[var(--input-bg)] rounded-lg text-white border-none outline-none">
                  <option>johndoe@gm...</option>
                  {consultores.map(c => (
                    <option key={c.id} value={c.email}>{c.email}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 min-w-0">
                <label className="text-[var(--text-secondary)] text-sm whitespace-nowrap">Período</label>
                <input 
                  type="text"
                  placeholder="21/10/2025 até 21/12/2025"
                  className="min-w-[140px] px-4 py-2.5 bg-[var(--input-bg)] rounded-lg text-white border-none outline-none placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Clientes */}
        <div className="w-full max-w-[1515.5px] h-[388px] border border-[#222729] opacity-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--background)]">
                  <th className="w-[189.4375px] h-[97px] px-4 py-2 text-left text-sm font-semibold text-white border-b border-[#222729] opacity-100">Nome</th>
                  <th className="w-[189.4375px] h-[97px] px-4 py-2 text-left text-sm font-semibold text-white border-b border-[#222729] opacity-100">Email</th>
                  <th className="w-[189.4375px] h-[97px] px-4 py-2 text-left text-sm font-semibold text-white border-b border-[#222729] opacity-100">Telefone</th>
                  <th className="w-[189.4375px] h-[97px] px-4 py-2 text-left text-sm font-semibold text-white border-b border-[#222729] opacity-100">CPF</th>
                  <th className="w-[189.4375px] h-[97px] px-4 py-2 text-left text-sm font-semibold text-white border-b border-[#222729] opacity-100">Idade</th>
                  <th className="w-[189.4375px] h-[97px] px-4 py-2 text-left text-sm font-semibold text-white border-b border-[#222729] opacity-100">Endereço</th>
                  <th className="w-[189.4375px] h-[97px] px-4 py-2 text-left text-sm font-semibold text-white border-b border-[#222729] opacity-100">Criado em</th>
                  <th className="w-[189.4375px] h-[97px] px-4 py-2 text-left text-sm font-semibold text-white border-b border-[#222729] opacity-100">Atualizado em</th>
                </tr>
              </thead>
              <tbody>
                {clientesFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-400">
                      Nenhum cliente encontrado
                    </td>
                  </tr>
                ) : (
                  clientesFiltrados.map((cliente, index) => (
                    <tr key={cliente.id}>
                      <td className="w-[189.4375px] h-[97px] px-4 py-2 text-sm text-white bg-[#131516] border-b border-[#222729] opacity-100">{cliente.nome}</td>
                      <td className="w-[189.4375px] h-[97px] px-4 py-2 text-sm text-white bg-[#131516] border-b border-[#222729] opacity-100">{cliente.email}</td>
                      <td className="w-[189.4375px] h-[97px] px-4 py-2 text-sm text-white bg-[#131516] border-b border-[#222729] opacity-100">{cliente.telefone || '-'}</td>
                      <td className="w-[189.4375px] h-[97px] px-4 py-2 text-sm text-white bg-[#131516] border-b border-[#222729] opacity-100">{cliente.cpf || '-'}</td>
                      <td className="w-[189.4375px] h-[97px] px-4 py-2 text-sm text-white bg-[#131516] border-b border-[#222729] opacity-100">{cliente.idade ? `${cliente.idade} anos` : '-'}</td>
                      <td className="w-[189.4375px] h-[97px] px-4 py-2 text-sm text-white bg-[#131516] border-b border-[#222729] opacity-100">
                        {cliente.endereco ? (
                          <span className="block truncate max-w-xs" title={cliente.endereco}>
                            {cliente.endereco.length > 30 ? cliente.endereco.substring(0, 30) + '...' : cliente.endereco}
                          </span>
                        ) : '-'}
                      </td>
                      <td className="w-[189.4375px] h-[97px] px-4 py-2 text-sm text-white bg-[#131516] border-b border-[#222729] opacity-100 whitespace-nowrap">{formatDate(cliente.createdAt)}</td>
                      <td className="w-[189.4375px] h-[97px] px-4 py-2 text-sm text-white bg-[#131516] border-b border-[#222729] opacity-100 whitespace-nowrap">{formatDate(cliente.updatedAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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
