import { notFound } from 'next/navigation'
import { ClienteForm } from '@/components/forms/cliente-form'
import { getClienteById } from '@/actions/cliente-actions'
import { getConsultores } from '@/actions/consultor-actions'

type ClienteFormData = Parameters<typeof ClienteForm>[0]['cliente']

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditarClientePage({ params }: PageProps) {
  const { id } = await params
  const [clienteResult, consultoresResult] = await Promise.all([
    getClienteById(id),
    getConsultores(),
  ])

  if (!clienteResult.success || !clienteResult.data) {
    notFound()
  }

  const consultores = consultoresResult.success && consultoresResult.data ? consultoresResult.data : []

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Editar Cliente</h1>
        <p className="text-gray-600 mt-2">Atualizar informações do cliente</p>
      </div>

      <ClienteForm cliente={clienteResult.data as unknown as ClienteFormData} consultores={consultores} mode="edit" />
    </div>
  )
}

