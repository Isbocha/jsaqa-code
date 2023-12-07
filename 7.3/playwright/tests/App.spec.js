const { test, expect } = require("@playwright/test");
const user = require('../user');

test.beforeEach(async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
});

test("successful authorization", async ({ page }) => {
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', user(validLogin));
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', user(validPassword));
  await page.click('[data-testid="login-submit-btn"]');
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://netology.ru/profile' }*/),
    page.click('[data-testid="login-submit-btn"]')
     ]);
  await expect(
    page.getByRole('[data-testid="profile-programs-content"] >> text=Моё обучение')
  ).toBeVisible({ timeout: 10000 });
 });

 test("failed authorization", async ({ page }) => {
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', user(invalidLogin));
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', user(invalidPassword));
  await page.click('[data-testid="login-submit-btn"]');
  await expect(
    page.getByRole('[data-testid="login-error-hint"] >> text=Вы ввели неправильно логин или пароль')
  ).toBeVisible({ timeout: 10000 });
  });
