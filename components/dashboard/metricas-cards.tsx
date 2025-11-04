import { Card, CardContent } from '@/components/ui/card'

interface MetricasCardsProps {
  totalClientes: number
  clientesAtivos: number
  totalValor: number
  totalConsultores: number
}

export function MetricasCards({
  totalClientes,
  clientesAtivos,
  totalValor,
  totalConsultores,
}: MetricasCardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Total de Clientes</span>
            <span className="text-3xl font-bold text-gray-900 mt-2">{totalClientes}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Clientes Ativos</span>
            <span className="text-3xl font-bold text-green-600 mt-2">{clientesAtivos}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Valor Total</span>
            <span className="text-3xl font-bold text-blue-600 mt-2">
              {formatCurrency(totalValor)}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Consultores</span>
            <span className="text-3xl font-bold text-purple-600 mt-2">{totalConsultores}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

