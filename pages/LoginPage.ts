import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    emailAdressField = () => this.page.locator(`[data-test="email"]`);
    passwordField = () => this.page.locator(`[data-test="password"]`);
    loginButton = () => this.page.locator(`[data-test="login-submit"]`);
    emailError = () => this.page.locator(`[data-test="email-error"]`)
    passwordError = () => this.page.locator(`[data-test="password-error"]`)
    errorMessage = () => this.page.locator("alert.alert-danger");

    async goto() {
        await this.gotoLogin()
    }

    async login(email: string, password: string) {
        this.emailAdressField().fill(email)
        this.passwordField().fill(password)
        this.loginButton().click()
    }

    async getEmailError(): Promise<string> {
        return await this.emailError().textContent() ?? '';
    }

    async getPasswordError(): Promise<string> {
        return await this.passwordError().textContent() ?? '';
    }

    async getGlobalError(): Promise<string> {
        return await this.errorMessage().textContent() ?? '';
    }
}