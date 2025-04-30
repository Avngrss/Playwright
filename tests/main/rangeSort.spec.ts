import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage'

test.describe('Проверка товаров с использованием диапазона', () => {
    test('Диапазон 1-100', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.goto();
        await mainPage.setRange(1, 100);

        const productsCount = await mainPage.getProductsCount();
        expect(productsCount).toBeGreaterThan(0);
        console.log(`Количество товаров для диапазона 1-100: ${productsCount}`);
    });

    test('Диапазон 100-200', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.goto();
        await mainPage.setRange(100, 200);

        const productsCount = await mainPage.getProductsCount();
        expect(productsCount).toBeGreaterThan(0);
        console.log(`Количество товаров для диапазона 100-200: ${productsCount}`);
    });

    test('Диапазон 1-200', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.goto();
        await mainPage.setRange(1, 200);

        const productsCount = await mainPage.getProductsCount();
        expect(productsCount).toBeGreaterThan(0);
        console.log(`Количество товаров для диапазона 1-200: ${productsCount}`);
    });

    test('Диапазон 0-1', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.goto();
        await mainPage.setRange(1, 2);

        // Дополнительное ожидание, чтобы убедиться, что текст появился
        await mainPage.noProductsTextSelector().waitFor({ state: 'visible', timeout: 10000 });

        const isNoProductsTextVisible = await mainPage.isNoProductsTextVisible();
        expect(isNoProductsTextVisible).toBe(true);
        console.log('Текст "There are no products found" отображается.');
    });
});