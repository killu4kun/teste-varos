import { ConsultorForm } from '@/components/forms/consultor-form'

export default function NovoConsultorPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Novo Consultor</h1>
        <p className="text-gray-600 mt-2">Adicionar um novo consultor ao sistema</p>
      </div>

      <ConsultorForm mode="create" />
    </div>
  )
}

