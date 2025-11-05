/**
 * Testes para funções de formatação
 */

describe('Formatadores', () => {
  describe('Formatação de moeda', () => {
    it('deve formatar valores em reais', () => {
      const value = 1500.50
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value)
      
      expect(formatted).toContain('1.500,50')
      expect(formatted).toContain('R$')
    })

    it('deve formatar valores grandes', () => {
      const value = 1000000
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value)
      
      expect(formatted).toContain('1.000.000,00')
      expect(formatted).toContain('R$')
    })

    it('deve formatar zero', () => {
      const value = 0
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value)
      
      expect(formatted).toContain('0,00')
      expect(formatted).toContain('R$')
    })
  })

  describe('Formatação de data', () => {
    it('deve formatar data em português', () => {
      const date = new Date('2024-05-08T08:20:00')
      const formatted = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date)
      
      expect(formatted).toContain('08/05/2024')
      expect(formatted).toContain('08:20')
    })
  })
})

