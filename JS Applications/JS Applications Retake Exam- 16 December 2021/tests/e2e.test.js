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
    catalog: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    create: '/data/theaters',
    like: '/data/likes',
    details: (id) => `/data/theaters/${id}`,
    delete: (id) => `/data/theaters/${id}`,
    profile: (id) => `/data/theaters?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`,
    total: (theaterId) => `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
    own: (theaterId, userId) => `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
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
    describe('Authentication [ 20 Points ]', () => {
        it('Register does NOT work with empty fields [ 2.5 Points ]', async () => {
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
            await page.fill('[name="repeatPassword"]', data.password);

            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());

            expect(postData.email).to.equal(data.email);
            expect(postData.password).to.equal(data.password);
        });

        it('Login does NOT work with empty fields [ 2.5 Points ]', async () => {
            const { post } = await handle(endpoints.login);
            const isCalled = post().isHandled

            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');

            await page.waitForTimeout(interval);
            await page.waitForSelector('form');

            await page.click('[type="submit"]');

            await page.waitForTimeout(interval);

            expect(isCalled()).to.be.false;
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

    describe('Navigation bar [ 5 Points ]', () => {
        it('Logged user should see correct navigation [ 2.5 Points ]', async () => {
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
            expect(await page.isVisible('nav >> text=Theater')).to.be.true;
            expect(await page.isVisible('nav >> text=Profile')).to.be.true;
            expect(await page.isVisible('nav >> text=Create Event')).to.be.true;
            expect(await page.isVisible('nav >> text=Logout')).to.be.true;

            expect(await page.isVisible('nav >> text=Login')).to.be.false;
            expect(await page.isVisible('nav >> text=Register')).to.be.false;
        });

        it('Guest user should see correct navigation [ 2.5 Points ]', async () => {
            await page.goto(host);
            await page.waitForTimeout(interval);
            expect(await page.isVisible('nav >> text=Theater')).to.be.true;
            expect(await page.isVisible('nav >> text=Profile')).to.be.false;
            expect(await page.isVisible('nav >> text=Create Event')).to.be.false;
            expect(await page.isVisible('nav >> text=Logout')).to.be.false;

            expect(await page.isVisible('nav >> text=Login')).to.be.true;
            expect(await page.isVisible('nav >> text=Register')).to.be.true;
        });
    });

    describe('Home Page [ 15 Points ]', () => {
        it('Show home page - welcome message [ 2.5 Points ]', async () => {
            await page.goto(host);
            await page.waitForTimeout(interval);

            expect(await page.isVisible('text=My Theater')).to.be.true;
            expect(await page.isVisible('text=Since 1962 World Theatre Day has been celebrated by ITI Centres, ITI Cooperating Members, theatre professionals, theatre organizations, theatre universities and theatre lovers all over the world on the 27th of March. This day is a celebration for those who can see the value and importance of the art form “theatre”, and acts as a wake-up-call for governments, politicians and institutions which have not yet recognised its value to the people and to the individual and have not yet realised its potential for economic growth.')).to.be.true;
        });

        it('Check home page with 0 theaters [ 2.5 Points ]', async () => {
            const { get } = await handle(endpoints.catalog);
            get([]);

            await page.goto(host);
            await page.waitForTimeout(interval);

            const visible = await page.isVisible('text=No Events Yet...');
            expect(visible).to.be.true;
        });

        it('Check home page with 2 theaters [ 2.5 Points ]', async () => {
            const { get } = await handle(endpoints.catalog);
            get(mockData.catalog.slice(0, 2));
            const data = mockData.catalog.slice(0, 2);

            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.waitForSelector('#events');
            const names = await page.$$eval('.eventsInfo .title', t => t.map(s => s.textContent));

            expect(names.length).to.equal(2);
            expect(names[0]).to.contains(`${data[0].title}`);
            expect(names[1]).to.contains(`${data[1].title}`);
        });

        it('Show details [ 2.5 Points ]', async () => {
            await page.goto(host);
            await page.waitForTimeout(interval);

            expect(await page.isVisible('text="Details"')).to.be.true;
        });

        it('Check home page info [ 5 Points ]', async () => {
            const { get } = await handle(endpoints.catalog);
            get(mockData.catalog.slice(0, 1));
            const data = mockData.catalog.slice(0, 1);

            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.waitForSelector('#events');
            const names = await page.$$eval('.eventsInfo .title', t => t.map(s => s.textContent));
            const date = await page.$$eval('.eventsInfo .date', t => t.map(s => s.textContent));
            const author = await page.$$eval('.eventsInfo .author', t => t.map(s => s.textContent));

            expect(names).to.contains(`${data[0].title}`);
            expect(date).to.contains(`${data[0].date}`);
            expect(author).to.contains(`${data[0].author}`);
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

            await page.click('text=Create Event');
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

            await page.click('text=Create Event');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');
            await page.fill('[name="title"]', data.title);
            await page.fill('[name="date"]', data.date);
            await page.fill('[name="author"]', data.author);
            await page.fill('[name="description"]', data.description);
            await page.fill('[name="imageUrl"]', data.imageUrl);

            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());

            expect(postData.title).to.equal(data.title);
            expect(postData.date).to.equal(data.date);
            expect(postData.author).to.equal(data.author);
            expect(postData.description).to.equal(data.description);
            expect(postData.imageUrl).to.equal(data.imageUrl);

        });

        it('Check details information [ 5 Points ]', async () => {
            const data = mockData.catalog[1];
            const user = mockData.users[0];
            const { get } = await handle(endpoints.details(data._id));
            get(data);

            await page.waitForTimeout(interval);
            const { get: ownLikes } = await handle(endpoints.own(data._id, user._id));
            const { get: totalLikes } = await handle(endpoints.total(data._id));
            ownLikes(0);
            totalLikes(5);

            await page.waitForTimeout(interval);

            await page.waitForSelector('#events');
            await page.click(`.theaters-container > .eventsInfo:has-text("${data.title}") >> .btn-details`)

            await page.waitForTimeout(interval);

            const names = await page.$$eval('.detailsInfo h1', t => t.map(s => s.textContent));
            const date = await page.$$eval('.details h4', t => t.map(s => s.textContent));
            const description = await page.$$eval('.details p', t => t.map(s => s.textContent));

            expect(names).to.contains(`Title: ${data.title}`);
            expect(date[0]).to.contains(`Date: ${data.date}`);
            expect(date[1]).to.contains(`Author: ${data.author}`);
            expect(description).to.contains(`${data.description}`);
        });

        it('Non-author does NOT see delete and edit buttons [ 2.5 Points ]', async () => {
            const data = mockData.catalog[2];
            const user = mockData.users[0];
            const { get } = await handle(endpoints.details(data._id));
            get(data);

            await page.waitForTimeout(interval);
            const { get: ownLikes } = await handle(endpoints.own(data._id, user._id));
            const { get: totalLikes } = await handle(endpoints.total(data._id));
            ownLikes(0);
            totalLikes(5);
            await page.waitForSelector('#events');
            await page.waitForTimeout(interval);

            await page.click(`.theaters-container > .eventsInfo:has-text("${data.title}") >> .btn-details`)

            expect(await page.isVisible('text="Delete"')).to.be.false;
            expect(await page.isVisible('text="Edit"')).to.be.false;
        });

        it('Author see delete and edit buttons [ 2.5 Points ]', async () => {
            const data = mockData.catalog[1];
            const user = mockData.users[0];
            const { get } = await handle(endpoints.details(data._id));
            get(data);

            await page.waitForTimeout(interval);
            const { get: ownLikes } = await handle(endpoints.own(data._id, user._id));
            const { get: totalLikes } = await handle(endpoints.total(data._id));
            ownLikes(0);
            totalLikes(5);

            await page.waitForTimeout(interval);

            await page.waitForSelector('#events');
            await page.click(`.theaters-container > .eventsInfo:has-text("${data.title}") >> .btn-details`)

            await page.waitForTimeout(interval);

            expect(await page.isVisible('text="Delete"')).to.be.true;
            expect(await page.isVisible('text="Edit"')).to.be.true;
        });

        it('Edit should populate form with correct data [ 5 Points ]', async () => {
            const data = mockData.catalog[1];
            const user = mockData.users[0];
            const { get } = await handle(endpoints.details(data._id));
            get(data);

            await page.waitForTimeout(interval);
            const { get: ownLikes } = await handle(endpoints.own(data._id, user._id));
            const { get: totalLikes } = await handle(endpoints.total(data._id));
            ownLikes(0);
            totalLikes(5);

            await page.waitForTimeout(interval);

            await page.waitForSelector('#events');
            await page.click(`.theaters-container > .eventsInfo:has-text("${data.title}") >> .btn-details`)

            await page.click('text=Edit');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');

            const inputs = await page.$$eval('.theater-form input, textarea', t => t.map(i => i.value));
            expect(inputs[0]).to.contains(data.title);
            expect(inputs[1]).to.contains(data.date);
            expect(inputs[2]).to.contains(data.author);
            expect(inputs[3]).to.contains(data.description);
            expect(inputs[4]).to.contains(data.imageUrl);

        });

        it('Edit does NOT work with empty fields [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            const user = mockData.users[0];
            const { get, put } = await handle(endpoints.delete(data._id));
            get(data);
            const { isHandled } = put();

            await page.waitForTimeout(interval);
            const { get: ownLikes } = await handle(endpoints.own(data._id, user._id));
            const { get: totalLikes } = await handle(endpoints.total(data._id));
            ownLikes(0);
            totalLikes(5);
            await page.waitForTimeout(interval);
            await page.waitForSelector('#events');
            await page.click(`.theaters-container > .eventsInfo:has-text("${data.title}") >> .btn-details`)

            await page.click('text=Edit');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');

            await page.fill('[name="title"]', '');
            await page.fill('[name="date"]', '');
            await page.fill('[name="author"]', '');
            await page.fill('[name="description"]', '');
            await page.fill('[name="imageUrl"]', '');

            await page.click('[type="submit"]');
            await page.waitForTimeout(interval);

            expect(isHandled()).to.be.false;
        });

        it('Edit makes correct API call for logged in user [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            const user = mockData.users[0];

            const { get, put } = await handle(endpoints.delete(data._id));
            get(data);
            const { onRequest } = put();

            await page.waitForTimeout(interval);
            const { get: ownLikes } = await handle(endpoints.own(data._id, user._id));
            const { get: totalLikes } = await handle(endpoints.total(data._id));
            ownLikes(0);
            totalLikes(5);
            await page.waitForTimeout(interval);
            await page.waitForSelector('#events');
            await page.click(`.theaters-container > .eventsInfo:has-text("${data.title}") >> .btn-details`)

            await page.click('text=Edit');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');

            await page.fill('[name="title"]', data.title + 'edit');
            await page.fill('[name="author"]', data.author + 'edit');
            await page.fill('[name="description"]', data.description + 'edit');

            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());

            expect(postData.title).to.contains(data.title + 'edit');
            expect(postData.author).to.contains(data.author + 'edit');
            expect(postData.description).to.contains(data.description + 'edit');
        });

        it('Delete makes correct API call for logged in user [ 10 Points ]', async () => {
            const data = mockData.catalog[0];
            const user = mockData.users[0];

            const { get, del } = await handle(endpoints.delete(data._id));
            get(data);
            const { onResponse, isHandled } = del();

            await page.waitForTimeout(interval);
            const { get: ownLikes } = await handle(endpoints.own(data._id, user._id));
            const { get: totalLikes } = await handle(endpoints.total(data._id));
            ownLikes(0);
            totalLikes(5);
            await page.waitForSelector('#events');
            await page.click(`.theaters-container > .eventsInfo:has-text("${data.title}") >> .btn-details`)

            await page.click('text=Delete');

            page.on('dialog', dialog => dialog.accept());
            await Promise.all([
                onResponse(),
                page.click('text="Delete"')
            ]);

            expect(isHandled()).to.be.true;
        });

    });

    describe('User Profile Page [ 10 Points ]', async () => {

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

        it('Check profile page for with 0 theaters [ 2.5 Points ]', async () => {
            const { get } = await handle(endpoints.profile(mockData.users[0]._id));
            get([]);

            await page.click('text=Profile');
            await page.waitForTimeout(interval);

            const visible = await page.isVisible('text=This user has no events yet!');
            expect(visible).to.be.true;
        });

        it('Check profile page with 2 theaters [ 5 Points ]', async () => {
            const { get } = await handle(endpoints.profile(mockData.users[0]._id));
            get(mockData.catalog.slice(0, 2));
            const data = mockData.catalog.slice(0, 2);

            await page.click('text=Profile');
            await page.waitForTimeout(interval);

            const titles = await page.$$eval('.board .event-info h2', t => t.map(s => s.textContent));

            expect(titles.length).to.equal(2);
            expect(titles[0]).to.contains(`${data[0].title}`);
            expect(titles[1]).to.contains(`${data[1].title}`);
        });

        it('Check profile page information [ 2.5 Points ]', async () => {
            const { get } = await handle(endpoints.profile(mockData.users[0]._id));
            get(mockData.catalog.slice(0, 1));
            const data = mockData.catalog.slice(0, 1);
            const user = mockData.users[0]

            await page.click('text=Profile');
            await page.waitForTimeout(interval);

            const titles = await page.$$eval('.board .event-info h2', t => t.map(s => s.textContent));
            const date = await page.$$eval('.board .event-info h6', t => t.map(s => s.textContent));
            const email = await page.$$eval('.userInfo h2', t => t.map(s => s.textContent));

            expect(titles[0]).to.contains(`${data[0].title}`);
            expect(date[0]).to.contains(`${data[0].date}`);
            expect(email[0]).to.contains(`${user.email}`);
        });
    });

    describe('BONUS : Like functionality  [ 15 Points ]', async () => {

        it('Like button is NOT visible for guest users [ 2.5 Points ]', async () => {
            await page.goto(host);
            await page.waitForTimeout(interval);

            const data = mockData.catalog[2];
            const { get } = await handle(endpoints.details(data._id));
            get(data);

            await page.waitForTimeout(interval);

            await page.waitForSelector('#events');
            await page.click(`.theaters-container > .eventsInfo:has-text("${data.title}") >> .btn-details`)

            await page.waitForTimeout(interval);

            expect(await page.isVisible('.btn-like')).to.be.false;
        });

        it('Like button is visible for the non-creator user [ 2.5 Points ]', async () => {
            // Login user
            const user = mockData.users[0];
            const data = mockData.catalog[2];

            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');
            await page.fill('[name="email"]', user.email);
            await page.fill('[name="password"]', user.password);
            await page.click('[type="submit"]');

            await page.waitForTimeout(interval);
            const { get: ownLikes } = await handle(endpoints.own(data._id, user._id));
            const { get: totalLikes } = await handle(endpoints.total(data._id));
            ownLikes(0);
            totalLikes(5);

            await page.waitForSelector('#events');
            await page.click(`.theaters-container > .eventsInfo:has-text("${data.title}") >> .btn-details`);
            await page.waitForTimeout(interval);

            expect(await page.isVisible('.btn-like')).to.be.true;
        });

        it('Like button is NOT visible for the creator [ 2.5 Points ]', async () => {
            // Login user
            const user = mockData.users[0];
            const data = mockData.catalog[0];

            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');
            await page.fill('[name="email"]', user.email);
            await page.fill('[name="password"]', user.password);
            await page.click('[type="submit"]');

            await page.waitForTimeout(interval);

            const { get: ownLikes } = await handle(endpoints.own(data._id, user._id));
            const { get: totalLikes } = await handle(endpoints.total(data._id));
            ownLikes(0);
            totalLikes(5);

            await page.waitForSelector('#events');
            await page.click(`.theaters-container > .eventsInfo:has-text("${data.title}") >> .btn-details`)

            expect(await page.isVisible('btn-like')).to.be.false;
        });

        it('Like button should be hidden(not visible) after a click on it [ 2.5 Points ]', async () => {
            // Login user
            const user = mockData.users[0];
            const data = mockData.catalog[2];

            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');
            await page.fill('[name="email"]', user.email);
            await page.fill('[name="password"]', user.password);
            await page.click('[type="submit"]');

            await page.waitForTimeout(interval);

            const { get: ownLikes } = await handle(endpoints.own(data._id, user._id));
            const { get: totalLikes } = await handle(endpoints.total(data._id));
            const { post } = await handle(endpoints.like, { post: mockData.likes[2] });
            const { onRequest } = post();

            ownLikes(0);
            totalLikes(5);
            await page.waitForTimeout(interval);

            await page.waitForSelector('#events');
            await page.click(`.theaters-container > .eventsInfo:has-text("${data.title}") >> .btn-details`)
            await page.waitForTimeout(interval);
            expect(await page.isVisible('.btn-like')).to.be.true;
            ownLikes(1)
            totalLikes(6)
            await page.waitForTimeout(interval);

            const [request] = await Promise.all([
                onRequest,
                page.click('.btn-like')
            ]);

            await page.waitForTimeout(interval);

            expect(await page.isVisible('.btn-like')).to.be.false;


        });

        it('Like button should increase total likes by 1 after a click on it [ 5 Points ]', async () => {
            // Login user
            const user = mockData.users[0];
            const data = mockData.catalog[2];
            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');
            await page.fill('[name="email"]', user.email);
            await page.fill('[name="password"]', user.password);
            await page.click('[type="submit"]');
            await page.waitForTimeout(interval);

            const { get: ownLikes } = await handle(endpoints.own(data._id, user._id));
            const { get: totalLikes } = await handle(endpoints.total(data._id));
            const { post } = await handle(endpoints.like, { post: mockData.likes[2] });
            const { onRequest } = post();
            await page.waitForTimeout(interval);

            ownLikes(0);
            totalLikes(5);
            await page.waitForTimeout(interval);
            await page.waitForSelector('#events');
            await page.click(`.theaters-container > .eventsInfo:has-text("${data.title}") >> .btn-details`)
            await page.waitForTimeout(interval);

            let likes = await page.$$eval('.likes', t => t.map(s => s.textContent));
            expect(likes[0]).to.contains('Likes: 5');
            ownLikes(1)
            totalLikes(6)
            await page.waitForTimeout(interval);

            const [request] = await Promise.all([
                onRequest(),
                page.click('.btn-like')
            ]);

            await page.waitForTimeout(interval);

            likes = await page.$$eval('.likes', t => t.map(s => s.textContent));
            expect(likes[0]).to.contains('Likes: 6');
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