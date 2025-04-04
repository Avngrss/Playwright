import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { allure } from 'allure-playwright';
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from '../pages/LoginPage';


test.describe("Register new user", () => {
    let registerPage: RegisterPage;
    let loginPage: LoginPage;

    test.beforeEach(async({page}) => {
        registerPage = new RegisterPage(page)
        loginPage = new LoginPage(page)
        await registerPage.gotoRegister()
    })

    test("Successful account creation usring all form fields", async ({page}) => {
        const email = `user_${Date.now()}@example.com`;
        const password = 'NyGosuPass1@';


        await registerPage.registerNewUser(email, password)
        const userDataPath = path.join(__dirname, '../fixtures/userData.json')
        fs.writeFileSync(userDataPath, JSON.stringify({email, password}))
       
        await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login')
    })
}) 

