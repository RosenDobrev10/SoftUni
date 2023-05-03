const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)
const interval = 300;
const timeout = 6000;
const DEBUG = false;
const slowMo = 500;

const mockData = require('./mock-data.json');
const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    catalog: '/data/books?sortBy=_createdOn%20desc',
    create: '/data/books',
    like: '/data/likes',
    details: (id) => `/data/books/${id}`,
    profile: (id) => `/data/books?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`,
    total: (bookId) => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    own: (bookId, userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`
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
    describe('Authentication [ 20 Points ]', () => {
        it('register does not work with empty fields [ 5 Points ]', async () => {
            const { post } = await createHandler(endpoints.register, { post: {} });

            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('nav >> text=Register');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');
            await page.click('[type="submit"]');
            await page.waitForTimeout(interval);

            expect(post.isCalled).to.be.false;
        });

        it('register makes correct API call [ 5 Points ]', async () => {
            const data = mockData.users[0];
            const { post } = await createHandler(endpoints.register, { post: data });

            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('nav >> text=Register');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');
            await page.fill('[name="email"]', data.email);
            await page.fill('[name="password"]', data.password);
            await page.fill('[name="confirm-pass"]', data.password);

            const [request] = await Promise.all([
                post.waitForRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());

            expect(postData.username).to.equal(data.username);
            expect(postData.password).to.equal(data.password);
        });

        it('login makes correct API call [ 5 Points ]', async () => {
            const data = mockData.users[0];
            const { post } = await createHandler(endpoints.login, { post: data });

            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('nav >> text=Login');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');
            await page.fill('[name="email"]', data.email);
            await page.fill('[name="password"]', data.password);

            const [request] = await Promise.all([
                post.waitForRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());
            expect(postData.username).to.equal(data.username);
            expect(postData.password).to.equal(data.password);
        });

        it('logout makes correct API call [ 5 Points ]', async () => {
            const data = mockData.users[0];
            const { post: loginPost } = await createHandler(endpoints.login, { post: data });
            const { get: logoutGet } = await createHandler(endpoints.logout, { get: { data: '', options: { json: false, status: 204 } } });

            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('nav >> text=Login');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');
            await page.fill('[name="email"]', data.email);
            await page.fill('[name="password"]', data.password);

            await Promise.all([
                loginPost.waitForResponse(),
                page.click('[type="submit"]')
            ]);

            await page.waitForTimeout(interval);

            const [request] = await Promise.all([
                logoutGet.waitForRequest(),
                page.click('nav >> text=Logout')
            ]);

            const token = request.headers()['x-authorization'];
            expect(token).to.equal(data.accessToken);
        });
    });

    describe('Navigation bar [ 5 Points ]', () => {
        it('guest user should see correct navigation [ 2.5 Points ]', async () => {
            await page.goto(host);
            await page.waitForTimeout(interval);

            expect(await page.isVisible('nav >> text=Dashboard')).to.be.true;
            expect(await page.isVisible('nav >> text=Login')).to.be.true;
            expect(await page.isVisible('nav >> text=Register')).to.be.true;

            expect(await page.isVisible('nav >> text=My Books')).to.be.false;
            expect(await page.isVisible('nav >> text=Add Book')).to.be.false;
            expect(await page.isVisible('nav >> text=Logout')).to.be.false;
            expect(await page.isVisible('nav >> text=Welcome')).to.be.false;
        });

        it('logged user should see correct navigation [ 2.5 Points ]', async () => {
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
            expect(await page.isVisible(`nav >> text=Welcome, ${data.email}`)).to.be.true;
            expect(await page.isVisible('nav >> text=My Books')).to.be.true;
            expect(await page.isVisible('nav >> text=Add Book')).to.be.true;
            expect(await page.isVisible('nav >> text=Logout')).to.be.true;

            expect(await page.isVisible('nav >> text=Login')).to.be.false;
            expect(await page.isVisible('nav >> text=Register')).to.be.false;
        });
    });

    describe('Catalog [ 20 Points ]', () => {
        it('show empty catalog [ 5 Points ]', async () => {
            await createHandler(endpoints.catalog, { get: [] });
            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('nav >> text=Dashboard');
            await page.waitForTimeout(interval);

            const titles = await page.$$eval('#dashboard-page ul li', t => t.map(s => s.textContent));
            expect(titles.length).to.equal(0);
            expect(await page.isVisible('text=No books in database!')).to.be.true;
        });

        it('show catalog [ 5 Points ]', async () => {
            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('nav >> text=Dashboard');
            await page.waitForTimeout(interval);

            const titles = await page.$$eval('#dashboard-page ul li', t => t.map(s => s.textContent));

            expect(titles.length).to.equal(mockData.catalog.length);
            expect(titles[0]).to.contains(mockData.catalog[0].title);
            expect(titles[1]).to.contains(mockData.catalog[1].title);
            expect(titles[2]).to.contains(mockData.catalog[2].title);
            expect(titles[3]).to.contains(mockData.catalog[3].title);
            expect(titles[4]).to.contains(mockData.catalog[4].title);
            expect(await page.isVisible('text=No books in database!')).to.be.false;
        });

        it('show details [ 5 Points ]', async () => {
            const data = mockData.catalog[2];
            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('nav >> text=Dashboard');
            await page.waitForTimeout(interval);

            await page.waitForSelector('#dashboard-page');
            await page.click(`#dashboard-page > ul li:has-text("${data.title}") >> text=Details`);
            await page.waitForTimeout(interval);

            expect(await page.isVisible(`h3:has-text("${data.title}")`)).to.be.true;
            expect(await page.isVisible(`.type:has-text("${data.type}")`)).to.be.true;
            expect(await page.isVisible(`.book-description > p:has-text("${data.description}")`)).to.be.true;

        });

        it('guest does NOT see edit/delete buttons [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('nav >> text=Dashboard');
            await page.waitForTimeout(interval);


            await page.waitForSelector('#dashboard-page');
            await page.click(`#dashboard-page > ul li:has-text("${data.title}") >> text=Details`);
            await page.waitForTimeout(interval);

            expect(await page.isVisible('text="Delete"')).to.be.false;
            expect(await page.isVisible('text="Edit"')).to.be.false;
        });
    });

    describe('CRUD [ 45 Points ]', () => {

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
            const { post } = await createHandler(endpoints.create, { post: '' });

            await page.click('text=Add Book');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');
            page.click('[type="submit"]');
            await page.waitForTimeout(interval);

            expect(post.isCalled).to.be.false;
        });

        it('create makes correct API call for logged in user [ 10 Points ]', async () => {
            const data = mockData.catalog[0];
            const { post } = await createHandler(endpoints.create, { post: data });

            await page.click('text=Add Book');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');
            await page.fill('[name="title"]', data.title);
            await page.fill('[name="imageUrl"]', data.imageUrl);
            await page.selectOption('#type', { value: data.type });
            await page.fill('[name="description"]', data.description);

            const [request] = await Promise.all([
                post.waitForRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());

            expect(postData.title).to.equal(data.title);
            expect(postData.type).to.equal(data.type);
            expect(postData.description).to.equal(data.description);
            expect(postData.imageUrl).to.equal(data.imageUrl);
        });

        it('non-author does NOT see delete and edit buttons [ 5 Points ]', async () => {
            const data = mockData.catalog[2];
            await page.click('nav >> text=Dashboard');
            await page.waitForTimeout(interval);

            await page.waitForSelector('#dashboard-page');
            await page.click(`#dashboard-page > ul li:has-text("${data.title}") >> text=Details`);

            await page.waitForTimeout(interval);

            expect(await page.isVisible('text="Delete"')).to.be.false;
            expect(await page.isVisible('text="Edit"')).to.be.false;

        });

        it('author sees delete and edit buttons [ 5 Points ]', async () => {
            const data = mockData.catalog[1];
            await page.click('nav >> text=Dashboard');
            await page.waitForTimeout(interval);

            await page.waitForSelector('#dashboard-page');
            await page.click(`#dashboard-page > ul li:has-text("${data.title}") >> text=Details`);
            await page.waitForTimeout(interval);

            expect(await page.isVisible('text="Delete"')).to.be.true;
            expect(await page.isVisible('text="Edit"')).to.be.true;
        });

        it('edit should populate form with correct data [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            await createHandler(endpoints.details(data._id), { get: data });

            await page.click('nav >> text=Dashboard');
            await page.waitForTimeout(interval);

            await page.waitForSelector('#dashboard-page');
            await page.click(`#dashboard-page > ul li:has-text("${data.title}") >> text=Details`);
            await page.waitForTimeout(interval);

            await page.click('text=Edit');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');

            const formData = {
                title: await page.$eval('[name="title"]', t => t.value),
                type: await page.$eval('[name="type"]', t => t.value),
                imageUrl: await page.$eval('[name="imageUrl"]', t => t.value),
                description: await page.$eval('[name="description"]', t => t.value)
            };
            expect(formData.title).to.equal(data.title);
            expect(formData.type).to.equal(data.type);
            expect(formData.imageUrl).to.equal(data.imageUrl);
            expect(formData.description).to.equal(data.description);
        });

        it('edit does NOT work with empty fields [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            const { put } = await createHandler(endpoints.details(data._id), { get: data, put: '' });

            await page.click('nav >> text=Dashboard');
            await page.waitForTimeout(interval);

            await page.waitForSelector('#dashboard-page');
            await page.click(`#dashboard-page > ul li:has-text("${data.title}") >> text=Details`);
            await page.waitForTimeout(interval);

            await page.click('text=Edit');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');
            await page.fill('[name="title"]', '');
            await page.fill('[name="imageUrl"]', '');
            await page.fill('[name="description"]', '');

            await page.click('[type="submit"]');
            await page.waitForTimeout(interval);

            expect(put.isCalled).to.be.false;
        });

        it('edit makes correct API call for logged in user [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            const { put } = await createHandler(endpoints.details(data._id), { get: data, put: '' });

            await page.click('nav >> text=Dashboard');
            await page.waitForTimeout(interval);

            await page.waitForSelector('#dashboard-page');
            await page.click(`#dashboard-page > ul li:has-text("${data.title}") >> text=Details`);
            await page.waitForTimeout(interval);

            await page.click('text=Edit');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');

            await page.fill('[name="title"]', data.title + 'edit');
            await page.selectOption('#type', { value: 'Other' });
            await page.fill('[name="description"]', data.description + 'edit');

            const [request] = await Promise.all([
                put.waitForRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());

            expect(postData.title).to.contains(data.title + 'edit');
            expect(postData.imageUrl).to.contains(data.imageUrl);
            expect(postData.type).to.contains('Other');
            expect(postData.description).to.contains(data.description + 'edit');
        });

        it('delete makes correct API call for logged in user [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            const { delete: del } = await createHandler(endpoints.details(data._id), { get: data, delete: '' });

            await page.click('nav >> text=Dashboard');
            await page.waitForTimeout(interval);

            await page.waitForSelector('#dashboard-page');
            await page.click(`#dashboard-page > ul li:has-text("${data.title}") >> text=Details`);
            await page.waitForTimeout(interval);

            page.on('dialog', dialog => dialog.accept());

            await Promise.all([
                del.waitForResponse(),
                page.click('text="Delete"')
            ]);

            expect(del.isCalled).to.be.true;``
        });
    });

    describe('My Books Page [ 10 Points ]', async () => {
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

        it('the logged-in user should be able to see his/her own books (test with 2 books) [ 2.5 Points ]', async () => {
            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=My Books');
            await page.waitForTimeout(interval);

            const titles = await page.$$eval('#my-books-page ul li', t => t.map(s => s.textContent));
            expect(titles.length).to.equal(2);
            expect(await page.isVisible('text=No books in database!')).to.be.false;
        });

        it('the logged-in user should be able to see "No books in database!" (test with 0 books) [ 2.5 Points ]', async () => {
            await createHandler(endpoints.profile('0001'), { get: [] });
            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=My Books');
            await page.waitForTimeout(interval);

            const titles = await page.$$eval('#my-books-page ul li', t => t.map(s => s.textContent));
            expect(titles.length).to.equal(0);
            expect(await page.isVisible('text=No books in database!')).to.be.true;
        });

        it('the logged-in user should be able to view his/her own books - detailed information [ 2.5 Points ]', async () => {
            const mock = mockData.catalog.slice(2);
            await createHandler(endpoints.profile('0001'), { get: mock });
            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=My Books');
            await page.waitForTimeout(interval);

            const titles = await page.$$eval('#my-books-page ul li', t => t.map(s => s.textContent));
            const firstImg = await page.getAttribute(`.my-books-list > li:has-text("${mock[0].title}") img`, 'src');
            const secodnImg = await page.getAttribute(`.my-books-list > li:has-text("${mock[1].title}") img`, 'src');
            const thirdImg = await page.getAttribute(`.my-books-list > li:has-text("${mock[2].title}") img`, 'src');
            await page.waitForTimeout(interval);

            expect(titles.length).to.equal(3);
            expect(titles[0]).to.contains(mock[0].title);
            expect(titles[0]).to.contains(mock[0].type);
            expect(titles[1]).to.contains(mock[1].title);
            expect(titles[1]).to.contains(mock[1].type);
            expect(titles[2]).to.contains(mock[2].title);
            expect(titles[2]).to.contains(mock[2].type);
            expect(firstImg).to.contains(mock[0].imageUrl);
            expect(secodnImg).to.contains(mock[1].imageUrl);
            expect(thirdImg).to.contains(mock[2].imageUrl);
        });

        it('the logged-in user should be redirected to the Details page after click on the button "Details" [ 2.5 Points ]', async () => {
            const data = mockData.catalog[0];
            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=My Books');
            await page.waitForTimeout(interval);

            await page.click(`.my-books-list > li:has-text("${data.title}") >> text=Details`);
            await page.waitForTimeout(interval);
            await page.waitForSelector('.book-information');

            expect(await page.isVisible('text="Delete"')).to.be.true;
            expect(await page.isVisible('text="Edit"')).to.be.true;
        });

    });

    describe('BONUS : Like functionality  [ 15 Points ]', async () => {

        it('Like button is not visible for guest users [ 2.5 Points ]', async () => {
            const data = mockData.catalog[0];
            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('nav >> text=Dashboard');
            await page.waitForTimeout(interval);
            await page.waitForSelector('#dashboard-page');
            await page.click(`#dashboard-page > ul li:has-text("${data.title}") >> text=Details`);
            await page.waitForTimeout(interval);
            const likes = await page.$$eval('.actions .likes', t => t.map(s => s.textContent));

            expect(await page.isVisible('.actions .button >> text="Like"')).to.be.false;
            expect(likes[0]).to.contains('Likes: 6');
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

            await page.click('nav >> text=Dashboard');
            await page.click(`#dashboard-page > ul li:has-text("${data.title}") >> text=Details`);
            await page.waitForTimeout(interval);
            const likes = await page.$$eval('.actions .likes', t => t.map(s => s.textContent));
            expect(await page.isVisible('.actions .button >> text="Like"')).to.be.true;
            expect(likes[0]).to.contains('Likes: 7');
        });

        it('Like button is not visible for the creator [ 2.5 Points ]', async () => {
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

            await page.click('nav >> text=Dashboard');
            await page.click(`#dashboard-page > ul li:has-text("${data.title}") >> text=Details`);
            await page.waitForTimeout(interval);
            const likes = await page.$$eval('.actions .likes', t => t.map(s => s.textContent));
            expect(await page.isVisible('.actions .button >> text="Like"')).to.be.false;
            expect(likes[0]).to.contains('Likes: 6');
        });

        it('Like button should be hidden(not visible) after a click on it [ 2.5 Points ]', async () => {
            // Login user
            const { post } = await createHandler(endpoints.like, { post: mockData.likes[2] });
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

            await page.click('nav >> text=Dashboard');
            await page.waitForTimeout(interval);
            await page.click(`#dashboard-page > ul li:has-text("${data.title}") >> text=Details`);
            await page.waitForTimeout(interval);
            expect(await page.isVisible('.actions >> text="Like"')).to.be.true;

            await createHandler(endpoints.own('1003', '0001'), { get: 1 }, page);
            const [request] = await Promise.all([
                post.waitForRequest(),
                page.click('.actions >> text="Like"')
            ]);

            const postData = JSON.parse(request.postData());

            await page.waitForTimeout(interval);
            expect(postData.bookId).to.equal(mockData.likes[2].bookId);
            expect(await page.isVisible('.actions >> text="Like"')).to.be.false;
            await createHandler(endpoints.own('1003', '0001'), { get: 1 }, page);

            await page.click('nav >> text=Dashboard');
            await page.waitForTimeout(interval);
            await page.click(`#dashboard-page > ul li:has-text("${data.title}") >> text=Details`);
            await page.waitForTimeout(interval);
            expect(await page.isVisible('.actions >> text="Like"')).to.be.false;

        });

        it('Like button should increase total likes by 1 after a click on it [ 5 Points ]', async () => {
            // Login user
            const { post } = await createHandler(endpoints.like, { post: mockData.likes[2] });
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

            await page.click('nav >> text=Dashboard');
            await page.waitForTimeout(interval);
            await page.click(`#dashboard-page > ul li:has-text("${data.title}") >> text=Details`);
            await page.waitForTimeout(interval);

            let likes = await page.$$eval('.actions .likes', t => t.map(s => s.textContent));
            expect(likes[0]).to.contains('Likes: 7');

            await createHandler(endpoints.own('1003', '0001'), { get: 1 }, page);
            await createHandler(endpoints.total('1003'), { get: 8 }, page);

            const [request] = await Promise.all([
                post.waitForRequest(),
                page.click('.actions >> text="Like"')
            ]);

            await page.waitForTimeout(interval);
            likes = await page.$$eval('.actions .likes', t => t.map(s => s.textContent));
            expect(likes[0]).to.contains('Likes: 8');
        });

    });
});

