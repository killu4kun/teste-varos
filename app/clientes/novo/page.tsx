import { ClienteForm } from '@/components/forms/cliente-form'
import { getConsultores } from '@/actions/consultor-actions'

export default async function NovoClientePage() {
  const result = await getConsultores()
  const consultores = result.success ? result.data : []

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Novo Cliente</h1>
        <p className="text-gray-600 mt-2">Adicionar um novo cliente ao sistema</p>
      </div>

      <ClienteForm consultores={consultores} mode="create" />
    </div>
  )
}

