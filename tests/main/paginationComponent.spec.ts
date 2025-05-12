import { test, expect } from '@playwright/test';
import { PaginationPage } from '../../pages/components/PaginationComponent';
import { allure } from 'allure-playwright';

test.describe('Pagination Component POM Tests', () => {
  let paginationPage: PaginationPage;

  test.beforeEach(async ({ page }) => {
    paginationPage = new PaginationPage(page);
    await page.goto('https://practicesoftwaretesting.com/');
  });

  test('should navigate to a specific page when page number is clicked', async ({ page }) => {
    allure.feature('Pagination');
    allure.label('severity', 'critical');
    allure.tag('pagination');
    allure.description('This test verifies that clicking on a specific page number navigates to that page.');

    await test.step('Navigate to page 3', async () => {
      await paginationPage.navigateToPage(3);
    });

    await test.step('Verify page 3 is active', async () => {
      expect(await paginationPage.getActivePage()).toBe('Page-3');
    });
  });

  test('should navigate to the next page when Next button is clicked', async ({ page }) => {
    allure.feature('Pagination');
    allure.label('severity', 'normal');
    allure.tag('pagination');
    allure.description('This test verifies that clicking the Next button navigates to the next page.');

    await test.step('Click on the Next button', async () => {
      await paginationPage.clickNext();
    });

    await test.step('Verify the next page is active', async () => {
      expect(await paginationPage.getActivePage()).toBe('Page-2');
    });
  });

  test('should navigate to the previous page when Previous button is clicked', async ({ page }) => {
    allure.feature('Pagination');
    allure.label('severity', 'normal');
    allure.tag('pagination');
    allure.description('This test verifies that clicking the Previous button navigates to the previous page.');

    await test.step('Navigate to page 2', async () => {
      await paginationPage.navigateToPage(2);
    });

    await test.step('Click on the Previous button', async () => {
      await paginationPage.clickPrevious();
    });

    await test.step('Verify the previous page is active', async () => {
      expect(await paginationPage.getActivePage()).toBe('Page-1');
    });
  });

  test('should disable Previous button on the first page', async ({ page }) => {
    allure.feature('Pagination');
    allure.label('severity', 'minor');
    allure.tag('pagination');
    allure.description('This test checks if the Previous button is disabled on the first page.');

    await test.step('Check if the Previous button is disabled on the first page', async () => {
      const isDisabled = await paginationPage.isPreviousDisabled();
      expect(isDisabled).toBe(false);
    });
  });

  test('should disable Next button on the last page', async ({ page }) => {
    allure.feature('Pagination');
    allure.label('severity', 'minor');
    allure.tag('pagination');
    allure.description('This test checks if the Next button is disabled on the last page.');

    await test.step('Navigate to the last page', async () => {
      await paginationPage.navigateToPage(5);
    });

    await test.step('Check if the Next button is disabled on the last page', async () => {
      const isDisabled = await paginationPage.isNextDisabled();
      expect(isDisabled).toBe(true);
    });
  });
}); 