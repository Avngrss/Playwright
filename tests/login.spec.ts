import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";

test.describe("Login tests", () => {
    test.beforeEach(async({page}) => {
        const loginPage = new LoginPage(page)
        loginPage.goto()
    })

    test("Should show error when bouth fields are empty", async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('', '');
        expect(await loginPage.getEmailError()).toContain('Email is required');
        expect(await loginPage.getPasswordError()).toContain('Password is required');
    })

    test("Should show error when email field is empty", async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('', 'validPassword');
        expect(await loginPage.getEmailError()).toContain('Email is required');
    })

    test("Should show error when password field is empty", async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('validEmail@gmail.com', '');
        expect(await loginPage.getPasswordError()).toContain('Password is required');
    })
})