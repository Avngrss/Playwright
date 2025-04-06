import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from '../pages/LoginPage';


test.describe("Should register new users", () => {
    let registerPage: RegisterPage;
    let loginPage: LoginPage;
    const url = 'https://practicesoftwaretesting.com/auth/login'
    const email = `user_${Date.now()}@example.com`;
    const password = 'NyPassPass1@';

    test.beforeEach(async({page}) => {
        registerPage = new RegisterPage(page)
        loginPage = new LoginPage(page)
        await registerPage.gotoRegister()
    })

    test("Successful account creation using all form fields", async ({page}) => {
        await registerPage.registerNewUser(email, password)
        const userDataPath = path.join(__dirname, '../fixtures/userData.json')
        fs.writeFileSync(userDataPath, JSON.stringify({email, password}))
        await expect(page).toHaveURL(url)
    })

    test("Registration user with an easy password", async({page}) => {
        await registerPage.registerNewUser(email, "123456")
        await registerPage.displayError(registerPage.errorPassword(), 'Password must be minimal 6 characters long.')
        await expect(page).not.toHaveURL(url)
    })

    test("Registration user with an existed email",async ({page}) => {
        const existedEmail = 'user_1743941648829@example.com';
        await registerPage.registerNewUser(existedEmail, 'NyPassPass1@')
        await registerPage.displayError(registerPage.existedUser(), 'A customer with this email address already exists.')
        await expect(page).not.toHaveURL(url)
    })
}) 

