const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)
const interval = 500;
const DEBUG = false;
const slowMo = 500;

const mockData = {
    "list": [
        {
            "_id": "1001",
            "title": "Scalable Vector Graphics"
        },
        {
            "_id": "1002",
            "title": "Unix"
        }
    ],
    "details": [
        {
            "_id": "1001",
            "title": "Scalable Vector Graphics",
            "content": "Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based vector image format for two-dimensional graphics with support for interactivity and animation. The SVG specification is an open standard developed by the World Wide Web Consortium (W3C) since 1999."
        },
        {
            "_id": "1002",
            "title": "Unix",
            "content": "Unix (trademarked as UNIX) is a family of multitasking, multiuser computer operating systems that derive from the original AT&T Unix, development starting in the 1970s at the Bell Labs research center by Ken Thompson, Dennis Ritchie, and others."
        }
    ]
};

const endpoints = {
    list: '/jsonstore/advanced/articles/list',
    info: (id) => `/jsonstore/advanced/articles/details/${id}`,
};

let browser;
let context;
let page;

describe('E2E tests', function () {
    // Setup
    this.timeout(DEBUG ? 120000 : 7000);
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

    // Test proper
    describe('Accordion Info', () => {

        it('Load Posts', async () => {
            const data = mockData.list;
            const { get } = await handle(endpoints.list);
            get(data);

            await page.goto(host);
            await page.waitForTimeout(interval);

            const post = await page.$$eval(`.accordion`, (t) =>
                t.map((s) => s.textContent)
            );
            expect(post.length).to.equal(data.length);
        });

        it('Load Details', async () => {
            const data = mockData.list;
            const accordionInfo = mockData.details[0];
            const { get } = await handle(endpoints.list);
            get(data);

            const {get2} = await handle(endpoints.info(data._id));
            get2(accordionInfo);

            await page.goto(host);
            await page.waitForTimeout(interval);

            const post = await page.$$eval(`.accordion`, (t) =>
                t.map((s) => s.textContent)
            );

            await page.click(`.accordion:has-text("${accordionInfo.title}") >> button`);

            const info = await page.$$eval(`.accordion .extra p`, (t) =>
                t.map((s) => s.textContent)
            );

            expect(info[0]).to.contains(accordionInfo.content);
        });

        it('Load Details second record', async () => {
            const data = mockData.list;
            const accordionInfo = mockData.details[1];
            const { get } = await handle(endpoints.list);
            get(data);

            const {get2} = await handle(endpoints.info(data._id));
            get2(accordionInfo);

            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click(`.accordion:has-text("${accordionInfo.title}") >> button`);

            const info = await page.$$eval(`.accordion:has-text("${accordionInfo.title}") .extra`, (t) =>
                t.map((s) => s.textContent)
            );

            expect(info[0]).to.contains(accordionInfo.content);
        });
    });
});

async function setupContext(context) {

    // Catalog and Details
    await handleContext(context, endpoints.list, { get: mockData.list });
    await handleContext(context, endpoints.info('1001'), { get: mockData.details[0] });
    await handleContext(context, endpoints.info('1002'), { get: mockData.details[1] });

    await handleContext(context, endpoints.details('1001'), { get: mockData.catalog[0] });
    await handleContext(context, endpoints.details('1002'), { get: mockData.catalog[1] });
    await handleContext(context, endpoints.details('1003'), { get: mockData.catalog[2] });

    await handleContext(endpoints.profile('0001'), { get: mockData.catalog.slice(0, 2) }, context);

    await handleContext(endpoints.total('1001'), { get: 6 }, context);
    await handleContext(endpoints.total('1002'), { get: 4 }, context);
    await handleContext(endpoints.total('1003'), { get: 7 }, context);

    await handleContext(endpoints.own('1001', '0001'), { get: 1 }, context);
    await handleContext(endpoints.own('1002', '0001'), { get: 0 }, context);
    await handleContext(endpoints.own('1003', '0001'), { get: 0 }, context);

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