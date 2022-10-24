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

    describe('Search', () => {
        it('Load Matches with 1 Letter', async () => {
            await page.goto(host);
            await page.fill('#searchText', 'S');
            page.click('text=Search');
            await page.waitForTimeout(500);
            const town = await page.$$eval('#result', t => t.map(l => l.textContent));
            expect(town[0]).to.equal('1 matches found');
        });

        it('Load Matches with 1 Letter', async () => {
            await page.goto(host);
            await page.fill('#searchText', 'P');
            page.click('text=Search');
            await page.waitForTimeout(500);
            const town = await page.$$eval('#result', t => t.map(l => l.textContent));
            expect(town[0]).to.equal('2 matches found');
        });

        it('Load Matches with small letter', async () => {
            await page.goto(host);
            await page.fill('#searchText', 'pl');
            page.click('text=Search');
            await page.waitForTimeout(500);
            const town = await page.$$eval('#result', t => t.map(l => l.textContent));
            expect(town[0]).to.equal('0 matches found');
        });

        it('Check active class with correct input', async () => {
            await page.goto(host);
            await page.fill('#searchText', 'Pl');
            page.click('text=Search');
            await page.waitForTimeout(500);
            const town = await page.$$eval('.active', t => t.map(l => l.textContent));
            expect(town.length).to.equal(2);
        });

        it('Check active class with incorrect', async () => {
            await page.goto(host);
            await page.fill('#searchText', 's');
            page.click('text=Search');
            await page.waitForTimeout(500);
            const town = await page.$$eval('.active', t => t.map(l => l.textContent));
            expect(town.length).to.equal(0);
        });
    });

});