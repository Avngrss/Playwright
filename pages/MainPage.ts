import { BasePage } from "./BasePage";



export class MainPage extends BasePage {

    languageLocator = () => this.page.locator('[data-test="nav-categories"]')
    minSliderSelector = '.ngx-slider-pointer-min';
    maxSliderSelector = '.ngx-slider-pointer-max';
    productsSelector = '.card';
    noProductsTextSelector = () => this.page.locator('[data-test="no-results"]');

    async goto() {
        await this.gotoHome()
    }

    async setRange(minValue: number, maxValue: number): Promise<void> {
        await this.page.evaluate(({ minSelector, minValue, maxSelector, maxValue }) => {
            const minSlider = document.querySelector(minSelector) as HTMLElement;
            minSlider.setAttribute('aria-valuenow', minValue.toString());
            minSlider.style.left = `${(minValue / 200) * 100}%`;
            const minEvent = new Event('change', { bubbles: true });
            minSlider.dispatchEvent(minEvent);

            const maxSlider = document.querySelector(maxSelector) as HTMLElement;
            maxSlider.setAttribute('aria-valuenow', maxValue.toString());
            maxSlider.style.left = `${(maxValue / 200) * 100}%`; 
            const maxEvent = new Event('change', { bubbles: true });
            maxSlider.dispatchEvent(maxEvent);
        }, {
            minSelector: this.minSliderSelector,
            minValue: minValue,
            maxSelector: this.maxSliderSelector,
            maxValue: maxValue
        });

        await Promise.race([
            this.page.waitForSelector(this.productsSelector),
            this.noProductsTextSelector().waitFor()
        ]);
    }

    async getProductsCount(): Promise<number> {
        const products = await this.page.locator(this.productsSelector).all();
        return products.length;
    }

    async isNoProductsTextVisible(): Promise<boolean> {
        return await this.noProductsTextSelector().isVisible();
    }
}