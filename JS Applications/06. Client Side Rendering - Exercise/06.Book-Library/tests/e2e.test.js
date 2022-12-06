const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)
const interval = 300;
const timeout = 6000;
const DEBUG = false;
const slowMo = 500;

const mockData = {
    "catalog": [
        {
            "title": "A Court Of Silver Flame",
            "author": "Sara J Maas",
            "_id": "1001"
        },
        {
            "title": "1984",
            "author": "Oruel",
            "_id": "1002"
        },
        {
            "title": "The Mortal Instruments",
            "author": "Cassandra Clare",
            "_id": "1003"
        }
    ]
}

const endpoints = {
    catalog: '/jsonstore/collections/books',
    details: (id) => `/jsonstore/collections/books/${id}`,
    delete: (id) => `/data/albums/${id}`,
};

let browser;
let context;
let page;

describe('E2E tests', function () {

    this.timeout(DEBUG ? 120000 : timeout);
    before(async () => browser = await chromium.launch(DEBUG ? { headless: false, slowMo } : {}));
    after(async () => await browser.close());
    beforeEach(async () => {
        context = await browser.newContext();
        setupContext(context);
        page = await context.newPage();
    });
    afterEach(async () => {
        await page.close();
        await context.close();
    });

    describe('Catalog', () => {

        it('Show catalog before Load Books', async () => {
            await page.goto(host);
            const data = mockData.catalog;
            const { get } = await handle(endpoints.catalog);
            get({});
            await page.waitForTimeout(interval);

            const books = await page.$$eval(`tbody tr`, t => t.map(s => s.textContent));
            await page.waitForTimeout(interval);
            expect(books.length).to.equal(0);
        });

        it('Show catalog after Load Books', async () => {
            await page.goto(host);
            const data = mockData.catalog;
            const { get } = await handle(endpoints.catalog);
            get(data);
            await page.waitForTimeout(interval);

            await page.click('#loadBooks');
            const books = await page.$$eval(`tbody tr`, t => t.map(s => s.textContent));
            await page.waitForTimeout(interval);
            expect(books.length).to.equal(3);
        });

        it('Create Books makes correct API call', async () => {
            await page.goto(host);
            const { post } = await handle(endpoints.catalog);
            const { onRequest } = post();

            await page.waitForTimeout(interval);

            await page.click('#loadBooks');

            await page.fill('[name="title"]', "A Court of Silver Flames");
            await page.fill('[name="author"]', "Sarah J. Maas");

            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());

            expect(postData.title).to.equal("A Court of Silver Flames");
            expect(postData.author).to.equal("Sarah J. Maas");
        });

        it('Create Books does NOT work with empty fields', async () => {
            await page.goto(host);
            const { post } = await handle(endpoints.catalog);
            const isCalled = post().isHandled;

            await page.waitForTimeout(interval);

            await page.waitForSelector('form');
            page.click('[type="submit"]');
            await page.waitForTimeout(interval);

            expect(isCalled()).to.be.false;
        });

        it('Users sees edit and delete buttons', async () => {
            await page.goto(host);
            const data = mockData.catalog;
            const { get } = await handle(endpoints.catalog);
            get(data);
            await page.waitForTimeout(interval);

            await page.click('#loadBooks');

            await page.waitForTimeout(interval);

            expect(await page.isVisible('text="Delete"')).to.be.true;
            expect(await page.isVisible('text="Edit"')).to.be.true;
        });



    });
});

async function setupContext(context) {

    // Catalog and Details
    await handleContext(context, endpoints.catalog, { get: mockData.catalog });
    await handleContext(context, endpoints.details('1001'), { get: mockData.catalog[0] });
    await handleContext(context, endpoints.details('1002'), { get: mockData.catalog[1] });
    await handleContext(context, endpoints.details('1003'), { get: mockData.catalog[2] });

    await handleContext(context, endpoints.details('1001'), { get2: mockData.catalog[0] });
    await handleContext(context, endpoints.details('1002'), { get2: mockData.catalog[1] });
    await handleContext(context, endpoints.details('1003'), { get2: mockData.catalog[2] });

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