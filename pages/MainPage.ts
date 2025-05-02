import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MainPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    languageLocator = (): Locator => this.page.locator('[data-test="nav-categories"]');
    minSliderSelector = (): Locator => this.page.locator('.ngx-slider-pointer-min');
    maxSliderSelector = (): Locator => this.page.locator('.ngx-slider-pointer-max');
    productsSelector = (): Locator => this.page.locator('.card'); 
    noProductsTextSelector = (): Locator => this.page.locator('[data-test="no-results"]'); 
    searchInputSelector = (): Locator => this.page.locator(`[data-test="search-query"]`);
    searchButtonSelector = (): Locator => this.page.locator(`[data-test="search-submit"]`);
    resetButtonSelector = (): Locator => this.page.locator(`[data-test="search-reset"]`);

    async goto(): Promise<void> {
        await this.gotoHome();
    }

    async setRange(minValue: number, maxValue: number): Promise<void> {
        await this.page.evaluate(({ minSelector, maxSelector, minValue, maxValue }) => {
            const minSlider = document.querySelector(minSelector) as HTMLElement;
            minSlider.setAttribute('aria-valuenow', minValue.toString());
            minSlider.style.left = `${(minValue / 200) * 100}%`;
            const minEvent = new Event('input', { bubbles: true });
            minSlider.dispatchEvent(minEvent);
            const minChangeEvent = new Event('change', { bubbles: true });
            minSlider.dispatchEvent(minChangeEvent);

            const maxSlider = document.querySelector(maxSelector) as HTMLElement;
            maxSlider.setAttribute('aria-valuenow', maxValue.toString());
            maxSlider.style.left = `${(maxValue / 200) * 100}%`;
            const maxEvent = new Event('input', { bubbles: true });
            maxSlider.dispatchEvent(maxEvent);
            const maxChangeEvent = new Event('change', { bubbles: true });
            maxSlider.dispatchEvent(maxChangeEvent);
        }, {
            minSelector: this.minSliderSelector().toString(),
            maxSelector: this.maxSliderSelector().toString(),
            minValue: minValue,
            maxValue: maxValue
        });

        await Promise.race([
            this.page.waitForSelector('.card'),
            this.page.waitForSelector('[data-test="no-results"]')
        ]);
    }

    async getProductsCount(): Promise<number> {
        const products = await this.productsSelector().all();
        return products.length;
    }

    async isNoProductsTextVisible(): Promise<boolean> {
        return await this.noProductsTextSelector().isVisible();
    }

    async assertProductsCountGreaterThanZero(): Promise<void> {
        const productsCount = await this.getProductsCount();
        if (productsCount <= 0) {
            throw new Error(`Expected products count to be greater than 0, but got ${productsCount}`);
        }
    }

    async searchForItem(query: string): Promise<void> {
        await this.searchInputSelector().fill(query);
        await this.searchButtonSelector().click();
        await this.page.waitForSelector('.card');
    }

    async clearSearchInput(): Promise<void> {
        await this.resetButtonSelector().click();
        await this.page.waitForFunction(() => {
            const input = document.querySelector('#search-query') as HTMLInputElement;
            return input ? input.value === '' : false;
        });
    }

    async assertSearchInputIsEmpty(): Promise<void> {
        const inputValue = await this.page.evaluate(() => {
            const input = document.querySelector('#search-query') as HTMLInputElement;
            return input ? input.value : null;
        });
        if (inputValue !== '') {
            throw new Error('Expected search input to be empty');
        }
    }
}
