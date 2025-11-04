import { Suspense } from 'react'
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

  const clientes = clientesResult.success ? clientesResult.data : []
  const metricas = metricasResult.success ? metricasResult.data : null
  const consultores = consultoresResult.success ? consultoresResult.data : []

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
    <div className="min-h-screen" style={{ background: '#131313' }}>
      {/* Header com Logo */}
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-white">VAROS</h1>
      </div>

      <div className="px-8 pb-8">
        {/* Título Dashboard */}
        <h2 className="text-4xl font-bold text-white mb-8">Dashboard</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Card de Métricas - Total de clientes */}
          <div className="rounded-lg p-6" style={{ background: '#1e1e1e' }}>
            <p className="text-gray-400 text-sm mb-2">Total de clientes</p>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-white">{metricas?.totalClientes || 0}</span>
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm mt-2">nos últimos 7 dias</p>
          </div>

          {/* Área de Filtros e Botão */}
          <div className="lg:col-span-2 space-y-4">
            {/* Botão Criar usuário */}
            <div className="flex justify-end">
              <button className="px-6 py-2.5 rounded-lg font-medium text-white" style={{ background: '#22c55e' }}>
                Criar usuário +
              </button>
            </div>

            {/* Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Nome do consultor</label>
                <select 
                  className="w-full px-4 py-2.5 rounded-lg text-white border-none outline-none"
                  style={{ background: '#2a2a2a' }}
                >
                  <option>John Doe</option>
                  {consultores.map(c => (
                    <option key={c.id} value={c.id}>{c.nome}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Email do consultor</label>
                <select 
                  className="w-full px-4 py-2.5 rounded-lg text-white border-none outline-none"
                  style={{ background: '#2a2a2a' }}
                >
                  <option>johndoe@gm...</option>
                  {consultores.map(c => (
                    <option key={c.id} value={c.email}>{c.email}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Período</label>
                <input 
                  type="text"
                  placeholder="21/10/2025 até 21/12/2025"
                  className="w-full px-4 py-2.5 rounded-lg text-white border-none outline-none"
                  style={{ background: '#2a2a2a' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Clientes */}
        <div className="rounded-lg overflow-hidden" style={{ background: '#1e1e1e' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: '#2a2a2a' }}>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Nome</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Telefone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">CPF</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Idade</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Endereço</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Criado em</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Atualizado em</th>
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
                    <tr 
                      key={cliente.id}
                      className="border-t"
                      style={{ borderColor: '#2a2a2a' }}
                    >
                      <td className="px-6 py-4 text-sm text-white">{cliente.nome}</td>
                      <td className="px-6 py-4 text-sm text-white">{cliente.email}</td>
                      <td className="px-6 py-4 text-sm text-white">{cliente.telefone || '-'}</td>
                      <td className="px-6 py-4 text-sm text-white">{cliente.cpf || '-'}</td>
                      <td className="px-6 py-4 text-sm text-white">{cliente.idade ? `${cliente.idade} anos` : '-'}</td>
                      <td className="px-6 py-4 text-sm text-white">
                        {cliente.endereco ? (
                          <span className="block truncate max-w-xs" title={cliente.endereco}>
                            {cliente.endereco.length > 30 ? cliente.endereco.substring(0, 30) + '...' : cliente.endereco}
                          </span>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-white whitespace-nowrap">{formatDate(cliente.createdAt)}</td>
                      <td className="px-6 py-4 text-sm text-white whitespace-nowrap">{formatDate(cliente.updatedAt)}</td>
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
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#131313' }}>
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400">Carregando...</p>
          </div>
        </div>
      }
    >
      <DashboardContent searchParams={props.searchParams} />
    </Suspense>
  )
}
