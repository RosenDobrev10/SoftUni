const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)
const interval = 600;
const DEBUG = false;
const slowMo = 500;

const mockData = require('./mock-data.json');
const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    catalog: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    create: '/data/albums',
    details: (id) => `/data/albums/${id}`,
    delete: (id) => `/data/albums/${id}`,
    search: (query) => `/data/albums?where=name%20LIKE%20%22${query}%22`
};


let browser;
let context;
let page;

describe('E2E tests', function () {
    // Setup
    this.timeout(DEBUG ? 120000 : 6000);
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
    describe('Authentication [ 20 Points ]', () => {
        it('Register does not work with empty fields [ 5 Points ]', async () => {
            const { post } = await handle(endpoints.register);
            const isCalled = post().isHandled;

            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Register');

            await page.waitForTimeout(interval);
            await page.waitForSelector('form');

            await page.click('[type="submit"]');

            await page.waitForTimeout(interval);

            expect(isCalled()).to.be.false;
        });

        it('Register makes correct API call [ 5 Points ]', async () => {
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
            await page.fill('[name="conf-pass"]', data.password);

            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());

            expect(postData.email).to.equal(data.email);
            expect(postData.password).to.equal(data.password);
        });

        it('Login makes correct API call [ 5 Points ]', async () => {
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

        it('Logout makes correct API call [ 5 Points ]', async () => {
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

    describe('Navigation bar [ 10 Points ]', () => {
        it('Logged user should see correct navigation [ 5 Points ]', async () => {
            // Login user
            const data = mockData.users[0];
            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');

            await page.fill('[name="email"]', data.email);
            await page.fill('[name="password"]', data.password);

            await page.click('[type="submit"]');

            //Test for navigation
            await page.waitForTimeout(interval);
            expect(await page.isVisible('nav >> text=Home')).to.be.true;
            expect(await page.isVisible('nav >> text=Catalog')).to.be.true;
            expect(await page.isVisible('nav >> text=Search')).to.be.true;

            expect(await page.isVisible('nav >> text=Create Album')).to.be.true;
            expect(await page.isVisible('nav >> text=Logout')).to.be.true;

            expect(await page.isVisible('nav >> text=Login')).to.be.false;
            expect(await page.isVisible('nav >> text=Register')).to.be.false;
        });

        it('Guest user should see correct navigation [ 5 Points ]', async () => {
            await page.goto(host);
            await page.waitForTimeout(interval);
            expect(await page.isVisible('nav >> text=Home')).to.be.true;
            expect(await page.isVisible('nav >> text=Search')).to.be.true;
            expect(await page.isVisible('nav >> text=Catalog')).to.be.true;

            expect(await page.isVisible('nav >> text=Create Album')).to.be.false;
            expect(await page.isVisible('nav >> text=Logout')).to.be.false;

            expect(await page.isVisible('nav >> text=Login')).to.be.true;
            expect(await page.isVisible('nav >> text=Register')).to.be.true;
        });
    });

    describe('Home Page [ 10 Points ]', () => {
        it('Show home page - Welcome [ 5 Points ]', async () => {
            await page.goto(host);
            await page.waitForTimeout(interval);

            expect(await page.isVisible('text=Welcome to')).to.be.true;
        });

        it('Show home page - Name [ 5 Points ]', async () => {
            await page.goto(host);
            await page.waitForTimeout(interval);

            expect(await page.isVisible('text=My Music Application!')).to.be.true;
        });
    });

    describe('CRUD [ 50 Points ]', () => {

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

        it('Create does NOT work with empty fields [ 5 Points ]', async () => {
            const { post } = await handle(endpoints.create);
            const isCalled = post().isHandled;

            await page.click('text=Create Album');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');

            page.click('[type="submit"]');

            await page.waitForTimeout(interval);

            expect(isCalled()).to.be.false;
        });

        it('Create makes correct API call for logged in user [ 10 Points ]', async () => {
            const data = mockData.catalog[0];
            const { post } = await handle(endpoints.create);
            const { onRequest } = post();

            await page.click('text=Create Album');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');
            await page.fill('[name="name"]', data.name);
            await page.fill('[name="imgUrl"]', data.imgUrl);
            await page.fill('[name="price"]', data.price);
            await page.fill('[name="releaseDate"]', data.releaseDate);
            await page.fill('[name="artist"]', data.artist);
            await page.fill('[name="genre"]', data.genre);
            await page.fill('[name="description"]', data.description);

            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());

            expect(postData.name).to.equal(data.name);
            expect(postData.price).to.equal(data.price);
            expect(postData.artist).to.equal(data.artist);
            expect(postData.genre).to.equal(data.genre);
            expect(postData.description).to.equal(data.description);

        });

        it('Non-author does NOT see delete and edit buttons [ 5 Points ]', async () => {
            const data = mockData.catalog[2];
            const { get } = await handle(endpoints.details(data._id));
            get(data);

            await page.click('text=Catalog');
            await page.waitForTimeout(interval);
            await page.waitForSelector('#catalogPage');

            await page.click(`.card-box:has-text("Name: ${data.name}") >> #details`);

            expect(await page.isVisible('text="Delete"')).to.be.false;
            expect(await page.isVisible('text="Edit"')).to.be.false;
        });

        it('Author see delete and edit buttons [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            const { get } = await handle(endpoints.delete(data._id));
            get(data);

            await page.click('text=Catalog');
            await page.waitForTimeout(interval);
            await page.waitForSelector('#catalogPage');

            await page.click(`.card-box:has-text("Name: ${data.name}") >> #details`);
            await page.waitForTimeout(interval);

            expect(await page.isVisible('text="Delete"')).to.be.true;
            expect(await page.isVisible('text="Edit"')).to.be.true;
        });

        it('Edit should populate form with correct data [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            const { get } = await handle(endpoints.delete(data._id));
            get(data);

            await page.click('text=Catalog');
            await page.waitForTimeout(interval);
            await page.waitForSelector('#catalogPage');

            await page.click(`.card-box:has-text("Name: ${data.name}") >> #details`);
            await page.waitForTimeout(interval);

            await page.click('text=Edit');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');

            const inputs = await page.$$eval('.container input, textarea', t => t.map(i => i.value));
            expect(inputs[0]).to.contains(data.name);
            expect(inputs[1]).to.contains(data.imgUrl);
            expect(inputs[2]).to.contains(data.price);
            expect(inputs[3]).to.contains(data.releaseDate);
            expect(inputs[4]).to.contains(data.artist);
            expect(inputs[5]).to.contains(data.genre);
            expect(inputs[6]).to.contains(data.description);

        });

        it('Edit does NOT work with empty fields [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            const { get, put } = await handle(endpoints.delete(data._id));
            get(data);
            const { isHandled } = put();

            await page.click('text=Catalog');
            await page.waitForTimeout(interval);
            await page.waitForSelector('#catalogPage');

            await page.click(`.card-box:has-text("Name: ${data.name}") >> #details`);
            await page.waitForTimeout(interval);

            await page.click('text=Edit');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');

            await page.fill('[name="name"]', '');
            await page.fill('[name="imgUrl"]', '');
            await page.fill('[name="price"]', '');
            await page.fill('[name="releaseDate"]', '');
            await page.fill('[name="artist"]', '');
            await page.fill('[name="genre"]', '');
            await page.fill('[name="description"]', '');

            await page.click('[type="submit"]');
            await page.waitForTimeout(interval);

            expect(isHandled()).to.be.false;
        });

        it('Edit makes correct API call for logged in user [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            const { get, put } = await handle(endpoints.delete(data._id));
            get(data);
            const { onRequest } = put();

            await page.click('text=Catalog');
            await page.waitForTimeout(interval);
            await page.waitForSelector('#catalogPage');

            await page.click(`.card-box:has-text("Name: ${data.name}") >> #details`);
            await page.waitForTimeout(interval);

            await page.click('text=Edit');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');

            await page.fill('[name="name"]', data.name + 'edit');
            await page.fill('[name="artist"]', data.artist + 'edit');
            await page.fill('[name="genre"]', data.genre + 'edit');

            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());

            expect(postData.name).to.contains(data.name + 'edit');
            expect(postData.artist).to.contains(data.artist + 'edit');
            expect(postData.genre).to.contains(data.genre + 'edit');
        });

        it('Delete makes correct API call for logged in user [ 10 Points ]', async () => {
            const data = mockData.catalog[0];
            const { get, del } = await handle(endpoints.delete(data._id));
            get(data);
            const { onResponse, isHandled } = del();

            await page.click('text=Catalog');
            await page.waitForTimeout(interval);
            await page.waitForSelector('#catalogPage');

            await page.click(`.card-box:has-text("Name: ${data.name}") >> #details`);
            await page.waitForTimeout(interval);

            await page.click('text=Delete');

            page.on('dialog', dialog => dialog.accept());

            await Promise.all([
                onResponse(),
                page.click('text="Delete"')
            ]);

            expect(isHandled()).to.be.true;
        });

    });

    describe('Check Catalog Page with User [ 5 Points ]', async () => {

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

        it('Check Catalog Page with 0 albums [ 2.5 Points ]', async () => {
            const { get } = await handle(endpoints.catalog);
            get([]);

            await page.click('text=Catalog');
            await page.waitForTimeout(interval);

            const visible = await page.isVisible('text=No Albums in Catalog!');
            expect(visible).to.be.true;
        });

        it('Check Catalog Page with 2 albums [ 2.5 Points ]', async () => {
            const { get } = await handle(endpoints.catalog);
            get(mockData.catalog.slice(0, 2));

            await page.click('text=Catalog');
            await page.waitForTimeout(interval);
            await page.waitForSelector('#catalogPage');

            const titles = await page.$$eval('.text-center >> .name', t => t.map(s => s.textContent));
            expect(titles.length).to.equal(2);
            expect(titles[0]).to.contains(`Name: ${mockData.catalog[0].name}`);
            expect(titles[1]).to.contains(`Name: ${mockData.catalog[1].name}`);
        });
    });

    describe('Check Catalog Page with Guest [ 5 Points ]', async () => {

        it('Check Catalog Page with 2 albums [ 2.5 Points ]', async () => {
            const { get } = await handle(endpoints.catalog);
            get(mockData.catalog.slice(0, 2));

            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('text=Catalog');
            await page.waitForTimeout(interval);
            await page.waitForSelector('#catalogPage');

            const titles = await page.$$eval('.text-center >> .name', t => t.map(s => s.textContent));
            expect(titles.length).to.equal(2);

            expect(titles[0]).to.contains(`${mockData.catalog[0].name}`);
            expect(titles[1]).to.contains(`${mockData.catalog[1].name}`);
        });

        it('Guest does NOT see details buttons [ 2.5 Points ]', async () => {
            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('text=Catalog');
            await page.waitForTimeout(interval);

            expect(await page.isVisible('text="Details"')).to.be.false;
        });
    });

    describe('Search Page [ 15 Points ]', async () => {

        it('Show no matches for Guest [ 2.5 Points ]', async () => {
            const { get } = await handle(endpoints.search('Queen'));
            get([]);

            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('nav >> text=Search');
            await page.waitForTimeout(interval);

            await page.fill('[name="search"]', 'Queen');
            await page.click('button >> text="Search"');
            await page.waitForTimeout(interval);

            expect(await page.isVisible('text=No result.')).to.be.true;
        });

        it('Show results with 2 albums for Guest [ 2.5 Points ]', async () => {
            const { get } = await handle(endpoints.search('Name'));
            get(mockData.catalog.slice(0, 2));
            
            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('nav >> text=Search');
            await page.waitForTimeout(interval);

            await page.fill('[name="search"]', 'Name');
            await page.click('button >> text="Search"');
            await page.waitForTimeout(interval);

            const matches = await page.$$eval('.text-center >> .name', t => t.map(s => s.textContent));

            expect(matches.length).to.equal(2);
            expect(matches[0]).to.contains(`Name: ${mockData.catalog[0].name}`);
            expect(matches[1]).to.contains(`Name: ${mockData.catalog[1].name}`);
        });

        it('No Details button for Guest [ 2.5 Points ]', async () => {
            const { get } = await handle(endpoints.search('Name'));
            get(mockData.catalog.slice(0, 1));
            
            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('nav >> text=Search');
            await page.waitForTimeout(interval);

            await page.fill('[name="search"]', 'Name');
            await page.click('button >> text="Search"');
            await page.waitForTimeout(interval);

            const matches = await page.$$eval('.text-center >> .name', t => t.map(s => s.textContent));

            expect(matches.length).to.equal(1);
            expect(matches[0]).to.contains(`Name: ${mockData.catalog[0].name}`);

            expect(await page.isVisible('text="Details"')).to.be.false;
        });
        
        it('Show no matches for Users [ 2.5 Points ]', async () => {
            // Login user
            const data = mockData.users[0];
            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');

            await page.fill('[name="email"]', data.email);
            await page.fill('[name="password"]', data.password);

            await page.click('[type="submit"]');

            const { get } = await handle(endpoints.search('Queen'));
            get([]);

            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('nav >> text=Search');
            await page.waitForTimeout(interval);

            await page.fill('[name="search"]', 'Queen');
            await page.click('button >> text="Search"');
            await page.waitForTimeout(interval);

            expect(await page.isVisible('text=No result.')).to.be.true;
        });

        it('Show results with 2 albums for Users [ 2.5 Points ]', async () => {
            // Login user
            const data = mockData.users[0];
            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');

            await page.fill('[name="email"]', data.email);
            await page.fill('[name="password"]', data.password);

            await page.click('[type="submit"]');

            const { get } = await handle(endpoints.search('Name'));
            get(mockData.catalog.slice(0, 2));

            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('nav >> text=Search');
            await page.waitForTimeout(interval);

            await page.fill('[name="search"]', 'Name');
            await page.click('button >> text="Search"');
            await page.waitForTimeout(interval);

            const matches = await page.$$eval('.text-center >> .name', t => t.map(s => s.textContent));

            expect(matches.length).to.equal(2);
            expect(matches[0]).to.contains(`Name: ${mockData.catalog[0].name}`);
            expect(matches[1]).to.contains(`Name: ${mockData.catalog[1].name}`);
        });

        it('Show Details button for User [ 2.5 Points ]', async () => {
            // Login user
            const data = mockData.users[0];
            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');

            await page.fill('[name="email"]', data.email);
            await page.fill('[name="password"]', data.password);

            await page.click('[type="submit"]');

            const { get } = await handle(endpoints.search('Name'));
            get(mockData.catalog.slice(0, 1));

            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('nav >> text=Search');
            await page.waitForTimeout(interval);

            await page.fill('[name="search"]', 'Name');
            await page.click('button >> text="Search"');
            await page.waitForTimeout(interval);

            const matches = await page.$$eval('.text-center >> .name', t => t.map(s => s.textContent));

            expect(matches.length).to.equal(1);
            expect(matches[0]).to.contains(`Name: ${mockData.catalog[0].name}`);

            expect(await page.isVisible('text="Details"')).to.be.true;


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

    //Comments
    await handleContext(context, endpoints.comments('1001'), { get: mockData.comments });
    await handleContext(context, endpoints.comments('1003'), { get: mockData.comments });


    // Profile Page
    await handleContext(context, endpoints.search('Name'), { get: mockData.catalog.slice(0, 2) });

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