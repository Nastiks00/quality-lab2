import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;
  readonly burgerMenu: Locator;
  readonly logoutLink: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    this.burgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.inventoryItems = page.locator('.inventory_item');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async addFirstProductToCart() {
    await this.page.locator('.btn_inventory').first().click();
  }

  async expectCartBadgeIs(count: string) {
    await expect(this.cartBadge).toHaveText(count);
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }
}