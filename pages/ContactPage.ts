import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";


enum ContactFormField { 
    FirstName = 'first-name',
    LastName = 'last-name',
    Email = 'email',
    Message = 'message',
    Subject = 'subject'
}

export class ContactPage extends BasePage {

    firstNameField = () => this.page.locator(`[data-test="first-name"]`)
    lastNameField = () => this.page.locator(`[data-test="last-name"]`)
    emailField = () => this.page.locator(`[data-test="email"]`)
    subjectSelect = () => this.page.locator(`[data-test="subject"]`)
    messageTextArea = () => this.page.locator(`[data-test="message"]`)
    attachmentFiled = () => this.page.locator(`[data-test="attachment"]`)
    contactSubmitBtn = () => this.page.locator(`[data-test="contact-submit"]`)


    async goto() {
        await this.gotoContact()
    }

    async submitContactForm() {
        await this.firstNameField().fill('')
        await this.lastNameField().fill('')
        await this.emailField().fill('')
        await this.subjectSelect().selectOption('')
        await this.messageTextArea().fill('')
        await this.contactSubmitBtn().click()
    }

    async verifyFieldError(field: string, expectedError: string) {
        const errorLocator = this.page.locator(`[data-test="${field}"]`)
        await expect(errorLocator).toBeVisible()
        await expect(errorLocator).toHaveText(expectedError)
    }
}