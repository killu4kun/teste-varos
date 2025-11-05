import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardContent, CardTitle } from '../card'

describe('Card Components', () => {
  it('deve renderizar o Card com conteúdo', () => {
    render(
      <Card>
        <div>Conteúdo do Card</div>
      </Card>
    )
    expect(screen.getByText('Conteúdo do Card')).toBeInTheDocument()
  })

  it('deve renderizar CardHeader', () => {
    render(
      <CardHeader>
        <div>Header</div>
      </CardHeader>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
  })

  it('deve renderizar CardContent', () => {
    render(
      <CardContent>
        <div>Content</div>
      </CardContent>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('deve renderizar CardTitle', () => {
    render(<CardTitle>Título</CardTitle>)
    expect(screen.getByText('Título')).toBeInTheDocument()
  })

  it('deve renderizar Card completo', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Título do Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo do card</p>
        </CardContent>
      </Card>
    )
    
    expect(screen.getByText('Título do Card')).toBeInTheDocument()
    expect(screen.getByText('Conteúdo do card')).toBeInTheDocument()
  })
})

