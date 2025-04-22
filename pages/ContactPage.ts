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

    async submitContactForm(firstName: string, lastName: string, email: string, subject: string, text: string, filePath?: string | null) {
        await this.firstNameField().fill(firstName)
        await this.lastNameField().fill(lastName)
        await this.emailField().fill(email)
        await this.subjectSelect().selectOption(subject)
        await this.messageTextArea().fill(text)
        if (filePath) {
            await this.attachmentFiled().setInputFiles(filePath);
        }
        await this.contactSubmitBtn().click()
    }


    async verifyFieldError(field: string, expectedError: string) {
        const errorLocator = this.page.locator(`[data-test="${field}"]`)
        await expect(errorLocator).toBeVisible()
        await expect(errorLocator).toHaveText(expectedError)
    }
}