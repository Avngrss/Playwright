import { test, expect } from '@playwright/test';
import { RegisterPage } from "../pages/RegisterPage";


test.describe("Register new user", () => {
    test.beforeEach(async({page}) => {
        const registerPage = new RegisterPage(page)
        registerPage.gotoRegister()
    })

    test("Successful account creation usring all form fields", async ({page}) => {
        const registerPage = new RegisterPage(page)
        await registerPage.registerNewUser()
        await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login')
    })
}) 

