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
  catalog: '/data/albums?sortBy=_createdOn%20desc',
  create: '/data/albums',
  likes: '/data/likes',
  details: (id) => `/data/albums/${id}`,
  delete: (id) => `/data/albums/${id}`,
  total: (albumId) =>
    `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
  own: (albumId, userId) =>
    `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

let browser;
let context;
let page;

describe('E2E tests', function () {
  // Setup
  this.timeout(DEBUG ? 120000 : 7000);
  before(
    async () =>
      (browser = await chromium.launch(
        DEBUG ? { headless: false, slowMo } : {}
      ))
  );
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

      await page.click('text=Register');

      await page.waitForSelector('form');

      await page.click('[type="submit"]');

      expect(isCalled()).to.be.false;
    });

    it('Register makes correct API call [ 5 Points ]', async () => {
      const data = mockData.users[0];
      const { post } = await handle(endpoints.register);
      const { onRequest } = post(data);

      await page.goto(host);

      await page.click('text=Register');

      await page.waitForSelector('form');

      await page.fill('[name="email"]', data.email);
      await page.fill('[name="password"]', data.password);
      await page.fill('[name="re-password"]', data.password);

      const [request] = await Promise.all([
        onRequest(),
        page.click('[type="submit"]'),
      ]);

      const postData = JSON.parse(request.postData());

      expect(postData.email).to.equal(data.email);
      expect(postData.password).to.equal(data.password);
    });

    it('Login does NOT work with empty fields [ 2.5 Points ]', async () => {
      const { post } = await handle(endpoints.login);
      const isCalled = post().isHandled;

      await page.goto(host);

      await page.click('text=Login');

      await page.waitForSelector('form');

      await page.click('[type="submit"]');

      expect(isCalled()).to.be.false;
    });

    it('Login makes correct API call [ 5 Points ]', async () => {
      const data = mockData.users[0];
      const { post } = await handle(endpoints.login);
      const { onRequest } = post(data);

      await page.goto(host);

      await page.click('text=Login');

      await page.waitForSelector('form');

      await page.fill('[name="email"]', data.email);
      await page.fill('[name="password"]', data.password);

      const [request] = await Promise.all([
        onRequest(),
        page.click('[type="submit"]'),
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
      await page.waitForSelector('form');
      await page.fill('[name="email"]', data.email);
      await page.fill('[name="password"]', data.password);

      await Promise.all([onResponse(), page.click('[type="submit"]')]);

      const [request] = await Promise.all([
        onRequest(),
        page.click('nav >> text=Logout'),
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

      await page.click('text=Login');
      await page.waitForSelector('form');
      await page.fill('[name="email"]', data.email);
      await page.fill('[name="password"]', data.password);
      await page.click('[type="submit"]');

      await page.waitForSelector('header');

      //Test for navigation
      expect(await page.isVisible('nav >> text=Logout')).to.be.true;
      expect(await page.isVisible('nav >> text=Add Album')).to.be.true;
      expect(await page.isVisible('nav >> text=Dashboard')).to.be.true;

      expect(await page.isVisible('nav >> text=Login')).to.be.false;
      expect(await page.isVisible('nav >> text=Register')).to.be.false;
    });

    it('Guest user should see correct navigation [ 5 Points ]', async () => {
      await page.goto(host);

      expect(await page.isVisible('nav >> text=Logout')).to.be.false;
      expect(await page.isVisible('text=Add Album')).to.be.false;

      expect(await page.isVisible('nav >> text=Dashboard')).to.be.true;
      expect(await page.isVisible('nav >> text=Login')).to.be.true;
      expect(await page.isVisible('nav >> text=Register')).to.be.true;
    });
  });

  describe('Home Page [ 5 Points ]', () => {
    it('Show home page [ 2.5 Points ]', async () => {
      await page.goto(host);
      await page.waitForSelector('#home');

      expect(await page.isVisible('text=Add your favourite albums')).to.be.true;
    });

    it('Show home page [ 2.5 Points ]', async () => {
      await page.goto(host);
      await page.waitForSelector('#home');

      expect(await page.isVisible('text=Discover new ones right here!')).to.be
        .true;
    });
  });

  describe('Dashboard Page [ 15 Points ]', () => {
    it('Show Dashboard page - welcome message [ 2.5 Points ]', async () => {
      await page.goto(host);

      expect(await page.isVisible('text=Dashboard')).to.be.true;

      await page.click('text=Dashboard');
      await page.waitForSelector('#dashboard');
      expect(await page.isVisible('text=Albums')).to.be.true;
    });

    it('Check Dashboard page with 0 cards [ 2.5 Points ]', async () => {
      const { get } = await handle(endpoints.catalog);
      get([]);

      await page.goto(host);

      await page.click('text=Dashboard');
      await page.waitForSelector('#dashboard');

      const visible = await page.isVisible(
        'text=There are no albums added yet.'
      );
      expect(visible).to.be.true;
    });

    it('Check dashboard page with 2 cards [ 5 Points ]', async () => {
      const { get } = await handle(endpoints.catalog);
      get(mockData.catalog.slice(0, 2));
      const data = mockData.catalog.slice(0, 2);

      await page.goto(host);

      await page.click('nav >> text=Dashboard');

      await page.waitForSelector('#dashboard');
      const singers = await page.$$eval('.card p .singer', (t) =>
        t.map((s) => s.textContent)
      );

      expect(singers.length).to.equal(2);
      expect(singers[0]).to.contains(`${data[0].singer}`);
      expect(singers[1]).to.contains(`${data[1].singer}`);
    });

    it('Show details [ 2.5 Points ]', async () => {
      await page.goto(host);

      await page.click('text=Dashboard');
      await page.waitForSelector('.card');

      expect(await page.isVisible('text="Details"')).to.be.true;
    });

    it('Check dashboard page Info [ 2.5 Points ]', async () => {
      const { get } = await handle(endpoints.catalog);
      get(mockData.catalog.slice(1, 2));
      const data = mockData.catalog.slice(1, 2);

      await page.goto(host);

      await page.click('text=Dashboard');

      await page.waitForSelector('#dashboard');
      const singers = await page.$$eval('.card p .singer', (t) =>
        t.map((s) => s.textContent)
      );
      const albums = await page.$$eval('.card p .album', (t) =>
        t.map((s) => s.textContent)
      );

      expect(singers).to.contains(`${data[0].singer}`);
      expect(albums).to.contains(`${data[0].album}`);
    });
  });

  describe('CRUD [ 50 Points ]', () => {
    // Login user
    const loginUser = async () => {
      const data = mockData.users[0];
      await page.goto(host);
      await page.click('text=Login');
      await page.waitForSelector('form');
      await page.fill('[name="email"]', data.email);
      await page.fill('[name="password"]', data.password);
      await page.click('[type="submit"]');
    };

    it('Create does NOT work with empty fields [ 7.5 Points ]', async () => {
      await loginUser();
      const { post } = await handle(endpoints.create);
      const isCalled = post().isHandled;

      await page.click('text=Add Album');
      await page.waitForSelector('form');

      page.click('[type="submit"]');

      expect(isCalled()).to.be.false;
    });

    it('Create makes correct API call for logged in user [ 7.5 Points ]', async () => {
      await loginUser();
      const data = mockData.catalog[0];
      const { post } = await handle(endpoints.create);
      const { onRequest } = post();

      await page.click('text=Add Album');

      await page.waitForSelector('form');
      await page.fill('[name="singer"]', data.singer);
      await page.fill('[name="album"]', data.album);
      await page.fill('[name="imageUrl"]', data.imageUrl);
      await page.fill('[name="release"]', data.release);
      await page.fill('[name="label"]', data.label);
      await page.fill('[name="sales"]', data.sales);

      const [request] = await Promise.all([
        onRequest(),
        page.click('[type="submit"]'),
      ]);

      const postData = JSON.parse(request.postData());

      expect(postData.singer).to.equal(data.singer);
      expect(postData.album).to.equal(data.album);
      expect(postData.imageUrl).to.equal(data.imageUrl);
      expect(postData.release).to.equal(data.release);
      expect(postData.label).to.equal(data.label);
      expect(postData.sales).to.equal(data.sales);
    });

    it('Check details information [ 5 Points ]', async () => {
      await loginUser();
      const data = mockData.catalog[1];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.click('text=Dashboard');

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForSelector('#dashboard');
      await page.click(`.card:has-text("${data.singer}") >> .details-btn`);

      await page.waitForSelector('#info-wrapper');

      const singer = await page.$$eval('#info-wrapper p #details-singer', (t) =>
        t.map((s) => s.textContent)
      );
      const album = await page.$$eval('#info-wrapper p #details-album', (t) =>
        t.map((s) => s.textContent)
      );
      const release = await page.$$eval(
        '#info-wrapper p #details-release',
        (t) => t.map((s) => s.textContent)
      );
      const label = await page.$$eval('#info-wrapper p #details-label', (t) =>
        t.map((s) => s.textContent)
      );
      const sales = await page.$$eval('#info-wrapper p #details-sales', (t) =>
        t.map((s) => s.textContent)
      );

      expect(singer).to.contains(data.singer);
      expect(album).to.contains(data.album);
      expect(release).to.contains(data.release);
      expect(label).to.contains(data.label);
      expect(sales).to.contains(data.sales);
    });

    it('Non-author does NOT see delete and edit buttons [ 2.5 Points ]', async () => {
      await loginUser();
      const data = mockData.catalog[2];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.click('text=Dashboard');

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForSelector('#dashboard');

      await page.click(`.card:has-text("${data.singer}") >> .details-btn`);

      await page.waitForSelector('#action-buttons');

      expect(await page.isVisible('text="Delete"')).to.be.false;
      expect(await page.isVisible('text="Edit"')).to.be.false;
    });

    it('Author see delete and edit buttons [ 2.5 Points ]', async () => {
      await loginUser();
      const data = mockData.catalog[0];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.click('text=Dashboard');

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForSelector('#dashboard');

      await page.click(`.card:has-text("${data.singer}") >> .details-btn`);

      await page.waitForSelector('#action-buttons');

      expect(await page.isVisible('text="Edit"')).to.be.true;
      expect(await page.isVisible('text="Delete"')).to.be.true;
    });

    it('Edit should populate form with correct data [ 5 Points ]', async () => {
      await loginUser();
      const data = mockData.catalog[0];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.click('text=Dashboard');

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForSelector('#dashboard');
      await page.click(`.card:has-text("${data.singer}") >> .details-btn`);

      await page.waitForSelector('#action-buttons');

      await page.click('text=Edit');

      await page.waitForSelector('form');

      const inputs = await page.$$eval('.form .edit-form input', (t) =>
        t.map((i) => i.value)
      );

      expect(inputs[0]).to.contains(data.singer);
      expect(inputs[1]).to.contains(data.album);
      expect(inputs[2]).to.contains(data.imageUrl);
      expect(inputs[3]).to.contains(data.release);
      expect(inputs[4]).to.contains(data.label);
      expect(inputs[5]).to.contains(data.sales);
    });

    it('Edit does NOT work with empty fields [ 5 Points ]', async () => {
      await loginUser();
      const data = mockData.catalog[0];
      const user = mockData.users[0];
      const { get, put } = await handle(endpoints.delete(data._id));
      get(data);
      const { isHandled } = put();

      await page.click('text=Dashboard');

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForSelector('#dashboard');
      await page.click(`.card:has-text("${data.singer}") >> .details-btn`);

      await page.waitForSelector('#action-buttons');

      await page.click('text=Edit');

      await page.waitForSelector('form');

      await page.fill('[name="singer"]', '');
      await page.fill('[name="album"]', '');
      await page.fill('[name="imageUrl"]', '');
      await page.fill('[name="release"]', '');
      await page.fill('[name="label"]', '');
      await page.fill('[name="sales"]', '');

      await page.click('[type="submit"]');

      expect(isHandled()).to.be.false;
    });

    it('Edit makes correct API call for logged in user [ 5 Points ]', async () => {
      await loginUser();
      const data = mockData.catalog[0];
      const user = mockData.users[0];

      const { get, put } = await handle(endpoints.delete(data._id));
      get(data);
      const { onRequest } = put();

      await page.click('text=Dashboard');

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForSelector('#dashboard');
      await page.click(`.card:has-text("${data.singer}") >> .details-btn`);

      await page.waitForSelector('#action-buttons');

      await page.click('text=Edit');

      await page.waitForSelector('form');

      await page.fill('[name="singer"]', data.singer + 'edit');
      await page.fill('[name="album"]', data.album + 'edit');
      await page.fill('[name="release"]', data.release + 'edit');

      const [request] = await Promise.all([
        onRequest(),
        page.click('[type="submit"]'),
      ]);

      const postData = JSON.parse(request.postData());

      expect(postData.singer).to.contains(data.singer + 'edit');
      expect(postData.album).to.contains(data.album + 'edit');
      expect(postData.release).to.contains(data.release + 'edit');
    });

    it('Delete makes correct API call for logged in user [ 10 Points ]', async () => {
      await loginUser();
      const data = mockData.catalog[0];
      const user = mockData.users[0];

      const { get, del } = await handle(endpoints.delete(data._id));
      get(data);
      const { onResponse, isHandled } = del();

      await page.click('text=Dashboard');

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForSelector('#dashboard');
      await page.click(`.card:has-text("${data.singer}") >> .details-btn`);

      await page.waitForSelector('#action-buttons');

      await page.click('text=Delete');

      page.on('dialog', (dialog) => dialog.accept());
      await Promise.all([onResponse(), page.click('text="Delete"')]);

      expect(isHandled()).to.be.true;
    });
  });

  describe('BONUS : Like functionality  [ 15 Points ]', async () => {
    it('Like button is NOT visible for guest users [ 2.5 Points ]', async () => {
      await page.goto(host);

      const data = mockData.catalog[2];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.click('nav >> text=Dashboard');

      await page.waitForSelector('#dashboard');

      await page.click(`.card:has-text("${data.singer}") >> .details-btn`);

      expect(await page.isVisible('#like-btn')).to.be.false;
    });

    it('Like button is visible for the non-creator user [ 2.5 Points ]', async () => {
      // Login user
      const data = mockData.catalog[2];
      const user = mockData.users[0];

      await page.goto(host);
      await page.click('text=Login');
      await page.waitForSelector('form');
      await page.fill('[name="email"]', user.email);
      await page.fill('[name="password"]', user.password);
      await page.click('[type="submit"]');

      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.click('text=Dashboard');

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForSelector('#dashboard');

      await page.click(`.card:has-text("${data.singer}") >> .details-btn`);

      await page.waitForSelector('#action-buttons');

      expect(await page.isVisible('#like-btn')).to.be.true;
    });

    it('Like button is NOT visible for the creator [ 2.5 Points ]', async () => {
      // Login user
      const data = mockData.catalog[0];
      const user = mockData.users[0];

      await page.goto(host);
      await page.click('text=Login');
      await page.waitForSelector('form');
      await page.fill('[name="email"]', user.email);
      await page.fill('[name="password"]', user.password);
      await page.click('[type="submit"]');

      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.click('text=Dashboard');

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForSelector('#dashboard');

      await page.click(`.card:has-text("${data.singer}") >> .details-btn`);

      await page.waitForSelector('#action-buttons');

      expect(await page.isVisible('#like-btn')).to.be.false;
    });

    it('Like button should be hidden(not visible) after a click on it [ 5 Points ]', async () => {
      // Login user
      const data = mockData.catalog[2];
      const user = mockData.users[0];

      await page.goto(host);
      await page.click('text=Login');
      await page.waitForSelector('form');
      await page.fill('[name="email"]', user.email);
      await page.fill('[name="password"]', user.password);
      await page.click('[type="submit"]');

      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.click('text=Dashboard');

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      const { post } = await handle(endpoints.likes, {
        post: mockData.likes[2],
      });
      const { onRequest } = post(mockData.likes[2]);
      own(0);
      total(5);

      await page.waitForSelector('#dashboard');

      await page.click(`.card:has-text("${data.singer}") >> .details-btn`);

      await page.waitForSelector('#action-buttons');
      await page.waitForSelector('#like-btn');

      expect(await page.isVisible('#like-btn')).to.be.true;
      own(1);
      total(6);

      const [request] = await Promise.all([onRequest, page.click('#like-btn')]);

      await page.waitForTimeout(interval);

      expect(await page.isVisible('#like-btn')).to.be.false;
    });

    it('Like button should increase total applications by 1 after a click on it [ 2.5 Points ]', async () => {
      // Login user
      const data = mockData.catalog[2];
      const user = mockData.users[0];

      await page.goto(host);
      await page.click('text=Login');
      await page.waitForSelector('form');
      await page.fill('[name="email"]', user.email);
      await page.fill('[name="password"]', user.password);
      await page.click('[type="submit"]');

      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.click('text=Dashboard');

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      const { post } = await handle(endpoints.likes, {
        post: mockData.likes[2],
      });
      const { onRequest } = post(mockData.likes[2]);
      own(0);
      total(5);

      await page.waitForSelector('#dashboard');

      await page.click(`.card:has-text("${data.singer}") >> .details-btn`);

      await page.waitForSelector('#action-buttons');

      let like = await page.$$eval('#likes-count', (t) =>
        t.map((s) => s.textContent)
      );
      expect(like[0]).to.contains('5');
      own(1);
      total(6);

      const [request] = await Promise.all([
        onRequest(),
        page.click('#like-btn'),
      ]);
      await page.waitForTimeout(interval);

      await page.waitForSelector('#likes');

      like = await page.$$eval('#likes-count', (t) =>
        t.map((s) => s.textContent)
      );

      await page.waitForTimeout(interval);

      expect(like[0]).to.contains('6');
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
  await handleContext(context, endpoints.details('1001'), {
    get: mockData.catalog[0],
  });
  await handleContext(context, endpoints.details('1002'), {
    get: mockData.catalog[1],
  });
  await handleContext(context, endpoints.details('1003'), {
    get: mockData.catalog[2],
  });

  await handleContext(
    endpoints.profile('0001'),
    { get: mockData.catalog.slice(0, 2) },
    context
  );

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
