const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

const host = "http://localhost:3000"; // Application host (NOT service host - that can be anything)
const interval = 600;
const DEBUG = false;
const slowMo = 500;

const mockData = require("./mock-data.json");

const endpoints = {
  register: "/users/register",
  login: "/users/login",
  logout: "/users/logout",
  catalog: "/data/shoes?sortBy=_createdOn%20desc",
  create: "/data/shoes",
  details: (id) => `/data/shoes/${id}`,
  delete: (id) => `/data/shoes/${id}`,
  search: (query) => `/data/shoes?where=brand%20LIKE%20%22${query}%22`,
};

let browser;
let context;
let page;

describe("E2E tests", function () {
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
  describe("Authentication [ 20 Points ]", () => {
    it("Register does NOT work with empty fields [ 2.5 Points ]", async () => {
      const { post } = await handle(endpoints.register);
      const isCalled = post().isHandled;

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Register");

      await page.waitForTimeout(interval);
      await page.waitForSelector("form");

      await page.click('[type="submit"]');

      await page.waitForTimeout(interval);

      expect(isCalled()).to.be.false;
    });

    it("Register makes correct API call [ 2.5 Points ]", async () => {
      const data = mockData.users[0];
      const { post } = await handle(endpoints.register);
      const { onRequest } = post(data);

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Register");

      await page.waitForTimeout(interval);
      await page.waitForSelector("form");

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

    it("Login does NOT work with empty fields [ 2.5 Points ]", async () => {
      const { post } = await handle(endpoints.login);
      const isCalled = post().isHandled;

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Login");

      await page.waitForTimeout(interval);
      await page.waitForSelector("form");

      await page.click('[type="submit"]');

      await page.waitForTimeout(interval);

      expect(isCalled()).to.be.false;
    });

    it("Login makes correct API call [ 2.5 Points ]", async () => {
      const data = mockData.users[0];
      const { post } = await handle(endpoints.login);
      const { onRequest } = post(data);

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Login");

      await page.waitForTimeout(interval);
      await page.waitForSelector("form");

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

    it("Logout makes correct API call [ 2.5 Points ]", async () => {
      const data = mockData.users[0];
      const { post } = await handle(endpoints.login);
      const { get } = await handle(endpoints.logout);
      const { onResponse } = post(data);
      const { onRequest } = get("", { json: false, status: 204 });

      await page.goto(host);
      await page.click("text=Login");
      await page.waitForTimeout(interval);
      await page.waitForSelector("form");
      await page.fill('[name="email"]', data.email);
      await page.fill('[name="password"]', data.password);

      await Promise.all([onResponse(), page.click('[type="submit"]')]);

      await page.waitForTimeout(interval);

      const [request] = await Promise.all([
        onRequest(),
        page.click("nav >> text=Logout"),
      ]);

      const token = request.headers()["x-authorization"];
      expect(request.method()).to.equal("GET");
      expect(token).to.equal(data.accessToken);
    });
  });

  describe("Navigation bar [ 5 Points ]", () => {
    it("Logged user should see correct navigation [ 2.5 Points ]", async () => {
      // Login user
      const data = mockData.users[0];
      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Login");
      await page.waitForTimeout(interval);
      await page.waitForSelector("form");

      await page.fill('[name="email"]', data.email);
      await page.fill('[name="password"]', data.password);

      await page.click('[type="submit"]');

      //Test for navigation
      await page.waitForTimeout(interval);
      expect(await page.isVisible("text=Dashboard")).to.be.true;
      expect(await page.isVisible("text=Add Pair")).to.be.true;
      expect(await page.isVisible("text=Search")).to.be.true;
      expect(await page.isVisible("text=Logout")).to.be.true;

      expect(await page.isVisible("text=Login")).to.be.false;
      expect(await page.isVisible("text=Register")).to.be.false;
    });

    it("Guest user should see correct navigation [ 2.5 Points ]", async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);

      expect(await page.isVisible("nav >> text=Logout")).to.be.false;
      expect(await page.isVisible("text=Add Pair")).to.be.false;

      expect(await page.isVisible("text=Search")).to.be.true;
      expect(await page.isVisible("nav >> text=Dashboard")).to.be.true;
      expect(await page.isVisible("nav >> text=Login")).to.be.true;
      expect(await page.isVisible("nav >> text=Register")).to.be.true;
    });
  });

  describe("Home Page [ 10 Points ]", () => {
    it("Show home page [ 2.5 Points ]", async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);

      expect(
        await page.isVisible(
          "text=Browse through the shoe collectibles of our users"
        )
      ).to.be.true;
    });

    it("Show home page [ 2.5 Points ]", async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);

      expect(await page.isVisible("text=Add or manage your items")).to.be.true;
    });
  });

  describe("Dashboard Page [ 15 Points ]", () => {
    it("Show Dashboard page - welcome message [ 2.5 Points ]", async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);

      expect(await page.isVisible("text=Dashboard")).to.be.true;
      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");
      await page.waitForTimeout(interval);
      expect(await page.isVisible("text=Collectibles")).to.be.true;
    });

    it("Check Dashboard page with 0 offers [ 2.5 Points ]", async () => {
      const { get } = await handle(endpoints.catalog);
      get([]);

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");
      await page.waitForTimeout(interval);

      const visible = await page.isVisible(
        "text=There are no items added yet."
      );
      expect(visible).to.be.true;
    });

    it("Check dashboard page with 2 offers [ 2.5 Points ]", async () => {
      const { get } = await handle(endpoints.catalog);
      get(mockData.catalog.slice(0, 2));
      const data = mockData.catalog.slice(0, 2);

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("nav >> text=Dashboard");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#dashboard");
      const brands = await page.$$eval(".card p .brand", (t) =>
        t.map((s) => s.textContent)
      );

      expect(brands.length).to.equal(2);
      expect(brands[0]).to.contains(`${data[0].brand}`);
      expect(brands[1]).to.contains(`${data[1].brand}`);
    });

    it("Show details [ 2.5 Points ]", async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");
      await page.waitForTimeout(interval);

      expect(await page.isVisible('text="Details"')).to.be.true;
    });

    it("Check dashboard page Info [ 2.5 Points ]", async () => {
      const { get } = await handle(endpoints.catalog);
      get(mockData.catalog.slice(1, 2));
      const data = mockData.catalog.slice(1, 2);

      await page.goto(host);
      await page.waitForTimeout(interval);

      await page.click("text=Dashboard");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#dashboard");
      const brands = await page.$$eval(".card p .brand", (t) =>
        t.map((s) => s.textContent)
      );
      const models = await page.$$eval(".card p .model", (t) =>
        t.map((s) => s.textContent)
      );

      expect(brands).to.contains(`${data[0].brand}`);
      expect(models).to.contains(`${data[0].model}`);
    });
  });

  describe("CRUD [ 50 Points ]", () => {
    // Login user
    beforeEach(async () => {
      const data = mockData.users[0];
      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Login");
      await page.waitForTimeout(interval);
      await page.waitForSelector("form");
      await page.fill('[name="email"]', data.email);
      await page.fill('[name="password"]', data.password);
      await page.click('[type="submit"]');
      await page.waitForTimeout(interval);
    });

    it("Create does NOT work with empty fields [ 2.5 Points ]", async () => {
      const { post } = await handle(endpoints.create);
      const isCalled = post().isHandled;

      await page.click("text=Add Pair");
      await page.waitForTimeout(interval);
      await page.waitForSelector("form");

      page.click('[type="submit"]');

      await page.waitForTimeout(interval);

      expect(isCalled()).to.be.false;
    });

    it("Create makes correct API call for logged in user [ 2.5 Points ]", async () => {
      const data = mockData.catalog[0];
      const { post } = await handle(endpoints.create);
      const { onRequest } = post();

      await page.click("text=Add Pair");
      await page.waitForTimeout(interval);

      await page.waitForSelector("form");
      await page.fill('[name="brand"]', data.brand);
      await page.fill('[name="model"]', data.model);
      await page.fill('[name="imageUrl"]', data.imageUrl);
      await page.fill('[name="release"]', data.release);
      await page.fill('[name="designer"]', data.designer);
      await page.fill('[name="value"]', data.value);

      const [request] = await Promise.all([
        onRequest(),
        page.click('[type="submit"]'),
      ]);

      const postData = JSON.parse(request.postData());

      expect(postData.brand).to.equal(data.brand);
      expect(postData.model).to.equal(data.model);
      expect(postData.imageUrl).to.equal(data.imageUrl);
      expect(postData.release).to.equal(data.release);
      expect(postData.designer).to.equal(data.designer);
      expect(postData.value).to.equal(data.value);
    });

    it("Check details information [ 2.5 Points ]", async () => {
      const data = mockData.catalog[1];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");

      await page.waitForTimeout(interval);

      await page.waitForTimeout(interval);

      await page.waitForSelector("#dashboard");
      await page.click(`.card:has-text("${data.brand}") >> .details-btn`);

      await page.waitForTimeout(interval);

      const brand = await page.$$eval("#info-wrapper p #details-brand", (t) =>
        t.map((s) => s.textContent)
      );
      const model = await page.$$eval("#info-wrapper p #details-model", (t) =>
        t.map((s) => s.textContent)
      );
      const release = await page.$$eval(
        "#info-wrapper p #details-release",
        (t) => t.map((s) => s.textContent)
      );
      const designer = await page.$$eval(
        "#info-wrapper p #details-designer",
        (t) => t.map((s) => s.textContent)
      );
      const value = await page.$$eval("#info-wrapper p #details-value", (t) =>
        t.map((s) => s.textContent)
      );

      expect(brand).to.contains(data.brand);
      expect(model).to.contains(data.model);
      expect(release).to.contains(data.release);
      expect(designer).to.contains(data.designer);
      expect(value).to.contains(data.value);
    });

    it("Non-author does NOT see delete and edit buttons [ 2.5 Points ]", async () => {
      const data = mockData.catalog[2];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#dashboard");
      await page.waitForTimeout(interval);

      await page.click(`.card:has-text("${data.brand}") >> .details-btn`);

      expect(await page.isVisible('text="Delete"')).to.be.false;
      expect(await page.isVisible('text="Edit"')).to.be.false;
    });

    it("Author see delete and edit buttons [ 2.5 Points ]", async () => {
      const data = mockData.catalog[0];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");
      await page.waitForTimeout(interval);

      await page.waitForTimeout(interval);

      await page.waitForSelector("#dashboard");
      await page.click(`.card:has-text("${data.brand}") >> .details-btn`);

      await page.waitForTimeout(interval);

      expect(await page.isVisible('text="Delete"')).to.be.true;
      expect(await page.isVisible('text="Edit"')).to.be.true;
    });

    it("Edit should populate form with correct data [ 2.5 Points ]", async () => {
      const data = mockData.catalog[0];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");
      await page.waitForTimeout(interval);

      await page.waitForTimeout(interval);

      await page.waitForSelector("#dashboard");
      await page.click(`.card:has-text("${data.brand}") >> .details-btn`);

      await page.click("text=Edit");
      await page.waitForTimeout(interval);

      await page.waitForSelector("form");

      const inputs = await page.$$eval(".form .edit-form input", (t) =>
        t.map((i) => i.value)
      );

      expect(inputs[0]).to.contains(data.brand);
      expect(inputs[1]).to.contains(data.model);
      expect(inputs[2]).to.contains(data.imageUrl);
      expect(inputs[3]).to.contains(data.release);
      expect(inputs[4]).to.contains(data.designer);
      expect(inputs[5]).to.contains(data.value);
    });

    it("Edit does NOT work with empty fields [ 2.5 Points ]", async () => {
      const data = mockData.catalog[0];
      const user = mockData.users[0];
      const { get, put } = await handle(endpoints.delete(data._id));
      get(data);
      const { isHandled } = put();

      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");
      await page.waitForTimeout(interval);

      await page.waitForTimeout(interval);
      await page.waitForSelector("#dashboard");
      await page.click(`.card:has-text("${data.brand}") >> .details-btn`);

      await page.click("text=Edit");
      await page.waitForTimeout(interval);

      await page.waitForSelector("form");

      await page.fill('[name="brand"]', "");
      await page.fill('[name="model"]', "");
      await page.fill('[name="imageUrl"]', "");
      await page.fill('[name="release"]', "");
      await page.fill('[name="designer"]', "");
      await page.fill('[name="value"]', "");

      await page.click('[type="submit"]');
      await page.waitForTimeout(interval);

      expect(isHandled()).to.be.false;
    });

    it("Edit makes correct API call for logged in user [ 2.5 Points ]", async () => {
      const data = mockData.catalog[0];
      const user = mockData.users[0];

      const { get, put } = await handle(endpoints.delete(data._id));
      get(data);
      const { onRequest } = put();

      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");

      await page.waitForTimeout(interval);

      await page.waitForTimeout(interval);
      await page.waitForSelector("#dashboard");
      await page.click(`.card:has-text("${data.brand}") >> .details-btn`);

      await page.click("text=Edit");
      await page.waitForTimeout(interval);

      await page.waitForSelector("form");

      await page.fill('[name="brand"]', data.brand + "edit");
      await page.fill('[name="model"]', data.model + "edit");
      await page.fill('[name="release"]', data.release + "edit");

      const [request] = await Promise.all([
        onRequest(),
        page.click('[type="submit"]'),
      ]);

      const postData = JSON.parse(request.postData());

      expect(postData.brand).to.contains(data.brand + "edit");
      expect(postData.model).to.contains(data.model + "edit");
      expect(postData.release).to.contains(data.release + "edit");
    });

    it("Delete makes correct API call for logged in user [ 2.5 Points ]", async () => {
      const data = mockData.catalog[0];
      const user = mockData.users[0];

      const { get, del } = await handle(endpoints.delete(data._id));
      get(data);
      const { onResponse, isHandled } = del();

      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#dashboard");
      await page.click(`.card:has-text("${data.brand}") >> .details-btn`);

      await page.click("text=Delete");

      page.on("dialog", (dialog) => dialog.accept());
      await Promise.all([onResponse(), page.click('text="Delete"')]);

      expect(isHandled()).to.be.true;
    });
  });

  describe("BONUS : Search functionality  [ 10 Points ]", async () => {
    it("Check Search page with 0 results [ 2.5 Points ]", async () => {
      const data = mockData.catalog[1];
      const { get } = await handle(endpoints.search(data.brand + "y"));
      get([]);

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Search");

      await page.waitForTimeout(interval);
      await page.waitForSelector("form");

      await page.fill('[name="search"]', data.brand + "y");
      await page.click('[type="submit"]');

      await page.waitForTimeout(interval);

      const visible = await page.isVisible("text=There are no results found.");
      expect(visible).to.be.true;
    });

    it("Check Search page with 2 results [ 2.5 Points ]", async () => {
      const removed = mockData.catalog.splice(1, 1);
      const data = mockData.catalog;
      const { get } = await handle(endpoints.search("Air"));
      get(data);

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Search");

      await page.waitForTimeout(interval);
      await page.waitForSelector("form");

      await page.fill('[name="search"]', "Air");
      await page.click('[type="submit"]');

      await page.waitForTimeout(interval);
      await page.waitForSelector("#search-container");
      const brands = await page.$$eval(".card p .brand", (t) =>
        t.map((s) => s.textContent)
      );

      expect(brands.length).to.equal(2);
      expect(brands[0]).to.contains(`${data[0].brand}`);
      expect(brands[1]).to.contains(`${data[1].brand}`);
    });

    it("Show details buttons for logged in users[ 2.5 Points ]", async () => {
      const user = mockData.users[0];
      const removed = mockData.catalog.splice(1, 1);
      const data = mockData.catalog;
      const { get } = await handle(endpoints.search("Air"));
      get(data);

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Login");
      await page.waitForTimeout(interval);
      await page.waitForSelector("form");
      await page.fill('[name="email"]', user.email);
      await page.fill('[name="password"]', user.password);
      await page.click('[type="submit"]');
      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Search");

      await page.waitForTimeout(interval);
      await page.waitForSelector("form");

      await page.fill('[name="search"]', "Air");
      await page.click('[type="submit"]');

      await page.waitForTimeout(interval);

      expect(await page.isVisible('text="Details"')).to.be.true;
    });

    it("Hide details buttons for logged out users[ 2.5 Points ]", async () => {
      const removed = mockData.catalog.splice(1, 1);
      const data = mockData.catalog;
      const { get } = await handle(endpoints.search("Air"));
      get(data);

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Search");

      await page.waitForTimeout(interval);
      await page.waitForSelector("form");

      await page.fill('[name="search"]', "Air");
      await page.click('[type="submit"]');

      await page.waitForTimeout(interval);

      expect(await page.isVisible('text="Details"')).to.be.false;
    });
  });
});