async function setupContext(context) {
    // Authentication
    await createHandler(endpoints.login, { post: mockData.users[0] }, context);
    await createHandler(endpoints.register, { post: mockData.users[0] }, context);
    await createHandler(endpoints.logout, { get: { data: '', options: { json: false, status: 204 } } }, context);

    await createHandler(endpoints.profile('0001'), { get: mockData.catalog.slice(0, 2) }, context);

    await createHandler(endpoints.total('1001'), { get: 6 }, context);
    await createHandler(endpoints.total('1002'), { get: 4 }, context);
    await createHandler(endpoints.total('1003'), { get: 7 }, context);
    await createHandler(endpoints.total('1004'), { get: 7 }, context);
    await createHandler(endpoints.total('1005'), { get: 7 }, context);

    await createHandler(endpoints.own('1001', '0001'), { get: 1 }, context);
    await createHandler(endpoints.own('1002', '0001'), { get: 0 }, context);
    await createHandler(endpoints.own('1003', '0001'), { get: 0 }, context);
    await createHandler(endpoints.own('1004', '0002'), { get: 0 }, context);
    await createHandler(endpoints.own('1005', '0002'), { get: 0 }, context);
    // Catalog and Details

    await createHandler(endpoints.catalog, { get: mockData.catalog }, context);
    await createHandler(endpoints.details('1001'), { get: mockData.catalog[0] }, context);
    await createHandler(endpoints.details('1002'), { get: mockData.catalog[1] }, context);
    await createHandler(endpoints.details('1003'), { get: mockData.catalog[2] }, context);
    await createHandler(endpoints.details('1004'), { get: mockData.catalog[3] }, context);
    await createHandler(endpoints.details('1005'), { get: mockData.catalog[4] }, context);

    // Block external calls
    await context.route(url => url.href.slice(0, host.length) != host, route => {
        if (DEBUG) {
            console.log('Preventing external call to ' + route.request().url());
        }
        route.abort();
    });
}

