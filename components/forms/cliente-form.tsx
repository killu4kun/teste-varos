'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createCliente, updateCliente } from '@/actions/cliente-actions'
import type { ClienteInput } from '@/lib/validations'

interface ClienteFormProps {
  cliente?: {
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
  }
  consultores: Array<{ id: string; nome: string }>
  mode: 'create' | 'edit'
}

export function ClienteForm({ cliente, consultores, mode }: ClienteFormProps) {
  const router = useRouter()
  const [abaAtiva, setAbaAtiva] = useState<'basica' | 'clientes'>('basica')
  const [formData, setFormData] = useState({
    tipo: 'cliente',
    nome: cliente?.nome || '',
    telefone: cliente?.telefone || '',
    email: cliente?.email || '',
    idade: cliente?.idade?.toString() || '',
    cpf: cliente?.cpf || '',
    cep: '',
    estado: '',
    endereco: cliente?.endereco || '',
    complemento: '',
    empresa: cliente?.empresa || '',
    valor: cliente?.valor?.toString() || '0',
    status: cliente?.status || 'Ativo',
    consultorId: cliente?.consultorId || consultores[0]?.id || '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      const clienteData: ClienteInput = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone || undefined,
        cpf: formData.cpf || undefined,
        idade: formData.idade ? parseInt(formData.idade) : undefined,
        endereco: formData.endereco || undefined,
        empresa: formData.empresa || undefined,
        valor: parseFloat(formData.valor),
        status: formData.status as 'Ativo' | 'Inativo' | 'Em Negociação',
        consultorId: formData.consultorId,
      }

      const result =
        mode === 'create'
          ? await createCliente(clienteData)
          : await updateCliente(cliente!.id, clienteData)

      if (result.success) {
        router.push('/dashboard')
        router.refresh()
      } else {
        setErrors({ general: result.error || 'Erro ao salvar cliente' })
      }
    } catch (error) {
      setErrors({ general: 'Erro ao salvar cliente' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header com Logo e Botões */}
      <header className="w-full h-[66px] border-b border-[var(--border-header)] px-4 md:px-8 py-6 flex items-center justify-between gap-2.5">
        <Image 
          src="/varos-logo.svg" 
          alt="Varos" 
          width={120} 
          height={40}
          priority
        />
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center justify-center border opacity-100 transition-all duration-300 ease-out hover:opacity-90 px-6"
            style={{ 
              height: '56px', 
              gap: '16px',
              borderRadius: '8px',
              borderWidth: '1px',
              borderColor: '#222729',
              background: '#1B3F1B'
            }}
          >
            <span 
              style={{ 
                fontFamily: 'var(--font-red-hat-display)',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '135%',
                letterSpacing: '2%',
                color: '#00F700',
                opacity: 1
              }}
            >
              {mode === 'create' ? 'Criar usuário' : 'Atualizar usuário'}
            </span>
            <Image 
              src="/Add--large.svg" 
              alt="Add icon" 
              width={16} 
              height={16}
            />
          </button>
          
          <button
            type="button"
            className="px-6 rounded-lg font-medium text-white border border-[#222729] bg-[#1e1e1e] hover:bg-[#2a2a2a] transition-colors"
            style={{ height: '56px' }}
          >
            Deletar usuário
          </button>
        </div>
      </header>

      {/* Formulário */}
      <div className="px-4 md:px-8 py-8 max-w-[1920px] mx-auto">
        <div className="bg-[#1e1e1e] rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-8">
            {mode === 'create' ? 'Criar usuário' : 'Editar usuário'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo do usuário */}
          <div>
            <label className="block text-white text-sm mb-2">Tipo do usuário</label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg text-white border-none outline-none"
            >
              <option value="">Selecione o tipo do usuário</option>
              <option value="cliente">Cliente</option>
              <option value="consultor">Consultor</option>
            </select>
          </div>

          {/* Nome e Telefone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white text-sm mb-2">Nome</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Digite o nome"
                className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg text-white border-none outline-none placeholder:text-gray-500"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2">Telefone</label>
              <input
                type="text"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                placeholder="Digite o telefone"
                className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg text-white border-none outline-none placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-white text-sm mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Digite o email"
              className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg text-white border-none outline-none placeholder:text-gray-500"
              required
            />
          </div>

          {/* Tabs */}
          <div className="border-b border-[#222729]">
            <div className="flex gap-8">
              <button
                type="button"
                onClick={() => setAbaAtiva('basica')}
                className={`pb-4 text-sm font-medium transition-colors ${
                  abaAtiva === 'basica'
                    ? 'text-white border-b-2 border-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Informações básica
              </button>
              <button
                type="button"
                onClick={() => setAbaAtiva('clientes')}
                className={`pb-4 text-sm font-medium transition-colors ${
                  abaAtiva === 'clientes'
                    ? 'text-white border-b-2 border-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Adicionar clientes
              </button>
            </div>
          </div>

          {/* Conteúdo da Aba - Informações Básicas */}
          {abaAtiva === 'basica' && (
            <div className="space-y-6 pt-4">
              {/* Idade e CPF */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm mb-2">Idade</label>
                  <input
                    type="number"
                    value={formData.idade}
                    onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                    placeholder="28 anos"
                    className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg text-white border-none outline-none placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm mb-2">CPF</label>
                  <input
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    placeholder="000.000.000-00"
                    className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg text-white border-none outline-none placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* CEP e Estado */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm mb-2">CEP</label>
                  <input
                    type="text"
                    value={formData.cep}
                    onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                    placeholder="Insira o CEP"
                    className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg text-white border-none outline-none placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm mb-2">Estado</label>
                  <select
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                    className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg text-white border-none outline-none"
                  >
                    <option value="">Selecione o estado</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="PR">Paraná</option>
                    <option value="SC">Santa Catarina</option>
                  </select>
                </div>
              </div>

              {/* Endereço */}
              <div>
                <label className="block text-white text-sm mb-2">Endereço</label>
                <input
                  type="text"
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  placeholder="Digite o endereço"
                  className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg text-white border-none outline-none placeholder:text-gray-500"
                />
              </div>

              {/* Complemento */}
              <div>
                <label className="block text-white text-sm mb-2">Complemento</label>
                <input
                  type="text"
                  value={formData.complemento}
                  onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
                  placeholder="Digite o complemento"
                  className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg text-white border-none outline-none placeholder:text-gray-500"
                />
              </div>
            </div>
          )}

          {/* Conteúdo da Aba - Adicionar Clientes */}
          {abaAtiva === 'clientes' && (
            <div className="space-y-6 pt-4">
              <div>
                <label className="block text-white text-sm mb-2">Consultor</label>
                <select
                  value={formData.consultorId}
                  onChange={(e) => setFormData({ ...formData, consultorId: e.target.value })}
                  className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg text-white border-none outline-none"
                  required
                >
                  <option value="">Selecione um consultor</option>
                  {consultores.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white text-sm mb-2">Valor (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                  className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg text-white border-none outline-none"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg text-white border-none outline-none"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                  <option value="Em Negociação">Em Negociação</option>
                </select>
              </div>
            </div>
          )}

            {errors.general && (
              <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-400 text-sm">
                {errors.general}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
