import { BasePage } from "./BasePage";



export class MainPage extends BasePage {

    languageLocator = () => this.page.locator('[data-test="nav-categories"]')

    async goto() {
        await this.gotoHome()
    }
}