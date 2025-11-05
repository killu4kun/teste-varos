'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Modal } from '@/components/ui/modal'
import { ClienteFormModal } from '@/components/forms/cliente-form-modal'
import { useRouter } from 'next/navigation'

interface CriarUsuarioButtonProps {
  consultores: Array<{ id: string; nome: string }>
}

export function CriarUsuarioButton({ consultores }: CriarUsuarioButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const handleSuccess = () => {
    router.refresh()
  }

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center border opacity-100 transition-all duration-300 ease-out hover:opacity-90 w-full sm:w-[171px]"
        style={{ 
          height: '56px', 
          gap: '16px',
          borderRadius: '8px',
          borderWidth: '1px',
          borderColor: '#222729',
          background: '#1B3F1B',
          paddingLeft: '16px',
          paddingRight: '16px'
        }}
      >
        <span 
          style={{ 
            width: '99px',
            height: '22px',
            fontFamily: 'var(--font-red-hat-display)',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '135%',
            letterSpacing: '2%',
            color: '#00F700',
            opacity: 1
          }}
        >
          Criar usuário
        </span>
        <Image 
          src="/Add--large.svg" 
          alt="Add icon" 
          width={16} 
          height={16}
        />
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ClienteFormModal 
          consultores={consultores}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSuccess}
        />
      </Modal>
    </>
  )
}

