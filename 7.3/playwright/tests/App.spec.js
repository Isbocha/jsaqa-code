const { test, expect } = require("@playwright/test");
const user = require('../user');

test.beforeEach(async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
});


test("successful authorization", async ({ page }) => {
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', user.validLogin);
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', user.invalidPassword);
  await page.click('[data-testid="login-submit-btn"]');
  await expect(page.locator('[data-testid="profile-programs-content"] >> text=Моё обучение').isVisible);
  await page.screenshot({ path: './screenshots/Success.png' });
  });


 test("failed authorization", async ({ page }) => {
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', user.invalidLogin);
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', user.invalidPassword);
  await page.click('[data-testid="login-submit-btn"]');
  await expect(page.locator('Вы ввели неправильно логин или пароль').isVisible);
  await page.screenshot({ path: './screenshots/Fail.png' });
  });


