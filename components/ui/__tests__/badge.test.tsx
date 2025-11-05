import { render, screen } from '@testing-library/react'
import { Badge } from '../badge'

describe('Badge Component', () => {
  it('deve renderizar o badge com texto', () => {
    render(<Badge>Ativo</Badge>)
    expect(screen.getByText('Ativo')).toBeInTheDocument()
  })

  it('deve aplicar a variante success', () => {
    render(<Badge variant="success">Ativo</Badge>)
    const badge = screen.getByText('Ativo')
    expect(badge).toHaveClass('bg-green-100', 'text-green-800')
  })

  it('deve aplicar a variante danger', () => {
    render(<Badge variant="danger">Inativo</Badge>)
    const badge = screen.getByText('Inativo')
    expect(badge).toHaveClass('bg-red-100', 'text-red-800')
  })

  it('deve aplicar a variante warning', () => {
    render(<Badge variant="warning">Em Negociação</Badge>)
    const badge = screen.getByText('Em Negociação')
    expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800')
  })

  it('deve aplicar a variante info por padrão', () => {
    render(<Badge>Info</Badge>)
    const badge = screen.getByText('Info')
    expect(badge).toHaveClass('bg-blue-100', 'text-blue-800')
  })
})

