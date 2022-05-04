import { test, Locator }  from "@playwright/test";
import { HomePage } from "../pages/HomePage";

var homePage: HomePage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
})

test('Reaction Time Test', async ({ page }) => {
    homePage.openMenu("Reaction Time")
    await page.click('.view-splash');
    await page.click('.view-go');
    const result = await page.locator('xpath=//*[contains(@class, "view-result")]//h1').textContent();
    console.log(result)
})

test('Aim Trainer', async ({ page }) => {
    await page.click('a h3 >> text="Aim Trainer"');
    const target: Locator = page.locator('[data-aim-target="true"] >> div >> nth=1');
    while (await target.isVisible()) {
        await target.click({ force: true });
    }
    const result = await page.locator('h1').textContent();
    console.log(result);
})

test('Typing Test', async ({ page }) => {
    homePage.openMenu("Typing")
    const text = await page.locator('.letters').textContent();
    await page.keyboard.type(text);
    const result = await page.locator('h1').textContent();
    console.log(result);
})