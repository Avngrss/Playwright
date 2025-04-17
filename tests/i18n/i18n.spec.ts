import { test, expect } from '@playwright/test'
import { MainPage } from '../../pages/MainPage'
import { languages } from '../../config/routes'
import { allure } from 'allure-playwright'


test.describe("i18n: Language switch", () => {
    for(const lang of languages) {
        test(`Should show "${lang.expectedText}" for "${lang.code}"`, async ({page}) => {
            allure.feature('i18n')
            allure.label('severity', 'major')
            allure.tag('smoke')
            allure.parameter('Language Code', lang.code)
            allure.parameter('Expected Text', lang.expectedText)
            allure.description(`Verifies that switching the site language to "${lang.code}" correctly displays the translated text "${lang.expectedText.trim()}" in the category section.`)

            const mainPage = new MainPage(page);

            await test.step("Open the main page", async () => {
                await mainPage.goto();
            })
            
            await test.step(`Select language: ${lang.code}`, async () => {
                await mainPage.header.selectLanguage(lang.code)
            })

            await test.step(`Verify that the category text is displayed correctly`, async () => {
                await expect(mainPage.languageLocator()).toHaveText(lang.expectedText)
            })         
        })
    }
})