import { test, expect } from '@playwright/test'
import { MainPage } from '../pages/MainPage'

const languages = [
    {code: 'EN', expectedText: ' Categories '},
    {code: 'DE', expectedText: ' Kategorien '},
    {code: 'ES', expectedText: ' Categorías '},
    {code: 'FR', expectedText: ' Catégories '},
    {code: 'NL', expectedText: ' Categorieën '},
    {code: 'TR', expectedText: ' Kategoriler '},
]

test.describe("i18n: Language switch", () => {
    for(const lang of languages) {
        test(`Should show "${lang.expectedText}" for "${lang.code}"`, async ({page}) => {
            const mainPage = new MainPage(page);
            await mainPage.goto();

            await mainPage.header.selectLanguage(lang.code)
            await expect(mainPage.languageLocator()).toHaveText(lang.expectedText)
        })
    }
})