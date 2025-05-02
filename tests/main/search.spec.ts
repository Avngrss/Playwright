import { allure } from 'allure-playwright';
import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';


test.describe('Check search functionality', () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.goto();
    });

    test('Search for existing item', async () => {
        allure.feature('Search');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Search for an existing item and display items');

        await test.step("Search for 'Hammer'", async () => {
            await mainPage.searchForItem('Hammer');
        });

        await test.step('Assert products count is greater than zero', async () => {
            await mainPage.assertProductsCountGreaterThanZero();
        });
    });

    test('Search for non-existing item', async () => {
        allure.feature('Search');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Search for a non-existing item and display no products message');

        await test.step("Search for 'NonExistingItem'", async () => {
            await mainPage.searchForItem('NonExistingItem');
        });

        await test.step('Assert no products text is visible', async () => {
            await mainPage.isNoProductsTextVisible();
        });
    });

    test('Clear search input', async () => {
        allure.feature('Search');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Clear the search input and verify it is empty');

        await test.step("Enter search query 'Hammer'", async () => {
            await mainPage.searchInputSelector().fill('Hammer');
        });

        await test.step('Clear the search input', async () => {
            await mainPage.clearSearchInput();
        });

        await test.step('Assert search input is empty', async () => {
            await mainPage.assertSearchInputIsEmpty();
        });
    });
});
