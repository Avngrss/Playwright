import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { RegisterPage } from "../../pages/RegisterPage";
import { LoginPage } from '../../pages/LoginPage';
import { allure } from 'allure-playwright';

test.describe("User Registration", () => {
    let registerPage: RegisterPage;
    let loginPage: LoginPage;
    const url = 'https://practicesoftwaretesting.com/auth/login';
    const email = `user_${Date.now()}@example.com`;
    const password = 'NyPassPass1@';

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        loginPage = new LoginPage(page);
        await registerPage.gotoRegister();
    });

    test("Successful account creation using all form fields", async ({ page }) => {
        allure.feature('Registration');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Registers a new user with a unique email and strong password. Verifies redirect to login page and saves credentials to file.');

        await test.step('Fill and submit registration form with valid data', async () => {
            await registerPage.registerNewUser(email, password);
        });

        await test.step('Save registered user credentials to JSON file', async () => {
            const userDataPath = path.join(__dirname, '../fixtures/userData.json');
            fs.writeFileSync(userDataPath, JSON.stringify({ email, password }));
        });

        await test.step('Verify successful redirect to login page', async () => {
            await expect(page).toHaveURL(url);
        });
    });

    test("Registration with a weak password", async ({ page }) => {
        allure.feature('Registration');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Attempts to register with a weak password and verifies that a proper error message is displayed.');

        await test.step('Attempt to register with a weak password', async () => {
            await registerPage.registerNewUser(email, "123456");
        });

        await test.step('Check for password validation error', async () => {
            await registerPage.displayError(
                registerPage.errorPassword(),
                'Password must be minimal 6 characters long.'
            );
            await expect(page).not.toHaveURL(url);
        });
    });

    test("Registration with an already registered email", async ({ page }) => {
        allure.feature('Registration');
        allure.label('severity', 'critical');
        allure.tag('smoke');
        allure.description('Attempts to register using an email that already exists in the system and expects an error message.');

        const existedEmail = 'user_1743941648829@example.com';

        await test.step('Attempt to register with an existing email', async () => {
            await registerPage.registerNewUser(existedEmail, 'NyPassPass1@');
        });

        await test.step('Check for email duplication error', async () => {
            await registerPage.displayError(
                registerPage.existedUser(),
                'A customer with this email address already exists.'
            );
            await expect(page).not.toHaveURL(url);
        });
    });
});