/**
 * @typedef {Object} MethodHandler
 * @property {() => Promise<Request>} waitForRequest
 * @property {() => Promise<Response>} waitForResponse
 * @property {boolean} isCalled
 */

/**
 * @typedef {Object} RequestHandler
 * @property {MethodHandler} get
 * @property {MethodHandler} post
 * @property {MethodHandler} put
 * @property {MethodHandler} patch
 * @property {MethodHandler} delete
 */

/**
 * @typedef {Object} MockResponse
 * @property {*?} data Data to include in the response body
 * @property {{json: boolean, status: number}?} options Response options
 */

/**
 * @typedef ResponseDescriptor
 * @property {?MockResponse|Object} get
 * @property {?MockResponse|Object} post
 * @property {?MockResponse|Object} put
 * @property {?MockResponse|Object} patch
 * @property {?MockResponse|Object} delete
 */

/**
 * Mock server serponse at specified path and methods
 * @param {string} match Path to resource. Partial match will be performed
 * @param {ResponseDescriptor?} handlers Optional. Methods to handle and response to return
 * @param {Object?} context Optional. Context to which the handler will be attached
 * @returns {Promise<RequestHandler>}
 */
async function createHandler(match, handlers = {}, context) {
    const methodHandlers = {};
    const result = {};
    ['get', 'post', 'put', 'patch', 'delete'].forEach(method => Object.defineProperty(result, method, {
        get: () => undefined,
        set: (value) => createMethodHandler(method, ...parseOptions(value)),
        configurable: true
    }));

    context = context || page;
    Object.entries(handlers).forEach(([k, v]) => result[k] = v);

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


    return result;

    function createMethodHandler(method, returns, options) {
        let called = false;

        method = method.toLowerCase();
        methodHandlers[method] = (route, request) => {
            called = true;
            route.fulfill(respond(returns, options));
        };

        const props = {
            waitForRequest: () => context.waitForRequest(urlPredicate),
            waitForResponse: () => context.waitForResponse(urlPredicate)
        };
        Object.defineProperty(props, 'isCalled', { get: () => called });
        Object.defineProperty(result, method, { get: () => props });
    }

    function parseOptions(value) {
        if (value.hasOwnProperty('data') && value.hasOwnProperty('options')) {
            return [value.data, value.options];
        } else {
            return [value];
        }
    }

    function urlPredicate(current) {
        const url = (current instanceof URL ? current.href : current.url()).toLowerCase();
        return url.slice(-match.length) == match.toLowerCase();
    }
}

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
