import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

const VALID_USER = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';
const LOCKED_USER = 'locked_out_user';

test.describe('Authentication', () => {
  test('should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASSWORD);
    await loginPage.expectLoginSuccess();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wronguser', 'wrongpass');
    await loginPage.expectLoginError('Username and password do not match');
  });

  test('should show error for locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(LOCKED_USER, VALID_PASSWORD);
    await loginPage.expectLoginError('Sorry, this user has been locked out');
  });
});

test.describe('Shopping', () => {
  test('should add product to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASSWORD);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.expectCartBadgeIs('1');
  });

  test('should logout after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASSWORD);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.logout();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});