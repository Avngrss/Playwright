import { BasePage } from '../BasePage'

export class HeaderComponent extends BasePage{

    languageSelector = () => this.page.locator('#language')

    async selectLanguage(langCode: string) {
        await this.languageSelector().selectOption(langCode)
    }
}