import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from '../modal'

describe('Modal Component', () => {
  it('não deve renderizar quando isOpen=false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Conteúdo do Modal</div>
      </Modal>
    )
    
    expect(screen.queryByText('Conteúdo do Modal')).not.toBeInTheDocument()
  })

  it('deve renderizar quando isOpen=true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Conteúdo do Modal</div>
      </Modal>
    )
    
    expect(screen.getByText('Conteúdo do Modal')).toBeInTheDocument()
  })

  it('deve chamar onClose ao clicar no overlay', async () => {
    const handleClose = jest.fn()
    const user = userEvent.setup()
    
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Conteúdo</div>
      </Modal>
    )
    
    const overlay = screen.getByText('Conteúdo').parentElement?.parentElement
    if (overlay) {
      await user.click(overlay)
      expect(handleClose).toHaveBeenCalledTimes(1)
    }
  })

  it('não deve chamar onClose ao clicar no conteúdo', async () => {
    const handleClose = jest.fn()
    const user = userEvent.setup()
    
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Conteúdo</div>
      </Modal>
    )
    
    await user.click(screen.getByText('Conteúdo'))
    expect(handleClose).not.toHaveBeenCalled()
  })
})

