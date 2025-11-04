import { notFound } from 'next/navigation'
import { ConsultorForm } from '@/components/forms/consultor-form'
import { getConsultorById } from '@/actions/consultor-actions'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditarConsultorPage({ params }: PageProps) {
  const { id } = await params
  const result = await getConsultorById(id)

  if (!result.success || !result.data) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Editar Consultor</h1>
        <p className="text-gray-600 mt-2">Atualizar informações do consultor</p>
      </div>

      <ConsultorForm consultor={result.data} mode="edit" />
    </div>
  )
}

