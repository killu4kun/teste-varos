'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  const [formData, setFormData] = useState({
    nome: cliente?.nome || '',
    email: cliente?.email || '',
    telefone: cliente?.telefone || '',
    cpf: cliente?.cpf || '',
    idade: cliente?.idade?.toString() || '',
    endereco: cliente?.endereco || '',
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

  const consultorOptions = consultores.map((c) => ({
    value: c.id,
    label: c.nome,
  }))

  const statusOptions = [
    { value: 'Ativo', label: 'Ativo' },
    { value: 'Inativo', label: 'Inativo' },
    { value: 'Em Negociação', label: 'Em Negociação' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? 'Novo Cliente' : 'Editar Cliente'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome *"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Digite o nome do cliente"
            required
          />

          <Input
            label="Email *"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="email@exemplo.com"
            required
          />

          <Input
            label="Telefone"
            value={formData.telefone}
            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
            placeholder="(00) 00000-0000"
          />

          <Input
            label="CPF"
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
            placeholder="000.000.000-00"
          />

          <Input
            label="Idade"
            type="number"
            value={formData.idade}
            onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
            placeholder="28"
          />

          <Input
            label="Endereço"
            value={formData.endereco}
            onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
            placeholder="Rua, número - Cidade"
          />

          <Input
            label="Empresa"
            value={formData.empresa}
            onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
            placeholder="Nome da empresa"
          />

          <Input
            label="Valor (R$) *"
            type="number"
            step="0.01"
            value={formData.valor}
            onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
            placeholder="0.00"
            required
          />

          <Select
            label="Status *"
            options={statusOptions}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            required
          />

          <Select
            label="Consultor *"
            options={consultorOptions}
            value={formData.consultorId}
            onChange={(e) => setFormData({ ...formData, consultorId: e.target.value })}
            required
          />

          {errors.general && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {errors.general}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

