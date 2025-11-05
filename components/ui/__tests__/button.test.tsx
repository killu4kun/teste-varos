import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../button'

describe('Button Component', () => {
  it('deve renderizar o botão com texto', () => {
    render(<Button>Clique aqui</Button>)
    expect(screen.getByText('Clique aqui')).toBeInTheDocument()
  })

  it('deve aplicar a variante primary por padrão', () => {
    render(<Button>Botão</Button>)
    const button = screen.getByText('Botão')
    expect(button).toHaveClass('bg-blue-600')
  })

  it('deve aplicar a variante danger quando especificada', () => {
    render(<Button variant="danger">Excluir</Button>)
    const button = screen.getByText('Excluir')
    expect(button).toHaveClass('bg-red-600')
  })

  it('deve chamar onClick quando clicado', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Clique</Button>)
    await user.click(screen.getByText('Clique'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('deve estar desabilitado quando disabled=true', () => {
    render(<Button disabled>Desabilitado</Button>)
    const button = screen.getByText('Desabilitado')
    expect(button).toBeDisabled()
  })

  it('deve aplicar tamanho small', () => {
    render(<Button size="sm">Pequeno</Button>)
    const button = screen.getByText('Pequeno')
    expect(button).toHaveClass('px-3', 'py-1.5')
  })

  it('deve aplicar tamanho large', () => {
    render(<Button size="lg">Grande</Button>)
    const button = screen.getByText('Grande')
    expect(button).toHaveClass('px-6', 'py-3')
  })
})

