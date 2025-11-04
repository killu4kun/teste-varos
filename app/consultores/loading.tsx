import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { TableSkeleton } from '@/components/ui/skeleton'

export default function ConsultoresLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-9 w-64 bg-gray-200 animate-pulse rounded" />
        <div className="h-6 w-80 bg-gray-200 animate-pulse rounded mt-2" />
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
  )
}

