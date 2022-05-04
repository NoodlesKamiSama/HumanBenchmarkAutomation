const { beforeEach, describe, afterEach } = require('mocha');
const { By, Builder, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Human Benchmark', function () {
  this.timeout(20 * 1000);

  var driver;

  beforeEach(async function () {
    driver = await new Builder()
      .usingServer("http://localhost:4444/wd/hub")
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options().headless())
      .build();
    await driver.get('https://humanbenchmark.com/');
  })

  afterEach(async function () {
    await driver.quit();
  })

  it('Reaction Time', async function () {
    await driver.findElement(By.xpath('//a/h3[text()="Reaction Time"]')).click();
    await driver.findElement(By.css('.view-splash')).click();
    await driver.wait(until.elementLocated(By.css('.view-go')), 10 * 1000).click();
    const result = await driver.findElement(By.xpath('//*[contains(@class, "view-result")]//h1')).getText();
    console.log(result);
  });

  const checkElement = async function(locator) {
    return await driver.findElement(locator)
      .then(
        () => { return true },
        (err) => {
        if (err.name === "NoSuchElementError") {
          return false
        }
      });
  }

  it('Aim Trainer', async function () {
    await driver.findElement(By.xpath('//a/h3[text()="Aim Trainer"]')).click();
    let obj = By.css('[data-aim-target="true"] div:nth-child(1)');
    while (await checkElement(obj)) {
      action = driver.actions();
      let target = await driver.findElement(obj);
      await action.click(target).perform();
    }
    const result = await driver.findElement(By.css('h1')).getText();
    console.log(result);
  })

  it('Typing Test', async function () {
    await driver.findElement(By.xpath('//a/h3[text()="Typing"]')).click();
    const text = await driver.findElement(By.css('.letters')).getText();
    let action = driver.actions();
    await action.sendKeys(text).perform();
    const result = await driver.findElement(By.css('h1')).getText();
    console.log(result);
  })
});