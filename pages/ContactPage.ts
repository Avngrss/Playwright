import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";



export class ContactPage extends BasePage {

    firstNameField = () => this.page.locator(`[data-test="first-name"]`)
    lastNameField = () => this.page.locator(`[data-test="last-name"]`)
    emailField = () => this.page.locator(`[data-test="email"]`)
    subjectSelect = () => this.page.locator(`[data-test="subject"]`)
    messageTextArea = () => this.page.locator(`[data-test="message"]`)
    attachmentFiled = () => this.page.locator(`[data-test="attachment"]`)
    contactSubmitBtn = () => this.page.locator(`[data-test="contact-submit"]`)
    successMessage = () => this.page.getByRole('alert')


    async goto() {
        await this.gotoContact()
    }

    async submitContactForm() {
        await this.firstNameField().fill('asd')
        await this.lastNameField().fill('asdasd')
        await this.emailField().fill('test111@gmail.com')
        await this.subjectSelect().selectOption('Return')
        await this.messageTextArea().fill('Veniam sed iure quaerat. Ipsa natus sint possimus libero deserunt deserunt dolore cupiditate. Mollitia eaque aperiam.')
        await this.contactSubmitBtn().click()
        console.log(`${this.contactSubmitBtn()} was clicked`)
    }


    async verifyFieldError(field: string, expectedError: string) {
        const errorLocator = this.page.locator(`[data-test="${field}"]`)
        await expect(errorLocator).toBeVisible()
        await expect(errorLocator).toHaveText(expectedError)
    }
}