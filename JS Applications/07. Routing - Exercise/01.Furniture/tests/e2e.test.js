const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)
const interval = 300;
const timeout = 6000;
const DEBUG = false;
const slowMo = 500;

const mockData = {
    "users": [
        {
            "_id": "0001",
            "email": "peter@abv.bg",
            "password": "123456",
            "accessToken": "AAAA"
        },
        {
            "_id": "0002",
            "email": "john@abv.bg",
            "password": "123456",
            "accessToken": "BBBB"
        }
    ],
    "catalog": [
        {
            "_id": "1001",
            "_ownerId": "0001",
            "make": "make1",
            "model": "model1",
            "year": "1",
            "description": "description1",
            "price": "1",
            "img": "image1",
            "material": "material1"
        },
        {
            "_id": "1002",
            "_ownerId": "0001",
            "make": "make2",
            "model": "model2",
            "year": "2",
            "description": "description2",
            "price": "2",
            "img": "image2",
            "material": "material2"
        },
        {
            "_id": "1003",
            "_ownerId": "0002",
            "make": "make3",
            "model": "model3",
            "year": "3",
            "description": "description3",
            "price": "3",
            "img": "image3",
            "material": "material3"
        }
    ]
}

const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    catalog: '/data/catalog',
    details: (id) => `data/catalog/${id}`,
    profile: (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`
};

let browser;
let context;
let page;

describe('E2E tests', function () {
    // Setup
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

    // Test proper
    describe('Authentication', () => {
        it('Register makes correct API call', async () => {
            const data = mockData.users[0];
            const { post } = await handle(endpoints.register);
            const { onRequest } = post(data);

            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Register');

            await page.waitForTimeout(interval);
            await page.waitForSelector('form');

            await page.fill('[name="email"]', data.email);
            await page.fill('[name="password"]', data.password);
            await page.fill('[name="rePass"]', data.password);

            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());

            expect(postData.email).to.equal(data.email);
            expect(postData.password).to.equal(data.password);
        });

        it('Login makes correct API call', async () => {
            const data = mockData.users[0];
            const { post } = await handle(endpoints.login);
            const { onRequest } = post(data);

            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');

            await page.waitForTimeout(interval);
            await page.waitForSelector('form');

            await page.fill('[name="email"]', data.email);
            await page.fill('[name="password"]', data.password);


            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());
            expect(postData.email).to.equal(data.email);
            expect(postData.password).to.equal(data.password);
        });

        it('Logout makes correct API call', async () => {
            const data = mockData.users[0];
            const { post } = await handle(endpoints.login);
            const { get } = await handle(endpoints.logout);
            const { onResponse } = post(data);
            const { onRequest } = get('', { json: false, status: 204 });

            await page.goto(host);
            await page.click('text=Login');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');
            await page.fill('[name="email"]', data.email);
            await page.fill('[name="password"]', data.password);

            await Promise.all([
                onResponse(),
                page.click('[type="submit"]')
            ]);

            await page.waitForTimeout(interval);

            const [request] = await Promise.all([
                onRequest(),
                page.click('nav >> text=Logout')
            ]);

            const token = request.headers()['x-authorization'];
            expect(request.method()).to.equal('GET');
            expect(token).to.equal(data.accessToken);
        });
    });

    describe('Navigation bar', () => {
        it('Guest user should see correct navigation', async () => {
            await page.goto(host);
            await page.waitForTimeout(interval);

            expect(await page.isVisible('nav >> text=Dashboard')).to.be.true;
            expect(await page.isVisible('nav >> text=Login')).to.be.true;
            expect(await page.isVisible('nav >> text=Register')).to.be.true;

            expect(await page.isVisible('nav >> text=Create Furniture')).to.be.false;
            expect(await page.isVisible('nav >> text=My Publications')).to.be.false;
            expect(await page.isVisible('nav >> text=Logout')).to.be.false;
        });

        it('Logged user should see correct navigation', async () => {
            // Login user
            const data = mockData.users[0];
            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('nav >> text=Login');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');
            await page.fill('[name="email"]', data.email);
            await page.fill('[name="password"]', data.password);

            await page.click('[type="submit"]');
            await page.waitForTimeout(interval);

            //Test for navigation
            expect(await page.isVisible('nav >> text=Dashboard')).to.be.true;
            expect(await page.isVisible('nav >> text=Login')).to.be.false;
            expect(await page.isVisible('nav >> text=Register')).to.be.false;

            expect(await page.isVisible('nav >> text=Create Furniture')).to.be.true;
            expect(await page.isVisible('nav >> text=My Publications')).to.be.true;
            expect(await page.isVisible('nav >> text=Logout')).to.be.true;
        });

        it('User should see correct navigation after click on Logout button', async () => {
            // Login user
            const data = mockData.users[0];
            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('nav >> text=Login');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');
            await page.fill('[name="email"]', data.email);
            await page.fill('[name="password"]', data.password);

            await page.click('[type="submit"]');
            await page.waitForTimeout(interval);

            //Test for navigation
            expect(await page.isVisible('nav >> text=Dashboard')).to.be.true;
            expect(await page.isVisible('nav >> text=Login')).to.be.false;
            expect(await page.isVisible('nav >> text=Register')).to.be.false;

            expect(await page.isVisible('nav >> text=Create Furniture')).to.be.true;
            expect(await page.isVisible('nav >> text=My Publications')).to.be.true;
            expect(await page.isVisible('nav >> text=Logout')).to.be.true;

            await page.click('nav >> text=Logout');
            await page.waitForTimeout(interval);

            expect(await page.isVisible('nav >> text=Dashboard')).to.be.true;
            expect(await page.isVisible('nav >> text=Login')).to.be.true;
            expect(await page.isVisible('nav >> text=Register')).to.be.true;

            expect(await page.isVisible('nav >> text=Create Furniture')).to.be.false;
            expect(await page.isVisible('nav >> text=My Publications')).to.be.false;
            expect(await page.isVisible('nav >> text=Logout')).to.be.false;
        });
    });

    describe('Catalog', () => {

        it('Show catalog', async () => {
            const data = mockData.catalog;

            await page.goto(host);
            await page.waitForTimeout(interval);

            const titles = await page.$$eval(`.card p`, t => t.map(s => s.textContent));
            await page.waitForTimeout(interval);
            await page.waitForTimeout(interval);

            expect(titles.length / 2).to.equal(mockData.catalog.length);
            expect(titles[0]).to.contains(data[0].description);
            expect(titles[2]).to.contains(data[1].description);
            expect(titles[4]).to.contains(data[2].description);
        });

        it('Guest does NOT see edit/delete buttons', async () => {
            const data = mockData.catalog[0];
            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.waitForSelector('.container');
            await page.click(`.card-body:has-text("${data.description}") >> text=Details`);
            await page.waitForTimeout(interval);

            expect(await page.isVisible('text="Delete"')).to.be.false;
            expect(await page.isVisible('text="Edit"')).to.be.false;
        });
    });

    describe('CRUD', () => {

        // Login user
        beforeEach(async () => {
            const data = mockData.users[0];
            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');
            await page.fill('[name="email"]', data.email);
            await page.fill('[name="password"]', data.password);
            await page.click('[type="submit"]');
            await page.waitForTimeout(interval);
        });

        it('Create does NOT work with empty fields', async () => {
            const { post } = await handle(endpoints.catalog);
            const isCalled = post().isHandled;

            await page.click('text=Create Furniture');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');
            page.click('[type="submit"]');
            await page.waitForTimeout(interval);

            expect(isCalled()).to.be.false;
        });

        it('Non-author does NOT see delete and edit buttons', async () => {
            const data = mockData.catalog[2];

            await page.waitForSelector('.container');
            await page.click(`.card-body:has-text("${data.description}") >> text=Details`);

            await page.waitForTimeout(interval);

            expect(await page.isVisible('text="Delete"')).to.be.false;
            expect(await page.isVisible('text="Edit"')).to.be.false;

        });

        it('Edit should populate form with correct data', async () => {
            const data = mockData.catalog[1];
            const { get } = await handle(endpoints.details(data._id));
            get(data);

            await page.waitForSelector('.container');
            await page.click(`.card-body:has-text("${data.description}") >> text=Details`);
            await page.waitForTimeout(interval);

            await page.click('text=Edit');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');

            const formData = {
                make: await page.$eval('[name="make"]', t => t.value),
                model: await page.$eval('[name="model"]', t => t.value),
                year: await page.$eval('[name="year"]', t => t.value),
                description: await page.$eval('[name="description"]', t => t.value),
                price: await page.$eval('[name="price"]', t => t.value), img: await page.$eval('[name="img"]', t => t.value), material: await page.$eval('[name="material"]', t => t.value)
            };
            expect(formData.make).to.equal(data.make);
            expect(formData.model).to.equal(data.model);
            expect(formData.year).to.equal(data.year);
            expect(formData.description).to.equal(data.description);
            expect(formData.price).to.equal(data.price);
            expect(formData.img).to.equal(data.img);
            expect(formData.material).to.equal(data.material);
        });

        it('Edit does NOT work with empty fields', async () => {
            const data = mockData.catalog[0];
            const { get, put } = await handle(endpoints.details(data._id));
            get(data);
            const { isHandled } = put();

            await page.click('nav >> text=Dashboard');
            await page.waitForTimeout(interval);

            await page.waitForSelector('.container');
            await page.click(`.card-body:has-text("${data.description}") >> text=Details`);
            await page.waitForTimeout(interval);

            await page.click('text=Edit');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');
            await page.fill('[name="make"]', '');
            await page.fill('[name="model"]', '');
            await page.fill('[name="description"]', '');
            await page.fill('[name="img"]', '');

            await page.click('[type="submit"]');
            await page.waitForTimeout(interval);

            expect(isHandled()).to.be.false;

        });

        it('Delete makes correct API call for logged in user', async () => {
            const data = mockData.catalog[0];

            const { get, del } = await handle(endpoints.details(data._id));
            get(data);
            const { onResponse, isHandled } = del();

            await page.click('nav >> text=Dashboard');
            await page.waitForTimeout(interval);

            await page.waitForSelector('.container');
            await page.click(`.card-body:has-text("${data.description}") >> text=Details`);
            await page.waitForTimeout(interval);

            page.on('dialog', dialog => dialog.accept());

            await Promise.all([
                onResponse(),
                page.click('text="Delete"')
            ]);

            expect(isHandled()).to.be.true;
        });
    });

    describe('My Furniture Page', async () => {
        // Login user
        beforeEach(async () => {
            const data = mockData.users[0];
            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');
            await page.fill('[name="email"]', data.email);
            await page.fill('[name="password"]', data.password);
            await page.click('[type="submit"]');
            await page.waitForTimeout(interval);
        });

        it('The logged-in user should be able to see his/her own furniture (test with 2 furniture)', async () => {
            const { get } = await handle(endpoints.profile(mockData.users[0]._id));
            get(mockData.catalog.slice(0, 2));

            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=My Publication');
            await page.waitForTimeout(interval);

            const titles = await page.$$eval('.card p', t => t.map(s => s.textContent));
            expect(titles.length / 2).to.equal(2);
        });

    });

});

async function setupContext(context) {
    // Authentication
    await handleContext(context, endpoints.login, { post: mockData.users[0] });
    await handleContext(context, endpoints.register, { post: mockData.users[0] });
    await handleContext(context, endpoints.logout, { get: h => h('', { json: false, status: 204 }) });

    // Catalog and Details
    await handleContext(context, endpoints.catalog, { get: mockData.catalog });
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