import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    emailAddressField = () => this.page.locator(`[data-test="email"]`);
    passwordField = () => this.page.locator(`[data-test="password"]`);
    loginButton = () => this.page.locator(`[data-test="login-submit"]`);
    emailError = () => this.page.locator(`[data-test="email-error"]`)
    passwordError = () => this.page.locator(`[data-test="password-error"]`)
    errorMessage = () => this.page.locator(".alert.alert-danger");

    async goto() {
        await this.gotoLogin()
    }

    async login(email: string, password: string) {
       await this.emailAddressField().fill(email)
       await this.passwordField().fill(password)
       await this.loginButton().click()
    }

    async getEmailError(): Promise<string> {
        await this.emailError().waitFor({ state: 'visible' });
        return (await this.emailError().textContent()) ?? '';
    }

    async getPasswordError(): Promise<string> {
        await this.passwordError().waitFor({ state: 'visible' });
        return (await this.passwordError().textContent()) ?? '';
    }
}