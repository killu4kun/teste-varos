'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Modal } from '@/components/ui/modal'
import { ClienteFormModal } from '@/components/forms/cliente-form-modal'

interface AcoesClienteProps {
  cliente: {
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
}

export function AcoesCliente({ cliente, consultores }: AcoesClienteProps) {
  const [modalMode, setModalMode] = useState<'edit' | 'delete' | null>(null)
  const router = useRouter()

  const handleSuccess = () => {
    router.refresh()
  }

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => setModalMode('edit')}
          className="px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
        >
          Editar
        </button>
        <button
          onClick={() => setModalMode('delete')}
          className="px-3 py-1.5 text-sm text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
        >
          Excluir
        </button>
      </div>

      {modalMode && (
        <Modal isOpen={true} onClose={() => setModalMode(null)}>
          <ClienteFormModal
            consultores={consultores}
            onClose={() => setModalMode(null)}
            onSuccess={handleSuccess}
            mode={modalMode}
            cliente={cliente}
          />
        </Modal>
      )}
    </>
  )
}

