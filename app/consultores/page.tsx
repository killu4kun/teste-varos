import { Suspense } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TableSkeleton } from '@/components/ui/skeleton'
import { getConsultores } from '@/actions/consultor-actions'

async function ConsultoresContent() {
  const result = await getConsultores()
  const consultores = result.success ? result.data : []

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Consultores</CardTitle>
        <Link href="/consultores/novo">
          <Button>Novo Consultor</Button>
        </Link>
      </CardHeader>
      <CardContent>
        {(consultores ?? []).length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Nenhum consultor encontrado</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Clientes</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(consultores ?? []).map((consultor) => (
                <TableRow key={consultor.id}>
                  <TableCell className="font-medium">{consultor.nome}</TableCell>
                  <TableCell>{consultor.email}</TableCell>
                  <TableCell>{consultor.telefone || '-'}</TableCell>
                  <TableCell>{consultor._count.clientes}</TableCell>
                  <TableCell>
                    <Link href={`/consultores/${consultor.id}/editar`}>
                      <Button size="sm" variant="ghost">
                        Editar
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

export default function ConsultoresPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Consultores</h1>
        <p className="text-gray-600 mt-2">Gerenciar consultores da plataforma</p>
      </div>

      <Suspense
        fallback={
          <Card>
            <CardHeader>
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <TableSkeleton rows={5} />
            </CardContent>
          </Card>
        }
      >
        <ConsultoresContent />
      </Suspense>
    </div>
  )
}

