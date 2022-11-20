const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)
const interval = 300;
const DEBUG = false;
const slowMo = 500;


const mockData = {
    "catalog": [
        {
            "text": "Rome",
            "_id": "1001"
        },
        {
            "text": "Amsterdam",
            "_id": "1002"
        },
    ]
};

const endpoints = {
    catalog: '/jsonstore/advanced/dropdown'
};

let browser;
let page;

describe('E2E tests', function () {
    // Setup
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

    describe('Catalog', () => {

        it('Show catalog', async () => {
            const data = mockData.catalog;
            const { get } = await handle(endpoints.catalog);
            get(data);
            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('#menu');
            const city = await page.$$eval(`#menu option`, t => t.map(s => s.textContent));
            await page.waitForTimeout(interval);

            expect(city.length).to.equal(data.length);
        });

        it('Check catalog value', async () => {
            const data = mockData.catalog;
            const { get } = await handle(endpoints.catalog);
            get(data);
            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('#menu');
            const city = await page.$$eval(`#menu option`, t => t.map(s => s.value));
            await page.waitForTimeout(interval);

            expect(city[0]).to.equal(data[0]._id);
            expect(city[1]).to.equal(data[1]._id);
        });

        it('Add town to catalog API call', async () => {
            const town = mockData.catalog[0];

            const { post } = await handle(endpoints.catalog);
            const isCalled = post().isHandled;

            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.fill('#itemText', town.text);

            page.click('[type="submit"]');

            await page.waitForTimeout(interval);

            expect(isCalled()).to.be.false;

        });

    });

});

async function setupContext(context) {

    // Catalog and Details
    await handleContext(context, endpoints.catalog, { get: mockData.catalog });

    // Block external calls
    await context.route(url => url.href.slice(0, host.length) != host, route => {
        if (DEBUG) {
            console.log('Preventing external call to ' + route.request().url());
        }
        route.abort();
    });
}

function handle(match, handlers) {
    return handleRaw.call(page, match, handlers);
}

function handleContext(context, match, handlers) {
    return handleRaw.call(context, match, handlers);
}

async function handleRaw(match, handlers) {
    const methodHandlers = {};
    const result = {
        get: (returns, options) => request('GET', returns, options),
        get2: (returns, options) => request('GET', returns, options),
        post: (returns, options) => request('POST', returns, options),
        put: (returns, options) => request('PUT', returns, options),
        patch: (returns, options) => request('PATCH', returns, options),
        del: (returns, options) => request('DELETE', returns, options),
        delete: (returns, options) => request('DELETE', returns, options)
    };

    const context = this;

    await context.route(urlPredicate, (route, request) => {
        if (DEBUG) {
            console.log('>>>', request.method(), request.url());
        }

        const handler = methodHandlers[request.method().toLowerCase()];
        if (handler == undefined) {
            route.continue();
        } else {
            handler(route, request);
        }
    });

    if (handlers) {
        for (let method in handlers) {
            if (typeof handlers[method] == 'function') {
                handlers[method](result[method]);
            } else {
                result[method](handlers[method]);
            }
        }
    }

    return result;

    function request(method, returns, options) {
        let handled = false;

        methodHandlers[method.toLowerCase()] = (route, request) => {
            handled = true;
            route.fulfill(respond(returns, options));
        };

        return {
            onRequest: () => context.waitForRequest(urlPredicate),
            onResponse: () => context.waitForResponse(urlPredicate),
            isHandled: () => handled,
        };
    }

    function urlPredicate(current) {
        if (current instanceof URL) {
            return current.href.toLowerCase().includes(match.toLowerCase());
        } else {
            return current.url().toLowerCase().includes(match.toLowerCase());
        }
    }
};

function respond(data, options = {}) {
    options = Object.assign({
        json: true,
        status: 200
    }, options);

    const headers = {
        'Access-Control-Allow-Origin': '*'
    };
    if (options.json) {
        headers['Content-Type'] = 'application/json';
        data = JSON.stringify(data);
    }

    return {
        status: options.status,
        headers,
        body: data
    };
}