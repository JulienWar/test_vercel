// e2e/navigation.spec.ts
import { test, expect } from '@playwright/test'

test('la navigation affiche les 4 liens', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: /accueil/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /à propos/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /services/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /contact/i })).toBeVisible()
})

test('la navigation vers À propos fonctionne', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /à propos/i }).first().click()
  await expect(page).toHaveURL('/a-propos')
})

test('la navigation vers Services fonctionne', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /services/i }).first().click()
  await expect(page).toHaveURL('/services')
})

test('la navigation vers Contact fonctionne', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /contact/i }).first().click()
  await expect(page).toHaveURL('/contact')
})
