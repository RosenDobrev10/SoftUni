const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)
const interval = 500;
const DEBUG = false;
const slowMo = 500;

const mockData = require('./mock-data.json');
const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    catalog: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    allGames: '/data/games?sortBy=_createdOn%20desc',
    create: '/data/games',
    details: (id) => `/data/games/${id}`,
    delete: (id) => `/data/games/${id}`,
    comments: (id) => `/data/comments?where=gameId%3D%22${id}%22`,
    postComments: '/data/comments'
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
        it('register does not work with empty fields [ 5 Points ]', async () => {
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

        it('register makes correct API call [ 5 Points ]', async () => {
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
            await page.fill('[name="confirm-password"]', data.password);

            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());

            expect(postData.email).to.equal(data.email);
            expect(postData.password).to.equal(data.password);
        });

        it('login makes correct API call [ 5 Points ]', async () => {
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

        it('logout makes correct API call [ 5 Points ]', async () => {
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

    describe('Navigation bar [ 5 Points ]', () => {
        it('logged user should see correct navigation [ 2 Points ]', async () => {
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

            expect(await page.isVisible('nav >> text=All games')).to.be.true;
            expect(await page.isVisible('nav >> text=Create Game')).to.be.true;
            expect(await page.isVisible('nav >> text=Logout')).to.be.true;

            expect(await page.isVisible('nav >> text=Login')).to.be.false;
            expect(await page.isVisible('nav >> text=Register')).to.be.false;
        });

        it('guest user should see correct navigation [ 2 Points ]', async () => {
            await page.goto(host);
            await page.waitForTimeout(interval);

            expect(await page.isVisible('nav >> text=All games')).to.be.true;
            expect(await page.isVisible('nav >> text=Create Games')).to.be.false;
            expect(await page.isVisible('nav >> text=Logout')).to.be.false;

            expect(await page.isVisible('nav >> text=Login')).to.be.true;
            expect(await page.isVisible('nav >> text=Register')).to.be.true;
        });

        it('user should see correct navigation after click Logout button [ 1 Points ]', async () => {
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
            await page.waitForTimeout(interval);
            await page.click('text=Logout');

            //Test for navigation
            await page.waitForTimeout(interval);

            expect(await page.isVisible('nav >> text=All games')).to.be.true;
            expect(await page.isVisible('nav >> text=Create Game')).to.be.false;
            expect(await page.isVisible('nav >> text=Logout')).to.be.false;

            expect(await page.isVisible('nav >> text=Login')).to.be.true;
            expect(await page.isVisible('nav >> text=Register')).to.be.true;
        });
    });

    describe('Home Page [ 20 Points ]', () => {
        it('show empty home page [ 2.5 Points ]', async () => {
            const { get } = await handle(endpoints.catalog);
            get([]);
            await page.goto(host);
            await page.waitForTimeout(interval);

            const titles = await page.$$eval('#welcome-world .game h3', t => t.map(s => s.textContent));
            expect(titles.length).to.equal(0);
            expect(await page.isVisible('text=No games yet')).to.be.true;
        });

        it('show home page [ 7.5 Points ]', async () => {
            const data = mockData.catalog.slice(0, 3);

            await page.goto(host);
            await page.waitForTimeout(interval);

            const titles = await page.$$eval('#welcome-world .game h3', t => t.map(s => s.textContent));

            expect(titles.length).to.equal(data.length);
            expect(titles[0]).to.contains(`${data[0].title}`);
            expect(titles[1]).to.contains(`${data[1].title}`);
            expect(titles[2]).to.contains(`${data[2].title}`);
            expect(await page.isVisible('text=No games yet')).to.be.false;
        });

        it('show details [ 5 Points ]', async () => {
            const data = mockData.catalog[0];

            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.waitForSelector('#welcome-world');
            await page.click(`.game:has-text("${data.title}") >> .details-btn`);
            await page.waitForTimeout(interval);

            expect(await page.textContent('.game-header h1')).to.contains(data.title);
            expect(await page.textContent('.type')).to.contains(data.category);
            expect(await page.textContent('.text')).to.contains(data.summary);

        });

        it('guest does NOT see edit/delete buttons [ 5 Points ]', async () => {
            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.waitForSelector('#welcome-world');
            await page.click('.details-btn');
            await page.waitForTimeout(interval);

            expect(await page.isVisible('text="Delete"')).to.be.false;
            expect(await page.isVisible('text="Edit"')).to.be.false;
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

        it('create does NOT work with empty fields [ 5 Points ]', async () => {
            const { post } = await handle(endpoints.create);
            const isCalled = post().isHandled;

            await page.click('text=Create Game');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');

            page.click('[type="submit"]');

            await page.waitForTimeout(interval);

            expect(isCalled()).to.be.false;
        });

        it('create makes correct API call for logged in user [ 10 Points ]', async () => {
            const data = mockData.catalog[0];
            const { post } = await handle(endpoints.create);
            const { onRequest } = post();

            await page.click('text=Create Game');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');
            await page.fill('[name="title"]', data.title);
            await page.fill('[name="category"]', data.category);
            await page.fill('[name="maxLevel"]', data.maxLevel);
            await page.fill('[name="imageUrl"]', data.imageUrl);
            await page.fill('[name="summary"]', data.summary);

            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());

            expect(postData.title).to.equal(data.title);
            expect(postData.category).to.equal(data.category);
            expect(postData.maxLevel).to.equal(data.maxLevel);
            expect(postData.imageUrl).to.equal(data.imageUrl);
            expect(postData.summary).to.equal(data.summary);
        });

        it('non-author does NOT see delete and edit buttons [ 5 Points ]', async () => {
            const data = mockData.catalog[2];
            const { get } = await handle(endpoints.details(data._id));
            get(data);
            await page.waitForSelector('#welcome-world');
            await page.click(`.game:has-text("${data.title}") >> .details-btn`);
            await page.waitForTimeout(interval);

            expect(await page.isVisible('text="Delete"')).to.be.false;
            expect(await page.isVisible('text="Edit"')).to.be.false;
        });

        it('author see delete and edit buttons [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            const { get } = await handle(endpoints.details(data._id));
            get(data);

            await page.waitForSelector('#welcome-world');
            await page.click(`.game:has-text("${data.title}") >> .details-btn`);
            await page.waitForTimeout(interval);

            expect(await page.isVisible('text="Delete"')).to.be.true;
            expect(await page.isVisible('text="Edit"')).to.be.true;
        });

        it('edit should populate form with correct data [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            const { get } = await handle(endpoints.details(data._id));
            get(data);

            await page.waitForSelector('#welcome-world');
            await page.click(`.game:has-text("${data.title}") >> .details-btn`);
            await page.waitForTimeout(interval);

            await page.click('text=Edit');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');

            const inputs = await page.$$eval('.container input', t => t.map(i => i.value));
            const textArea = await page.$$eval('.container textarea', t => t.map(i => i.value));
            expect(inputs[0]).to.contains(data.title);
            expect(inputs[1]).to.contains(data.category);
            expect(inputs[2]).to.contains(data.maxLevel);
            expect(inputs[3]).to.contains(data.imageUrl);
            expect(textArea[0]).to.contains(data.summary);
        });

        it('edit does NOT work with empty fields [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            const { get, put } = await handle(endpoints.details(data._id));
            get(data);
            const { isHandled } = put();

            await page.waitForSelector('#welcome-world');
            await page.click(`.game:has-text("${data.title}") >> .details-btn`);
            await page.waitForTimeout(interval);

            await page.click('text=Edit');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');

            await page.fill('[name="title"]', '');
            await page.fill('[name="category"]', '');
            await page.fill('[name="maxLevel"]', '');
            await page.fill('[name="imageUrl"]', '');
            await page.fill('[name="summary"]', '');

            await page.click('[type="submit"]');
            await page.waitForTimeout(interval);

            expect(isHandled()).to.be.false;
        });

        it('edit makes correct API call for logged in user [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            const data2 = mockData.catalog[2];
            const { get, put } = await handle(endpoints.details(data._id));
            get(data);
            const { onRequest } = put();

            await page.waitForSelector('#welcome-world');
            await page.click(`.game:has-text("${data.title}") >> .details-btn`);
            await page.waitForTimeout(interval);

            await page.click('text=Edit');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');

            await page.fill('[name="title"]', data2.title);
            await page.fill('[name="maxLevel"]', data2.maxLevel);

            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());

            expect(postData.title).to.contains(data2.title);
            expect(postData.maxLevel).to.contains(data2.maxLevel);
        });

        it('delete makes correct API call for logged in user [ 10 Points ]', async () => {
            const data = mockData.catalog[0];
            const { get, del } = await handle(endpoints.delete(data._id));
            get(data);
            const { onResponse, isHandled } = del();

            await page.waitForSelector('#welcome-world');
            await page.click(`.game:has-text("${data.title}") >> .details-btn`);
            await page.waitForTimeout(interval);

            page.on('dialog', dialog => dialog.accept());

            await Promise.all([
                onResponse(),
                page.click('text="Delete"')
            ]);

            expect(isHandled()).to.be.true;
        });

    });

    describe('All Games Page for logged-in users [ 5 Points ]', async () => {

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

        it('check all games page with 0 games [ 2.5 Points ]', async () => {
            const { get } = await handle(endpoints.allGames);
            get([]);

            await page.click('text=All games');
            await page.waitForTimeout(interval);

            const visible = await page.isVisible('text=No articles yet');
            expect(visible).to.be.true;
        });

        it('check all games page with 1 game [ 2.5 Points ]', async () => {
            const data = mockData.catalog;
            const { get } = await handle(endpoints.allGames);
            get(data.slice(0, 1));

            await page.click('text=All games');
            await page.waitForTimeout(interval);

            const titles = await page.$$eval('.allGames >> .allGames-info >> h2', t => t.map(s => s.textContent));
            expect(titles.length).to.equal(1);
            expect(titles[0]).to.contains(`${data[0].title}`);
        });
    });

    describe('All Games Page for guest users [ 5 Points ]', async () => {

        it('check all games page with 0 games [ 2.5 Points ]', async () => {
            const { get } = await handle(endpoints.allGames);
            get([]);

            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('text=All games');
            await page.waitForTimeout(interval);

            const visible = await page.isVisible('text=No articles yet');
            expect(visible).to.be.true;
        });

        it('check all games page with 4 games [ 2.5 Points ]', async () => {
            const data = mockData.catalog;
            const { get } = await handle(endpoints.allGames);
            get(data);

            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('text=All games');
            await page.waitForTimeout(interval);

            const titles = await page.$$eval('.allGames >> .allGames-info >> h2', t => t.map(s => s.textContent));
            expect(titles.length).to.equal(data.length);

            expect(titles[0]).to.contains(`${data[0].title}`);
            expect(titles[1]).to.contains(`${data[1].title}`);
            expect(titles[2]).to.contains(`${data[2].title}`);
            expect(titles[3]).to.contains(`${data[3].title}`);
        });
    });

    describe('BONUS: Comments [ 10 Points ]', async () => {

        it('Guest should not be able to see the section "Add new comment", but should be able to see the section "Comments" [ 1 Points ]', async () => {
            const data = mockData.catalog[0];
            const { get } = await handle(endpoints.details(data._id));
            get(data);
            await page.goto(host);

            await page.waitForSelector('#welcome-world');
            await page.click(`.game:has-text("${data.title}") >> .details-btn`);
            await page.waitForTimeout(interval);

            expect(await page.isVisible('.details-comments')).to.be.true;
            expect(await page.isVisible('.create-comment')).to.be.false;
        });

        it('Guest should not be able to see text "No comments." (with 0 comments) [ 1 Points ]', async () => {
            const data = mockData.catalog[0];
            await page.goto(host);

            await page.waitForSelector('#welcome-world');
            const { get } = await handle(endpoints.comments('1001'));
            get([]);

            await page.click(`.game:has-text("${data.title}") >> .details-btn`);
            await page.waitForTimeout(interval);
            const comments = await page.$$eval('details-comments ul li', t => t.map(s => s.textContent));
            expect(comments.length).to.equal(0);
            expect(await page.isVisible('text=No comments.')).to.be.true;

        });

        it('Comments field can\'t work with empty field [ 2 Points ]', async () => {
            const user = mockData.users[0];
            const data = mockData.catalog[2];

            const { get: getDetails } = await handle(endpoints.details(data._id));
            getDetails(data);

            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');
            await page.fill('[name="email"]', user.email);
            await page.fill('[name="password"]', user.password);
            await page.click('[type="submit"]');

            await page.waitForTimeout(interval);

            const { get: getComments } = await handle(endpoints.comments('1003'));
            getComments([]);

            await page.waitForSelector('#welcome-world');
            await page.click(`.game:has-text("${data.title}") >> .details-btn`);
            await page.waitForTimeout(interval);

            const { post } = await handle(endpoints.postComments);
            const isCalled = post().isHandled;

            await page.click('[type="submit"]');

            expect(isCalled()).to.be.false;
        });

        it('Add comment makes correct API call for logged in user [ 2 Points ]', async () => {
            const user = mockData.users[0];
            const data = mockData.catalog[2];
            const { comment } = mockData.comments[0];

            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');
            await page.fill('[name="email"]', user.email);
            await page.fill('[name="password"]', user.password);
            await page.click('[type="submit"]');

            await page.waitForTimeout(interval);

            const { get: getDetails } = await handle(endpoints.details(data._id));
            getDetails(data);
            const { get: getComments } = await handle(endpoints.comments('1003'));
            getComments([]);

            await page.waitForSelector('#welcome-world');
            await page.click(`.game:has-text("${data.title}") >> .details-btn`);
            await page.waitForTimeout(interval);

            const { post } = await handle(endpoints.postComments);
            const { onRequest } = post(mockData.comments);

            await page.fill('[name="comment"]', `${comment}`);

            const [request] = await Promise.all([
                onRequest(),
                await page.click('[type="submit"]')
            ]);
            await page.waitForTimeout(interval);
            const postData = JSON.parse(request.postData());

            expect(postData.gameId).to.equal(data._id);
            expect(postData.comment).to.equal(comment);
        });

        it('No-author can add new comment (test with 2 comments) [ 4 Points ]', async () => {
            const user = mockData.users[0];
            const data = mockData.catalog[2];
            const comments = mockData.comments;

            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');
            await page.fill('[name="email"]', user.email);
            await page.fill('[name="password"]', user.password);
            await page.click('[type="submit"]');

            const { get: getDetails } = await handle(endpoints.details(data._id));
            getDetails(data);
            const { get: getComments } = await handle(endpoints.comments('1003'));
            getComments([]);
            const { post } = await handle(endpoints.postComments);
            const { onRequest } = post(mockData.comments);

            await page.waitForSelector('#welcome-world');
            await page.click(`.game:has-text("${data.title}") >> .details-btn`);
            await page.waitForTimeout(interval);

            await page.fill('[name="comment"]', comments[0].comment);

            getComments(comments.slice(0, 1));
            
            
            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]')
            ]);

            await page.waitForTimeout(interval);

            const postData = JSON.parse(request.postData());
            expect(postData.gameId).to.equal(data._id);
            expect(postData.comment).to.equal(comments[0].comment);
      
            await page.waitForTimeout(interval);
            let allComments = await page.$$eval('.details-comments ul li', t => t.map(s => s.textContent));
    
            expect(allComments.length).to.be.equal(comments.length - 1);
            expect(allComments[0]).to.contains(comments[0].comment);

            await page.goto(host);

            await page.waitForSelector('#welcome-world');
            getDetails(data);

            await page.click(`.game:has-text("${data.title}") >> .details-btn`);
            await page.waitForTimeout(interval);

            await page.fill('[name="comment"]', comments[1].comment);

            getComments(comments);

            const [request2] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]')
            ]);
            await page.waitForTimeout(interval);

            const postData2 = JSON.parse(request2.postData());
            expect(postData2.gameId).to.equal(data._id);
            expect(postData2.comment).to.equal(comments[1].comment);
      

            allComments = await page.$$eval('.details-comments ul li', t => t.map(s => s.textContent));
            expect(allComments.length).to.be.equal(comments.length);
            expect(allComments[0]).to.contains(comments[0].comment);
            expect(allComments[1]).to.contains(comments[1].comment);
            await page.waitForTimeout(interval);
        });
    });

});

async function setupContext(context) {
    // Authentication
    await handleContext(context, endpoints.login, { post: mockData.users[0] });
    await handleContext(context, endpoints.register, { post: mockData.users[0] });
    await handleContext(context, endpoints.logout, { get: h => h('', { json: false, status: 204 }) });

    // Catalog and Details
    await handleContext(context, endpoints.catalog, { get: mockData.catalog.slice(0, 3) });
    await handleContext(context, endpoints.allGames, { get: mockData.catalog });

    await handleContext(context, endpoints.details('1001'), { get: mockData.catalog[0] });
    await handleContext(context, endpoints.details('1002'), { get: mockData.catalog[1] });
    await handleContext(context, endpoints.details('1003'), { get: mockData.catalog[2] });

    //Comments
    await handleContext(context, endpoints.comments('1001'), { get: mockData.comments });

    // Profile Page
    await handleContext(context, endpoints.profile('0001'), { get: mockData.catalog.slice(0, 2) });

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