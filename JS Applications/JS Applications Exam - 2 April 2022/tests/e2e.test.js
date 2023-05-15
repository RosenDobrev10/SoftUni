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
  catalog: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
  create: '/data/pets',
  donation: '/data/donation',
  details: (id) => `/data/pets/${id}`,
  delete: (id) => `/data/pets/${id}`,
  total: (petId) => `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
  own: (petId, userId) =>
    `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

let browser;
let context;
let page;

describe('E2E tests', function () {
  // Setup
  this.timeout(DEBUG ? 120000 : 7000);
  before(async () => (browser = await chromium.launch(DEBUG ? { headless: false, slowMo } : {})));
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

      const [request] = await Promise.all([onRequest(), page.click('[type="submit"]')]);

      const postData = JSON.parse(request.postData());

      expect(postData.email).to.equal(data.email);
      expect(postData.password).to.equal(data.password);
    });

    it('Login does NOT work with empty fields [ 2.5 Points ]', async () => {
      const { post } = await handle(endpoints.login);
      const isCalled = post().isHandled;

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

      const [request] = await Promise.all([onRequest(), page.click('[type="submit"]')]);

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

      await Promise.all([onResponse(), page.click('[type="submit"]')]);

      await page.waitForTimeout(interval);

      const [request] = await Promise.all([onRequest(), page.click('nav >> text=Logout')]);

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
      expect(await page.isVisible('nav >> text=Home')).to.be.true;
      expect(await page.isVisible('nav >> text=Dashboard')).to.be.true;
      expect(await page.isVisible('nav >> text=Create Postcard')).to.be.true;
      expect(await page.isVisible('nav >> text=Logout')).to.be.true;

      expect(await page.isVisible('nav >> text=Login')).to.be.false;
      expect(await page.isVisible('nav >> text=Register')).to.be.false;
    });

    it('Guest user should see correct navigation [ 2.5 Points ]', async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);
      expect(await page.isVisible('nav >> text=Home')).to.be.true;
      expect(await page.isVisible('nav >> text=Dashboard')).to.be.true;
      expect(await page.isVisible('nav >> text=Create Event')).to.be.false;
      expect(await page.isVisible('nav >> text=Logout')).to.be.false;

      expect(await page.isVisible('nav >> text=Login')).to.be.true;
      expect(await page.isVisible('nav >> text=Register')).to.be.true;
    });
  });

  describe('Home Page [ 10 Points ]', () => {
    it('Show home page - Welcome [ 5 Points ]', async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);

      expect(await page.isVisible('text=We Care Your Pets')).to.be.true;
    });

    it('Show home page - Name [ 5 Points ]', async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);

      expect(
        await page.isVisible(
          'text=Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
        )
      ).to.be.true;
    });
  });

  describe('Dashboard Page [ 15 Points ]', () => {
    it('Show Dashboard page - welcome message [ 2.5 Points ]', async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click('text=Dashboard');
      await page.waitForTimeout(interval);
      expect(await page.isVisible('text=Dashboard')).to.be.true;
      expect(await page.isVisible('text=Services for every animal')).to.be.true;
    });

    it('Check Dashboard page with 0 pets [ 2.5 Points ]', async () => {
      const { get } = await handle(endpoints.catalog);
      get([]);

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click('text=Dashboard');
      await page.waitForTimeout(interval);

      const visible = await page.isVisible('text=No pets in dashboard');
      expect(visible).to.be.true;
    });

    it('Check dashboard page with 2 pets [ 2.5 Points ]', async () => {
      const { get } = await handle(endpoints.catalog);
      get(mockData.catalog.slice(0, 2));
      const data = mockData.catalog.slice(0, 2);

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click('text=Dashboard');
      await page.waitForTimeout(interval);

      await page.waitForSelector('.animals-dashboard');
      const names = await page.$$eval('.animals-board .name', (t) => t.map((s) => s.textContent));

      expect(names.length).to.equal(2);
      expect(names[0]).to.contains(`${data[0].name}`);
      expect(names[1]).to.contains(`${data[1].name}`);
    });

    it('Show details [ 2.5 Points ]', async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click('text=Dashboard');
      await page.waitForTimeout(interval);

      expect(await page.isVisible('text="Details"')).to.be.true;
    });

    it('Check dashboard page Info [ 5 Points ]', async () => {
      const { get } = await handle(endpoints.catalog);
      get(mockData.catalog.slice(0, 1));
      const data = mockData.catalog.slice(0, 1);

      await page.goto(host);
      await page.waitForTimeout(interval);

      await page.click('text=Dashboard');
      await page.waitForTimeout(interval);

      await page.waitForSelector('.animals-dashboard');
      const names = await page.$$eval('.animals-board .name', (t) => t.map((s) => s.textContent));
      const date = await page.$$eval('.animals-board .breed', (t) => t.map((s) => s.textContent));

      expect(names).to.contains(`${data[0].name}`);
      expect(date).to.contains(`${data[0].breed}`);
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

      await page.click('text=Create Postcard');
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

      await page.click('text=Create Postcard');
      await page.waitForTimeout(interval);

      await page.waitForSelector('form');
      await page.fill('[name="name"]', data.name);
      await page.fill('[name="breed"]', data.breed);
      await page.fill('[name="age"]', data.age);
      await page.fill('[name="weight"]', data.weight);
      await page.fill('[name="image"]', data.image);

      const [request] = await Promise.all([onRequest(), page.click('[type="submit"]')]);

      const postData = JSON.parse(request.postData());

      expect(postData.name).to.equal(data.name);
      expect(postData.breed).to.equal(data.breed);
      expect(postData.age).to.equal(data.age);
      expect(postData.weight).to.equal(data.weight);
      expect(postData.image).to.equal(data.image);
    });

    it('Check details information [ 5 Points ]', async () => {
      const data = mockData.catalog[1];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.waitForTimeout(interval);
      await page.click('text=Dashboard');

      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForTimeout(interval);

      await page.waitForSelector('.animals-dashboard');
      await page.click(`.animals-board:has-text("${data.name}") >> .btn`);

      await page.waitForTimeout(interval);

      const name = await page.$$eval('.animalInfo h1', (t) => t.map((s) => s.textContent));
      const breed = await page.$$eval('.animalInfo h3', (t) => t.map((s) => s.textContent));
      const info = await page.$$eval('.animalInfo h4', (t) => t.map((s) => s.textContent));

      expect(name).to.contains(`Name: ${data.name}`);
      expect(breed).to.contains(`Breed: ${data.breed}`);
      expect(info[0]).to.contains(`Age: ${data.age}`);
      expect(info[1]).to.contains(`Weight: ${data.weight}`);
    });

    it('Non-author does NOT see delete and edit buttons [ 2.5 Points ]', async () => {
      const data = mockData.catalog[2];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.waitForTimeout(interval);
      await page.click('text=Dashboard');
      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForSelector('.animals-dashboard');
      await page.waitForTimeout(interval);

      await page.click(`.animals-board:has-text("${data.name}") >> .btn`);

      expect(await page.isVisible('text="Delete"')).to.be.false;
      expect(await page.isVisible('text="Edit"')).to.be.false;
    });

    it('Author see delete and edit buttons [ 2.5 Points ]', async () => {
      const data = mockData.catalog[1];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.waitForTimeout(interval);
      await page.click('text=Dashboard');
      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForTimeout(interval);

      await page.waitForSelector('.animals-dashboard');
      await page.click(`.animals-board:has-text("${data.name}") >> .btn`);

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
      await page.click('text=Dashboard');
      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForTimeout(interval);

      await page.waitForSelector('.animals-dashboard');
      await page.click(`.animals-board:has-text("${data.name}") >> .btn`);

      await page.click('text=Edit');
      await page.waitForTimeout(interval);

      await page.waitForSelector('form');

      const inputs = await page.$$eval('.editForm input', (t) => t.map((i) => i.value));
      expect(inputs[0]).to.contains(data.name);
      expect(inputs[1]).to.contains(data.breed);
      expect(inputs[2]).to.contains(data.age);
      expect(inputs[3]).to.contains(data.weight);
      expect(inputs[4]).to.contains(data.image);
    });

    it('Edit does NOT work with empty fields [ 5 Points ]', async () => {
      const data = mockData.catalog[0];
      const user = mockData.users[0];
      const { get, put } = await handle(endpoints.delete(data._id));
      get(data);
      const { isHandled } = put();

      await page.waitForTimeout(interval);
      await page.click('text=Dashboard');
      await page.waitForTimeout(interval);

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForTimeout(interval);
      await page.waitForSelector('.animals-dashboard');
      await page.click(`.animals-board:has-text("${data.name}") >> .btn`);

      await page.click('text=Edit');
      await page.waitForTimeout(interval);

      await page.waitForSelector('form');

      await page.fill('[name="name"]', '');
      await page.fill('[name="breed"]', '');
      await page.fill('[name="age"]', '');
      await page.fill('[name="weight"]', '');
      await page.fill('[name="image"]', '');

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
      await page.click('text=Dashboard');

      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForTimeout(interval);
      await page.waitForSelector('.animals-dashboard');
      await page.click(`.animals-board:has-text("${data.name}") >> .btn`);

      await page.click('text=Edit');
      await page.waitForTimeout(interval);

      await page.waitForSelector('form');

      await page.fill('[name="name"]', data.name + 'edit');
      await page.fill('[name="breed"]', data.breed + 'edit');
      await page.fill('[name="age"]', data.age + 'edit');

      const [request] = await Promise.all([onRequest(), page.click('[type="submit"]')]);

      const postData = JSON.parse(request.postData());

      expect(postData.name).to.contains(data.name + 'edit');
      expect(postData.breed).to.contains(data.breed + 'edit');
      expect(postData.age).to.contains(data.age + 'edit');
    });

    it('Delete makes correct API call for logged in user [ 10 Points ]', async () => {
      const data = mockData.catalog[0];
      const user = mockData.users[0];

      const { get, del } = await handle(endpoints.delete(data._id));
      get(data);
      const { onResponse, isHandled } = del();

      await page.waitForTimeout(interval);
      await page.click('text=Dashboard');
      await page.waitForTimeout(interval);

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForSelector('.animals-dashboard');
      await page.click(`.animals-board:has-text("${data.name}") >> .btn`);

      await page.click('text=Delete');

      page.on('dialog', (dialog) => dialog.accept());
      await Promise.all([onResponse(), page.click('text="Delete"')]);

      expect(isHandled()).to.be.true;
    });
  });

  describe('BONUS : Donate functionality  [ 15 Points ]', async () => {
    it('Donate button is NOT visible for guest users [ 2.5 Points ]', async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);

      const data = mockData.catalog[2];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.waitForTimeout(interval);
      await page.click('text=Dashboard');
      await page.waitForTimeout(interval);

      await page.waitForSelector('.animals-dashboard');
      await page.click(`.animals-board:has-text("${data.name}") >> .btn`);

      await page.waitForTimeout(interval);

      expect(await page.isVisible('.donate')).to.be.false;
    });

    it('Donate button is visible for the non-creator user [ 2.5 Points ]', async () => {
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
      await page.click('text=Dashboard');

      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForSelector('.animals-dashboard');
      await page.click(`.animals-board:has-text("${data.name}") >> .btn`);
      await page.waitForTimeout(interval);

      expect(await page.isVisible('.donate')).to.be.true;
    });

    it('Donate button is NOT visible for the creator [ 2.5 Points ]', async () => {
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
      await page.click('text=Dashboard');
      await page.waitForTimeout(interval);

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForSelector('.animals-dashboard');
      await page.click(`.animals-board:has-text("${data.name}") >> .btn`);

      expect(await page.isVisible('.donate')).to.be.false;
    });

    it('Donate button should be hidden(not visible) after a click on it [ 2.5 Points ]', async () => {
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
      await page.click('text=Dashboard');
      await page.waitForTimeout(interval);

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      const { post } = await handle(endpoints.donation, { post: mockData.donation[2] });
      const { onRequest } = post({ petId: data._id });
      own(0);
      total(5);

      await page.waitForTimeout(interval);

      await page.waitForSelector('.animals-dashboard');
      await page.click(`.animals-board:has-text("${data.name}") >> .btn`);
      await page.waitForTimeout(interval);
      expect(await page.isVisible('.donate')).to.be.true;
      own(1);
      total(6);
      await page.waitForTimeout(interval);

      const [request] = await Promise.all([onRequest, page.click('.donate')]);

      await page.waitForTimeout(interval);

      expect(await page.isVisible('.donate')).to.be.false;
    });

    it('Donate button should increase total donation by 100 after a click on it [ 5 Points ]', async () => {
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
      await page.click('text=Dashboard');
      await page.waitForTimeout(interval);

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      const { post } = await handle(endpoints.donation, { post: mockData.donation[2] });
      const { onRequest } = post({ petId: data._id });
      await page.waitForTimeout(interval);
      own(0);
      total(5);

      await page.waitForTimeout(interval);
      await page.waitForSelector('.animals-dashboard');
      await page.click(`.animals-board:has-text("${data.name}") >> .btn`);
      await page.waitForTimeout(interval);

      let donations = await page.$$eval('.donation', (t) => t.map((s) => s.textContent));
      expect(donations[0]).to.contains('Donation: 500$');
      own(1);
      total(6);
      await page.waitForTimeout(interval);

      const [request] = await Promise.all([onRequest(), page.click('.donate')]);

      await page.waitForTimeout(interval);

      donations = await page.$$eval('.donation', (t) => t.map((s) => s.textContent));
      expect(donations[0]).to.contains('Donation: 600$');
      await page.waitForTimeout(interval);
    });
  });
});

async function setupContext(context) {
  // Authentication
  await handleContext(context, endpoints.login, { post: mockData.users[0] });
  await handleContext(context, endpoints.register, { post: mockData.users[0] });
  await handleContext(context, endpoints.logout, {
    get: (h) => h('', { json: false, status: 204 }),
  });

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
  await context.route(
    (url) => url.href.slice(0, host.length) != host,
    (route) => {
      if (DEBUG) {
        console.log('Preventing external call to ' + route.request().url());
      }
      route.abort();
    }
  );
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
    delete: (returns, options) => request('DELETE', returns, options),
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
}

function respond(data, options = {}) {
  options = Object.assign(
    {
      json: true,
      status: 200,
    },
    options
  );

  const headers = {
    'Access-Control-Allow-Origin': '*',
  };
  if (options.json) {
    headers['Content-Type'] = 'application/json';
    data = JSON.stringify(data);
  }

  return {
    status: options.status,
    headers,
    body: data,
  };
}
