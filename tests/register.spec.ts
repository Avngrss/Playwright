import { test, expect } from '@playwright/test';
import { RegisterPage } from "../pages/RegisterPage";


test.describe("Register new user", () => {
    let registerPage: RegisterPage;

    test.beforeEach(async({page}) => {
        registerPage = new RegisterPage(page)
        await registerPage.gotoRegister()
    })

    test("Successful account creation usring all form fields", async ({page}) => {
        await registerPage.registerNewUser()
        await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login')
    })
}) 

