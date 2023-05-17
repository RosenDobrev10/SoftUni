const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

const host = "http://localhost:3000"; // Application host (NOT service host - that can be anything)
const interval = 600;
const DEBUG = false;
const slowMo = 1500;

const mockData = require("./mock-data.json");

const endpoints = {
  register: "/users/register",
  login: "/users/login",
  logout: "/users/logout",
  catalog: "/data/fruits?sortBy=_createdOn%20desc",
  create: "/data/fruits",
  search: (query) => `/data/fruits?where=name%20LIKE%20%22${query}%22`,
  details: (id) => `/data/fruits/${id}`,
  delete: (id) => `/data/fruits/${id}`,
  own: (fruitId, userId) =>
  `/data/fruits?where=fruitId%3D%22${fruitId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

let browser;
let context;
let page;

describe("E2E tests", function () {
  // Setup
  this.timeout(DEBUG ? 120000 : 100000);
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

    it("Register makes correct API call [ 5 Points ]", async () => {
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

    it("Login makes correct API call [ 5 Points ]", async () => {
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

    it("Logout makes correct API call [ 5 Points ]", async () => {
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
      expect(await page.isVisible("text=Fruits")).to.be.true;
      expect(await page.isVisible("text=Add Fruit")).to.be.true;
      expect(await page.isVisible("text=Logout")).to.be.true;
      expect(await page.isVisible("text=Search")).to.be.true;


      expect(await page.isVisible("text=Login")).to.be.false;
      expect(await page.isVisible("text=Register")).to.be.false;
    });

    it("Guest user should see correct navigation [ 2.5 Points ]", async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);

      expect(
        await page.isVisible("nav >> text=Fruits"),
        "Dashboard is not visible"
      ).to.be.true;
      expect(
        await page.isVisible("nav >> text=Add Fruit"),
        "Create is visible"
      ).to.be.false;
      expect(await page.isVisible("nav >> text=Logout"), "Logout is visible").to
        .be.false;

      expect(await page.isVisible("nav >> text=Login"), "Login is not visible")
        .to.be.true;
      expect(
        await page.isVisible("nav >> text=Register"),
        "Ragister is not visible"
      ).to.be.true;
    });
  });

  describe("Home Page [ 10 Points ]", () => {
    it("Show home page [ 5 Points ]", async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);

      expect(await page.isVisible("text=Learn More About Your Favorite Fruits")).to.be.true;
    });

    it("Show home page [ 5 Points ]", async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);

      expect(
        await page.isVisible("text=Learn More About Your Favorite Fruits")
      ).to.be.true;
    });
  });

  describe("Fruits Page [ 15 Points ]", () => {
    it("Show Fruits page - welcome message [ 2.5 Points ]", async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);

      await page.click("nav >> text=Fruits");
      await page.waitForTimeout(interval);
      expect(await page.isVisible("text=Fruits")).to.be.true;
    });

    it("Check Fruits page with 0 fruits [ 2.5 Points ]", async () => {
      const { get } = await handle(endpoints.catalog);
      get([]);

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("nav >> text=Fruits");
      await page.waitForTimeout(interval);

      expect(await page.isVisible("text=No fruit info yet.")).to.be.true;
      
    });

    it("Check fruits page with 2 offers [ 2.5 Points ]", async () => {
      const { get } = await handle(endpoints.catalog);
      get(mockData.catalog.slice(0, 2));
      const data = mockData.catalog.slice(0, 2);

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("nav >> text=Fruits");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#dashboard");
      const names = await page.$$eval(".fruit .title", (t) =>
        t.map((s) => s.textContent)
      );

      expect(names.length).to.equal(2);
      expect(names[0]).to.contains(`${data[0].name}`);
      expect(names[1]).to.contains(`${data[1].name}`);
    });

    it("Show More Info [ 2.5 Points ]", async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("nav >> text=Fruits");
      await page.waitForTimeout(interval);

      expect(await page.isVisible('text="More Info"')).to.be.true;
    });

    it("Check fruit page Info [ 5 Points ]", async () => {
      const { get } = await handle(endpoints.catalog);
      get(mockData.catalog.slice(0, 1));
      const data = mockData.catalog.slice(0, 1);

      await page.goto(host);
      await page.waitForTimeout(interval);

      await page.click("nav >> text=Fruits");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#dashboard");
      const names = await page.$$eval(".fruit .title", (t) =>
        t.map((s) => s.textContent)
      );
      const description = await page.$$eval(".fruit .description", (t) =>
        t.map((s) => s.textContent)
      );

      expect(names).to.contains(`${data[0].name}`);
      expect(description[0]).to.contains(`${data[0].description}`);
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

    it("Create does NOT work with empty fields [ 5 Points ]", async () => {
      const { post } = await handle(endpoints.create);
      const isCalled = post().isHandled;

      await page.click("text=Add Fruit");
      await page.waitForTimeout(interval);
      await page.waitForSelector("form");

      page.click('[type="submit"]');

      await page.waitForTimeout(interval);

      expect(isCalled()).to.be.false;
    });

    it("Create makes correct API call for logged in user [ 10 Points ]", async () => {
      const data = mockData.catalog[0];
      const { post } = await handle(endpoints.create);
      const { onRequest } = post(data);

      await page.click("text=Add Fruit");
      await page.waitForTimeout(interval);

      await page.waitForSelector("form");
      await page.fill('[name="name"]', data.name);
      await page.fill('[name="imageUrl"]', data.imageUrl);
      await page.fill('[name="description"]', data.description);
      await page.fill('[name="nutrition"]', data.nutrition);

      const [request] = await Promise.all([
        onRequest(),
        page.click('[type="submit"]'),
      ]);

      const postData = JSON.parse(request.postData());

      expect(postData.name).to.equal(data.name);
      expect(postData.imageUrl).to.equal(data.imageUrl);
      expect(postData.description).to.equal(data.description);
      expect(postData.nutrition).to.equal(data.nutrition);
    });

    it("Check More Info information [ 5 Points ]", async () => {
      const data = mockData.catalog[1];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.waitForTimeout(interval);
      await page.click("text=Fruits");

      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      own(0);
      

      await page.waitForTimeout(interval);

      await page.waitForSelector("#dashboard");
      await page.click(`.fruit:has-text("${data.name}") >> .details-btn`);

      await page.waitForTimeout(interval);

      const name = await page.$$eval("#details-wrapper #details-title", (t) =>
        t.map((s) => s.textContent)
      );
     
      const nutrition = await page.$$eval(
        "#details-wrapper #info-wrapper #details-description #details-nutrition",
        (t) => t.map((s) => s.textContent)
      );
      const description = await page.$$eval(
        "#details-wrapper #info-wrapper #details-description p",
        (t) => t.map((s) => s.textContent.trim())
      );

      expect(name).to.contains(data.name);
      expect(nutrition[0]).to.contains(data.nutrition);
      expect(description).to.contains(data.description);
    });

    it("Non-author does NOT see delete and edit buttons [ 2.5 Points ]", async () => {
      const data = mockData.catalog[1];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.waitForTimeout(interval);
      await page.click("text=Fruits");
      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      own(0);
  

      await page.waitForSelector("#dashboard");
      await page.waitForTimeout(interval);

      await page.click(`.fruit:has-text("${data.name}") >> .details-btn`);

      expect(await page.isVisible('text="Delete"')).to.be.false;
      expect(await page.isVisible('text="Edit"')).to.be.false;
    });

    it("Author see delete and edit buttons [ 2.5 Points ]", async () => {
      const data = mockData.catalog[2];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.waitForTimeout(interval);
      await page.click("text=Fruits");
      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      own(0);
  

      await page.waitForSelector("#dashboard");
      await page.waitForTimeout(interval);

      await page.click(`.fruit:has-text("${data.name}") >> .details-btn`);
      await page.waitForTimeout(interval);

      expect(await page.isVisible('text="Delete"')).to.be.true;
      expect(await page.isVisible('text="Edit"')).to.be.true;

    });

    it("Edit should populate form with correct data [ 5 Points ]", async () => {
      const data = mockData.catalog[2];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.waitForTimeout(interval);
      await page.click("text=Fruits");
      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));

      own(0);


      await page.waitForTimeout(interval);

      await page.waitForSelector("#dashboard");
      await page.click(`.fruit:has-text("${data.name}") >> .details-btn`);

      await page.click("text=Edit");
      await page.waitForTimeout(interval);

      await page.waitForSelector("form");

      const inputs = await page.$$eval(".form .edit-form input", (t) =>
        t.map((i) => i.value)
      );

      const textareas = await page.$$eval(".edit-form textarea", (t) =>
        t.map((i) => i.value)
      );

      expect(inputs[0]).to.contains(data.name);
      expect(inputs[1]).to.contains(data.imageUrl);
      expect(textareas[0]).to.contains(data.description);
      expect(textareas[1]).to.contains(data.nutrition);

    });

    it("Edit does NOT work with empty fields [ 5 Points ]", async () => {
      const data = mockData.catalog[2];
      const user = mockData.users[0];
      const { get, put } = await handle(endpoints.delete(data._id));
      get(data);
      const { isHandled } = put();

      await page.waitForTimeout(interval);
      await page.click("text=Fruits");
      await page.waitForTimeout(interval);

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      own(0);

      await page.waitForTimeout(interval);
      await page.waitForSelector("#dashboard");
      await page.click(`.fruit:has-text("${data.name}") >> .details-btn`);

      await page.click("text=Edit");
      await page.waitForTimeout(interval);

      await page.waitForSelector("form");

      await page.fill('[name="name"]', "");
      await page.fill('[name="imageUrl"]', "");
      await page.fill('[name="description"]', "");
      await page.fill('[name="nutrition"]', "");

      await page.click('[type="submit"]');
      await page.waitForTimeout(interval);

      expect(isHandled()).to.be.false;
    });

    it("Edit makes correct API call for logged in user [ 5 Points ]", async () => {

      const data = mockData.catalog[2];
      const user = mockData.users[0];

      const { get, put } = await handle(endpoints.delete(data._id));
      get(data);
      const { onRequest } = put(data);

      await page.waitForTimeout(interval);
      await page.click("text=Fruits");

      await page.waitForTimeout(interval);

      const { get: own } = await handle(endpoints.own(data._id, user._id));
       own(0);

      await page.waitForTimeout(interval);
      await page.waitForSelector("#dashboard");
      await page.click(`.fruit:has-text("${data.name}") >> .details-btn`);

      await page.click("text=Edit");
      await page.waitForTimeout(interval);

      await page.waitForSelector("form");

      await page.fill('[name="name"]', data.name + "edit");
      await page.fill('[name="nutrition"]', data.nutrition + "edit");

      const [request] = await Promise.all([
        onRequest(),
        page.click('[type="submit"]'),
      ]);

      const postData = JSON.parse(request.postData());

      expect(postData.name).to.contains(data.name + "edit");
      expect(postData.nutrition).to.contains(data.nutrition + "edit");
    });

    it("Delete makes correct API call for logged in user [ 10 Points ]", async () => {
      const data = mockData.catalog[2];
      const user = mockData.users[0];

      const { get, del } = await handle(endpoints.delete(data._id));
      get(data);
      const { onResponse, isHandled } = del();

      await page.waitForTimeout(interval);
      await page.click("text=Fruits");
      await page.waitForTimeout(interval);

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      own(0);
      await page.waitForSelector("#dashboard");
      await page.click(`.fruit:has-text("${data.name}") >> .details-btn`);

      await page.click("text=Delete");

      page.on("dialog", (dialog) => dialog.accept());
      await Promise.all([onResponse(), page.click('text="Delete"')]);

      expect(isHandled()).to.be.true;
    });
  });
  describe('BONUS:Search Page [ 15 Points ]', async () => {

    it('Show no matches for Guest [ 2.5 Points ]', async () => {
        const { get } = await handle(endpoints.search('Tomato'));
        get([]);

        await page.goto(host);
        await page.waitForTimeout(interval);

        await page.click('nav >> text=Search');
        await page.waitForTimeout(interval);

        await page.fill('[name="search"]', 'Tomato');
        await page.click('button >> text="Search"');
        await page.waitForTimeout(interval);

        expect(await page.isVisible('text=No result.')).to.be.true;
    });

    it('Show results with 2 fruits for Guest [ 2.5 Points ]', async () => {
        const { get } = await handle(endpoints.search('kiwi'));
        get(mockData.catalog.slice(0, 2));
        
        await page.goto(host);
        await page.waitForTimeout(interval);

        await page.click('nav >> text=Search');
        await page.waitForTimeout(interval);

        await page.fill('[name="search"]', 'kiwi');
        await page.click('button >> text="Search"');
        await page.waitForTimeout(interval);

        const names = await page.$$eval(".fruit .title", (t) =>
        t.map((s) => s.textContent)
      );

      expect(names.length).to.equal(2);
        expect(names[0]).to.contains(`${mockData.catalog[0].name}`);
        expect(names[1]).to.contains(`${mockData.catalog[1].name}`);
    });

    it('Show More info button for Guest [ 2.5 Points ]', async () => {
        const { get } = await handle(endpoints.search('a'));
        get(mockData.catalog.slice(0, 1));
        
        await page.goto(host);
        await page.waitForTimeout(interval);

        await page.click('nav >> text=Search');
        await page.waitForTimeout(interval);

        await page.fill('[name="search"]', 'a');
        await page.click('button >> text="Search"');
        await page.waitForTimeout(interval);

        const names = await page.$$eval(".fruit .title", (t) =>
        t.map((s) => s.textContent));

        expect(names.length).to.equal(1);
        expect(names[0]).to.contains(`${mockData.catalog[0].name}`);

        expect(await page.isVisible('text="More Info"')).to.be.true;
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

        const { get } = await handle(endpoints.search('Tomato'));
        get([]);

        await page.goto(host);
        await page.waitForTimeout(interval);

        await page.click('nav >> text=Search');
        await page.waitForTimeout(interval);

        await page.fill('[name="search"]', 'Tomato');
        await page.click('button >> text="Search"');
        await page.waitForTimeout(interval);

        expect(await page.isVisible('text=No result.')).to.be.true;
    });

    it('Show results with 2 fruit for Users [ 2.5 Points ]', async () => {
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

        const { get } = await handle(endpoints.search('a'));
        get(mockData.catalog.slice(0, 2));

        await page.goto(host);
        await page.waitForTimeout(interval);

        await page.click('nav >> text=Search');
        await page.waitForTimeout(interval);

        await page.fill('[name="search"]', 'a');
        await page.click('button >> text="Search"');
        await page.waitForTimeout(interval);

        const names = await page.$$eval(".fruit .title", (t) =>
        t.map((s) => s.textContent));

        expect(names.length).to.equal(2);
        expect(names[0]).to.contains(`${mockData.catalog[0].name}`);
        expect(names[1]).to.contains(`${mockData.catalog[1].name}`);

  
    });

    it('More Info info button for User [ 2.5 Points ]', async () => {
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

        const { get } = await handle(endpoints.search('banana'));
        get(mockData.catalog.slice(0, 1));

        await page.goto(host);
        await page.waitForTimeout(interval);

        await page.click('nav >> text=Search');
        await page.waitForTimeout(interval);

        await page.fill('[name="search"]', 'banana');
        await page.click('button >> text="Search"');
        await page.waitForTimeout(interval);

        const names = await page.$$eval(".fruit .title", (t) =>
        t.map((s) => s.textContent));

        expect(names.length).to.equal(1);
        expect(names[0]).to.contains(`${mockData.catalog[0].name}`);

        expect(await page.isVisible('text="More Info"')).to.be.true;


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
