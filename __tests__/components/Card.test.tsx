import { render, screen } from '@testing-library/react'
import Card from '@/components/ui/Card'

describe('Card', () => {
  it('affiche le titre et la description', () => {
    render(<Card title="Service" description="Description du service" />)
    expect(screen.getByText('Service')).toBeInTheDocument()
    expect(screen.getByText('Description du service')).toBeInTheDocument()
  })

  it('affiche les enfants quand fournis', () => {
    render(<Card title="T" description="D"><span>CTA</span></Card>)
    expect(screen.getByText('CTA')).toBeInTheDocument()
  })

  it('affiche l\'icône quand fournie', () => {
    render(<Card title="T" description="D" icon={<span data-testid="icon">★</span>} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
