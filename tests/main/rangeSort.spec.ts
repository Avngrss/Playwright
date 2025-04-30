import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';
import { allure } from 'allure-playwright';

test.describe('Check display range input items', () => {
    let mainPage: MainPage;
    
    test.beforeEach(async({page}) => {
        mainPage = new MainPage(page);
        await mainPage.gotoHome(); 
    })

    test('Range from 1 to 100', async () => {
        allure.feature('Range sort');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Set range from 1 to 100 and display items');

        await test.step("Set range from 1 to 100", async () => {
            await mainPage.setRange(1, 100);
        })
        
        const productsCount = await mainPage.getProductsCount();
        expect(productsCount).toBeGreaterThan(0);
    });

    test('Range from 100 to 200', async () => {
        allure.feature('Range sort');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Set range from 100 to 200 and display items');

        await test.step("Set range from 100 to 200", async () => {
            await mainPage.setRange(100, 200);
        })

        const productsCount = await mainPage.getProductsCount();
        expect(productsCount).toBeGreaterThan(0);
    });

    test('Range from 1 to 200', async () => {
        allure.feature('Range sort');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Set range from 1 to 200 and display items');

        await test.step("Set range from 1 to 200", async () => {
            await mainPage.setRange(1, 200);
        })

        const productsCount = await mainPage.getProductsCount();
        expect(productsCount).toBeGreaterThan(0);
    });

    test('Range from 2 to 1', async () => {
        allure.feature('Range sort');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Set range from 2 to 1 and display items');

        await test.step("Set range from 2 to 1", async () => {
            await mainPage.setRange(2, 1);
        })

        await test.step("Wait for the text will be visible", async () => {
            await mainPage.noProductsTextSelector().waitFor({ state: 'visible', timeout: 10000 });
        })

        const isNoProductsTextVisible = await mainPage.isNoProductsTextVisible();

        await test.step("Wait for the text is as expected", async () => {
            expect(isNoProductsTextVisible).toBe(true);
        })       
    });
});