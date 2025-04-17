import { test, expect } from '@playwright/test';
import { ContactPage } from '../../pages/ContactPage';


test.describe("Submit contact form", () => {
    let contactPage: ContactPage;

    test.beforeEach(async ({page}) => {
        contactPage = new ContactPage(page)
        await contactPage.gotoContact()
    });

    test("Successful submit contact form", async ({page}) => {
        await contactPage.submitContactForm()
        await expect(contactPage.successMessage()).toBeVisible()
        await expect(contactPage.successMessage()).toHaveText('Thanks for your message! We will contact you shortly.')
    })
})