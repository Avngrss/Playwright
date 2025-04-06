import { expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {
  //Locators
  firstNameField = () => this.page.locator(`[data-test="first-name"]`);
  lastNameField = () => this.page.locator(`[data-test="last-name"]`);
  dateOfBirthdayFiled = () => this.page.locator(`[data-test="dob"]`);
  streetField = () => this.page.locator(`[data-test="street"]`);
  postCodeField = () => this.page.locator(`[data-test="postal_code"]`);
  cityField = () => this.page.locator(`[data-test="city"]`);
  stateField = () => this.page.locator(`[data-test="state"]`);
  countryField = () => this.page.locator(`[data-test="country"]`);
  phoneField = () => this.page.locator(`[data-test="phone"]`);
  emailField = () => this.page.locator(`[data-test="email"]`);
  passwordField = () => this.page.locator(`[data-test="password"]`);
  registerButton = () => this.page.locator(`[data-test="register-submit"]`);
  //Error locators
  errorPassword = () => this.page.locator(`[data-test="password-error"] div`).first()
  existedUser = () => this.page.locator(`.help-block`);

  //Actions
  async goto() {
    await this.gotoRegister();
  }

  async registerNewUser(email: string, password: string) {
    await this.firstNameField().fill("TestUser");
    await this.lastNameField().fill("TestLastName");
    await this.dateOfBirthdayFiled().fill("2000-04-03");
    await this.streetField().fill("My street 22");
    await this.postCodeField().fill("223456");
    await this.cityField().fill("Moscow");
    await this.stateField().fill("Alaska")
    await this.countryField().selectOption("Aruba");
    await this.phoneField().fill("324534");
    await this.emailField().fill(email);
    await this.passwordField().fill(password);
    await this.registerButton().click();
  }

  async displayError(selector: Locator, expectedText: string) {
    await expect(selector).toBeVisible()
    await expect(selector).toHaveText(expectedText)
  }
}
