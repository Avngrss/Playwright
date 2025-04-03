import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage{
   
    firstNameField = () => this.page.locator(`[data-test="first-name"]`)
    lastNameField = () => this.page.locator(`[data-test="last-name"]`)
    dateOfBirthdayFiled = () => this.page.locator(`[data-test="dob"]`)
    streetField = () => this.page.locator(`[data-test="street"]`)
    postCodeField = () => this.page.locator(`[data-test="postal_code"]`)
    cityField = () => this.page.locator(`[data-test="city"]`)
    stateField = () => this.page.locator(`[data-test="state"]`)
    countryField = () => this.page.locator(`[data-test="country"]`)
    phoneField = () => this.page.locator(`[data-test="phone"]`)
    emailField = () => this.page.locator(`[data-test="email"]`)
    passwordField = () => this.page.locator(`[data-test="password"]`)
    registerButton = () => this.page.locator(`[data-test="register-submit"]`)
    errorPassword = () => this.page.locator(`[data-test="password-error"]`)

    async goto() {
        await this.gotoRegister()
    }
}

