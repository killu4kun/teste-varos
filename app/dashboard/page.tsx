import { Suspense } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TableSkeleton } from '@/components/ui/skeleton'
import { MetricasCards } from '@/components/dashboard/metricas-cards'
import { ClientesTable } from '@/components/dashboard/clientes-table'
import { Filtros } from '@/components/dashboard/filtros'
import { getClientes, getMetricas } from '@/actions/cliente-actions'
import { getConsultores } from '@/actions/consultor-actions'

interface PageProps {
  searchParams: Promise<{ consultor?: string; status?: string }>
}

async function DashboardContent({ searchParams }: PageProps) {
  const params = await searchParams
  const [clientesResult, metricasResult, consultoresResult] = await Promise.all([
    getClientes(params.consultor, params.status),
    getMetricas(),
    getConsultores(),
  ])

  const clientes = clientesResult.success ? clientesResult.data : []
  const metricas = metricasResult.success ? metricasResult.data : null
  const consultores = consultoresResult.success ? consultoresResult.data : []

  return (
    <>
      {metricas && (
        <MetricasCards
          totalClientes={metricas.totalClientes}
          clientesAtivos={metricas.clientesAtivos}
          totalValor={metricas.totalValor}
          totalConsultores={consultores.length}
        />
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Clientes</CardTitle>
          <Link href="/clientes/novo">
            <Button>Novo Cliente</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Filtros consultores={consultores} />
          <ClientesTable clientes={clientes} />
        </CardContent>
      </Card>
    </>
  )
}

export default async function DashboardPage(props: PageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Visão geral dos clientes e métricas</p>
      </div>

      <Suspense
        fallback={
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="h-20 bg-gray-200 animate-pulse rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardHeader>
                <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <TableSkeleton rows={5} />
              </CardContent>
            </Card>
          </div>
        }
      >
        <DashboardContent searchParams={props.searchParams} />
      </Suspense>
    </div>
  )
}

