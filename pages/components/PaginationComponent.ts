import { Page } from '@playwright/test';

export class PaginationPage {
  constructor(private page: Page) {}

  async navigateToPage(pageNumber: number) {
    await this.page.click(`a[aria-label="Page-${pageNumber}"]`);
  }

  async clickNext() {
    await this.page.click('a[aria-label="Next"]');
  }

  async clickPrevious() {
    await this.page.click('a[aria-label="Previous"]');
  }

  async isPreviousDisabled(): Promise<boolean> {
    return await this.page.locator('li.page-item.disabled a[aria-label="Previous"]').isVisible();
  }

  async isNextDisabled(): Promise<boolean> {
    return await this.page.locator('li.page-item.disabled a[aria-label="Next"]').isVisible();
  }

  async getActivePage(): Promise<string> {
    return (await this.page.locator('li.page-item.active a').getAttribute('aria-label')) ?? '';
  }
} 