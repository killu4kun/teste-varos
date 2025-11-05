import { ClienteForm } from '@/components/forms/cliente-form'
import { getConsultores } from '@/actions/consultor-actions'

export default async function NovoClientePage() {
  const result = await getConsultores()
  const consultores = result.success && result.data ? result.data : []

  return (
    <div className="min-h-screen bg-background">
      <ClienteForm consultores={consultores} mode="create" />
    </div>
  )
}

