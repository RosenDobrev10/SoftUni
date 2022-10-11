//@ts-check
const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)
const DEBUG = false;
const slowMo = 500;

let browser;
let page;

describe('E2E tests', function () {
    this.timeout(6000);

    before(async () => {
        browser = await chromium.launch(DEBUG ? { headless: false, slowMo } : {});
    });
    after(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        page = await browser.newPage();
    });
    afterEach(async () => {
        await page.close();
    });

    describe('Cats', () => {
        it('Testing status button functionality for showing code', async () => {
            await page.goto(host);
            await page.click(`.info >> text=Show status code`);
            await page.waitForTimeout(500);
            
            expect(await page.isVisible('text="Status Code: 100"')).to.be.true;
            expect(await page.isVisible('text="Continue"')).to.be.true;
        });

        it('Testing status button functionality for showing and hiding code', async () => {
            await page.goto(host);
            await page.click(`.info >> text=Show status code`);
            await page.waitForTimeout(500);

            await page.click(`.info >> text=Hide status code`);
            await page.waitForTimeout(500);

            expect(await page.isVisible('text="Status Code: 100"')).to.be.false;
            expect(await page.isVisible('text="Continue"')).to.be.false;
        });
    });

});