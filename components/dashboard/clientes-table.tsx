'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteCliente } from '@/actions/cliente-actions'

interface Cliente {
  id: string
  nome: string
  email: string
  empresa: string | null
  valor: number
  status: string
  consultor: {
    id: string
    nome: string
    email: string
  }
}

interface ClientesTableProps {
  clientes: Cliente[]
}

export function ClientesTable({ clientes }: ClientesTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'success'
      case 'Inativo':
        return 'danger'
      case 'Em Negociação':
        return 'warning'
      default:
        return 'info'
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return

    setDeletingId(id)
    const result = await deleteCliente(id)
    
    if (!result.success) {
      alert(result.error || 'Erro ao excluir cliente')
    }
    setDeletingId(null)
  }

  if (clientes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">Nenhum cliente encontrado</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Empresa</TableHead>
          <TableHead>Consultor</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clientes.map((cliente) => (
          <TableRow key={cliente.id}>
            <TableCell>
              <div>
                <div className="font-medium">{cliente.nome}</div>
                <div className="text-sm text-gray-500">{cliente.email}</div>
              </div>
            </TableCell>
            <TableCell>{cliente.empresa || '-'}</TableCell>
            <TableCell>
              <div className="text-sm">{cliente.consultor.nome}</div>
            </TableCell>
            <TableCell className="font-medium">{formatCurrency(cliente.valor)}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(cliente.status)}>{cliente.status}</Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Link href={`/clientes/${cliente.id}/editar`}>
                  <Button size="sm" variant="ghost">
                    Editar
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(cliente.id)}
                  disabled={deletingId === cliente.id}
                >
                  {deletingId === cliente.id ? 'Excluindo...' : 'Excluir'}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

