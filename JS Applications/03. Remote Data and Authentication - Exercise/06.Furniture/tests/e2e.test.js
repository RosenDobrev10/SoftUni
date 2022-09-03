const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

const host = "http://localhost:3000"; // Application host (NOT service host - that can be anything)
const interval = 300;
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
      "_ownerId":"0001",
      "name":"Chair",
      "price":"23",
      "factor":"12",
      "img":"image1",
      "_id":"1001"
    },
    {
      "_ownerId":"0002",
      "name":"Table",
      "price":"50",
      "factor":"2",
      "img":"image2",
      "_id":"1002"
    }
  ],
  "orders": [
    {
      "_ownerId":"0001",
      "boughtFurniture":[],
      "totalSum":0,
      "_id":"1001"
    }
  ]
}

const endpoints = {
  register: "/users/register",
  login: "/users/login",
  logout: "/users/logout",
  catalog: "/data/furniture",
  create: "/data/furniture",
  orders: "/data/orders",
  owner: (userId) => `/data/orders?where=_ownerId%3D${userId}`,
};

let browser;
let context;
let page;

describe("E2E tests", function () {
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
  describe("Authentication", () => {
    it("register does not work with empty fields", async () => {
      const { post } = await handle(endpoints.register);
      const isCalled = post().isHandled;

      await page.goto(host);
      await page.waitForTimeout(interval);

      await page.click("nav >> text=Login");
      await page.waitForTimeout(interval);

      // await page.click('[type="submit"]');
      await page.click('#register-form >> text=Register');
      await page.waitForTimeout(interval);

      expect(isCalled()).to.be.false;
    });

    it("register makes correct API call", async () => {
      const data = mockData.users[0];
      const { post } = await handle(endpoints.register);
      const { onRequest } = post(data);

      await page.goto(host);
      await page.waitForTimeout(interval);

      await page.click("nav >> text=Login");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#register-form");
      await page.fill('#register-form >> [name="email"]', data.email);
      await page.fill('#register-form >> [name="password"]', data.password);
      await page.fill(
        '#register-form >> [name="rePass"]',
        data.password
      );

      const [request] = await Promise.all([
        onRequest(),
        page.click("#register-form >> text=Register"),
      ]);

      const postData = JSON.parse(request.postData());

      expect(postData.username).to.equal(data.username);
      expect(postData.password).to.equal(data.password);
    });

    it("login makes correct API call", async () => {
      const data = mockData.users[0];
      const { post } = await handle(endpoints.login);
      const { onRequest } = post(data);

      await page.goto(host);
      await page.waitForTimeout(interval);

      await page.click("nav >> text=Login");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#login-form");
      await page.fill('#login-form [name="email"]', data.email);
      await page.fill('#login-form [name="password"]', data.password);

      const [request] = await Promise.all([
        onRequest(),
        page.click("#login-form >> text=Login"),
      ]);

      const postData = JSON.parse(request.postData());
      expect(postData.username).to.equal(data.username);
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
      await page.waitForSelector('#login-form');
      await page.fill('#login-form [name="email"]', data.email);
      await page.fill('#login-form [name="password"]', data.password);

      await Promise.all([
          onResponse(),
          page.click('#login-form >> text=Login')
      ]);

      await page.waitForTimeout(interval);

      const [request] = await Promise.all([
          onRequest(),
          page.click('nav >> text=Logout')
      ]);
      expect(request.method()).to.equal('GET');
  });
  });

  describe("Navigation bar", () => {
    it("guest user should see correct navigation", async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);

      expect(await page.isVisible("#guest")).to.be.true;

      expect(await page.isVisible("#user")).to.be.false;
    });

    it("logged user should see correct navigation", async () => {
      // Login user
      const data = mockData.users[0];
      await page.goto(host);
      await page.waitForTimeout(interval);

      await page.click("nav >> text=Login");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#login-form");
      await page.fill('#login-form [name="email"]', data.email);
      await page.fill('#login-form [name="password"]', data.password);

      page.click("#login-form >> text=Login"), await page.waitForTimeout(interval);

      //Test for navigation
      expect(await page.isVisible("#guest")).to.be.false;

      expect(await page.isVisible("#user")).to.be.true;
    });
  });

  describe("Catalog", () => {

    it("view furniture", async () => {
      const data = mockData.catalog;
      const { get } = await handle(endpoints.catalog);
      get(data);
      await page.goto(host);

      await page.waitForTimeout(interval);

      const furniture = await page.$$eval(`.table tbody tr`, t => t.map(s => s));
      await page.waitForTimeout(interval);
      expect(furniture.length).to.be.equal(data.length);

    });

    it("nothing bought", async () => {
      const data = mockData.catalog;
      const { get } = await handle(endpoints.catalog);
      get(data);
      await page.goto(host);
      const user = mockData.users[0];
      await page.waitForTimeout(interval);
      await page.click("text=Login");
      await page.waitForTimeout(interval);
      await page.waitForSelector("#login-form");
      await page.fill('#login-form [name="email"]', user.email);
      await page.fill('#login-form [name="password"]', user.password);
      await page.click("#login-form >> text=Login");
      await page.waitForTimeout(interval);

      const { get2 } = await handle(endpoints.owner(data._id));
      get2(data);

      await page.click('#show-orders-btn')
      await page.waitForTimeout(interval);
      const furniture = await page.$$eval(`.orders p span`, t => t.map(s => s.textContent));
      expect(furniture[0]).to.be.contains('Nothing bought yet!');
      expect(furniture[1]).to.be.contains('0 $');

    });

    it("bought fruniture", async () => {
      const data = mockData.catalog;
      const { get } = await handle(endpoints.catalog);
      get(data);
      await page.goto(host);
      const user = mockData.users[0];
      await page.waitForTimeout(interval);
      await page.click("text=Login");
      await page.waitForTimeout(interval);
      await page.waitForSelector("#login-form");
      await page.fill('#login-form [name="email"]', user.email);
      await page.fill('#login-form [name="password"]', user.password);
      await page.click("#login-form >> text=Login");
      await page.waitForTimeout(interval);

      await page.click(`.table tbody tr input[type="checkbox"]`);

      const { post } = await handle(endpoints.orders);
      const isCalled = post().isHandled;

      expect(isCalled()).to.be.false;
    });
  });

  describe("CRUD", () => {
    // Login user
    beforeEach(async () => {
      const data = mockData.users[0];
      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Login");
      await page.waitForTimeout(interval);
      await page.waitForSelector("#login-form");
      await page.fill('#login-form [name="email"]', data.email);
      await page.fill('#login-form [name="password"]', data.password);
      await page.click("#login-form >> text=Login");
      await page.waitForTimeout(interval);
    });

    it("create does NOT work with empty fields", async () => {
      const { post } = await handle(endpoints.create);
      const isCalled = post().isHandled;

      await page.click("text=Create Product");
      await page.waitForTimeout(interval);

      page.click("#create-form >> text=Create");
      await page.waitForTimeout(interval);

      expect(isCalled()).to.be.false;
    });

    it("create makes correct API call for logged in user", async () => {
      const data = mockData.catalog[0];
      const { post } = await handle(endpoints.create);
      const { onRequest } = post();

      await page.click("text=Create Product");
      await page.waitForTimeout(interval);

      await page.fill('#create-form >> [name="name"]', data.name);
      await page.fill(
        '#create-form >> [name="price"]',
        data.price
      );
      await page.fill('#create-form >> [name="factor"]', data.factor);
      await page.fill('#create-form >> [name="img"]', data.img);

      const [request] = await Promise.all([
        onRequest(),
        page.click("#create-form >> text=Create"),
      ]);

      const postData = JSON.parse(request.postData());
      expect(postData.name).to.equal(data.name);
      expect(postData.price).to.equal(data.price);
      expect(postData.factor).to.equal(data.factor);
      expect(postData.img).to.equal(data.img);
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
  await handleContext(context, endpoints.orders, { get: mockData.orders });
  await handleContext(context, endpoints.owner('1001'), { get: mockData.orders[0] });
  await handleContext(context, endpoints.details('1001'), { get: mockData.catalog[0] });
  await handleContext(context, endpoints.details('1002'), { get: mockData.catalog[1] });
  await handleContext(context, endpoints.details('1003'), { get: mockData.catalog[2] });

  await handleContext(endpoints.orders('0001'), { get: mockData.catalog.slice(0, 2) }, context);

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