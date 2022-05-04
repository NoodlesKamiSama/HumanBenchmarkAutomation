const puppeteer = require('puppeteer');

describe('Human Benchmark', function () {
    this.timeout(30 * 1000);

    var browser;
    var page;

    beforeEach(async function () {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('https://humanbenchmark.com/');
    })

    afterEach(async function () {
        await browser.close();
    })

    it('Reaction Time', async function () {
        let menu = await page.$x('//a/h3[contains(text(), "Reaction Time")]')
        await menu[0].click();
        await page.click('.view-splash');
        let target = await page.waitForSelector('.view-go', { timeout: 30 * 1000 })
        target.click();
        await page.waitForSelector('.view-result');
        let result = await page.$eval('h1', el => el.textContent);
        console.log(result);
    })

    it('Aim Trainer', async function () {
        let menu = await page.$x('//a/h3[contains(text(), "Aim Trainer")]');
        await menu[0].click();
        let visible = async function (obj) {
            try {
                await page.$('[data-aim-target="true"] div:nth-child(1)');
                return true;
            }
            catch (err) {
                return false;
            }
        }
        while (await visible()) {
            try {
                await page.click('[data-aim-target="true"] div:nth-child(1)');
            }
            catch (err) {
                break;
            }
        }
        console.log(await page.$eval('h1', el => el.textContent));
    })

    it('Typing Test', async function () {
        let menu = await page.$x('//a/h3[contains(text(), "Typing")]');
        await menu[0].click();
        const text = await page.$eval('.letters', el => el.textContent);
        await page.type('.letters', text);
        console.log(await page.$eval('h1', el => el.textContent))
    })
})