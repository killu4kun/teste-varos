import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../input'

describe('Input Component', () => {
  it('deve renderizar o input', () => {
    render(<Input placeholder="Digite aqui" />)
    expect(screen.getByPlaceholderText('Digite aqui')).toBeInTheDocument()
  })

  it('deve renderizar com label', () => {
    render(<Input label="Nome" />)
    expect(screen.getByText('Nome')).toBeInTheDocument()
  })

  it('deve exibir mensagem de erro', () => {
    render(<Input error="Campo obrigatório" />)
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument()
  })

  it('deve aplicar estilo de erro quando houver erro', () => {
    render(<Input error="Erro" data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toHaveClass('border-red-500')
  })

  it('deve permitir digitação', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Digite" />)
    
    const input = screen.getByPlaceholderText('Digite')
    await user.type(input, 'Teste')
    
    expect(input).toHaveValue('Teste')
  })

  it('deve chamar onChange quando o valor muda', async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()
    
    render(<Input onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    
    await user.type(input, 'a')
    expect(handleChange).toHaveBeenCalled()
  })
})

