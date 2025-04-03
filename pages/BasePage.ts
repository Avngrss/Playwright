import { Page } from "@playwright/test";
import { routes } from "../config/routes";

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(path: string) {
        await this.page.goto(path)
    }

    async gotoHome() {
        await this.page.goto(routes.home)
    }

    async gotoLogin() {
        await this.page.goto(routes.login)
    }

    async gotoRegister() {
        await this.page.goto(routes.register)
    }
}