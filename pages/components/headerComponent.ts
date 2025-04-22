import { Page } from "@playwright/test"

export class HeaderComponent {
    private page: Page;
    languageSelector = () => this.page.locator(`[data-test="language-select"]`)
    homeLink = () => this.page.locator(`[data-test="nav-home"]`)
    contactLink = () => this.page.locator(`[data-test="nav-contact"]`)
    signInLink = () => this.page.locator(`[data-test="nav-sign-in"]`)
    categoriesDropdown = () => this.page.locator(`[data-test="nav-categories"]`)

    constructor(page: Page) {
        this.page = page
    }

    async selectLanguage(langCode: string) {
        await this.languageSelector().click()
        const normalizeCode = langCode.toLocaleLowerCase()
        const langItem = this.page.locator(`[data-test="lang-${normalizeCode}"]`)
        await langItem.click()
    }

    async openCategoriesDropdown() {
        await this.categoriesDropdown().click();
    }

    categoryLink = (category: string) => this.page.locator(`[data-test="nav-${category.toLowerCase()}"]`);
}