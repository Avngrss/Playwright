import { Page } from "@playwright/test"

export class HeaderComponent {
    private page: Page;
    languageSelector = () => this.page.locator(`[data-test="language-select"]`)

    constructor(page: Page) {
        this.page = page
    }

    async selectLanguage(langCode: string) {
        await this.languageSelector().click()
        const normalizeCode = langCode.toLocaleLowerCase()
        const langItem = this.page.locator(`[data-test="lang-${normalizeCode}"]`)
        await langItem.click()
    }
}