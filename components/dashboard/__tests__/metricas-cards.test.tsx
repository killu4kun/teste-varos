import { render, screen } from '@testing-library/react'
import { MetricasCards } from '../metricas-cards'

describe('MetricasCards Component', () => {
  const mockProps = {
    totalClientes: 128,
    clientesAtivos: 95,
    totalValor: 450000,
    totalConsultores: 10,
  }

  it('deve renderizar todos os cards de métricas', () => {
    render(<MetricasCards {...mockProps} />)
    
    expect(screen.getByText('Total de Clientes')).toBeInTheDocument()
    expect(screen.getByText('Clientes Ativos')).toBeInTheDocument()
    expect(screen.getByText('Valor Total')).toBeInTheDocument()
    expect(screen.getByText('Consultores')).toBeInTheDocument()
  })

  it('deve exibir o número correto de clientes', () => {
    render(<MetricasCards {...mockProps} />)
    expect(screen.getByText('128')).toBeInTheDocument()
  })

  it('deve exibir o número correto de clientes ativos', () => {
    render(<MetricasCards {...mockProps} />)
    expect(screen.getByText('95')).toBeInTheDocument()
  })

  it('deve formatar o valor total como moeda', () => {
    render(<MetricasCards {...mockProps} />)
    expect(screen.getByText(/R\$/)).toBeInTheDocument()
  })

  it('deve exibir o número correto de consultores', () => {
    render(<MetricasCards {...mockProps} />)
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('deve renderizar com valores zerados', () => {
    const zeroProps = {
      totalClientes: 0,
      clientesAtivos: 0,
      totalValor: 0,
      totalConsultores: 0,
    }

    render(<MetricasCards {...zeroProps} />)
    expect(screen.getAllByText('0')).toHaveLength(3) // 3 cards com número 0
  })
})

