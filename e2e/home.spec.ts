// e2e/home.spec.ts
import { test, expect } from '@playwright/test'

test('la page Home se charge sans erreur', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/.+/)
  // Pas d'erreur console critique
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  await page.waitForLoadState('networkidle')
  // On tolère les erreurs réseau Sanity (pas configuré en local)
  const fatalErrors = errors.filter(e => !e.includes('sanity') && !e.includes('fetch'))
  expect(fatalErrors).toHaveLength(0)
})
