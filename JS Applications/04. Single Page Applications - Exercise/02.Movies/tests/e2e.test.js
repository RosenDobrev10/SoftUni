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
      "_id": "1001",
      "_ownerId": "0002",
      "title": "Black Widow",
      "description": "Natasha Romanoff aka Black Widow confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Comes on the screens 2020.",
      "img": "./images/movie1.jpeg"
    },
    {
      "_id": "1002",
      "_ownerId": "0002",
      "title": "Wonder Woman 1984",
      "description": "Diana must contend with a work colleague and businessman, whose desire for extreme wealth sends the world down a path of destruction, after an ancient artifact that grants wishes goes missing.",
      "img": "./images/movie2.jpg"
    },
    {
      "_id": "1003",
      "_ownerId": "0001",
      "title": "Top Gun 2",
      "description": "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
      "img": "./images/movie3.jpg"
    }
  ],
  "likes": [
    {
      "_ownerId": "0001",
      "movieId": "1002",
      "_id": "e2d43547-5f76-451c-93df-14a83cb042e7"
    },
    {
      "_ownerId": "0001",
      "movieId": "1001",
      "_id": "9d709077-9bbb-417a-988e-87a0677b73d2"
    },
    {
      "_ownerId": "0002",
      "movieId": "1003",
      "_id": "16fb2a96-29bd-46b0-82b6-125a962b03ef"
    }
  ]
}

