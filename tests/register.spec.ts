import { test, expect } from '@playwright/test';
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from '../pages/LoginPage';


test.describe("Register new user", () => {

    test.beforeEach(async({page}) => {
        const registerPage = new RegisterPage(page)
        const loginPage = new LoginPage(page)

        loginPage.goto()
    })

    test("Successful account creation usring all form fields", async ({page}) => {

    })
}) 