async function setupContext(context) {
  // Authentication
  await handleContext(context, endpoints.login, { post: mockData.users[0] });
  await handleContext(context, endpoints.register, { post: mockData.users[0] });
  await handleContext(context, endpoints.logout, {
    get: (h) => h("", { json: false, status: 204 }),
  });

  // Catalog and Details
  await handleContext(context, endpoints.catalog, { get: mockData.catalog });
  await handleContext(context, endpoints.details("1001"), {
    get: mockData.catalog[0],
  });
  await handleContext(context, endpoints.details("1002"), {
    get: mockData.catalog[1],
  });
  await handleContext(context, endpoints.details("1003"), {
    get: mockData.catalog[2],
  });

  await handleContext(
    endpoints.profile("0001"),
    { get: mockData.catalog.slice(0, 2) },
    context
  );

  await handleContext(endpoints.total("1001"), { get: 6 }, context);
  await handleContext(endpoints.total("1002"), { get: 4 }, context);
  await handleContext(endpoints.total("1003"), { get: 7 }, context);

  await handleContext(endpoints.own("1001", "0001"), { get: 1 }, context);
  await handleContext(endpoints.own("1002", "0001"), { get: 0 }, context);
  await handleContext(endpoints.own("1003", "0001"), { get: 0 }, context);

  // Block external calls
  await context.route(
    (url) => url.href.slice(0, host.length) != host,
    (route) => {
      if (DEBUG) {
        console.log("Preventing external call to " + route.request().url());
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
    get: (returns, options) => request("GET", returns, options),
    post: (returns, options) => request("POST", returns, options),
    put: (returns, options) => request("PUT", returns, options),
    patch: (returns, options) => request("PATCH", returns, options),
    del: (returns, options) => request("DELETE", returns, options),
    delete: (returns, options) => request("DELETE", returns, options),
  };

  const context = this;

  await context.route(urlPredicate, (route, request) => {
    if (DEBUG) {
      console.log(">>>", request.method(), request.url());
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
      if (typeof handlers[method] == "function") {
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
    "Access-Control-Allow-Origin": "*",
  };
  if (options.json) {
    headers["Content-Type"] = "application/json";
    data = JSON.stringify(data);
  }

  return {
    status: options.status,
    headers,
    body: data,
  };
}
