import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage';

test('Handle errors', async ({page}) => {
    const contactPage = new ContactPage(page)
    await contactPage.goto()

    await contactPage.submitContactForm()
    await contactPage.verifyFieldError('first-name-error', 'First name is required')
})