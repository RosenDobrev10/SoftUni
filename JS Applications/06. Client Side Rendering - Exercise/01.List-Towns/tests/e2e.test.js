//@ts-check
const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)
const interval = 300;
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

    describe('List', () => {
        it('Load Town with 1 town', async () => {
            await page.goto(host);
            await page.fill('[name="towns"]', 'Sofia');
            page.click('text=Load');
            await page.waitForTimeout(interval);
            const town = await page.$$eval('#root > ul > li', t => t.map(l => l.textContent));
            expect(town.length).to.equal(1);
        });

        it('Load Town with 2 town', async () => {
            await page.goto(host);
            await page.fill('[name="towns"]', 'Sofia, Burgas');
            page.click('text=Load');
            await page.waitForTimeout(500);
            const town = await page.$$eval('#root > ul > li', t => t.map(l => l.textContent));
            expect(town.length).to.equal(2);
        });

        it('Load Town with 2 town', async () => {
            await page.goto(host);
            await page.fill('[name="towns"]', 'Sofia, Plovdiv, Burgas');
            page.click('text=Load');
            await page.waitForTimeout(500);
            const town = await page.$$eval('#root > ul > li', t => t.map(l => l.textContent));
            expect(town.length).to.equal(3);
        });
    });

});
