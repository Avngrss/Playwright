import { test, expect } from '@playwright/test';
import { ContactPage } from '../../pages/ContactPage';
import { allure } from 'allure-playwright';
import path from 'path';


test.describe("Submit contact form", () => {
    let contactPage: ContactPage;

    test.beforeEach(async ({page}) => {
        contactPage = new ContactPage(page)
        await contactPage.gotoContact()
    });

    test("Successful submit contact form", async () => {
        allure.feature('Submit contact form');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Submit the contact form with valid fields');

        const filePath = path.resolve(__dirname, '../../test-data/txt.txt')

        await test.step("Fill and submit Contact form with valid data", async () => {
            await contactPage.submitContactForm('TheUser', 'LastUserName', 'testemail@gmail.com', 'Return', 'Unde repellendus reiciendis quaerat minus dolores cupiditate necessitatibus omnis.', filePath)
        })

        await test.step("Verify successful message is visibled", async () => {
            await expect(contactPage.successMessage()).toBeVisible()
        })

        await test.step("Verify successful message contains the nessery text", async () => {
            await expect(contactPage.successMessage()).toHaveText('Thanks for your message! We will contact you shortly.')
        })        
    })

    test("Unsuccessful submit the empty form", async () => {
        allure.feature('Submit contact form');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Submit the contact form with empty fields');

        await test.step("Fill and submit Contact form by empty data", async () => {
            await contactPage.submitContactForm('', '', '', '', '')
        })

        await test.step("Verify Firts name field error", async () => {
            await contactPage.verifyFieldError('first-name-error', 'First name is required')
        })

        await test.step("Verify Last name field error", async () => {
            await contactPage.verifyFieldError('last-name-error', 'Last name is required')
        })
       
        await test.step("Verify Email field error", async () => {
            await contactPage.verifyFieldError('email-error', 'Email is required')
        })

        await test.step("Verify Subject field error", async () => {
            await contactPage.verifyFieldError('subject-error', 'Subject is required')
        })
        
        await test.step("Verify Message field error", async () => {
            await contactPage.verifyFieldError('message-error', 'Message is required')
        })     
    })
})