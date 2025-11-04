interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-24" />
        </div>
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <Skeleton className="h-6 w-1/3 mb-4" />
      <Skeleton className="h-10 w-full mb-2" />
      <Skeleton className="h-10 w-full mb-2" />
      <Skeleton className="h-10 w-2/3" />
    </div>
  )
}

