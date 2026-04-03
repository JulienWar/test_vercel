// e2e/contact.spec.ts
import { test, expect } from '@playwright/test'

test('le formulaire de contact est visible', async ({ page }) => {
  await page.goto('/contact')
  await expect(page.getByLabel('Nom')).toBeVisible()
  await expect(page.getByLabel('Email')).toBeVisible()
  await expect(page.getByLabel('Message')).toBeVisible()
  await expect(page.getByRole('button', { name: /envoyer/i })).toBeVisible()
})

test('le formulaire valide les champs requis', async ({ page }) => {
  await page.goto('/contact')
  await page.getByRole('button', { name: /envoyer/i }).click()
  // Le navigateur bloque la soumission avec les champs vides (required)
  await expect(page).toHaveURL('/contact')
})
