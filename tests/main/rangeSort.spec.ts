import { test } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';
import { allure } from 'allure-playwright';

test.describe('Check display range input items', () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.goto();
    });

    test('Range from 1 to 100', async () => {
        allure.feature('Range sort');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Set range from 1 to 100 and display items');

        await test.step("Set range from 1 to 100", async () => {
            await mainPage.setRange(1, 100);
        });

        await test.step('Assert products count is greater than zero', async () => {
            await mainPage.assertProductsCountGreaterThanZero();
        }); 
    });

    test('Range from 100 to 200', async () => {
        allure.feature('Range sort');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Set range from 100 to 200 and display items');

        await test.step("Set range from 100 to 200", async () => {
            await mainPage.setRange(100, 200);
        });

        await test.step('Assert products count is greater than zero', async () => {
            await mainPage.assertProductsCountGreaterThanZero();
        });
    });

    test('Range from 1 to 200', async () => {
        allure.feature('Range sort');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Set range from 1 to 200 and display items');

        await test.step("Set range from 1 to 200", async () => {
            await mainPage.setRange(1, 200);
        });

        await test.step('Assert products count is greater than zero', async () => {
            await mainPage.assertProductsCountGreaterThanZero();
        });
    });

    test('Range from 0 to 1', async () => {
        allure.feature('Range sort');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Set range from 0 to 1 and display no products message');

        await test.step("Set range from 0 to 1", async () => {
            await mainPage.setRange(0, 1);
        });

        await test.step('Assert no products text is visible', async () => {
            await mainPage.isNoProductsTextVisible();
        }); 
    });
});