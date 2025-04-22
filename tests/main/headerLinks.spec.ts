import { allure } from "allure-playwright";
import { test, expect } from "@playwright/test";
import { HeaderComponent } from "../../pages/components/headerComponent";
import { MainPage } from "../../pages/MainPage";
import { headerLinks, categoryLinks } from "./../../config/testData";

test.describe("Check header links", () => {
  let header: HeaderComponent;

  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.gotoHome();
    header = new HeaderComponent(page);
  });

  for (const { linkGetter, href, text } of headerLinks) {
    test(`should have correct href and text for ${text} link`, async () => {
      allure.feature("Header Links");
      allure.label("severity", "critical");
      allure.tag("smoke");
      allure.description(
        `Check that the ${text} link has the correct href and text`
      );
      await test.step(`Check ${text} link`, async () => {
        const link = linkGetter(header);
        await expect(link).toHaveAttribute("href", href);
        await expect(link).toHaveText(text);
      });
    });
  }

  test.describe("Categories Dropdown Tests", () => {
    test.beforeEach(async () => {
      await header.openCategoriesDropdown();
    });

    for (const { linkGetter, href, text } of categoryLinks) {
      test(`should have correct href and text for ${text} category link`, async () => {
        allure.feature("Categories Dropdown");
        allure.label("severity", "critical");
        allure.tag("smoke");
        allure.description(
          `Check that the ${text} category link has the correct href and text`
        );

        await test.step(`Open categories dropdown`, async () => {
          await header.openCategoriesDropdown();
        });
        await test.step(`Check ${text} category link`, async () => {
          const link = linkGetter(header);
          await expect(link).toHaveAttribute("href", href);
          await expect(link).toHaveText(text);
        });
      });
    }
  });
});
