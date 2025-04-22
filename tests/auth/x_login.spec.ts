import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LoginPage } from "../../pages/LoginPage";
import { allure } from 'allure-playwright';

test.describe("Login tests", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test("Should login successfully with valid credentials", async ({ page }) => {
        allure.feature('Login');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Logs in with a valid email and password from userData.json. Expects redirect to account page.');

        const userDataPath = path.join(__dirname, '../../fixtures/userData.json');
        const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
        const { email, password } = userData;

        await test.step('Submit login form with valid credentials', async () => {
            await loginPage.login(email, password);
        });

        await test.step('Verify redirect to account page', async () => {
            await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
        });
    });

    test("Should show errors when both email and password are empty", async () => {
        allure.feature('Login');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Attempts login with empty email and password. Expects validation error messages.');

        await test.step('Attempt to login with empty fields', async () => {
            await loginPage.login('', '');
        });

        await test.step('Check for email and password error messages', async () => {
            expect(await loginPage.getEmailError()).toContain('Email is required');
            expect(await loginPage.getPasswordError()).toContain('Password is required');
        });
    });

    test("Should show error when email field is empty", async () => {
        allure.feature('Login');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Attempts login without email. Expects an email validation error.');

        await test.step('Attempt to login without email', async () => {
            await loginPage.login('', 'validPassword');
        });

        await test.step('Check for email error message', async () => {
            expect(await loginPage.getEmailError()).toContain('Email is required');
        });
    });

    test("Should show error when password field is empty", async () => {
        allure.feature('Login');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Attempts login without password. Expects a password validation error.');

        await test.step('Attempt to login without password', async () => {
            await loginPage.login('validEmail@gmail.com', '');
        });

        await test.step('Check for password error message', async () => {
            expect(await loginPage.getPasswordError()).toContain('Password is required');
        });
    });
});