const endpoints = {
  register: "/users/register",
  login: "/users/login",
  logout: "/users/logout",
  catalog: "/data/movies",
  create: "/data/movies",
  like: "/data/likes",
  edit: (id) => `/data/movies/${id}`,
  delete: (id) => `/data/movies/${id}`,
  details: (id) => `/data/movies/${id}`,
  total: (likeId) =>
    `/data/likes?where=movieId%3D%22${likeId}%22&distinct=_ownerId&count`,
  unlike: (likeId) => `/data/likes/${likeId}`,
  own: (likeId, userId) =>
    `/data/likes?where=movieId%3D%22${likeId}%22%20and%20_ownerId%3D%22${userId}%22`,
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

      await page.click("nav >> text=Register");
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

      await page.click("nav >> text=Register");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#register-form");
      await page.fill('#register-form >> [name="email"]', data.email);
      await page.fill('#register-form >> [name="password"]', data.password);
      await page.fill(
        '#register-form >> [name="repeatPassword"]',
        data.password
      );

      const [request] = await Promise.all([
        onRequest(),
        // page.click('[type="submit"]'),
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
      await page.fill('[name="email"]', data.email);
      await page.fill('[name="password"]', data.password);

      const [request] = await Promise.all([
        onRequest(),
        // page.click('[type="submit"]'),
        page.click("#login-form >> text=Login"),
      ]);

      const postData = JSON.parse(request.postData());
      expect(postData.username).to.equal(data.username);
      expect(postData.password).to.equal(data.password);
    });
  });

  describe("Navigation bar", () => {
    it("guest user should see correct navigation", async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);

      expect(await page.isVisible("nav >> text=Movies")).to.be.true;
      expect(await page.isVisible("nav >> text=Login")).to.be.true;
      expect(await page.isVisible("nav >> text=Register")).to.be.true;

      expect(await page.isVisible("nav >> text=Welcome")).to.be.false;
      expect(await page.isVisible("nav >> text=Logout")).to.be.false;
    });

    it("logged user should see correct navigation", async () => {
      // Login user
      const data = mockData.users[0];
      await page.goto(host);
      await page.waitForTimeout(interval);

      await page.click("nav >> text=Login");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#login-form");
      await page.fill('[name="email"]', data.email);
      await page.fill('[name="password"]', data.password);

      page.click("form >> text=Login"), await page.waitForTimeout(interval);

      //Test for navigation
      expect(await page.isVisible("nav >> text=Movies")).to.be.true;
      expect(await page.isVisible(`nav >> text=Welcome, ${data.email}`)).to.be
        .true;
      expect(await page.isVisible("nav >> text=Logout")).to.be.true;

      expect(await page.isVisible("nav >> text=Login")).to.be.false;
      expect(await page.isVisible("nav >> text=Register")).to.be.false;
    });
  });

  describe("Catalog", () => {

    it("show details", async () => {
      const data = mockData.catalog[1];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);
      await page.goto(host);

      await page.waitForTimeout(interval);

      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);
      await page.waitForTimeout(interval);

      await page.click("nav >> text=Movies");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#movie");
      await page.click(
        `#movie > div div ul li:has-text("${data.title}") >> text=Details`
      );
      await page.waitForTimeout(interval);

      expect(await page.isVisible(`h1:has-text("Movie title: ${data.title}")`))
        .to.be.true;
      expect(await page.isVisible(`p:has-text("${data.description}")`)).to.be
        .true;

    });

    it("guest does NOT see edit/delete buttons", async () => {
      const data = mockData.catalog[1];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);
      await page.goto(host);

      await page.waitForTimeout(interval);

      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);
      await page.waitForTimeout(interval);

      await page.click("nav >> text=Movies");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#movie");
      await page.click(
        `#movie > div div ul li:has-text("${data.title}") >> text=Details`
      );
      await page.waitForTimeout(interval);

      expect(await page.isVisible('text="Delete"')).to.be.false;
      expect(await page.isVisible('text="Edit"')).to.be.false;
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
      await page.fill('[name="email"]', data.email);
      await page.fill('[name="password"]', data.password);
      await page.click("form >> text=Login");
      await page.waitForTimeout(interval);
    });

    it("create does NOT work with empty fields", async () => {
      const { post } = await handle(endpoints.create);
      const isCalled = post().isHandled;

      await page.click("text=Add Movie");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#add-movie-form");
      page.click("form >> text=Submit");
      await page.waitForTimeout(interval);

      expect(isCalled()).to.be.false;
    });

    it("create makes correct API call for logged in user", async () => {
      const data = mockData.catalog[0];
      const { post } = await handle(endpoints.create);
      const { onRequest } = post();

      await page.click("text=Add Movie");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#add-movie-form");
      await page.fill('#add-movie-form >> [name="title"]', data.title);
      await page.fill(
        '#add-movie-form >> [name="description"]',
        data.description
      );
      await page.fill('#add-movie-form >> [name="img"]', data.img);

      const [request] = await Promise.all([
        onRequest(),
        page.click("form >> text=Submit"),
      ]);

      const postData = JSON.parse(request.postData());
      expect(postData.title).to.equal(data.title);
      expect(postData.description).to.equal(data.description);
      expect(postData.img).to.equal(data.img);
    });

    it("non-author does NOT see delete and edit buttons", async () => {
      const data = mockData.catalog[1];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);
      await page.waitForSelector("#movie");
      await page.click(
        `#movie > div div ul li:has-text("${data.title}") >> text=Details`
      );
      await page.waitForTimeout(interval);

      expect(await page.isVisible('text="Delete"')).to.be.false;
      expect(await page.isVisible('text="Edit"')).to.be.false;
    });

    it("author sees delete and edit buttons", async () => {
      const data = mockData.catalog[2];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);
      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);
      await page.waitForSelector("#movie");
      await page.click(
        `#movie > div div ul li:has-text("${data.title}") >> text=Details`
      );
      await page.waitForTimeout(interval);

      expect(await page.isVisible('text="Delete"')).to.be.true;
      expect(await page.isVisible('text="Edit"')).to.be.true;
    });

    it("edit should populate form with correct data", async () => {
      const data = mockData.catalog[2];
      const user = mockData.users[0];
      await page.goto(host);
      const { get } = await handle(endpoints.details(data._id));
      get(data);
      await page.waitForTimeout(interval);

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);
      await page.waitForTimeout(interval);

      await page.waitForSelector("#movie");
      await page.click(
        `#movie > div div ul li:has-text("${data.title}") >> text=Details`
      );
      await page.waitForTimeout(interval);

      await page.click("text=Edit");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#edit-movie form");

      const inputs = await page.$$eval('#edit-movie input, textarea', t => t.map(i => i.value));

      expect(inputs[1]).to.equal(data.title);
      expect(inputs[2]).to.equal(data.description);
    });

    // it.only("edit makes correct API call for logged in user", async () => {
    //   const data = mockData.catalog[2];
    //   const user = mockData.users[0];
    //   const { get, put } = await handle(endpoints.details(data._id));
    //   get(data);
    //   const { onRequest } = put();
    //   await page.waitForTimeout(interval);

    //   const { get: own } = await handle(endpoints.own(data._id, user._id));
    //   const { get: total } = await handle(endpoints.total(data._id));
    //   own(0);
    //   total(5);
    //   await page.waitForTimeout(interval);

    //   await page.waitForSelector("#movie");
    //   await page.click(
    //     `#movie > div div ul li:has-text("${data.title}") >> text=Details`
    //   );
    //   await page.waitForTimeout(interval);

    //   await page.click("text=Edit");
    //   await page.waitForTimeout(interval);
    //   await page.waitForSelector("#edit-movie form");

    //   await page.fill('#edit-movie [name="title"]', data.title + "edit");
    //   await page.fill('#edit-movie [name="description"]', data.description + "edit");
    //   await page.fill('#edit-movie [name="img"]', data.img + "edit");
    //   await page.waitForTimeout(interval);

    //   const [request] = await Promise.all([
    //     onRequest(),
    //     page.click('#edit-movie >> button[type="submit"]'),
    //   ]);
    //   await page.waitForTimeout(interval);

    //   const postData = JSON.parse(request.postData());

    //   expect(postData.title).to.contains(data.title + "edit");
    //   expect(postData.description).to.contains(data.description + "edit");
    // });

    it("delete makes correct API call for logged in user", async () => {
      const data = mockData.catalog[2];
      const user = mockData.users[0];
      const { get, del } = await handle(endpoints.delete(data._id));
      get(data);
      const { onResponse, isHandled } = del();

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);
      await page.waitForTimeout(interval);

      await page.waitForSelector("#movie");
      await page.click(
        `#movie > div div ul li:has-text("${data.title}") >> text=Details`
      );
      await page.waitForTimeout(interval);

      await Promise.all([
        onResponse(),
        page.click('text="Delete"')
      ]);

      expect(isHandled()).to.be.true;
    });
  });

  describe("Like functionality", async () => {
    it("Like button is not visible for guest users", async () => {
      const data = mockData.catalog[0];
      const user = mockData.users[0];
      await page.goto(host);
      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.click("nav >> text=Movies");
      await page.waitForTimeout(interval);
      await page.waitForSelector("#movie");
      await page.click(
        `#movie > div div ul li:has-text("${data.title}") >> text=Details`
      );
      await page.waitForTimeout(interval);

      expect(await page.isVisible('text="Like"')).to.be.false;
    });

    it("Like button is visible for the non-creator user", async () => {
      // Login user
      const user = mockData.users[0];
      const data = mockData.catalog[2];

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Login");
      await page.waitForTimeout(interval);
      await page.waitForSelector("#login-form");
      await page.fill('[name="email"]', user.email);
      await page.fill('[name="password"]', user.password);
      await page.click("form >> text=Login");

      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);
      await page.waitForTimeout(interval);

      await page.click("nav >> text=Movies");
      await page.click(
        `#movie > div div ul li:has-text("${data.title}") >> text=Details`
      );
      await page.waitForTimeout(interval);
      const likes = await page.$$eval(".enrolled-span", (t) =>
        t.map((s) => s.textContent)
      );
      expect(await page.isVisible('.container >> text="Like"')).to.be.true;
      expect(likes[0]).to.contains("Liked 5");
    });

    it("Like button is not visible for the creator", async () => {
      // Login user
      const user = mockData.users[0];
      const data = mockData.catalog[2];

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Login");
      await page.waitForTimeout(interval);
      await page.waitForSelector("#login-form");
      await page.fill('[name="email"]', user.email);
      await page.fill('[name="password"]', user.password);
      await page.click("form >> text=Login");
      const { get } = await handle(endpoints.details(data._id));
      get(data);
      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);
      await page.waitForTimeout(interval);

      await page.click("nav >> text=Movies");
      await page.click(
        `#movie > div div ul li:has-text("${data.title}") >> text=Details`
      );
      await page.waitForTimeout(interval);
      const likes = await page.$$eval(".container", (t) =>
        t.map((s) => s.textContent)
      );
      expect(await page.isVisible('.btn >> text=Like')).to.be.false;
      expect(likes[0]).to.contains("Liked 5");
    });

    it("Like button should increase total likes by 1 after a click on it", async () => {
      const user = mockData.users[0];
      const data = mockData.catalog[0];

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Login");
      await page.waitForTimeout(interval);
      await page.waitForSelector("#login-form");
      await page.fill('[name="email"]', user.email);
      await page.fill('[name="password"]', user.password);
      await page.click("form >> text=Login");
      await page.waitForTimeout(interval);

      const { get } = await handle(endpoints.details(data._id));
      get(data);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      const { post } = await handle(endpoints.like, { post: mockData.likes[2] });
      const { onRequest } = post({id: data._id});
      await page.waitForTimeout(interval);
      own(0);
      total(5);

      await page.click("nav >> text=Movies");
      await page.waitForTimeout(interval);
      await page.click(
        `#movie > div div ul li:has-text("${data.title}") >> text=Details`
      );
      await page.waitForTimeout(interval);

      let likes = await page.$$eval(".enrolled-span", (t) =>
        t.map((s) => s.textContent)
      );
      expect(likes[0]).to.contains("Liked 5");

      own(1)
      total(6)

      const [request] = await Promise.all([
        onRequest(),
        page.click('.container >> text="Like"'),
      ]);

      await page.waitForTimeout(interval);
      likes = await page.$$eval(".enrolled-span", (t) =>
        t.map((s) => s.textContent)
      );
      expect(likes[0]).to.contains("Liked 6");
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