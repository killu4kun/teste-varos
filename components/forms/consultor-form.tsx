'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createConsultor, updateConsultor } from '@/actions/consultor-actions'
import type { ConsultorInput } from '@/lib/validations'

interface ConsultorFormProps {
  consultor?: {
    id: string
    nome: string
    email: string
    telefone: string | null
  }
  mode: 'create' | 'edit'
}

export function ConsultorForm({ consultor, mode }: ConsultorFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<ConsultorInput>({
    nome: consultor?.nome || '',
    email: consultor?.email || '',
    telefone: consultor?.telefone || '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      const result =
        mode === 'create'
          ? await createConsultor(formData)
          : await updateConsultor(consultor!.id, formData)

      if (result.success) {
        router.push('/consultores')
        router.refresh()
      } else {
        setErrors({ general: result.error || 'Erro ao salvar consultor' })
      }
    } catch (error) {
      setErrors({ general: 'Erro ao salvar consultor' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? 'Novo Consultor' : 'Editar Consultor'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome *"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Digite o nome completo"
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
            value={formData.telefone || ''}
            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
            placeholder="(00) 00000-0000"
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

