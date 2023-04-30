
const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)
const DEBUG = false;

const mockData = require('./mock-data.json');
const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    memes: '/data/memes?sortBy=_createdOn%20desc',
    create: '/data/memes',
    details: '/data/memes/',
    delete: '/data/memes/',
    profile: '/data/memes?where=_ownerId%3D%220002%22&sortBy=_createdOn%20desc'
};


function json(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}

let browser;
let context;
let page;

describe('E2E tests', function () {
    if (DEBUG) {
        this.timeout(120000);
    } else {
        this.timeout(6000);
    }

    before(async () => {
        if (DEBUG) {
            browser = await chromium.launch({ headless: false, slowMo: 500 });
        } else {
            browser = await chromium.launch();
        }
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();

        await context.route('**' + endpoints.memes, route => route.fulfill(json(mockData)));
        await context.route('**' + endpoints.details + '*', route => route.fulfill(json(mockData[0])));
        // Block external calls

        await context.route(url => url.href.slice(0, host.length) != host, route => {
            if (DEBUG) {
                console.log('aborting', route.request().url());
            }
            route.abort();
        });


        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });
    describe('Authentication [ 20 Points ]', () => {
        it('register does not work with empty fields [ 5 Points ]', async () => {
            const endpoint = '**' + endpoints.register;
            let called = false;
            page.route(endpoint, route => called = true);

            await page.goto(host);
            await page.click('text=Register');

            await page.waitForTimeout(300);
            await page.waitForSelector('form');

            await page.click('[type="submit"]');

            await page.waitForTimeout(300);

            expect(called).to.be.false;
        });

        it('register makes correct API call [ 5 Points ]', async () => {
            const endpoint = '**' + endpoints.register;
            const username = 'Ivan';
            const email = 'ivan@mail.bg';
            const password = '345321';

            page.route(endpoint, route => route.fulfill(json({ _id: '0001', email, accessToken: 'AAAA' })));

            await page.goto(host);
            await page.click('text=Register');

            await page.waitForTimeout(300);
            await page.waitForSelector('form');


            await page.fill('[name="username"]', username);
            await page.fill('[name="email"]', email);
            await page.fill('[name="password"]', password);
            await page.fill('[name="repeatPass"]', password);
            await page.check('#male');

            await page.waitForTimeout(300);

            const [response] = await Promise.all([
                page.waitForResponse(endpoint),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(response.request().postData());

            expect(postData.email).to.equal(email);
            expect(postData.password).to.equal(password);
        });

        it('login makes correct API call [ 5 Points ]', async () => {
            const endpoint = '**' + endpoints.login;
            const email = 'ivan@mail.bg';
            const password = '345321';

            page.route(endpoint, route => route.fulfill(json({ _id: '0001', email, accessToken: 'AAAA' })));

            await page.goto(host);
            await page.click('#button-div >> text="Login"');

            await page.waitForTimeout(300);
            await page.waitForSelector('form');

            await page.fill('[name="email"]', email);
            await page.fill('[name="password"]', password);

            await page.waitForTimeout(300);

            const [response] = await Promise.all([
                page.waitForResponse(endpoint),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(response.request().postData());
            expect(postData.email).to.equal(email);
            expect(postData.password).to.equal(password);
        });

        it('logout makes correct API call [ 5 Points ]', async () => {
            const loginEndpoint = '**' + endpoints.login;
            const email = 'ivan@mail.bg';
            const password = '345321';

            page.route(loginEndpoint, route => route.fulfill(json({ _id: '0001', email, accessToken: 'AAAA' })));

            await page.goto(host);
            await page.click('#button-div >> text="Login"');

            await page.waitForTimeout(300);
            await page.waitForSelector('form');

            await page.fill('[name="email"]', email);
            await page.fill('[name="password"]', password);
            await page.waitForTimeout(300);


            await Promise.all([
                page.waitForResponse(loginEndpoint),
                page.click('[type="submit"]')
            ]);

            const endpoint = '**' + endpoints.logout;
            await page.waitForTimeout(300);

            const [request] = await Promise.all([
                page.waitForRequest(endpoint),
                page.click('nav >> text="Logout"')
            ]);

            const token = request.headers()['x-authorization'];
            expect(request.method()).to.equal('GET');
            expect(token).to.equal('AAAA');
        });
    });

    describe('Navigation bar [ 5 Points ]', () => {
        const email = 'ivan@mail.bg';
        const password = '345321';

        it('logged user should see correct navigation [ 2.5 Points ]', async () => {
            // Login user
            const endpoint = '**' + endpoints.login;

            page.route(endpoint, route => route.fulfill(json({ _id: '0001', email, accessToken: 'AAAA' })));

            await page.goto(host);
            await page.click('#button-div >> text="Login"');

            await page.waitForTimeout(300);
            await page.waitForSelector('form');

            await page.fill('[name="email"]', email);
            await page.fill('[name="password"]', password);

            await page.waitForTimeout(300);

            await Promise.all([
                page.waitForResponse(endpoint),
                page.click('[type="submit"]')
            ]);
            //Test for navigation
            await page.waitForTimeout(300);

            expect(await page.isVisible('nav >> text="All Memes"')).to.be.true;
            expect(await page.isVisible('nav >> text="Create Meme"')).to.be.true;
            expect(await page.isVisible('nav >> text="My Profile"')).to.be.true;
            expect(await page.isVisible('nav >> text="Logout"')).to.be.true;

            expect(await page.isVisible('nav >> text="Login"')).to.be.false;
            expect(await page.isVisible('nav >> text="Register"')).to.be.false;
            expect(await page.isVisible('nav >> text="Home Page"')).to.be.false;

        });

        it('guest user should see correct navigation [ 2.5 Points ]', async () => {
            await page.goto(host);

            await page.waitForTimeout(300);

            expect(await page.isVisible('text="All Memes"')).to.be.true;
            expect(await page.isVisible('text="Create Meme"')).to.be.false;
            expect(await page.isVisible('text="My Profile"')).to.be.false;
            expect(await page.isVisible('text="Logout"')).to.be.false;

            expect(await page.isVisible('text="Login"')).to.be.true;
            expect(await page.isVisible('text="Register"')).to.be.true;
            expect(await page.isVisible('text="Home Page"')).to.be.true;
        });
    });

    describe('Catalog [ 25 Points ]', () => {
        it('loads static home page [ 5 Points ]', async () => {
            await page.goto(host);

            await page.waitForSelector('text=Welcome to Meme Lounge');
            await page.waitForTimeout(300);

            expect(await page.isVisible('text=Login to see our memes')).to.be.true;
            expect(await page.isVisible('#button-div >> text=Login')).to.be.true;
            expect(await page.isVisible('#button-div >> text=Register')).to.be.true;
        });

        it('show most recent memes [ 10 Points ]', async () => {
            await page.goto(host);
            await page.click('text=All Memes');
            await page.waitForTimeout(300);

            const titles = await page.$$eval('#memes .meme-title', t => t.map(s => s.textContent));

            await page.waitForTimeout(300);

            expect(titles.length).to.equal(6);
            expect(titles[0]).to.contains('test');
            expect(titles[1]).to.contains('meme 2');
            expect(titles[2]).to.contains('test 3');
            expect(titles[3]).to.contains('meme 4');
            expect(titles[4]).to.contains('test 5');
        });

        it('show meme details [ 5 Points ]', async () => {

            await page.goto(host);
            await page.click('text=All Memes');

            await page.waitForTimeout(300);

            await page.route('**' + endpoints.details + '*', route => route.fulfill(json(mockData[3])));
            await page.click('.meme:has-text("meme 4") >> text="Details"');

            await page.waitForTimeout(300);

            await page.waitForSelector('#meme-details > h1:has-text("meme 4")');
            await page.waitForSelector('.meme-description >p:has-text("description 4")');

            const title = await page.textContent('h1');
            const desc = await page.textContent('.meme-description >p');
            const img = await page.getAttribute('.meme-img >img', 'src');

            await page.waitForTimeout(300);

            expect(title).to.contains(mockData[3].title);
            expect(desc).to.contains(mockData[3].description);
            expect(img).to.contains(mockData[3].imageUrl);
        });

        it('guest does NOT see delete button [ 5 Points ]', async () => {

            await page.goto(host);
            await page.click('text=All Memes');

            await page.waitForTimeout(300);

            await page.click('.meme:first-child >> text="Details"');

            await page.waitForTimeout(300);

            expect(await page.isVisible('text="Delete"')).to.be.false;
            expect(await page.isVisible('text="Edit"')).to.be.false;

        });
    });

    describe('CRUD [ 40 Points ]', () => {
        const email = 'ivan@mail.bg';
        const password = '345321';

        // Login user
        beforeEach(async () => {
            const loginEndpoint = '**' + endpoints.login;

            page.route(loginEndpoint, route => route.fulfill(json({ _id: '0001', email, accessToken: 'AAAA' })));

            await page.goto(host);
            await page.click('#button-div >> text="Login"');

            await page.waitForSelector('form');

            await page.fill('[name="email"]', email);
            await page.fill('[name="password"]', password);

            await Promise.all([
                page.waitForResponse(loginEndpoint),
                page.click('[type="submit"]')
            ]);

        });

        it('create does NOT work with empty fields [ 5 Points ]', async () => {
            const endpoint = '**' + endpoints.create;
            let called = false;
            await page.waitForTimeout(300);

            await page.click('text="Create Meme"');
            await page.waitForSelector('form');

            page.route(endpoint, route => called = true);

            page.click('[type="submit"]');

            await page.waitForTimeout(300);

            expect(called).to.be.false;
        });

        it('create makes correct API call for logged in user [ 10 Points ]', async () => {
            const endpoint = '**' + endpoints.create;
            const mock = mockData[5];

            page.route(endpoint, route => route.fulfill(json(mock)));
            await page.waitForTimeout(300);

            await page.click('text=Create Meme');

            await page.waitForSelector('form');

            await page.fill('[name="title"]', mock.title);
            await page.fill('[name="description"]', mock.description);
            await page.fill('[name="imageUrl"]', mock.imageUrl);

            await page.waitForTimeout(300);

            const [response] = await Promise.all([
                page.waitForResponse(endpoint),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(response.request().postData());

            expect(postData.title).to.equal(mock.title);
            expect(postData.description).to.equal(mock.description);
            expect(postData.imageUrl).to.equal(mock.imageUrl);
        });

        it('non-author does NOT see delete and edit buttons [ 2.5 Points ]', async () => {
            const mock = Object.assign({}, mockData[4], { _ownerId: '0002' }); // Replace mock with non-owned object

            await page.goto(host);
            await page.click('text=All Memes');
            await page.waitForTimeout(300);

            await page.route('**' + endpoints.details + '*', route => route.fulfill(json(mock)));
            await page.click('.meme:has-text("meme 4") >> text="Details"');
            await page.waitForTimeout(300);

            await page.waitForSelector('h2:has-text("Meme Description")');

            expect(await page.isVisible('text="Delete"')).to.be.false;
            expect(await page.isVisible('text="Edit"')).to.be.false;
        });

        it('author sees delete and edit buttons [ 2.5 Points ]', async () => {
            const mock = mockData[5];
            await page.waitForTimeout(300);

            await page.click('text=All Memes');
            await page.waitForTimeout(300);

            await page.route('**' + endpoints.details + '*', route => route.fulfill(json(mock)));
            await page.click('.meme:has-text("My New Meme") >> text="Details"');
            await page.waitForTimeout(300);

            await page.waitForSelector('#meme-details > h1:has-text("Meme Title: My New Meme")');
            await page.waitForSelector('.meme-description >p:has-text("some description about this Meme")');

            expect(await page.isVisible('text="Delete"')).to.be.true;
            expect(await page.isEnabled('text="Delete"')).to.be.true;
            expect(await page.isVisible('text="Edit"')).to.be.true;
            expect(await page.isEnabled('text="Edit"')).to.be.true;
        });

        it('delete makes correct API call for logged in user [ 5 Points ]', async () => {
            const mock = mockData[5];
            await page.waitForTimeout(300);

            await page.click('text=All Memes');
            await page.waitForTimeout(300);

            await page.route('**' + endpoints.details + '*', route => route.fulfill(json(mock)));
            await page.click('.meme:has-text("My New Meme") >> text="Details"');
            await page.waitForSelector('#meme-details > h1:has-text("Meme Title: My New Meme")');

            page.on('dialog', dialog => dialog.accept());
            await page.waitForTimeout(300);

            const [request] = await Promise.all([
                page.waitForRequest('**' + endpoints.delete + '74463e5b-b893-44e8-bd14-5fc8feeddb94'),
                page.click('text="Delete"')
            ]);

            expect(request.method()).to.equal('DELETE');
        });

        it('edit does NOT work with empty fields [ 5 Points ]', async () => {
            const endpoint = endpoints.details;
            await page.waitForTimeout(300);

            await page.click('text=All Memes');

            await page.waitForTimeout(300);

            await page.route('**' + endpoints.details + '*', route => route.fulfill(json(mockData[5])));
            await page.click('.meme:has-text("test 5") >> text="Details"');

            await page.waitForTimeout(300);

            await page.click('text="Edit"');
            await page.waitForTimeout(300);

            let called = false;
            page.route(endpoint, route => called = true);

            await page.fill('[name="title"]', '');
            await page.fill('[name="description"]', '');
            await page.fill('[name="imageUrl"]', '');

            page.click('[type="submit"]');

            await page.waitForTimeout(300);

            expect(called).to.be.false;
        });

        it('edit should populate form with correct data [ 5 Points ]', async () => {
            const endpoint = endpoints.details;

            await page.waitForTimeout(300);
            await page.click('text=All Memes');

            await page.waitForTimeout(300);

            await page.route('**' + endpoints.details + '*', route => route.fulfill(json(mockData[5])));
            await page.click('.meme:has-text("test 5") >> text="Details"');

            await page.waitForTimeout(300);

            await page.click('text="Edit"');

            await page.waitForTimeout(300);

            const inputs = await page.$$eval('.container input', t => t.map(i => i.value));
            const textArea = await page.$eval('.container textarea', i => i.value);

            await page.waitForTimeout(300);

            expect(inputs[0]).to.contains(mockData[5].title);
            expect(inputs[1]).to.contains(mockData[5].imageUrl);
            expect(textArea).to.contains(mockData[5].description);
        });

        it('edit makes correct API call for logged in user [ 5 Points ]', async () => {
            const endpoint = endpoints.details;
            await page.waitForTimeout(300);

            await page.click('text=All Memes');

            await page.waitForTimeout(300);
            await page.route('**' + endpoint + '*', route => route.fulfill(json(mockData[5])));
            await page.click('.meme:has-text("My New Meme") >> text="Details"');

            await page.waitForTimeout(300);

            await page.click('text="Edit"');
            await page.waitForTimeout(300);

            await page.fill('[name="title"]', mockData[0].title);
            await page.fill('[name="description"]', mockData[0].description);
            await page.fill('[name="imageUrl"]', mockData[0].imageUrl);

            await page.waitForTimeout(300);

            const [request] = await Promise.all([
                page.waitForRequest('**' + endpoint + '74463e5b-b893-44e8-bd14-5fc8feeddb94'),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());

            expect(request.method()).to.equal('PUT');
            expect(postData.title).to.contains(mockData[0].title);
            expect(postData.description).to.contains(mockData[0].description);
            expect(postData.imageUrl).to.equal(mockData[0].imageUrl);

        });

    });

    describe('User Profile Page [ 10 Points ]', async () => {
        const email = 'merry@mail.bg';
        const username = 'Merry';
        const password = '123456';
        const loginEndpoint = '**' + endpoints.login;

        // Login user
        beforeEach(async () => {
            page.route(loginEndpoint, route => route.fulfill(json({ _id: '0002', gender: 'female', username, email, accessToken: 'AAAA' })));

            await page.goto(host);
            await page.click('#button-div >> text="Login"');

            await page.waitForSelector('form');
            await page.waitForTimeout(300);

            await page.fill('[name="email"]', email);
            await page.fill('[name="password"]', password);

            await page.waitForTimeout(300);

            await Promise.all([
                page.waitForResponse(loginEndpoint),
                page.click('[type="submit"]')
            ]);

        });

        it('check profile page information - with 0 memes [ 5 Points ]', async () => {
            await page.route('**' + endpoints.profile, route => route.fulfill(json([])));
            await page.waitForTimeout(300);
            await page.click('text="My Profile"');

            await page.waitForTimeout(300);

            const values = await page.$$eval('.user-info p', p => p.map(p => p.textContent));
            const img = await page.getAttribute('#user-avatar-url', 'src');

            expect(values[0]).to.contains(username);
            expect(values[1]).to.contains(email);
            expect(values[2]).to.equal('My memes count: 0');
            expect(img).to.contains('/images/female.png');

        });

        it('check profile page for "No memes in database." - with 0 memes [ 2.5 Points ]', async () => {
            await page.waitForTimeout(300);

            await page.route('**' + endpoints.profile, route => route.fulfill(json([])));
            await page.click('text="My Profile"');

            await page.waitForTimeout(300);

            const userMemes = await page.textContent('.no-memes');

            await page.waitForTimeout(300);
            expect(userMemes).to.contains('No memes in database.');

        });

        it('check profile page information - with 2 memes [ 2.5 Points ]', async () => {
            await page.route('**' + endpoints.profile, route => route.fulfill(json([mockData[0], mockData[1]])));

            await page.waitForTimeout(300);

            await page.click('text="My Profile"');
            await page.waitForTimeout(300);

            const memes = await page.$$eval('.user-meme-listings .user-meme', p => p.map(p => p.textContent));
            await page.waitForTimeout(300);

            expect(memes.length).to.equal(2);
            expect(memes[0]).to.contains('test');
            expect(memes[1]).to.contains('meme 2');


        });
    });

    describe('BONUS: Notifications [ 10 Points ]', () => {
        it('Login notification with invalid data [ 2.5 Points ]', async () => {
            const endpoint = '**' + endpoints.login;
            let called = false;
            page.route(endpoint, route => called = true);

            await page.goto(host);
            await page.click('#button-div >> text="Login"');

            await page.waitForTimeout(300);
            await page.waitForSelector('form');

            const preClickNotification = await page.isVisible('#errorBox');
            expect(preClickNotification).to.be.false;

            await page.click('[type="submit"]');
            await page.waitForTimeout(300);

            const notification = await page.isVisible('#errorBox');
            expect(notification).to.be.true;

        });

        it('Register notification with invalid data [ 2.5 Points ]', async () => {
            const endpoint = '**' + endpoints.register;
            let called = false;
            page.route(endpoint, route => called = true);

            await page.goto(host);
            await page.click('#button-div >> text="Register"');

            await page.waitForTimeout(300);
            await page.waitForSelector('form');

            const preClickNotification = await page.isVisible('#errorBox');
            expect(preClickNotification).to.be.false;

            await page.click('[type="submit"]');
            await page.waitForTimeout(300);

            const notification = await page.isVisible('#errorBox');
            expect(notification).to.be.true;
        });

        it('Create notification with invalid data [ 2.5 Points ]', async () => {
            // Login user
            const email = 'peter@abv.bg';
            const password = '123456';
            const longEndpoint = '**' + endpoints.login;

            page.route(longEndpoint, route => route.fulfill(json({ _id: '0001', email, accessToken: 'AAAA' })));

            await page.goto(host);
            await page.click('#button-div >> text="Login"');

            await page.waitForTimeout(300);
            await page.waitForSelector('form');

            await page.fill('[name="email"]', email);
            await page.fill('[name="password"]', password);
            await page.waitForTimeout(300);

            await Promise.all([
                page.waitForResponse(longEndpoint),
                page.click('[type="submit"]')
            ]);

            //Test
            await page.waitForTimeout(300);
            const endpoint = '**' + endpoints.details;
            let called = false;
            page.route(endpoint, route => called = true);

            await page.click('nav >> text="Create Meme"');

            await page.waitForTimeout(300);

            const preClickNotification = await page.isVisible('#errorBox');
            expect(preClickNotification).to.be.false;

            await page.click('[type="submit"]');
            await page.waitForTimeout(300);

            const notification = await page.isVisible('#errorBox');
            expect(notification).to.be.true;
        });
        
        it('Edit notification with invalid data [ 2.5 Points ]', async () => {
            // Login user
            const email = 'peter@abv.bg';
            const password = '123456';
            const longEndpoint = '**' + endpoints.login;

            page.route(longEndpoint, route => route.fulfill(json({ _id: '0001', email, accessToken: 'AAAA' })));

            await page.goto(host);
            await page.click('#button-div >> text="Login"');

            await page.waitForTimeout(300);
            await page.waitForSelector('form');

            await page.fill('[name="email"]', email);
            await page.fill('[name="password"]', password);

            await page.waitForTimeout(300);

            await Promise.all([
                page.waitForResponse(longEndpoint),
                page.click('[type="submit"]')
            ]);

            //Test
            const endpoint = endpoints.details;
            await page.waitForTimeout(300);

            await page.click('text=All Memes');

            await page.waitForTimeout(300);
            await page.route('**' + endpoints.details + '*', route => route.fulfill(json(mockData[5])));

            await page.click('.meme:has-text("My New Meme") >> text="Details"');

            await page.waitForTimeout(300);

            await page.click('text="Edit"');
            await page.waitForTimeout(300);

            const preClickNotification = await page.isVisible('#errorBox');
            expect(preClickNotification).to.be.false;

            await page.fill('[name="title"]', '');
            await page.fill('[name="description"]', '');
            await page.fill('[name="imageUrl"]', '');
            await page.waitForTimeout(300);

            page.click('[type="submit"]');
            await page.waitForTimeout(300);

            const notification = await page.isVisible('#errorBox');
            expect(notification).to.be.true;
        });
    });

});
