import { render, screen, fireEvent } from '@testing-library/react'
import Button from '@/components/ui/Button'

describe('Button', () => {
  it('affiche son label', () => {
    render(<Button>Envoyer</Button>)
    expect(screen.getByRole('button', { name: 'Envoyer' })).toBeInTheDocument()
  })

  it('appelle onClick au clic', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Cliquer</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('est désactivé quand disabled=true', () => {
    render(<Button disabled>Désactivé</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('rend un lien quand href est fourni', () => {
    render(<Button href="/contact">Lien</Button>)
    expect(screen.getByRole('link', { name: 'Lien' })).toHaveAttribute('href', '/contact')
  })
})
