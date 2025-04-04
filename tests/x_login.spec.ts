import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LoginPage } from "../pages/LoginPage";

test.describe("Login tests", () => {
    let loginPage: LoginPage;

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.goto()
    })

    test("Should login in the application witch the right credential", async ({page}) => {
        const userDataPath = path.join(__dirname, '../fixtures/userData.json')
        const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf8'))
        const { email, password } = userData;
        await loginPage.login(email, password);
        await expect(page).toHaveURL('https://practicesoftwaretesting.com/account')
    })

    test("Should show error when both fields are empty", async () => {
        await loginPage.login('', '');
        expect(await loginPage.getEmailError()).toContain('Email is required');
        expect(await loginPage.getPasswordError()).toContain('Password is required');
    })

    test("Should show error when email field is empty", async () => {
        await loginPage.login('', 'validPassword');
        expect(await loginPage.getEmailError()).toContain('Email is required');
    })

    test("Should show error when password field is empty", async () => {
        await loginPage.login('validEmail@gmail.com', '');
        expect(await loginPage.getPasswordError()).toContain('Password is required');
    })
})