'use client'

import { useState } from 'react'
import { AcoesCliente } from './acoes-cliente'

interface TabelaClientesProps {
  clientes: Array<{
    id: string
    nome: string
    email: string
    telefone: string | null
    cpf: string | null
    idade: number | null
    endereco: string | null
    empresa: string | null
    valor: number
    status: string
    consultorId: string
    createdAt: Date
    updatedAt: Date
    consultor: {
      id: string
      nome: string
      email: string
    }
  }>
  consultores: Array<{
    id: string
    nome: string
  }>
}

export function TabelaClientes({ clientes, consultores }: TabelaClientesProps) {
  const [paginaAtual, setPaginaAtual] = useState(1)
  const itensPorPagina = 5

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date)).replace(',', ' às') + 'h'
  }

  // Calcular índices para paginação
  const indexInicio = (paginaAtual - 1) * itensPorPagina
  const indexFim = indexInicio + itensPorPagina
  const clientesPaginados = clientes.slice(indexInicio, indexFim)
  const totalPaginas = Math.ceil(clientes.length / itensPorPagina)

  const irParaPaginaAnterior = () => {
    setPaginaAtual(prev => Math.max(prev - 1, 1))
  }

  const irParaProximaPagina = () => {
    setPaginaAtual(prev => Math.min(prev + 1, totalPaginas))
  }


  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0">
            <tr className="bg-[var(--background)]">
              <th className="w-[12%] h-[97px] px-4 py-2 text-left text-sm font-semibold text-white border-b border-[#222729] opacity-100">Nome</th>
              <th className="w-[15%] h-[97px] px-4 py-2 text-left text-sm font-semibold text-white border-b border-[#222729] opacity-100">Email</th>
              <th className="w-[10%] h-[97px] px-4 py-2 text-left text-sm font-semibold text-white border-b border-[#222729] opacity-100">Telefone</th>
              <th className="w-[10%] h-[97px] px-4 py-2 text-left text-sm font-semibold text-white border-b border-[#222729] opacity-100">CPF</th>
              <th className="w-[8%] h-[97px] px-4 py-2 text-left text-sm font-semibold text-white border-b border-[#222729] opacity-100">Idade</th>
              <th className="w-[15%] h-[97px] px-4 py-2 text-left text-sm font-semibold text-white border-b border-[#222729] opacity-100">Endereço</th>
              <th className="w-[12%] h-[97px] px-4 py-2 text-left text-sm font-semibold text-white border-b border-[#222729] opacity-100">Criado em</th>
              <th className="w-[12%] h-[97px] px-4 py-2 text-left text-sm font-semibold text-white border-b border-[#222729] opacity-100">Atualizado em</th>
              <th className="w-[130px] h-[97px] px-4 py-2 text-left text-sm font-semibold text-white border-b border-[#222729] opacity-100">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-12 text-center text-gray-400">
                  <p className="text-lg">Nenhum cliente encontrado</p>
                </td>
              </tr>
            ) : (
              clientesPaginados.map((cliente) => (
              <tr key={cliente.id}>
                <td className="w-[12%] h-[97px] px-4 py-2 text-sm text-white bg-[#131516] border-b border-[#222729] opacity-100">{cliente.nome}</td>
                <td className="w-[15%] h-[97px] px-4 py-2 text-sm text-white bg-[#131516] border-b border-[#222729] opacity-100">{cliente.email}</td>
                <td className="w-[10%] h-[97px] px-4 py-2 text-sm text-white bg-[#131516] border-b border-[#222729] opacity-100">{cliente.telefone || '-'}</td>
                <td className="w-[10%] h-[97px] px-4 py-2 text-sm text-white bg-[#131516] border-b border-[#222729] opacity-100">{cliente.cpf || '-'}</td>
                <td className="w-[8%] h-[97px] px-4 py-2 text-sm text-white bg-[#131516] border-b border-[#222729] opacity-100">{cliente.idade ? `${cliente.idade} anos` : '-'}</td>
                <td className="w-[15%] h-[97px] px-4 py-2 text-sm text-white bg-[#131516] border-b border-[#222729] opacity-100">
                  {cliente.endereco ? (
                    <span className="block truncate" title={cliente.endereco}>
                      {cliente.endereco.length > 25 ? cliente.endereco.substring(0, 25) + '...' : cliente.endereco}
                    </span>
                  ) : '-'}
                </td>
              <td className="w-[12%] h-[97px] px-4 py-2 text-sm text-white bg-[#131516] border-b border-[#222729] opacity-100 whitespace-nowrap">{formatDate(cliente.createdAt)}</td>
              <td className="w-[12%] h-[97px] px-4 py-2 text-sm text-white bg-[#131516] border-b border-[#222729] opacity-100 whitespace-nowrap">{formatDate(cliente.updatedAt)}</td>
              <td className="w-[130px] h-[97px] px-4 py-2 text-sm text-white bg-[#131516] border-b border-[#222729] opacity-100">
                <AcoesCliente cliente={cliente} consultores={consultores} />
              </td>
            </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Controles de Paginação */}
      {totalPaginas > 1 && (
        <div className="flex items-center justify-between px-4 py-4 border-t border-[#222729] bg-[var(--background)]">
          <div className="text-sm text-gray-400">
            Mostrando {indexInicio + 1} a {Math.min(indexFim, clientes.length)} de {clientes.length} clientes
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={irParaPaginaAnterior}
              disabled={paginaAtual === 1}
              className="px-4 py-2 rounded-lg border border-[#222729] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#222729] transition-colors"
            >
              Anterior
            </button>
            
            <span className="text-sm text-white px-4">
              Página {paginaAtual} de {totalPaginas}
            </span>
            
            <button
              onClick={irParaProximaPagina}
              disabled={paginaAtual === totalPaginas}
              className="px-4 py-2 rounded-lg border border-[#222729] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#222729] transition-colors"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

